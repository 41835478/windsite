package com.wind.site.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.wind.core.dao.Page;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.service.ISellerService;

/**
 * 卖家功能业务实现
 * 
 * @author fxy
 * 
 */
public class SellerServiceImpl extends BaseServiceImpl implements
		ISellerService {
	@Override
	public List<?> sellerGroupMembers(String nick, String num_iid,
			String member, Page<?> page) {
		Map<String, Object> params = new HashMap<String, Object>();

		params.put("nick", nick);
		String hql = "";
		if (StringUtils.isNotEmpty(num_iid)) {
			params.put("num_iid", Long.parseLong(num_iid));
			hql = "select distinct new map(t.title as title,t.num_iid as num_iid,u.nick as nick,u.user_id as user_id,u.uc_id as uc_id) from T_TaobaokeItem t,User u where t.nick=:nick and t.createdBy=u.user_id and t.num_iid=:num_iid order by t.num_iid";
		} else if (StringUtils.isNotEmpty(member)) {
			params.put("member", member);
			hql = "select distinct new map(t.title as title,t.num_iid as num_iid,u.nick as nick,u.user_id as user_id,u.uc_id as uc_id) from T_TaobaokeItem t,User u where t.nick=:nick and t.createdBy=:member and u.user_id=:member order by t.num_iid";
		} else {
			hql = "select distinct new map(t.title as title,t.num_iid as num_iid,u.nick as nick,u.user_id as user_id,u.uc_id as uc_id) from T_TaobaokeItem t,User u where t.nick=:nick and t.createdBy=u.user_id order by t.num_iid";
		}
		return this.findByHql(page, hql, params);
	}

	@Override
	public List<?> sellerShopMembers(String userId, Page<?> page) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", Long.valueOf(userId));
		String hql = "select distinct new map(u.nick as nick,u.user_id as user_id,u.uc_id as uc_id) from W_ShopFavorite t,User u,ShopGroup sg where t.user_id=:userId and t.gid=sg.id and sg.user_id=u.user_id";
		return this.findByHql(page, hql, params);
	}

	@Override
	public List<?> sellerWidgetMembers(String userId, String wid, Page<?> page) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("user_id", userId);
		String hql = "";
		if (StringUtils.isNotEmpty(wid)) {
			params.put("wid", wid);
			hql = "select distinct new map(t.nick as nick,t.widget.name as name,t.widget.id as wid,t.template.created as created,t.template.isDefault as isDefault,t.template.name as templateName,t.createdBy as user_id,u.uc_id as uc_id) from UsedCustomeWidget t,User u where t.widget.createdBy=:user_id and u.user_id=t.user_id and t.widget.id=:wid order by t.widget.id";
		} else {
			hql = "select distinct new map(t.nick as nick,t.widget.name as name,t.widget.id as wid,t.template.created as created,t.template.isDefault as isDefault,t.template.name as templateName,t.createdBy as user_id,u.uc_id as uc_id) from UsedCustomeWidget t,User u where t.widget.createdBy=:user_id and u.user_id=t.user_id order by t.widget.id";
		}
		return this.findByHql(page, hql, params);
	}

}
