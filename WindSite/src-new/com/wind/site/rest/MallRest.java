package com.wind.site.rest;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.MyYiqifaMall;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.ICommandService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

/**
 * B2C
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/ymall")
public class MallRest {
	@Autowired
	private ISiteService siteService;
	@Autowired
	private ICommandService commandService;

	@RequestMapping(value = "/yiqifa")
	@ResponseBody
	public String yiqfa(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		String localWid = String.valueOf(result.get("yiqifa_sid"));
		String sid = request.getParameter("sid");// 网站主编号
		String wid = request.getParameter("wid");// 站点编号
		if (StringUtils.isEmpty(wid) || StringUtils.isEmpty(sid)) {
			return "未指定网站编号或网站主编号，此地址为亿起发专用";
		}
		if (!wid.equals(localWid)) {
			return "您在新淘网设置的站点编号与该订单数据站点编号不一致";
		}
		String yiqifa_secret = String.valueOf(result.get("yiqifa_secret"));
		if (StringUtils.isEmpty(yiqifa_secret)) {
			return "您尚未设置亿起发实时数据同步密钥";
		}
		String unique_id = request.getParameter("unique_id");// 数据唯一编号
		if (StringUtils.isEmpty(unique_id)) {
			return "未指定亿起发数据唯一编号";
		}
		String status = request.getParameter("status");// 订单状态（R=未确认；A=成功订单；F=无效订单）
		List<YiqifaReport> reports = siteService.findAllByCriterion(
				YiqifaReport.class, R.eq("yiqifaId", unique_id));
		@SuppressWarnings("unused")
		String create_date = request.getParameter("create_date");// 订单数据返回到亿起发的时间
		String action_id = request.getParameter("action_id");// 活动编号
		String action_name = request.getParameter("action_name");// 活动名
		String order_no = request.getParameter("order_no");// 订单编号
		String order_time = request.getParameter("order_time");// 下单时间
		String prod_id = request.getParameter("prod_id");// 商品编号
		String prod_name = request.getParameter("prod_name");// 商品名称
		String prod_count = request.getParameter("prod_count");// 商品数量
		String prod_money = request.getParameter("prod_money");// 商品单价
		String comm_type = request.getParameter("comm_type");// 佣金类型
		String commision = request.getParameter("commision");// 网站主佣金
		String feed_back = request.getParameter("feed_back");// 反馈标签
		String chkcode = request.getParameter("chkcode");// 私钥，将（action_id+order_no+prod_money+order_time+公钥）做MD5加密所得字符串
		String prod_type = request.getParameter("prod_type");// 商品类型
		// 校验MD5
		try {
			String localChkCode = encryptMD5(action_id + order_no + prod_money
					+ order_time + yiqifa_secret);
			if (!chkcode.equals(localChkCode)) {
				return "MD5加密校验失败，请确认您的亿起发密钥正确";
			}
			YiqifaReport report = null;
			if (reports.size() > 0) {
				report = reports.get(0);
				if (status.equals(report.getOrderStatus())) {
					return "0";// 重复订单，亿起发将不再重复发送改条数据
				} else {// 状态改变
					report.setOrderStatus(status);
				}
			} else {// 新增
				report = new YiqifaReport();
				report.setYiqifaId(unique_id);
				report.setActionId(action_id);
				report.setActionName(action_name);
				report.setCid(prod_type);
				report.setCommissionType(comm_type);
				report.setItemId(prod_id);
				report.setItemNums(prod_count);
				report.setItemPrice(prod_money);
				report.setOrderNo(order_no);
				report.setOrderStatus(status);
				report.setOrderTime(order_time);
				report.setOuterCode(feed_back);
				report.setSite_id(String.valueOf(result.get("sid")));
				report.setUser_id(String.valueOf(result.get("user_id")));
				report.setWid(wid);
				report.setItemTitle(prod_name);
				report.setCommission(commision);
				report.setSid(sid);
			}
			if (report != null) {
				String outCode = report.getOuterCode();
				if (StringUtils.isNotEmpty(outCode)
						&& outCode.startsWith("xtfl")) {// 如果推广渠道不为空，并且是新淘返利
					commandService.mergeYiqifaReportTrade(
							Long.valueOf(outCode.replace("xtfl", "")),
							report.getUser_id(), report.getSite_id(), report);
				} else {
					commandService.mergeYiqifaReportTrade(report.getUser_id(),
							report.getSite_id(), report);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "2";// 网站接口程序异常，亿起发会尝试重新发送数据，多次尝试失败将不再发送
		}
		return "1";// 成功
	}

	private static String encryptMD5(String data) throws IOException {
		StringBuffer buf = new StringBuffer("");
		byte[] bytes = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			bytes = md.digest(data.getBytes("gbk"));
			int i;
			for (int offset = 0; offset < bytes.length; offset++) {
				i = bytes[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
		} catch (GeneralSecurityException gse) {
			throw new IOException(gse);
		}
		return buf.toString();
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView mall(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		YiqifaCategory cat = EnvManager.getYiqifaCats().get(0);
		String cid = request.getParameter("cat");
		if (StringUtils.isNotEmpty(cid)) {
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			try {
				Long catId = Long.valueOf(cid);
				for (YiqifaCategory c : cats) {
					if (c.getId().intValue() == catId.intValue()) {
						cat = c;
						break;
					}
				}
			} catch (Exception e) {
			}
		}
		result.put("cat", cat);
		return new ModelAndView("site/mall/mall", result);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ModelAndView mallDetail(@PathVariable Long id,
			HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}

		YiqifaMall mall = EnvManager.getYiqifaMalls().get(id + "");
		if (mall == null) {
			SystemException.handleMessageException("未找到指定的商城");
		}
		result.put("mall", mall);
		YiqifaCategory cat = null;
		if (mall.getCid() != null) {
			Long cid = mall.getCid();
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			for (YiqifaCategory c : cats) {
				if (c.getId().intValue() == cid.intValue()) {
					cat = c;
					break;
				}
			}
		}
		if (cat != null) {
			result.put("cat", cat);
		}
		return new ModelAndView("site/mall/mallDetail", result);
	}

	@RequestMapping(value = "/go/{id}", method = RequestMethod.GET)
	public ModelAndView mallGo(@PathVariable Long id, HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		YiqifaMall m = EnvManager.getYiqifaMalls().get(id + "");
		if (m == null) {
			SystemException.handleMessageException("商城不存在");
		}
		result.put("mall", m);
		List<MyYiqifaMall> malls = siteService.findAllByCriterionAndOrder(
				new Page<MyYiqifaMall>(1, 1), MyYiqifaMall.class,
				Order.asc("sortOrder"),
				R.eq("pk.user_id", Long.valueOf(userId)),
				R.eq("pk.mall_id", id));
		if (malls != null && malls.size() == 1) {// 转换反馈标签
			MyYiqifaMall mall = malls.get(0);
			String clickUrl = mall.getPk().getClickUrl();
			if (StringUtils.isNotEmpty(clickUrl)) {
				mall.getPk().setClickUrl(
						clickUrl.replaceAll("e=c",
								"e=" + EnvManager.getMallsOuterCode()));
				result.put("action", mall);
			}
		}
		return new ModelAndView("site/mall/goYiqifaMall", result);
	}

	@RequestMapping(value = "/action/{id}")
	@ResponseBody
	public String mallAction(@PathVariable Long id, HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		List<MyYiqifaMall> malls = siteService.findAllByCriterionAndOrder(
				MyYiqifaMall.class, Order.asc("sortOrder"),
				R.eq("pk.user_id", Long.valueOf(userId)),
				R.eq("pk.mall_id", id));
		if (malls != null && malls.size() > 0) {// 转换反馈标签
			for (MyYiqifaMall mall : malls) {
				String clickUrl = mall.getPk().getClickUrl();
				if (StringUtils.isNotEmpty(clickUrl)) {
					mall.getPk().setClickUrl(
							clickUrl.replaceAll("e=c",
									"e=" + EnvManager.getMallsOuterCode()));
				}
			}
		}
		return new Gson().toJson(malls, new TypeToken<List<MyYiqifaMall>>() {
		}.getType());
	}

	public static Map<String, String> splitQuery(URL url)
			throws UnsupportedEncodingException {
		Map<String, String> query_pairs = new LinkedHashMap<String, String>();
		String query = url.getQuery();
		String[] pairs = query.split("&");
		for (String pair : pairs) {
			int idx = pair.indexOf("=");
			query_pairs.put(pair.substring(0, idx),
					URLDecoder.decode(pair.substring(idx + 1), "GBK"));
		}
		return query_pairs;
	}

	public static void main(String[] args) throws IOException {
		Map<String, String> params = splitQuery(new URL(
				"http://www.tlehui.com/yiqifa?unique_id=351433832&create_date=2013-07-11+18%3A05%3A07&action_id=5402&action_name=%C3%C0%CD%C5%CD%F8CPS&sid=90098&wid=650119&order_no=217214871-1&order_time=2013-07-11+18%3A04%3A12&prod_id=3351701&prod_name=&prod_count=1&prod_money=59.9&feed_back=xtfl35171&status=R&comm_type=O&commision=1.0303&chkcode=76f76a7787111815409b09eb13458fac&prod_type=O&am=0.0&exchange_rate=0.0"));
		System.out.println(params);
		String action_id = params.get("action_id");
		String order_no = params.get("order_no");
		String prod_money = params.get("prod_money");
		String order_time = params.get("order_time");
		String yiqifa_secret = "ryrxwjsywpzxsqy";
		String chkcode = params.get("chkcode");
		System.out.println(action_id + order_no + prod_money + order_time
				+ yiqifa_secret);
		String localChkCode = encryptMD5(action_id + order_no + prod_money
				+ order_time + yiqifa_secret);
		System.out.println(chkcode + "|||||||||" + localChkCode);
		if (!chkcode.equals(localChkCode)) {
			System.out.println("MD5加密校验失败，请确认您的亿起发密钥正确");
		}
	}
}
