package com.wind.site.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.Huabao;
import com.wind.site.model.Member;
import com.wind.site.model.NewWeiboSysConfig;
import com.wind.site.model.Site;
import com.wind.site.model.T_Poster;
import com.wind.site.model.User;
import com.wind.site.model.WeiboSysConfig;

/**
 * Site服务接口
 * 
 * @author fxy
 * 
 */
public interface ISiteService extends IBaseService {
	/**
	 * 画报搜索(标签)
	 * 
	 * @param page
	 * @param words
	 * @return
	 */
	List<T_Poster> searchPosterByTagsFilter(Page<T_Poster> page, String words);
	/**
	 * 画报搜索(标题)
	 * 
	 * @param page
	 * @param words
	 * @return
	 */
	List<T_Poster> searchPosterByTitleFilter(Page<T_Poster> page, String words);

	/**
	 * 新增微博系统配置(新)
	 * 
	 * @param config
	 */
	void addNewWeiboSysConfig(NewWeiboSysConfig config,
			FreeMarkerConfigurer fcg, Site site);

	/**
	 * 新增微博系统配置
	 * 
	 * @param config
	 */
	void addWeiboSysConfig(WeiboSysConfig config, FreeMarkerConfigurer fcg,
			Site site);

	/**
	 * 更新微博系统配置
	 * 
	 * @param config
	 */
	void updateWeiboSysConfig(WeiboSysConfig config, FreeMarkerConfigurer fcg,
			Site site);

	/**
	 * 注册返利版买家会员
	 * 
	 * @param member
	 * @param parentid
	 */
	void registeMember(Member member, Long parentid);

	/**
	 * 校验当前返利会员登录
	 * 
	 * @param username
	 * @param password
	 * @param site_id
	 * @param user_id
	 * @return
	 */
	Member validateFanliMember(String nick, String username, String password,
			String site_id, String user_id);

	/**
	 * 校验当前返利会员登录
	 * 
	 * @param username
	 * @param site_id
	 * @param user_id
	 * @return
	 */
	Member validateCookieFanliMember(String nick, String username, String password,
			String site_id, String user_id);

	
	/**
	 * 查询指定广告计划的相关计划（根据多标签组合权重分析，参考模型TF/IDF）
	 * 
	 * @param id
	 * @param limit
	 * @return
	 */
	List<ADTaobaokeItem> getRelatePlans(String id, Integer limit);

	/**
	 * 同步订购信息
	 * 
	 * @param user
	 * @param nick
	 * @param isCheckVersion
	 */
	void synVersionNo(User user, String nick, Boolean isCheckVersion);

	/**
	 * 同步限额
	 * 
	 * @param user
	 */
	void synLimit(User user);

	/**
	 * 根据指定IDS查询所有广告计划，并抓取相关商品
	 * 
	 * @param ids
	 * @return
	 */
	List<ADPlan> getADPlan(String ids);

	/**
	 * 根据画报获取当前专辑的所有数据
	 * 
	 * @param hid
	 * @return
	 */
	List<Huabao> getHuabaoData(Integer hid);

	/**
	 * 查询指定画报的相关画报（根据多标签组合权重分析，参考模型TF/IDF）
	 * 
	 * @param id
	 * @param limit
	 * @return
	 */
	List<T_Poster> getRelateHuabao(Long id, Integer limit);

	/**
	 * 查询随机画报
	 * 
	 * @param limit
	 * @return
	 */
	List<Map<String, Object>> getRandomHuabao(Integer limit);

	/**
	 * 获取指定画报前一个
	 * 
	 * @param id
	 * @param type
	 * @return
	 */
	Map<String, Object> getPrevHuabaos(Long id, Long channelId);

	/**
	 * 获取指定画报后一个
	 * 
	 * @param id
	 * @param type
	 * @return
	 */
	Map<String, Object> getNextHuabaos(Long id, Long channelId);

	/**
	 * 统计卖家商品被添加数量
	 * 
	 * @param nick
	 * @return
	 */
	Integer countItemsByNick(String nick);

	/**
	 * 查询PID,统计类型,统计标识
	 * 
	 * @param userId
	 * @return
	 */
	Map<String, Object> getPID(String userId);

	/**
	 * 根据家园ID获取淘宝用户ID
	 * 
	 * @param uid
	 * @return
	 */
	String getUserIdByUid(String uid);

	/**
	 * 根据用户名获取淘宝ID
	 * 
	 * @param username
	 * @return
	 */
	String getUserIdByUserName(String username);

	/**
	 * 搜索画报图片（Lucene）
	 * 
	 * @param page
	 * @param words
	 * @return
	 */
	List<Huabao> searchHuabaoByFilter(Page<Huabao> page, String words);

	/**
	 * 同步用户
	 * 
	 * @param user_id
	 * @param nick
	 * @return
	 */
	User synUser(String appType, String user_id, String nick, String tSession,
			Boolean isCheckVersion, String versionNo, IDeployZone deployZone,
			FreeMarkerConfigurer fcg, WidgetCustomerMethod widgetCustomer,
			IPageService pageService, ModuleMethod moduleMethod);

	/**
	 * 根据站点名称模糊搜索用户信息
	 * 
	 * @param title
	 * @return
	 */
	List<User> searchUserBySiteTitle(String title);

}
