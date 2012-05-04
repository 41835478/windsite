package com.wind.site.freemarker.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.Writer;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.SystemTemplate;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserTemplate;
import com.wind.site.rest.DesignerRest;
import com.wind.site.rest.HtmlDesignerRest;
import com.wind.site.service.IDesignerService;

import freemarker.template.Template;

public class DefaultDeployZone implements IDeployZone {

	private IDesignerService designerService;

	@Override
	public void deployWidget(FreeMarkerConfigurer fcg,
			Map<String, Object> result, String filename) {
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"site/admin/widgets/" + filename.split("_")[0] + ".ftl");
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "widgets" + File.separator + filename + ".html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			template.process(result, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deploy(FreeMarkerConfigurer fcg, String userId, String tid,
			WidgetCustomerMethod widgetCustomer) {
		UserTemplate ut = designerService.get(UserTemplate.class, tid);
		if (ut == null) {
			SystemException.handleMessageException("当前模板不存在[" + tid + "]");
		} else {
			if (!userId.equals(ut.getUser_id())) {
				SystemException.handleMessageException("您无权限操作当前模板");
			}
		}
		User user = designerService.findByCriterion(User.class, R.eq("user_id",
				userId));
		String source = ut.getContent();
		String gids = ut.getGids();
		String skin = ut.getSkin();
		// 获取自己的Header或者父Header
		String header = "";
		if (StringUtils.isEmpty(ut.getParent())) {
			header = ut.getHeader();
		} else {
			header = designerService.getUserHeader(ut.getParent());
		}
		String title = ut.getSite().getTitle();
		Map<String, Object> maps = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(gids)) { // 推广组
			String[] gidArray = gids.split(",");
			for (String gid : gidArray) {
				maps.put("g_" + gid, designerService.getItems(gid, userId));
			}
		}
		maps.put("dateVersion", DateUtils.format(new Date(), "yyyyMMddHHmmss"));
		maps.put("skin", skin);// 皮肤
		Site site = user.getSites().get(0);
		String domain = StringUtils.isNotEmpty(site.getWww()) ? site.getWww()
				: (site.getDomainName() + ".xintaonet.com");
		maps.put("title", (ut.getParent() == null ? title
				: (ut.getName() + "-" + title)));// 标题
		maps.put("header", header != null ? header.replaceAll("%7Bpid%7D",
				user.getPid()).replaceAll(
				"shop" + user.getUser_id() + ".xintaonet.com", domain) : "");// Header,替换PID，最终域名
		maps.put("alimamaSearchBox", "src='http://a.alimama.cn/inf.js'");// 阿里妈妈推广js

		maps.put("pid", user.getPid());// PID
		String desc = title + "-专业的淘宝导购电子商务网站";
		String metadata = "新淘网,淘宝,淘客,淘宝客,购物";
		if (StringUtils.isNotEmpty(ut.getDescription())) {// 当前模板描述
			desc = ut.getDescription();
		} else if (StringUtils.isNotEmpty(ut.getSite().getDescription())) {// 当前站点全局描述
			desc = ut.getSite().getDescription();
		}
		if (StringUtils.isNotEmpty(ut.getMetadata())) {// 当前模板描述
			metadata = ut.getMetadata();
		} else if (StringUtils.isNotEmpty(ut.getSite().getMetadata())) {// 当前站点全局描述
			metadata = ut.getSite().getMetadata();
		}
		maps.put("description", desc);// 页面描述
		maps.put("metadata", metadata);// 页面关键词
		maps.put("isDeploy", true);// 是否是部署
		maps.put("widgetCustomer", widgetCustomer);
		maps.put("templateid", ut.getId());
		if (user.getUc_id() != null) {
			maps.put("uid", user.getUc_id());
			if (EnvManager.getValidHuabaoMembers().contains(user.getNick())) {
				maps.put("isHuabao", true);
			}
		}
		Integer type = 0;
		if (StringUtils.isNotEmpty(ut.getParent())) {
			type = 1;// 子页面
		} else {// 如果是首页
			List<UserPage> pages = designerService.findAllByCriterion(
					UserPage.class, R.eq("user_id", user.getUser_id()), R.eq(
							"isIndex", true), R.eq("status", true));
			if (pages != null && pages.size() > 0) {// 如果已经有新版本页面,并且已经发布
				type = 1;// 还是子页面
			}
		}
		try {
			File htmlFile = new File(getPath(type, "shop"
					+ ut.getSite().getUser_id(), ut.getCreated()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				EnvManager.addLastSite(ut.getSite());
				// WebSnaprUtils.flushSnapr(ut.getSite().getDomainName()
				// + ".xintaonet.com", WebSnaprUtils.T);// 生成缩略图
				htmlFile.createNewFile();
			}
			String content = DesignerRest.pre_buffer.toString() + source
					+ createAnalytics(ut.getSite()) + createBaiduTongJi(site)
					+ "</body></html>";
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Template template = new Template(
					"template_" + user.getId(),
					new StringReader(content.replaceAll("%7Bpid%7D".replaceAll(
							HtmlDesignerRest.JQUERY_REGEX, ""), user.getPid())),
					fcg.getConfiguration());
			template.setEncoding("UTF-8");
			template.process(maps, out);

			/**
			 * TODO 发布RSS(用户每次发布新站点时)
			 */
			// RssCommand command = new RssCommand();
			// command.setFeedType("rss_2.0");
			// command.setUser(user);
			// CommandExecutor.getCommands().add(command);// 加入RSS命令
			out.flush();
			out.close();
			if (ut.getSite().getStatus() == null
					|| 0 == ut.getSite().getStatus()) {// 如果状态为未发布,则修改状态为已发布
				designerService.updateSiteStatus(ut.getSite().getId(), 1, user
						.getNick());
				user.getSites().get(0).setStatus(1);// 设置当前session内站点状态
			}
			if (ut.getStatus() == null || 0 == ut.getStatus()) {
				designerService.updateTemplateStatus(ut.getId(), 1, user
						.getNick());// 修改模板发布状态
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	private String createBaiduTongJi(Site site) {
		T_UserSubscribe usb = designerService.get(T_UserSubscribe.class, site
				.getUser_id());
		if (usb != null && usb.getVersionNo() >= 2) {// 如果是返利版，卖家版
			SiteCommission sc = designerService.get(SiteCommission.class, site
					.getId());
			if (sc != null && StringUtils.isNotEmpty(sc.getBaiduTongJi())) {// 如果配置了百度统计
				return "<script type=\"text/javascript\"> "
						+ "var _bdhmProtocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\"); "
						+ "document.write(unescape(\"%3Cscript src='\" + _bdhmProtocol + \"hm.baidu.com/h.js%3F"
						+ sc.getBaiduTongJi()
						+ "' type='text/javascript'%3E%3C/script%3E\")); "
						+ "</script>";
			}

		}
		return "";
	}

	/**
	 * 生成统计代码
	 * 
	 * @param site
	 * @return
	 */
	private String createAnalytics(Site site) {
		StringBuffer buffer = new StringBuffer();
		String type = site.getAnalyticsType();
		if (StringUtils.isNotEmpty(type)) {
			if ("analytics_google".equalsIgnoreCase(type)
					&& StringUtils.isNotEmpty(site.getGid())) {// Google
				// Analytics
				buffer.append("<script type=\"text/javascript\">");
				buffer
						.append("var gaJsHost = ((\"https:\" == document.location.protocol) ? \"https://ssl.\" : \"http://www.\");");
				buffer
						.append("document.write(unescape(\"%3Cscript src='\" + gaJsHost + \"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E\"));");
				buffer.append("</script>");
				buffer.append("<script type=\"text/javascript\">");
				buffer.append("try {");
				buffer.append("var pageTracker = _gat._getTracker(\""
						+ site.getGid() + "\");");
				buffer.append("pageTracker._trackPageview();");
				buffer.append("} catch(err) {}</script>");
			} else if ("analytics_linezing".equalsIgnoreCase(type)
					&& StringUtils.isNotEmpty(site.getLid())) {// 量子恒道
				buffer
						.append("<script type=\"text/javascript\" src=\"http://js.tongji.linezing.com/"
								+ site.getLid()
								+ "/tongji.js\"></script><noscript><a href=\"http://www.linezing.com\"><img src=\"http://img.tongji.linezing.com/"
								+ site.getLid()
								+ "/tongji.gif\"/></a></noscript>");
			} else if ("analytics_51la".equalsIgnoreCase(type)
					&& StringUtils.isNotEmpty(site.getLaid())) {// 我要啦
				buffer
						.append("<script language=\"javascript\" type=\"text/javascript\" src=\"http://js.users.51.la/"
								+ site.getLaid() + ".js\"></script>");
				buffer
						.append("<noscript><a href=\"http://www.51.la/?"
								+ site.getLaid()
								+ "\" target=\"_blank\"><img alt=\"&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;\" src=\"http://img.users.51.la/"
								+ site.getLaid()
								+ ".asp\" style=\"border:none\" /></a></noscript>");
			}

		}
		return buffer.toString();
	}

	@Override
	public void deploySysTemplate(FreeMarkerConfigurer fcg, String stid,
			WidgetCustomerMethod widgetCustomer) {
		if (!"admin".equals(EnvManager.getUser().getRole())) {
			SystemException.handleMessageException("您无权限执行此操作");
		}
		SystemTemplate ut = designerService.get(SystemTemplate.class, stid);
		if (ut == null) {
			SystemException.handleMessageException("指定的系统模板不存在");
		}
		String source = ut.getContent();
		String skin = ut.getSkin();
		String title = ut.getName();
		String header = ut.getHeader();
		String gids = ut.getGids();
		Map<String, Object> maps = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(gids)) { // 推广组
			String[] gidArray = gids.split(",");
			for (String gid : gidArray) {
				maps.put("g_" + gid, designerService.getItems(gid, EnvManager
						.getUser().getUser_id()));
			}
		}
		maps.put("dateVersion", DateUtils.format(new Date(), "yyyyMMddHHmmss"));
		maps.put("skin", skin);// 皮肤
		maps.put("title", title);// 标题
		maps.put("header", header);// Header
		maps.put("alimamaSearchBox", "src='http://a.alimama.cn/inf.js'");// 阿里妈妈推广js
		maps.put("pid", EnvManager.getUser().getPid());// PID
		String desc = title + "-专业的淘宝导购电子商务网站";
		String metadata = "新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚";
		if (StringUtils.isNotEmpty(ut.getDescription())) {// 当前模板描述
			desc = ut.getDescription();
		}
		if (StringUtils.isNotEmpty(ut.getMetadata())) {// 当前模板描述
			metadata = ut.getMetadata();
		}
		maps.put("description", desc);// 页面描述
		maps.put("metadata", metadata);// 页面关键词
		maps.put("widgetCustomer", widgetCustomer);
		try {
			File htmlFile = new File(getSysPath(ut.getSkin()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Template template = new Template(EnvManager.getUser().getId(),
					new StringReader(DesignerRest.pre_buffer.toString()
							+ source.replaceAll(HtmlDesignerRest.JQUERY_REGEX,
									"") + "</body></html>"), fcg
							.getConfiguration());
			template.setEncoding("UTF-8");
			template.process(maps, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}

	}

	@Override
	public String getSysPath(String tname) {
		return EnvManager.getZonePath() + File.separator + "sys"
				+ File.separator + tname + ".html";
	}

	@Override
	public String getPath(Integer type, String domainName, Date created) {
		switch (type) {
		case 1:// 子页面
			return EnvManager.getUserPath(domainName) + "pages"
					+ File.separator + created.getTime() + ".html";
		case 0:// 主页
			return EnvManager.getUserPath(domainName) + domainName + ".html";

		}
		return EnvManager.getUserPath(domainName) + domainName + ".html";
	}

	/**
	 * @return the designerService
	 */
	public IDesignerService getDesignerService() {
		return designerService;
	}

	/**
	 * @param designerService
	 *            the designerService to set
	 */
	public void setDesignerService(IDesignerService designerService) {
		this.designerService = designerService;
	}

	public static void main(String[] args) {
		Calendar start = Calendar.getInstance();
		Map<String, Date> params = new HashMap<String, Date>();
		params.put("start", start.getTime());
		start.add(Calendar.DATE, 1);
		params.put("end", start.getTime());
		System.out.println(params);
	}
}
