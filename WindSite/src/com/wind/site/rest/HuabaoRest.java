package com.wind.site.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.HuabaoPicture;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.request.PosterPostersSearchRequest;
import com.taobao.api.response.PosterPostersSearchResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.command.HuabaoXintaoCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.AD;
import com.wind.site.model.Huabao;
import com.wind.site.model.HuabaoTag;
import com.wind.site.model.Huabaos;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterChannel;
import com.wind.site.model.T_PosterPicture;
import com.wind.site.service.ISiteService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

import freemarker.template.Template;
import freemarker.template.TemplateException;

@Controller
@RequestMapping("/huabao")
public class HuabaoRest {
	@Autowired
	private ISiteService siteService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private HuabaoXintaoCommand xintaoHuabaoJob;

	@RequestMapping(value = "/channel/{type}", method = RequestMethod.GET)
	public ModelAndView huabaoMan(@PathVariable String type,
			HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		return new ModelAndView("site/huabao/" + type, result);
	}

	@RequestMapping(value = "/search")
	public ModelAndView huabaoSearch(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		// 搜索关键词
		String words = request.getParameter("words");
		String q = request.getParameter("q");
		String tag = request.getParameter("tag");
		String type = request.getParameter("type");
		String channel = request.getParameter("channel");
		if (request.getMethod().equalsIgnoreCase("get")) {// GET方式编码
			if (StringUtils.isNotEmpty(words)) {
				try {
					words = new String(words.getBytes("ISO-8859-1"), "UTF-8");
				} catch (Exception e) {
					words = "";
				}
			}
			if (StringUtils.isNotEmpty(q)) {
				try {
					words = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (Exception e) {
					words = "";
				}
			}
			if (StringUtils.isNotEmpty(tag)) {
				try {
					tag = new String(tag.getBytes("ISO-8859-1"), "UTF-8");
				} catch (Exception e) {
					tag = "";
				}
			}
		} else {
			if (StringUtils.isNotEmpty(q)) {
				words = q;// 转换为words
			}
		}
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		PosterPostersSearchRequest searchRequest = new PosterPostersSearchRequest();
		searchRequest.setPageSize(20L);
		searchRequest.setPageNo(Long.valueOf(pageNo));

		if (StringUtils.isNotEmpty(words)) {// 关键词过滤
			searchRequest.setKeyWord(words);
		} else {
			if (StringUtils.isNotEmpty(tag)) {// 标签过滤
				searchRequest.setKeyWord(tag);
			}
		}
		Long channelId = null;
		if (StringUtils.isNotEmpty(channel)) {// 新版本
			try {
				channelId = Long.parseLong(channel);
			} catch (Exception e) {
				channelId = null;
			}
		}
		if (channelId == null && StringUtils.isNotEmpty(type)) {// 兼容旧版本
			if ("lady".equalsIgnoreCase(type)) {
				channelId = 9L;
			} else if ("fashion".equalsIgnoreCase(type)) {
				channelId = 2L;
			} else if ("man".equalsIgnoreCase(type)) {
				channelId = 3L;
			} else if ("baby".equalsIgnoreCase(type)) {
				channelId = 6L;
			} else if ("life".equalsIgnoreCase(type)) {
				channelId = 5L;
			} else if ("star".equalsIgnoreCase(type)) {
				channelId = 16L;
			} else if ("tour".equalsIgnoreCase(type)) {
				channelId = 18L;
			} else if ("idea".equalsIgnoreCase(type)) {
				channelId = 13L;
			}
		}
		if (channelId != null) {
			T_PosterChannel pc = siteService.get(T_PosterChannel.class,
					channelId);
			if (pc != null) {
				searchRequest.setChannelIds(channelId + "");
				result.put("channelName", pc.getCn_name());// 频道中文名字
				result.put("channel", channelId);
			}
		}
		// 如果未指定channelId,keywords
		if (StringUtils.isEmpty(searchRequest.getKeyWord())
				&& StringUtils.isEmpty(searchRequest.getChannelIds())) {
			searchRequest
					.setChannelIds("1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21");
		}
		PosterPostersSearchResponse postersResponse = TaobaoFetchUtil
				.postersSearch(searchRequest);
		result.put("posters", postersResponse.getPosters());
		result.put("words", words);// 关键词
		result.put("tag", tag);// 标签
		result.put("pageNo", pageNo);
		return new ModelAndView("site/huabao/search", result);
	}

	@RequestMapping(value = "/tags")
	public ModelAndView huabaoTags(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		result.put("tags", EnvManager.getPosterTags());
		return new ModelAndView("site/huabao/huabaoTags", result);
	}

	@RequestMapping(value = "/tags/{id}", method = RequestMethod.GET)
	public ModelAndView huabaoTag(@PathVariable String id,
			HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		HuabaoTag tag = siteService.get(HuabaoTag.class, id);// 查找旧版本标签库
		if (tag != null) {// 如果旧版标签存在
			Page<T_Poster> page = new Page<T_Poster>(1, 24);
			result.put("posters",
					siteService.searchPosterByTagsFilter(page, tag.getName()));
			result.put("page", page);// 分页
			result.put("tag", tag.getName());// 标签
			return new ModelAndView("site/huabao/search", result);
		} else {// 不存在，则定向至标签页
			result.put("tags", EnvManager.getPosterTags());
			return new ModelAndView("site/huabao/huabaoTags", result);
		}
	}

	@SuppressWarnings("unchecked")
	public ModelAndView detail(Long id, Map<String, Object> result,
			HttpServletRequest request) {
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}

		T_Poster local = siteService.get(T_Poster.class, id);
		if (local != null) {
			if (local.getIsSuccess()) {
				result.put("isSuccess", true);
			} else {// 如果未抓取，则实时获取
				xintaoHuabaoJob.posterParse(local);
				result.put("isSuccess", true);
			}
			List<T_PosterPicture> pics = siteService.findAllByCriterion(
					T_PosterPicture.class, R.eq("poster_id", id));
			if (pics == null || pics.size() == 0) {// 抓取
				// xintaoHuabaoJob.posterPictureParse(local);
			}
			if (pics != null && pics.size() > 0) {
				List<HuabaoPicture> hPics = new ArrayList<HuabaoPicture>();
				for (T_PosterPicture pic : pics) {
					hPics.add(TaobaoFetchUtil.convertHuabaoPicture(pic));
				}
				result.put("pics", hPics);// 图片
				com.taobao.api.domain.Huabao huabao = TaobaoFetchUtil
						.convertHuabao(local);
				result.put(
						"channel",
						siteService.get(T_PosterChannel.class,
								Long.valueOf(huabao.getChannelId())));
				result.put("poster", huabao);// 画报

				// 上一个
				result.put(
						"prev",
						siteService.getPrevHuabaos(id,
								Long.valueOf(huabao.getChannelId())));
				// 下一个
				result.put(
						"next",
						siteService.getNextHuabaos(id,
								Long.valueOf(huabao.getChannelId())));
			} else {
				SystemException.handleMessageException("指定的画报不存在");
			}
		} else {
			SystemException.handleMessageException("指定的画报不存在");
		}

		Object adsObject = result.get("ads");
		if (adsObject != null) {
			Map<String, List<Map<String, Object>>> ads = (Map<String, List<Map<String, Object>>>) adsObject;
			List<Map<String, Object>> br = ads.get(AD.HUABAO_TOP);
			if (br != null && br.size() > 0) {
				result.put("ad", br.get((int) (Math.random() * br.size())));// 随机获取广告位
			}
		}
		return new ModelAndView("site/huabao/posterDetail", result);
	}

	// @SuppressWarnings("unchecked")
	// public ModelAndView detail(Long id, Map<String, Object> result,
	// HttpServletRequest request) {
	// String userId = request.getParameter("USER");
	// String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
	// result, userId);
	// if (StringUtils.isEmpty(pid)) {
	// result.put("pid", EnvManager.getDefaultPid());
	// }
	// PosterPosterdetailGetRequest posterGet = new
	// PosterPosterdetailGetRequest();
	// posterGet.setPosterId(id);
	// PosterPosterdetailGetResponse posterGetResp = TaobaoFetchUtil
	// .posterdetailGet(posterGet);
	// if (posterGetResp != null) {// 远程获取画报及图片
	// com.taobao.api.domain.Huabao huabao = posterGetResp.getPoster();
	// if (huabao != null) {
	// T_Poster local = siteService.get(T_Poster.class, id);
	// if (local != null) {
	// if (local.getIsSuccess()) {
	// result.put("isSuccess", true);
	// } else {// 如果未抓取，则实时获取
	// xintaoHuabaoJob.posterParse(local);
	// result.put("isSuccess", true);
	// }
	// }
	//
	// result.put("channel", siteService.get(T_PosterChannel.class,
	// Long.valueOf(huabao.getChannelId())));
	// result.put("poster", huabao);// 画报
	// result.put("pics", posterGetResp.getPosterPics());// 图片
	// // 上一个
	// result.put("prev", siteService.getPrevHuabaos(id, Long
	// .valueOf(huabao.getChannelId())));
	// // 下一个
	// result.put("next", siteService.getNextHuabaos(id, Long
	// .valueOf(huabao.getChannelId())));
	// } else {
	// SystemException.handleMessageException("指定的画报不存在");
	// }
	// }
	// Object adsObject = result.get("ads");
	// if (adsObject != null) {
	// Map<String, List<Map<String, Object>>> ads = (Map<String,
	// List<Map<String, Object>>>) adsObject;
	// List<Map<String, Object>> br = ads.get(AD.HUABAO_TOP);
	// if (br != null && br.size() > 0) {
	// result.put("ad", br.get((int) (Math.random() * br.size())));// 随机获取广告位
	// }
	// }
	// return new ModelAndView("site/huabao/posterDetail", result);
	// }

	@RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
	public ModelAndView huabaoDetail(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return detail(id, result, request);
	}

	@RequestMapping(value = "/detail/{id}/{picId}", method = RequestMethod.GET)
	public ModelAndView huabaoPicDetail(@PathVariable Long id,
			@PathVariable Integer picId, HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("picId", picId);
		return detail(id, result, request);
	}

	@RequestMapping(value = "/html/{hid}")
	public ModelAndView huabaoHtml(@PathVariable Integer hid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		String picId = request.getParameter("picId");
		String nick = request.getParameter("nick");
		Huabaos huabaos = siteService.get(Huabaos.class, hid);
		if (huabaos == null) {
			SystemException.handleMessageException("当前指定画报不存在");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("huabaos", huabaos);
		params.put("picId", picId);
		params.put("nick", nick);
		params.put("type", huabaos.getType());
		params.put("pics", siteService.findByHql(
				"select new map(picId as picId,picSrc as picSrc) from Huabao where hid="
						+ hid + " order by picId",
				new HashMap<String, Object>()));
		return new ModelAndView("site/admin/widgets/middle-1_1_11", params);
	}

	@RequestMapping(value = "/html/album/{hid}", method = RequestMethod.GET)
	public void huabaoAlbumHtml(@PathVariable Integer hid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		String nick = request.getParameter("nick");
		Huabaos huabaos = siteService.get(Huabaos.class, hid);
		if (huabaos == null) {
			SystemException.handleMessageException("当前指定画报不存在");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("huabaos", huabaos);
		params.put("nick", nick);
		params.put("pics", siteService.findByHql(
				"select new map(picId as picId,picSrc as picSrc) from Huabao where hid="
						+ hid + " order by picId",
				new HashMap<String, Object>()));
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"site/huabao/huabaoAlbum.ftl");
			Writer out = response.getWriter();
			template.process(params, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	@RequestMapping(value = "/convert", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoItemConvert(HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		String numiids = request.getParameter("numiids");
		String picid = request.getParameter("picid");
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		List<TaobaokeItem> items = TaobaoFetchUtil.huabaoItemConvert(
				String.valueOf(result.get("appKey")),
				String.valueOf(result.get("appSecret")),
				String.valueOf(result.get("appType")), numiids,
				(String) result.get("nick"), String.valueOf(result.get("pid")));
		String[] numArray = numiids.split(",");
		Integer rate = 0;
		if (EnvManager.getMember() != null) {
			rate = EnvManager.getMember().getCommissionRate();
		} else {
			rate = result.get("commissionRate") != null ? (Integer) result
					.get("commissionRate") : 0;
		}
		Map<String, Object> json = new HashMap<String, Object>();
		Map<String, String> commissions = new HashMap<String, String>();
		java.text.DecimalFormat df = new java.text.DecimalFormat("#.00");
		if (items != null && items.size() > 0) {
			for (String numiid : numArray) {
				TaobaokeItem matchItem = null;
				for (TaobaokeItem item : items) {
					if (numiid.equals(String.valueOf(item.getNumIid()))) {
						matchItem = item;
						break;
					}
				}
				if (matchItem != null) {// 已匹配到推广商品
					Double d = Double.valueOf(matchItem.getCommission()) * rate
							/ 100;
					commissions.put(numiid, df.format(d));
				} else {// 未匹配
					commissions.put(numiid, "0");
				}
			}
		}
		json.put("picid", picid);
		json.put("commissions", commissions);
		return new Gson().toJson(json);
	}

	@RequestMapping(value = "/relate/{hid}", method = RequestMethod.GET)
	public ModelAndView huabaoRelate(@PathVariable Long hid,
			HttpServletRequest request, HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertSysChannelPID(siteService, request, result,
				userId);
		List<T_Poster> relates = siteService.getRelateHuabao(hid, 8);
		return new ModelAndView("site/huabao/template/posterRelate", "relates",
				relates);
	}

	@RequestMapping(value = "/random/{hid}", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoRandom(@PathVariable Integer hid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		List<Map<String, Object>> hbs = siteService.getRandomHuabao(5);
		if (hbs != null && hbs.size() > 0)
			return new Gson().toJson(hbs,
					new TypeToken<List<Map<String, Object>>>() {
					}.getType());
		return "[]";
	}

	@RequestMapping(value = "/data/hot/{hid}/{type}", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoRelate(@PathVariable Integer hid,
			@PathVariable String type, HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		String hql = "";
		if (StringUtils.isNotEmpty(type) && !"0".equals(type)) {
			hql = "from Huabaos where type='" + type + "' and id != " + hid
					+ " order by hots desc";
		} else {
			hql = "from Huabaos where id != " + hid + " order by hots desc";
		}
		List<Huabaos> hbs = siteService.findByHql(new Page<Huabaos>(1, 5), hql,
				new HashMap<String, Object>());
		if (hbs != null && hbs.size() > 0)
			return new Gson().toJson(hbs, new TypeToken<List<Huabaos>>() {
			}.getType());
		return "[]";
	}

	@RequestMapping(value = "/data/{hid}", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoData(@PathVariable Integer hid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		List<Huabao> huabaos = siteService.getHuabaoData(hid);
		if (huabaos != null) {
			// Huabaos huabao = siteService.get(Huabaos.class, hid);
			// Integer hots = huabao.getHots();
			// if (hots == null) {
			// hots = 0;
			// }
			// huabao.setHots(hots + 1);
			// siteService.update(huabao);// 更新热度
			return new Gson().toJson(huabaos, new TypeToken<List<Huabao>>() {
			}.getType());
		}
		return "[]";
	}

	@RequestMapping(value = "/data/compile/{hid}", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoCompileData(@PathVariable Integer hid,
			HttpServletRequest request, HttpServletResponse response) {
		List<Huabao> huabaos = siteService.getHuabaoData(hid);
		try {
			File htmlFile = new File("F:\\xj3\\test.js");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/huabaojs.ftl");
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("hbs", huabaos);
			template.setEncoding("UTF-8");
			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8");
			try {
				out.append(FreeMarkerTemplateUtils.processTemplateIntoString(
						template, maps));
			} catch (TemplateException e) {
				e.printStackTrace();
			}
			out.flush();
			out.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/designer/search")
	public ModelAndView designerHuabaoSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		// 搜索分类
		String type = request.getParameter("type");
		// 搜索关键词
		String words = request.getParameter("words");
		if (StringUtils.isEmpty(words)) {
			words = "";
		}
		Integer t = 0;
		if (StringUtils.isNotEmpty(type)) {
			try {
				t = Integer.parseInt(type);
			} catch (Exception e) {
				t = 0;
			}
		}
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("t", String.valueOf(t));
		String hql = "";

		if (StringUtils.isNotEmpty(words)) {
			params.put("words", "%" + words + "%");
		}
		Page<Huabaos> page = new Page<Huabaos>(pageNo, 28);
		hql = "from Huabaos ";
		if (t != 0 && StringUtils.isNotEmpty(words)) {// 均不为空
			hql += "where type=:t and name like :words  order by id desc";
		} else if (t != 0 && StringUtils.isEmpty(words)) {// 只有分类
			hql += "where type=:t order by id desc";
		} else if (t == 0 && StringUtils.isNotEmpty(words)) {
			hql += "where name like :words  order by id desc";
		} else {
			hql += " order by id desc";
		}
		result.put("resultHbs", siteService.findByHql(page, hql, params));
		result.put("page", page);
		return new ModelAndView("site/huabao/huabaoEditorSearch", result);
	}
}
