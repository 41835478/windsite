package com.wind.site.command;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.site.model.ADBlogStatus;
import com.wind.site.model.ADUserTemplate;
import com.wind.site.model.Site;
import com.wind.site.model.UserTemplate;
import com.wind.site.service.IAdminService;
import com.wind.site.util.XintaoAnalyticsClient;

/**
 * 更新站点访问数据
 * 
 * @author fxy
 * 
 */
public class AnalyticsCommand {
	private static final Logger logger = Logger
			.getLogger(AnalyticsCommand.class.getName());
	private IAdminService adminService;

	public void refreshAnalytics() {
		logger.info("analytics is starting........");
		// 站点更新
		refreshSiteAnalytics(new Page<Object>(1, 1000));
		// TODO 停止旧页面更新
		// refreshUserTemplateAnalytics(new Page<Object>(1, 1000));
		logger.info("analytics is ended........");
	}

	@SuppressWarnings("unchecked")
	private void refreshSiteAnalytics(Page<?> page) {
		page.setList(null);
		List<Map<String, Object>> analytics = XintaoAnalyticsClient
				._getSiteAnalytics(page);
		if (analytics != null && analytics.size() > 0) {
			for (Map<String, Object> map : analytics) {
				try {
					String pid = String.valueOf(map.get("pid"));
					Pattern p = Pattern.compile("mm_[0-9]+_0_0");
					Matcher m = p.matcher(pid);
					if (m.find()) {
						Map<String, Object> params = new HashMap<String, Object>();
						params.put("pid", m.group(0));
						List<String> user_ids = (List<String>) adminService
								.executeNativeSql(
										"select user_id from w_user where pid=:pid",
										params);
						if (user_ids != null && user_ids.size() == 1) {
							Site site = adminService.findByCriterion(
									Site.class, R
											.eq("user_id", user_ids.get(0)));
							if (site != null) {// 更新站点PV，UV
								site.setPv((Long) map.get("pv"));
								site.setUv((Long) map.get("uv"));
								adminService.update(site);
								ADBlogStatus ad = adminService.get(
										ADBlogStatus.class, site.getId());
								if (ad != null) {// 更新文章投放PV，UV
									ad.setUv(site.getUv());
									adminService.update(ad);
								}
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			refreshSiteAnalytics(page);
		}
	}

	@SuppressWarnings("unused")
	private void refreshUserTemplateAnalytics(Page<?> page) {
		page.setList(null);
		List<Map<String, Object>> analytics = XintaoAnalyticsClient
				._getPageAnalytics(page);
		if (analytics != null && analytics.size() > 0) {
			for (Map<String, Object> map : analytics) {
				try {
					String pid = String.valueOf(map.get("page"));
					Pattern p = Pattern.compile("[0-9]+\\.html");
					Matcher m = p.matcher(pid);
					if (m.find()) {
						Map<String, Object> params = new HashMap<String, Object>();
						params.put("pageid", m.group(0).replace(".html", ""));
						try {
							UserTemplate template = adminService
									.findByCriterion(UserTemplate.class, R.eq(
											"pageid", m.group(0).replace(
													".html", "")));
							if (template != null) {// 更新页面UV
								template.setUv((Long) map.get("uv"));
								adminService.update(template);
								ADUserTemplate ad = adminService.get(
										ADUserTemplate.class, template.getId());
								if (ad != null) {// 更新页面投放UV
									ad.setUv(template.getUv());
									adminService.update(ad);
								}
							}
						} catch (Exception e) {
						}
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			refreshUserTemplateAnalytics(page);
		}
	}

	/**
	 * @return the adminService
	 */
	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @param adminService
	 *            the adminService to set
	 */
	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public static void main(String[] args) {
		Pattern p = Pattern.compile("[0-9]+\\.html");
		Matcher m = p.matcher("/pages/1284646150000.html");
		if (m.find()) {
			System.out.println(m.group(0).replace(".html", ""));
		}
	}

}
