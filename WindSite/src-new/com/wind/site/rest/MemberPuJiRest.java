package com.wind.site.rest;

import java.util.HashMap;
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
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.FanliClass;
import com.wind.site.model.FanliFriendLinks;
import com.wind.site.model.FanliKeyWordsLinks;
import com.wind.site.model.FanliLinks;
import com.wind.site.model.FanliNavLinks;
import com.wind.site.model.FanliTopLinks;
import com.wind.site.model.Site;
import com.wind.site.service.IFanliService;
import com.wind.site.service.IMemberService;
import com.wind.site.service.IPageService;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

@Controller
@RequestMapping("/member/puji")
public class MemberPuJiRest {
	@Autowired
	private IMemberService memberService;
	@Autowired
	private IUCService ucService;
	@Autowired
	private IFanliService fanliService;
	@Autowired
	private IPageService pageService;
	@Autowired
	private FreeMarkerConfigurer fcg;

	/**
	 * 返利链接管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/links", method = RequestMethod.GET)
	public ModelAndView linksManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		// 友情链接
		result.put("friends", memberService.findAllByCriterionAndOrder(
				FanliFriendLinks.class, Order.asc("sortOrder"), R.eq("site_id",
						site.getId()), R.eq("user_id", EnvManager.getUser()
						.getUser_id())));
		return new ModelAndView("site/member/fanli/linksManager", result);
	}

	/**
	 * 删除链接
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/links/delete/{id}/{type}")
	@ResponseBody
	public String delteLinks(@PathVariable Long id, @PathVariable String type,
			HttpServletRequest request) {
		FanliLinks link = null;
		if ("F".equals(type)) {// 全站友情链接
			link = memberService.get(FanliFriendLinks.class, id);
		} else if ("N".equals(type)) {// 会员中心导航
			link = memberService.get(FanliNavLinks.class, id);
		} else if ("T".equals(type)) {// 站点顶部导航
			link = memberService.get(FanliTopLinks.class, id);
		}
		if (link != null) {
			if (link.getUser_id().equals(EnvManager.getUser().getUser_id())) {
				memberService.delete(FanliLinks.class, id);
				// 发布页尾
				pageService
						.deployFooter(fcg, EnvManager.getUser().getUser_id());
			} else {
				SystemException.handleMessageException("您无权删除该链接");
			}
		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 创建链接
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/links/create")
	@ResponseBody
	public String createLinks(HttpServletRequest request) {
		String title = request.getParameter("title");
		String url = request.getParameter("url");
		String type = request.getParameter("type");
		String sortOrder = request.getParameter("sortOrder");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(url)
				|| StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("链接名称，链接地址，链接类型不能为空");
		}
		Site site = EnvManager.getUser().getSites().get(0);
		FanliLinks link = null;
		if ("F".equals(type)) {// 全站友情链接
			link = memberService.findByCriterion(FanliFriendLinks.class, R.eq(
					"title", title), R.eq("site_id", site.getId()), R.eq(
					"user_id", EnvManager.getUser().getUser_id()));
			if (link != null) {
				SystemException.handleMessageException("链接名称【" + title + "】重复");
			}
			link = new FanliFriendLinks();
		} else if ("N".equals(type)) {// 会员中心导航
			link = memberService.findByCriterion(FanliNavLinks.class, R.eq(
					"title", title), R.eq("site_id", site.getId()), R.eq(
					"user_id", EnvManager.getUser().getUser_id()));
			if (link != null) {
				SystemException.handleMessageException("链接名称【" + title + "】重复");
			}
			link = new FanliNavLinks();
		} else if ("T".equals(type)) {// 站点顶部导航
			link = memberService.findByCriterion(FanliTopLinks.class, R.eq(
					"title", title), R.eq("site_id", site.getId()), R.eq(
					"user_id", EnvManager.getUser().getUser_id()));
			if (link != null) {
				SystemException.handleMessageException("链接名称【" + title + "】重复");
			}
			link = new FanliTopLinks();
		}
		link.setNick(EnvManager.getUser().getNick());
		link.setSite_id(site.getId());
		link.setSortOrder(Integer.parseInt(sortOrder));
		link.setTitle(title);
		url = url.replaceAll("(?i)http://" + site.getWww(), "");
		link.setUrl(url);
		link.setUser_id(EnvManager.getUser().getUser_id());
		memberService.save(link);
		// 发布页尾
		pageService.deployFooter(fcg, EnvManager.getUser().getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改链接
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/links/update/{id}")
	@ResponseBody
	public String updateLinks(@PathVariable Long id, HttpServletRequest request) {
		String title = request.getParameter("title");
		String url = request.getParameter("url");
		String type = request.getParameter("type");
		String sortOrder = request.getParameter("sortOrder");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(url)
				|| StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("链接名称，链接地址，链接类型不能为空");
		}
		FanliLinks link = null;
		if ("F".equals(type)) {// 全站友情链接
			link = memberService.get(FanliFriendLinks.class, id);
		} else if ("N".equals(type)) {// 会员中心导航
			link = memberService.get(FanliNavLinks.class, id);
		} else if ("T".equals(type)) {// 站点顶部导航
			link = memberService.get(FanliTopLinks.class, id);
		}
		if (link == null) {
			SystemException.handleMessageException("指定要修改的链接不存在");
		}
		Site site = EnvManager.getUser().getSites().get(0);
		if (!title.equals(link.getTitle())) {
			FanliLinks oldLink = memberService.findByCriterion(
					FanliLinks.class, R.eq("title", title), R.eq("type", link
							.getType()), R.eq("site_id", site.getId()), R.eq(
							"user_id", EnvManager.getUser().getUser_id()));
			if (oldLink != null) {
				SystemException.handleMessageException("链接名称【" + title + "】重复");
			}
		}
		link.setSortOrder(Integer.parseInt(sortOrder));
		link.setTitle(title);
		url = url.replaceAll("(?i)http://" + site.getWww(), "");
		link.setUrl(url);
		memberService.update(link);
		// 发布页尾
		pageService.deployFooter(fcg, EnvManager.getUser().getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利文章管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class", method = RequestMethod.GET)
	public ModelAndView classesManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		result.put("classes", memberService.findAllByCriterionAndOrder(
				FanliClass.class, Order.asc("sortOrder"), R.eq("site_id", site
						.getId()), R.eq("user_id", EnvManager.getUser()
						.getUser_id())));
		return new ModelAndView("site/member/fanli/classesManager", result);
	}

	/**
	 * 返利文章关键词
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/keywords", method = RequestMethod.GET)
	public ModelAndView classesKeywords(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		result.put("words", memberService.findAllByCriterionAndOrder(
				FanliKeyWordsLinks.class, Order.asc("sortOrder"), R.eq(
						"site_id", site.getId()), R.eq("user_id", EnvManager
						.getUser().getUser_id())));
		return new ModelAndView("site/member/fanli/back/fanliKeywords", result);
	}

	/**
	 * 调整文章关键词
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/keywords/change")
	@ResponseBody
	public String keywordsChange(HttpServletRequest request) {
		String words = request.getParameter("words");
		if (StringUtils.isEmpty(words)) {
			SystemException.handleMessageException("关键词列表为空");
		}
		List<FanliKeyWordsLinks> links = new Gson().fromJson(words,
				new TypeToken<List<FanliKeyWordsLinks>>() {
				}.getType());
		fanliService.changeKeyWords(links, EnvManager.getUser());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 创建版块分类视图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class/create/view")
	public ModelAndView createClassView(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		// 家园日志分类
		result.put("classes", ucService.findAllByCriterion(UCClass.class, R.eq(
				"uid", EnvManager.getUser().getUc_id())));
		return new ModelAndView("site/member/fanli/createClass", result);
	}

	/**
	 * 删除文章版块
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class/delete/{id}")
	@ResponseBody
	public String delteClass(@PathVariable Long id, HttpServletRequest request) {
		FanliClass clazz = memberService.get(FanliClass.class, id);
		if (clazz != null) {
			if (clazz.getUser_id().equals(EnvManager.getUser().getUser_id())) {
				memberService.delete(FanliClass.class, id);
			} else {
				SystemException.handleMessageException("您无权删除该文章版块");
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改版块分类视图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class/updateview/{id}")
	public ModelAndView updateClassView(@PathVariable Long id,
			HttpServletRequest request) {
		FanliClass clazz = memberService.get(FanliClass.class, id);
		if (clazz == null) {
			SystemException.handleMessageException("指定的文章版块不存在");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("clazz", clazz);
		// 家园日志分类
		result.put("classes", ucService.findAllByCriterion(UCClass.class, R.eq(
				"uid", EnvManager.getUser().getUc_id())));
		return new ModelAndView("site/member/fanli/updateClass", result);
	}

	/**
	 * 创建版块分类
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class/create")
	@ResponseBody
	public String createClass(HttpServletRequest request) {
		String title = request.getParameter("title");
		String blogClass = request.getParameter("blogClass");
		String classTitle = request.getParameter("classTitle");
		String sortOrder = request.getParameter("sortOrder");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(blogClass)
				|| StringUtils.isEmpty(classTitle)) {
			SystemException.handleMessageException("版块名称，日志分类，日志分类名称不能为空");
		}
		Site site = EnvManager.getUser().getSites().get(0);
		FanliClass clazz = memberService.findByCriterion(FanliClass.class, R
				.eq("blogClass", Integer.parseInt(blogClass)), R.eq("site_id",
				site.getId()), R.eq("user_id", EnvManager.getUser()
				.getUser_id()));
		if (clazz != null) {
			SystemException.handleMessageException("当前的家园日志分类已经被【"
					+ clazz.getTitle() + "】关联，请更换家园日志分类后再提交");
		}
		clazz = memberService.findByCriterion(FanliClass.class, R.eq("title",
				title), R.eq("site_id", site.getId()), R.eq("user_id",
				EnvManager.getUser().getUser_id()));
		if (clazz != null) {
			SystemException.handleMessageException("版块名称【" + title
					+ "】重复，请修改后再提交");
		}
		clazz = new FanliClass();
		clazz.setBlogClass(Integer.parseInt(blogClass));
		clazz.setClassTitle(classTitle);
		clazz.setNick(EnvManager.getUser().getNick());
		clazz.setSite_id(site.getId());
		clazz.setSortOrder(Integer.parseInt(sortOrder));
		clazz.setTitle(title);
		clazz.setType(1);
		clazz.setUser_id(EnvManager.getUser().getUser_id());
		memberService.save(clazz);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改版块分类
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/class/update/{id}")
	@ResponseBody
	public String updateClass(@PathVariable Long id, HttpServletRequest request) {
		String title = request.getParameter("title");
		String blogClass = request.getParameter("blogClass");
		String classTitle = request.getParameter("classTitle");
		String sortOrder = request.getParameter("sortOrder");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(blogClass)
				|| StringUtils.isEmpty(classTitle)) {
			SystemException.handleMessageException("版块名称，日志分类，日志分类名称不能为空");
		}
		Site site = EnvManager.getUser().getSites().get(0);
		FanliClass clazz = memberService.get(FanliClass.class, id);
		if (clazz == null) {
			SystemException.handleMessageException("指定要修改的版块不存在");
		}
		if (clazz.getBlogClass() != Integer.parseInt(blogClass)) {
			FanliClass oldClazz = memberService.findByCriterion(
					FanliClass.class, R.eq("blogClass", Integer
							.parseInt(blogClass)), R
							.eq("site_id", site.getId()), R.eq("user_id",
							EnvManager.getUser().getUser_id()));
			if (oldClazz != null) {
				SystemException.handleMessageException("当前的家园日志分类已经被【"
						+ oldClazz.getTitle() + "】关联，请更换家园日志分类后再提交");
			}
		}
		if (!title.equals(clazz.getTitle())) {
			FanliClass oldClazz = memberService.findByCriterion(
					FanliClass.class, R.eq("title", title), R.eq("site_id",
							site.getId()), R.eq("user_id", EnvManager.getUser()
							.getUser_id()));
			if (oldClazz != null) {
				SystemException.handleMessageException("版块名称【" + title
						+ "】重复，请修改后再提交");
			}
		}
		clazz.setBlogClass(Integer.parseInt(blogClass));
		clazz.setClassTitle(classTitle);
		clazz.setSortOrder(Integer.parseInt(sortOrder));
		clazz.setTitle(title);
		memberService.update(clazz);
		return WindSiteRestUtil.SUCCESS;
	}

}
