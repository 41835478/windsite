package com.wind.site.service;

import java.util.List;

import com.wind.core.service.IBaseService;
import com.wind.site.model.Site;
import com.wind.site.model.SystemTemplate;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;

/**
 * 设计器业务接口
 * 
 * @author fxy
 * 
 */
public interface IDesignerService extends IBaseService {
	/**
	 * 更新模板并同时记录自定义组件使用记录
	 * 
	 * @param template
	 * @param customes
	 */
	void updateTemplate(UserTemplate template, String customes);

	/**
	 * 查询模板Header-用户
	 * 
	 * @param id
	 * @return
	 */
	String getUserHeader(String id);

	/**
	 * 查询模板Header-系统
	 * 
	 * @param id
	 * @return
	 */
	String getSysHeader(String id);

	/**
	 * 查询推广组商品(排序,有效)
	 * 
	 * @param gid
	 * @param gid
	 * @return
	 */
	List<T_TaobaokeItem> getItems(String gid, String userId);

	/**
	 * 更新站点状态
	 * 
	 * @param sid
	 * @param status
	 */
	void updateSiteStatus(String sid, Integer status, String nick);

	/**
	 * 更新模板状态
	 * 
	 * @param tid
	 * @param status
	 */
	void updateTemplateStatus(String tid, Integer status, String nick);

	/**
	 * 更新站点统计信息
	 * 
	 * @param sid
	 * @param gid
	 * @param lid
	 * @param laid
	 * @param type
	 */
	void updateAnalytics(String sid, String gid, String lid, String laid,
			String type);

	/**
	 * 根据站点名称模糊搜索用户信息
	 * 
	 * @param title
	 * @return
	 */
	List<User> searchUserBySiteTitle(String title);

	/**
	 * 得到指定用户模板(不含内容)
	 * 
	 * @param id
	 * @return
	 */
	UserTemplate getUserTemplate(String id);

	/**
	 * 得到指定系统模板(不含内容)
	 * 
	 * @param id
	 * @return
	 */
	SystemTemplate getSysTemplate(String id);

	/**
	 * 查询指定用户的所有站点及模板(不含内容)
	 * 
	 * @param userId
	 * @return
	 */
	List<Site> getSitesAndTemplates(String userId);

	/**
	 * 根据站点ID查询站点及模板(不含内容)
	 * 
	 * @param siteId
	 * @return
	 */
	Site getSiteAndTemplates(String siteId);

	/**
	 * 根据用户ID查询单一站点(不含内容)
	 * 
	 * @param userId
	 * @return
	 */
	Site getSiteAndTemplatesByUserId(String userId);

	/**
	 * 得到系统默认模板(不含内容)
	 * 
	 * @return
	 */
	SystemTemplate getDefaultSystemTemplate();

	/**
	 * 得到用户站点默认模板(不含内容)
	 * 
	 * @param siteId
	 * @return
	 */
	UserTemplate getDefaultUserTemplate(String siteId);

	/**
	 * 根据二级域名获取用户站点默认模板(不含内容)
	 * 
	 * @param domainName
	 * @return
	 */
	UserTemplate getUserTemplateByDomainName(String domainName);

	/**
	 * 更新指定模板内容
	 * 
	 * @param tid
	 * @param name
	 * @param gids
	 * @param desc
	 * @param content
	 * @param isDefault
	 */
	// void updateUserTemplate(String tid, String name, String gids, String
	// skin,
	// String desc, String content, String isDefault);
}
