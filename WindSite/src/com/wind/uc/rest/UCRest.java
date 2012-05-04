package com.wind.uc.rest;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fivestars.interfaces.bbs.client.Client;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.uc.model.UCBlog;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

/**
 * 会员UCHome功能RESTFUL服务,需登录
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/uc")
public class UCRest {
	@Autowired
	private IUCService ucService;

	/**
	 * 加为家园好友
	 * 
	 * 
	 * @return
	 */
	@RequestMapping(value = "/friend/add", method = RequestMethod.GET)
	@ResponseBody
	public String addFriend(HttpServletRequest request,
			HttpServletResponse response) {
		String uidStr = request.getParameter("uid");
		if (StringUtils.isEmpty(uidStr)) {
			SystemException.handleMessageException("用户ID未指定");
		}
		Integer uid = null;
		try {
			uid = Integer.parseInt(uidStr);
		} catch (Exception e) {
			SystemException.handleMessageException("用户ID必须为数字");
		}
		String fuidStr = request.getParameter("fuid");
		if (StringUtils.isEmpty(fuidStr)) {
			SystemException.handleMessageException("要添加的好友ID未指定");
		}
		Integer fuid = null;
		try {
			fuid = Integer.parseInt(fuidStr);
		} catch (Exception e) {
			SystemException.handleMessageException("要添加的好友ID必须为数字");
		}
		String comment = request.getParameter("comment");
		Client client = new Client();
		String result = client.uc_friend_add(uid, fuid, comment);
		return "{\"status\":\"" + result + "\"}";
	}

	/**
	 * 访问当前用户日志列表
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/class", method = RequestMethod.GET)
	public ModelAndView getClasses(HttpServletRequest request,
			HttpServletResponse response) {
		List<UCClass> ucClasses = null;
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			Integer uid = EnvManager.getUser().getUc_id();
			if (uid == null || uid == 0) {
				ucClasses = new ArrayList<UCClass>();
			} else {
				ucClasses = ucService.findAllByCriterion(UCClass.class, R.eq(
						"uid", uid));
			}
			result.put("ucClasses", ucClasses);
		} catch (Exception e) {
			result.put("error", "获取日志失败，请点击日志刷新按钮！");
		}
		return new ModelAndView("designer/assets/toolbar/ucblog/ucblog", result);
	}

	/**
	 * 访问当前用户日志列表
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogs", method = RequestMethod.GET)
	public ModelAndView getBlogs(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Integer uid = EnvManager.getUser().getUc_id();
		if (uid == null || uid == 0) {
			SystemException.handleException("200", "您尚未开通新淘家园,请点击首页的新淘家园");
		} else {
			String pageNoStr = request.getParameter("pageNo");
			String pageSizeStr = request.getParameter("pageSize");
			String classIdStr = request.getParameter("classid");
			Integer pageNo = 1;
			Integer pageSize = 15;
			Integer classid = 0;
			try {
				if (StringUtils.isNotEmpty(pageNoStr)) {
					pageNo = Integer.parseInt(pageNoStr);
				}
				if (StringUtils.isNotEmpty(pageSizeStr)) {
					pageSize = Integer.parseInt(pageSizeStr);
				}
			} catch (Exception e) {
			}
			if (StringUtils.isNotEmpty(classIdStr)) {
				classid = Integer.parseInt(classIdStr);
			}
			Page<UCBlog> page = new Page<UCBlog>(pageNo, pageSize);
			List<UCBlog> blogs = new ArrayList<UCBlog>();
			try {
				if (classid == -1) {
					blogs = ucService.findAllByCriterion(page, UCBlog.class, R
							.eq("uid", uid));
				} else {
					blogs = ucService.findAllByCriterion(page, UCBlog.class, R
							.eq("uid", uid), R.eq("classid", classid));
				}
			} catch (Exception e) {
				result.put("error", "获取日志失败，请点击日志刷新按钮！");

			}
			result.put("page", page);
			result.put("blogs", blogs);
			result.put("classid", classid);
		}
		return new ModelAndView("designer/assets/toolbar/ucblog/blogs", result);
	}

	/**
	 * 访问当前用户指定隐私日志列表
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogs/{friend}", method = RequestMethod.GET)
	public ModelAndView getBlogs(@PathVariable Integer friend,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Integer uid = EnvManager.getUser().getUc_id();
		if (uid == null || uid == 0) {
			SystemException.handleException("200", "您尚未开通新淘家园,请点击首页的新淘家园");
		} else {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("uid", uid);
			params.put("friend", friend);
			try {
				result
						.put(
								"blogs",
								ucService
										.findByHql(
												"from UCBlog where uid=:uid and friend=:friend order by dateline desc",
												params));
			} catch (Exception e) {
				result.put("error", "获取日志失败！");

			}
		}
		return new ModelAndView("designer/assets/toolbar/ucblog/customeblogs",
				result);
	}

	/**
	 * @return the ucService
	 */
	public IUCService getUcService() {
		return ucService;
	}

	/**
	 * @param ucService
	 *            the ucService to set
	 */
	public void setUcService(IUCService ucService) {
		this.ucService = ucService;
	}

}
