package com.wind.site.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.R;
import org.springframework.transaction.annotation.Transactional;

import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADUserTemplate;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.Site;
import com.wind.site.model.SystemTemplate;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.UsedCustomeWidget;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;
import com.wind.site.service.IDesignerService;

/**
 * 设计器业务实现类
 * 
 * @author fxy
 * 
 */
public class DesignerServiceImpl extends BaseServiceImpl implements
		IDesignerService {

	@Override
	public void updateTemplate(UserTemplate template, String customes) {
		this.update(template);
		// 查询已使用组件列表
		List<UsedCustomeWidget> ucws = this.findAllByCriterion(
				UsedCustomeWidget.class, R.eq("user_id", EnvManager.getUser()
						.getUser_id()), R.eq("template.id", template.getId()));
		if (StringUtils.isNotEmpty(customes)) {// 新增或修改使用记录
			String[] cs = customes.split(",");
			Set<String> csSet = new HashSet<String>();
			csSet.addAll(Arrays.asList(cs));
			if (cs != null && cs.length > 0) {
				for (String wid : csSet) {
					Boolean isUsed = false;
					for (java.util.Iterator<UsedCustomeWidget> it = ucws
							.iterator(); it.hasNext();) {
						UsedCustomeWidget oucw = it.next();
						if (wid.equals(oucw.getWidget().getId())) {// 如果之前已使用该组件
							isUsed = true;
							it.remove();// 移除已使用组件
						}
					}
					if (!isUsed) {// 如果没有使用此组件则新增
						CustomeWidget widget = this.get(CustomeWidget.class,
								wid);
						if (widget != null) {
							UsedCustomeWidget ucw = new UsedCustomeWidget();
							ucw.setNick(EnvManager.getUser().getNick());
							ucw.setUser_id(EnvManager.getUser().getUser_id());
							ucw.setTemplate(template);
							ucw.setAutoUpdate(true);
							ucw.setWidget(widget);
							Integer used = widget.getUsed();
							if (used == null) {
								used = 0;
							}
							widget.setUsed(used + 1);
							this.save(ucw);
						}
					}
				}
			}
		}
		for (UsedCustomeWidget oucw : ucws) {// 删除已经不使用的组件
			CustomeWidget widget = oucw.getWidget();
			Integer used = widget.getUsed();
			if (used == null) {
				used = 1;
			}
			widget.setUsed(used - 1);
			this.delete(UsedCustomeWidget.class, oucw.getId());
		}
	}

	@Override
	public String getUserHeader(String id) {
		UserTemplate template = this.get(UserTemplate.class, id);
		if (template != null) {
			return template.getHeader();
		}
		return null;
	}

	@Override
	public String getSysHeader(String id) {
		SystemTemplate template = this.get(SystemTemplate.class, id);
		if (template != null) {
			return template.getHeader();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_TaobaokeItem> getItems(String gid, String userId) {
		if (userId != null) {
			ItemGroup group = this.get(ItemGroup.class, gid);
			if (group == null || !userId.equals(group.getUser_id())) {
				return new ArrayList<T_TaobaokeItem>();
			}
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("gid", gid);
		params.put("isValid", true);
		List<T_TaobaokeItem> items = (List<T_TaobaokeItem>) this
				.findByHql(
						"from T_TaobaokeItem i where i.gid=:gid and i.isValid=:isValid order by sortOrder",
						params);// 查询指定推广组的商品(排序)
		return items;
	}

	@Override
	public void updateSiteStatus(String sid, Integer status, String nick) {
		Site site = this.load(Site.class, sid);
		site.setStatus(status);
	}

	@Override
	public void updateTemplateStatus(String tid, Integer status, String nick) {
		UserTemplate ut = this.load(UserTemplate.class, tid);
		ut.setStatus(status);
		if (status == 1 && StringUtils.isNotEmpty(nick)) {// 如果是发布状态，则新增页面广告计划
			ADUserTemplate ad = this.get(ADUserTemplate.class, ut.getId());
			if (ad == null) {
				ad = new ADUserTemplate();
				ad.setTid(ut.getId());
				ad.setIsValid(true);
				ad.setNick(nick);
				ad.setUser_id(ut.getUser_id());
				ad.setCid(ut.getCid());
				ad.setLayout(1);
				this.save(ad);
			}
		}
	}

	@Override
	public void updateAnalytics(String sid, String gid, String lid,
			String laid, String type) {
		Site site = this.get(Site.class, sid);
		if (site == null) {
			SystemException.handleMessageException("未找到指定站点");
		}
		if (StringUtils.isNotEmpty(gid)) {
			site.setGid(gid);
		} else {
			site.setGid(null);
		}
		if (StringUtils.isNotEmpty(lid)) {
			site.setLid(lid);
		} else {
			site.setLid(null);
		}
		if (StringUtils.isNotEmpty(laid)) {
			site.setLaid(laid);
		} else {
			site.setLaid(null);
		}
		if (StringUtils.isNotEmpty(type)) {
			site.setAnalyticsType(type);
		} else {
			site.setAnalyticsType(null);
		}
	}

	@Override
	public SystemTemplate getDefaultSystemTemplate() {
		SystemTemplate template = this.findByCriterion(SystemTemplate.class, R
				.eq("isDefault", true));
		return template;
	}

	@Override
	public UserTemplate getDefaultUserTemplate(String siteId) {
		UserTemplate template = this.findByCriterion(UserTemplate.class, R.eq(
				"site.id", siteId), R.eq("isDefault", true));
		return template;
	}

	@Override
	public List<Site> getSitesAndTemplates(String userId) {
		List<Site> sites = this.findAllByCriterion(Site.class, R.eq("user_id",
				userId));// 当前用户站点
		for (Site site : sites) {
			this.initialize(site.getTemplates());
		}
		return sites;
	}

	@Override
	public Site getSiteAndTemplates(String siteId) {
		Site site = this.get(Site.class, siteId);
		this.initialize(site.getTemplates());
		return site;
	}

	@Override
	public Site getSiteAndTemplatesByUserId(String userId) {
		Site site = this.findByCriterion(Site.class, R.eq("user_id", userId));
		this.initialize(site.getTemplates());
		return site;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wind.site.service.IDesignerService#getTemplate(java.lang.String)
	 */
	@Override
	public UserTemplate getUserTemplate(String id) {
		UserTemplate template = this.findByCriterion(UserTemplate.class, R.eq(
				"id", id));
		return template;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wind.site.service.IDesignerService#getSysTemplate(java.lang.String)
	 */
	@Override
	public SystemTemplate getSysTemplate(String id) {
		SystemTemplate template = this.findByCriterion(SystemTemplate.class, R
				.eq("id", id));
		return template;
	}

	@Override
	public UserTemplate getUserTemplateByDomainName(String domainName) {
		Site site = this.findByCriterion(Site.class, R.eq("domainName",
				domainName));
		if (site != null) {
			return this.getDefaultUserTemplate(site.getId());
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	@Override
	public List<User> searchUserBySiteTitle(String title) {
		Session session = this.getHibernateSession();
		return session.createCriteria(User.class).createAlias("sites", "s")
				.add(R.like("s.title", title, MatchMode.ANYWHERE)).list();
	}

	private static ProjectionList sysTemplateProjections = Projections
			.projectionList();
	{
		sysTemplateProjections.add(Projections.property("id")).add(
				Projections.property("name")).add(
				Projections.property("description")).add(
				Projections.property("skin")).add(
				Projections.property("isDefault")).add(
				Projections.property("gids")).add(
				Projections.property("sortOrder")).add(
				Projections.property("created")).add(
				Projections.property("updated"));

	}

	private static ProjectionList userTemplateProjections = Projections
			.projectionList();
	{
		userTemplateProjections.add(Projections.property("id")).add(
				Projections.property("name")).add(
				Projections.property("description")).add(
				Projections.property("skin")).add(
				Projections.property("isDefault")).add(
				Projections.property("gids")).add(
				Projections.property("sortOrder")).add(
				Projections.property("created")).add(
				Projections.property("updated")).add(
				Projections.property("user_id")).add(
				Projections.property("modColumn")).add(
				Projections.property("visibleType"));

	}
}
