package com.wind.site.service;

import java.util.List;
import java.util.Map;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;
import com.wind.site.model.WeiboDomainHistory;
import com.wind.site.model.WidgetType;

/**
 * 管理功能业务接口
 * 
 * @author fxy
 * 
 */
public interface IAdminService extends IBaseService {
	void synVersionNo(User user);

	/**
	 * 同步页面元信息
	 */
	void refreshPageMeta(String id);

	/**
	 * 计算有效的单页面数（新）
	 * 
	 * @return
	 */
	Integer countValidPage();

	/**
	 * 计算有效的广告计划（主推）
	 * 
	 * @return
	 */
	Integer countValidADPlan(String type);

	/**
	 * 计算已发布的站点数量
	 * 
	 * @return
	 */
	Integer countValidSite();

	/**
	 * 设置当前会员的广告计划为有效
	 */
	void setAdPlanisValid(String nick);

	/**
	 * 重新建立返利域名文件
	 */
	void reBuildFanliDomainText();

	/**
	 * 修订报表，返利记录的购买人昵称BUG
	 */
	void modifyReportAndTrade();

	/**
	 * 调整旧的返利会员数据结构至新的
	 */
	void modifyMemberAndMemberInfo();

	/**
	 * 查询返利站点
	 * 
	 * @return
	 */
	List<Map<String, Object>> getFanliSite();

	/**
	 * 刷新站点page
	 */
	void refreshUserTemplatePageId(Page<UserTemplate> page);

	/**
	 * 设置当前会员的所有广告计划为无效
	 * 
	 * @param nick
	 */
	void setAdPlanisInValid(String nick);

	/**
	 * 刷新文章推广
	 */
	void refreshAdsBlog();

	/**
	 * 修订首页推广计划表
	 */
	void refreshAdsUserTemplate();

	/**
	 * 刷新并初始化所有二级域名
	 */
	void refreshSecondDomainName(Site site);

	/**
	 * 抓取类目属性
	 * 
	 * @param page
	 */
	void getItemProps(T_ItemCat cat);

	/**
	 * 抓取类目属性值
	 * 
	 * @param page
	 */
	void getItemCatPropValues(T_ItemCat cat);

	/**
	 * 审核微博域名
	 * 
	 * @param wdh
	 */
	void auditWeiboDomain(WeiboDomainHistory wdh);

	/**
	 * 审核域名
	 * 
	 * @param dh
	 */
	void auditDomain(DomainHistory dh);

	/**
	 * 根据GA淘客统计结果补充会员信息
	 * 
	 * @param gaResult
	 * @return
	 */
	List<Map<String, Object>> getGATaoke(List<Map<String, Object>> gaResult);

	/**
	 * 根据GA卖家统计结果补充会员，店铺信息
	 * 
	 * @param gaResult
	 * @return
	 */
	void getGASeller(List<Map<String, Object>> gaResult);

	/**
	 * 查询站点
	 * 
	 * @return
	 */
	List<SiteImpl> getSiteImpl();

	/**
	 * 查询当前用户的周报
	 * 
	 * @param userId
	 * @return
	 */
	Map<String, Object> getWeeklyMailByUserId(String userId);

	/**
	 * 推广商品排行
	 * 
	 * @param page
	 * @return
	 */
	List<Map<String, Object>> fyItems(Page<Map<String, Object>> page);

	/**
	 * 创建Luence索引
	 * 
	 * @param page
	 * @param shops
	 */
	<T> void createIndexer(Page<T> page, List<T> temp, Class<T> clazz);

	/**
	 * 修改用户为离线
	 * 
	 * @param id
	 */
	void updateOnLine(String id);

	/**
	 * 修改返利用户为离线
	 * 
	 * @param id
	 */
	void updateMemberOnLine(Long id);

	/**
	 * 加载组件类型(加载组件集合)
	 * 
	 * @param id
	 * @return
	 */
	WidgetType getWidgetType(String id);

	/**
	 * 查询所有组件类型(加载组件集合)
	 * 
	 * @return
	 */
	List<WidgetType> getWidgetTypes();

	/**
	 * 查询指定时间段内注册用户
	 * 
	 * @param analyticsType
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<?> userRegisterAnalytics(String analyticsType, String startDate,
			String endDate);

	/**
	 * 查询指定时间段内登录用户
	 * 
	 * @param analyticsType
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<?> userLoginAnalytics(String analyticsType, String startDate,
			String endDate);
}
