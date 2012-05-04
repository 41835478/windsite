package com.wind.site.command.impl;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.util.DateUtils;
import com.wind.site.command.ICommand;
import com.wind.site.model.PageModule;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;
import com.wind.uc.service.IUCService;

/**
 * 发布具体分类的文章
 * 
 * @author fxy
 * 
 */
public class ShopBlogCommand implements ICommand {

	private IUCService ucService;

	private PageModule module;
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;

	@Override
	public void execute(ICommandService service) {
		if (module != null) {
			String metadata = module.getMetadata();
			Map<String, Object> params = new HashMap<String, Object>();
			if (StringUtils.isNotEmpty(metadata)) {
				params = new Gson().fromJson(metadata,
						new TypeToken<Map<String, String>>() {
						}.getType());// 解析参数列表
				if (params.get("cid") != null) {
					String cid = String.valueOf(params.get("cid"));
					if (StringUtils.isNotEmpty(cid)) {
						String showtype = String
								.valueOf(params.get("showtype"));
						String hql = "";
						if ("0".equals(showtype)) {// 如果不显示内容详情
							hql = "select new map(b.blogid as blogid,b.classid as classid,b.subject as subject,b.dateline as dateline,b.pic as pic) from UCBlog b where b.classid=:cid order by b.dateline desc";
						} else {
							hql = "select new map(b.blogid as blogid,b.classid as classid,b.subject as subject,b.dateline as dateline,b.pic as pic,f.message as message) from UCBlog b,UCBlogField f where b.classid=:cid and b.blogid=f.blogid order by b.dateline desc";
						}
						Integer count = 5;
						try {
							count = Integer.parseInt(String.valueOf(params
									.get("count")));
						} catch (Exception e) {
							count = 5;
						}
						Map<String, Object> hqlParams = new HashMap<String, Object>();
						hqlParams.put("cid", Integer.parseInt(cid));
						List<Map<String, Object>> blogs = ucService.findByHql(
								new Page<Map<String, Object>>(1, count), hql,
								hqlParams);
						if (blogs != null && blogs.size() > 0) {
							Integer length = 0;
							if (params.get("tlength") != null) {
								try {
									length = Integer.valueOf(String
											.valueOf(params.get("tlength")));
								} catch (Exception e) {
								}
							}
							Boolean isdate = "false".equals(String
									.valueOf(params.get("isdate"))) ? false
									: true;
							for (Map<String, Object> map : blogs) {
								if (isdate) {
									Calendar c = Calendar.getInstance();
									c.set(1970, 0, 1, 8, 0, 0);
									c.add(Calendar.SECOND, (Integer) map
											.get("dateline"));
									map.put("dateline", DateUtils.format(c
											.getTime(), DateUtils.YYYY_MM_DD));
								}
								if (!"0".equals(showtype)
										&& map.get("message") != null) {// 生成内容摘要
									String message = Jsoup.parse(
											String.valueOf(map.get("message")))
											.text();
									if (message.length() > 100) {
										message = message.substring(0, 100)
												+ "...";
									}
									map.put("message", message);
								}
								if (length != 0) {// 截取标题
									String subject = String.valueOf(map
											.get("subject"));
									if (subject.length() > length) {
										map.put("subject", subject.substring(0,
												length));
									}
								}
							}
						}
						params.put("data", blogs);
						pageService.deployBlog(fcg, module, params);
					}
				}
			}

		}
	}

	public void setUcService(IUCService ucService) {
		this.ucService = ucService;
	}

	public IUCService getUcService() {
		return ucService;
	}

	public void setModule(PageModule module) {
		this.module = module;
	}

	public PageModule getModule() {
		return module;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

}
