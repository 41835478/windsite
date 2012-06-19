package com.wind.site.rest;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Member;
import com.wind.site.model.MyYiqifaMall;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.YiqifaMall;
import com.wind.site.model.YiqifaMallPk;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IMemberService;
import com.wind.site.util.JExcelUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.site.yiqifa.YiqifaClient;
import com.wind.site.yiqifa.YiqifaRequest;
import com.wind.site.yiqifa.YiqifaResponse;

@Controller
@RequestMapping("/member/fl/mall")
public class MemberMallRest {
	@Autowired
	private IMemberService memberService;
	@Autowired
	private ICommandService commandService;

	/**
	 * 商城基本设置
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ModelAndView siteMallProfile(HttpServletRequest request) {
		Site site = EnvManager.getUser().getSites().get(0);
		SiteCommission commission = memberService.get(SiteCommission.class,
				site.getId());
		if (commission == null) {
			commission = new SiteCommission();
			commission.setUser_id(EnvManager.getUser().getUser_id());
			commission.setNick(EnvManager.getUser().getNick());
			commission.setSite_id(site.getId());
			commission.setRegisteCash(0);
			commission.setCommissionLimit(1);
			commission.setCommissionRate(50);
			commission.setAdCommissionRate(10);
			commission.setIsValid(true);
			memberService.save(commission);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("commission", commission);
		return new ModelAndView("site/member/fanli/mall/profile", result);
	}

	/**
	 * 交易管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report")
	public ModelAndView reportManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		} else {
			q = "";
		}
		result.put("q", q);
		result.put("rel", request.getParameter("rel"));
		return new ModelAndView("site/member/fanli/mall/reportManager", result);
	}

	/**
	 * 交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search", method = RequestMethod.POST)
	public ModelAndView reportSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<YiqifaReport> page = new Page<YiqifaReport>(pageNo, 15);
		SimpleExpression nickFilter = null;
		Criterion isFollowFilter = null;
		SimpleExpression statusFilter = null;
		String q = request.getParameter("q");
		String rel = request.getParameter("rel");
		String isFollow = request.getParameter("isFollow");
		if (StringUtils.isNotEmpty(isFollow) && !"-1".equals(isFollow)) {// 是否跟单
			if ("true".equals(isFollow)) {
				isFollowFilter = R.isNotNull("nick");
			} else {
				isFollowFilter = R.isNull("nick");
			}
		}
		String status = request.getParameter("status");
		if (StringUtils.isNotEmpty(status)) {
			statusFilter = R.eq("orderStatus", status);
		}
		if (StringUtils.isNotEmpty(q)) {
			if (StringUtils.isNotEmpty(rel)) {
				if ("trade".equals(rel)) {// 过滤订单编号
					nickFilter = R.eq("orderNo", q);
				} else if ("item".equals(rel)) {// 过滤商品编号
					nickFilter = R.eq("itemId", q);
				} else if ("action".equals(rel)) {// 过滤活动编号
					nickFilter = R.eq("actionId", q);
				} else {
					nickFilter = R.like("nick", q, MatchMode.ANYWHERE);
				}
			} else {// 过滤会员昵称
				nickFilter = R.like("nick", q, MatchMode.ANYWHERE);
			}
		}
		// 可分页，过滤会员名|订单编号|商品编号|活动编号，时间排序
		result.put("reports", memberService.findAllByCriterionAndOrder(page,
				YiqifaReport.class, Order.desc("orderTime"), nickFilter,
				isFollowFilter, statusFilter, R.eq("site_id", site.getId()), R
						.eq("user_id", EnvManager.getUser().getUser_id())));
		result.put("page", page);
		result.put("malls", EnvManager.getYiqifaMalls());
		result.put("q", q);
		result.put("rel", rel);
		return new ModelAndView("site/member/fanli/mall/reportSearch", result);
	}

	/**
	 * 获取交易记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/get")
	@ResponseBody
	public String reportGet(HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
			SystemException.handleMessageException("开始时间与结束时间不能为空");
		}
		String[] p = new String[] { DateUtils.YYYY_MM_DD };
		try {
			Calendar start = Calendar.getInstance();
			Calendar end = Calendar.getInstance();
			start.setTime(DateUtils.parseDate(startDate, p));
			end.setTime(DateUtils.parseDate(endDate, p));
			start.set(Calendar.HOUR, 0);
			start.set(Calendar.MINUTE, 0);
			start.set(Calendar.SECOND, 0);
			end.add(Calendar.DATE, 1);
			end.set(Calendar.HOUR, 0);
			end.set(Calendar.MINUTE, 0);
			end.set(Calendar.SECOND, 0);
			if (!end.after(start)) {
				SystemException.handleMessageException("结束时间不能小于开始时间");
			}
			if (end.get(Calendar.DATE) - start.get(Calendar.DATE) > 90) {
				SystemException.handleMessageException("您一次最多只能获取7天的交易记录");
			}

			Integer all = 0, count = 0;
			SiteCommission site = memberService.get(SiteCommission.class,
					EnvManager.getUser().getSites().get(0).getId());
			YiqifaRequest yiqifaReq = new YiqifaRequest();
			yiqifaReq.setPrivatekey(site.getYiqifa_secret());
			yiqifaReq.setWid(site.getYiqifa_sid());
			yiqifaReq.setUsername(site.getYiqifa_username());
			yiqifaReq.setUser_id(site.getUser_id());
			yiqifaReq.setSite_id(site.getSite_id());
			yiqifaReq.setSt(startDate);
			yiqifaReq.setEd(endDate);
			YiqifaResponse response = YiqifaClient.reportsGet(yiqifaReq);
			if (response != null) {
				List<YiqifaReport> reports = response.getReports();
				if (reports != null && reports.size() > 0) {
					all = reports.size();
					if (reports != null && reports.size() > 0) {
						for (YiqifaReport report : reports) {
							try {
								if (report != null) {
									String outCode = report.getOuterCode();
									if (StringUtils.isNotEmpty(outCode)
											&& outCode.startsWith("xtfl")) {// 如果推广渠道不为空，并且是新淘返利
										Member m = commandService.get(
												Member.class, Long
														.valueOf(outCode
																.replace(
																		"xtfl",
																		"")));
										if (m != null
												&& m.getUser_id().equals(
														yiqifaReq.getUser_id())
												&& m.getSite_id().equals(
														yiqifaReq.getSite_id())) {// 如果用户存在，且是该站点的会员
											if (commandService
													.mergeYiqifaReportTrade(
															Long
																	.valueOf(outCode
																			.replace(
																					"xtfl",
																					"")),
															yiqifaReq
																	.getUser_id(),
															yiqifaReq
																	.getSite_id(),
															report)) {
												count++;// 新增计数
											}
										} else {
											if (commandService
													.mergeYiqifaReportTrade(
															yiqifaReq
																	.getUser_id(),
															yiqifaReq
																	.getSite_id(),
															report)) {
												count++;// 新增计数
											}
										}
									} else {
										if (commandService
												.mergeYiqifaReportTrade(
														yiqifaReq.getUser_id(),
														yiqifaReq.getSite_id(),
														report)) {
											count++;// 新增计数
										}
									}
								}
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
					}
				}
			}
			return "{\"all\":\"" + all + "\",\"success\":\"" + count + "\"}";
		} catch (ParseException e) {
			SystemException.handleMessageException(e);
		}
		return "{\"all\":\"0\",\"success\":\"0\"}";
	}

	/**
	 * 上传亿起发推广链接
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void uploadYiqifa(HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		SiteCommission commission = memberService.get(SiteCommission.class,
				EnvManager.getUser().getSites().get(0).getId());
		if (commission == null) {
			SystemException.handleMessageException("您的站点尚未启用返利功能");
		}
		if (StringUtils.isEmpty(commission.getYiqifa_sid())) {
			SystemException
					.handleMessageException("您尚未配置亿起发商城基本信息，请进入返利管理---商城设置----设置用户名，网站编号，密钥");
		}
		try {
			// 转型为MultipartHttpRequest：
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			// 获得文件：
			Map<String, MultipartFile> files = multipartRequest.getFileMap();
			if (files.size() == 1) {
				Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
				for (String fileName : files.keySet()) {
					// 获得输入流：
					Set<MyYiqifaMall> malls = JExcelUtil.readYiqifa(userId,
							commission.getYiqifa_sid(), files.get(fileName)
									.getInputStream());
					// 批量更新
					memberService.synMyYiqifaMalls(userId, malls);
				}
				response.sendRedirect("http://" + WindSiteRestUtil.DOMAIN
						+ "/router/member/fl/mall/yiqifa");
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 商城基本设置修改
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/profile/update")
	@ResponseBody
	public String siteMallProfileUpdate(HttpServletRequest request) {
		String username = request.getParameter("username");
		String sid = request.getParameter("sid");
		String secret = request.getParameter("secret");
		Site site = EnvManager.getUser().getSites().get(0);
		SiteCommission commission = memberService.get(SiteCommission.class,
				site.getId());
		if (commission == null) {
			SystemException.handleMessageException("您尚未生成返利站点信息");
		}
		commission.setYiqifa_username(StringUtils.trim(username));
		commission.setYiqifa_sid(StringUtils.trim(sid));
		if (StringUtils.isNotEmpty(secret))
			commission.setYiqifa_secret(StringUtils.trim(secret));
		memberService.update(commission);
		// 更新缓存中的站点数据
		EnvManager.getSites().put(site.getUser_id(),
				memberService.getSiteImplByUserId(site.getUser_id()));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 商城返利
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}", method = RequestMethod.GET)
	public ModelAndView b2cMall(@PathVariable String type,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		SiteCommission commission = memberService.get(SiteCommission.class,
				site.getId());
		if (commission == null) {
			SystemException.handleMessageException("您尚未生成返利站点信息");
		}
		if (StringUtils.isEmpty(commission.getYiqifa_sid())) {// 如果尚未配置亿起发信息
			SystemException
					.handleMessageException("您尚未配置亿起发商城基本信息，请进入返利管理---商城设置----设置用户名，网站编号，密钥");
		}
		Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
		if ("yiqifa".equals(type)) {// 亿起发
			// 我的亿起发商城
			Map<String, Object> _params = new HashMap<String, Object>();
			_params.put("userId", userId);
			_params.put("endDate", new Date());
			// 查询站长上传的商城
			List<MyYiqifaMall> malls = memberService
					.findAllByCriterionAndOrder(MyYiqifaMall.class, Order
							.asc("sortOrder"), R.eq("pk.user_id", userId));
			// 我的亿起发推广目标map
			Map<String, List<MyYiqifaMall>> map = new HashMap<String, List<MyYiqifaMall>>();
			if (malls != null && malls.size() > 0) {
				for (MyYiqifaMall m : malls) {
					String key = m.getPk().getMall_id() + "";
					List<MyYiqifaMall> list = map.get(key);
					if (list == null) {
						list = new ArrayList<MyYiqifaMall>();
					}
					list.add(m);
					map.put(key, list);
				}
			}
			// 所有亿起发分类Map
			result.put("cats", EnvManager.getYiqifaCats());
			result.put("b2cMallsJson", new Gson().toJson(EnvManager
					.getYiqifaMalls().values(),
					new TypeToken<Collection<YiqifaMall>>() {
					}.getType()));
			result.put("mallsJson", new Gson().toJson(map,
					new TypeToken<Map<String, List<MyYiqifaMall>>>() {
					}.getType()));
		} else if ("linktech".equals(type)) {// 领克特

		}
		return new ModelAndView("site/member/fanli/mall/yiqifaMall", result);
	}

	/**
	 * 增加需要审核的商城返利
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/add/{id}")
	@ResponseBody
	public String b2cAdd(@PathVariable String type, @PathVariable Long id,
			HttpServletRequest request) {
		if ("yiqifa".equals(type)) {
			YiqifaMall mall = memberService.load(YiqifaMall.class, id);
			if (mall == null) {
				SystemException.handleMessageException("指定的商城不存在");
			}
			Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
			MyYiqifaMall myMall = memberService.findByCriterion(
					MyYiqifaMall.class, R.eq("pk.user_id", userId), R.eq(
							"pk.mall_id", id));
			if (myMall != null) {
				SystemException.handleMessageException("您已经申请了推广此商城");
			}
			myMall = new MyYiqifaMall();
			YiqifaMallPk pk = new YiqifaMallPk();
			pk.setMall_id(id);
			pk.setUser_id(userId);
			myMall.setPk(pk);
			myMall.setSortOrder(0);
			memberService.save(myMall);
			// TODO 需处理用户商城静态化
		} else if ("linktech".equals(type)) {

		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新商城返利主营标题
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/update/{id}")
	@ResponseBody
	public String b2cUpdate(@PathVariable String type, @PathVariable Long id,
			HttpServletRequest request) {
		if ("yiqifa".equals(type)) {
			Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
			String clickUrl = request.getParameter("clickUrl");
			if (StringUtils.isEmpty(clickUrl)) {
				SystemException.handleMessageException("未指定商城推广链接");
			}
			YiqifaMallPk pk = new YiqifaMallPk();
			pk.setClickUrl(clickUrl);
			pk.setMall_id(id);
			pk.setUser_id(userId);
			MyYiqifaMall mall = memberService.load(MyYiqifaMall.class, pk);
			if (mall == null) {
				SystemException.handleMessageException("指定的商城推广目标不存在");
			}
			String title = request.getParameter("title");
			if (StringUtils.isNotEmpty(title)) {
				mall.setTitle(title);
			}
			memberService.update(mall);
		} else if ("linktech".equals(type)) {

		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增商城返利主营
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/add/{id}")
	@ResponseBody
	public String b2cAddAction(@PathVariable String type,
			@PathVariable Long id, HttpServletRequest request) {
		if ("yiqifa".equals(type)) {
			Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
			String clickUrl = request.getParameter("clickUrl");
			if (StringUtils.isEmpty(clickUrl)) {
				SystemException.handleMessageException("未指定商城推广链接");
			}
			YiqifaMallPk pk = new YiqifaMallPk();
			pk.setClickUrl(clickUrl);
			pk.setMall_id(id);
			pk.setUser_id(userId);
			MyYiqifaMall mall = memberService.load(MyYiqifaMall.class, pk);
			if (mall == null) {
				SystemException.handleMessageException("指定的商城推广目标不存在");
			}
			String title = request.getParameter("title");
			String target = request.getParameter("target");
			if (StringUtils.isEmpty(title) && StringUtils.isEmpty(target)) {
				SystemException.handleMessageException("未指定商城主营标题及推广地址");
			}
			// TODO 暂未实现新增主营逻辑
		} else if ("linktech".equals(type)) {

		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除需要审核的商城返利
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/delete/{id}")
	@ResponseBody
	public String b2cDelete(@PathVariable String type, @PathVariable Long id,
			HttpServletRequest request) {
		if ("yiqifa".equals(type)) {
			YiqifaMall mall = memberService.load(YiqifaMall.class, id);
			if (mall == null) {
				SystemException.handleMessageException("指定的商城不存在");
			}
			Long userId = Long.valueOf(EnvManager.getUser().getUser_id());
			MyYiqifaMall myMall = memberService.findByCriterion(
					MyYiqifaMall.class, R.eq("pk.user_id", userId), R.eq(
							"pk.mall_id", id));
			memberService.delete(MyYiqifaMall.class, myMall.getPk());
			// TODO 需处理用户商城静态化
		} else if ("linktech".equals(type)) {

		}
		return WindSiteRestUtil.SUCCESS;
	}
}
