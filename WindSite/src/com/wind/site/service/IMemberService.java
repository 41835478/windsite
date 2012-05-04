package com.wind.site.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.TaobaokeItem;
import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADPlan;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.FavoriteWidget;
import com.wind.site.model.ForumThread;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.MyYiqifaMall;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.SiteMapCategory;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.UsedCustomeWidget;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;

/**
 * 会员服务业务接口
 * 
 * @author fxy
 * 
 */
public interface IMemberService extends IBaseService {
	/**
	 * 同步最新商城（先删除所有，再添加新的）
	 * 
	 * @param malls
	 */
	void synMyYiqifaMalls(Long userId, Set<MyYiqifaMall> malls);

	/**
	 * 删除站点地图分类
	 * 
	 * @param id
	 */
	void deleteSiteMapCategory(Long id);

	/**
	 * 更新站点地图
	 * 
	 * @param cats
	 * @param userId
	 * @param nick
	 */
	void modifySiteMap(List<SiteMapCategory> cats, String userId, String nick);

	/**
	 * 计算指定卖家及类型的广告计划数量
	 * 
	 * @param userId
	 * @param type
	 */
	Integer countADPlan(String userId, String type);

	/**
	 * 修改广告计划及推广商品
	 * 
	 * @param plan
	 * @param items
	 */
	void updateADPlan(ADPlan plan, List<TaobaokeItem> items, String tags,
			Boolean isDefault);

	/**
	 * 新增广告计划及推广商品
	 * 
	 * @param plan
	 * @param items
	 */
	void addADPlan(ADPlan plan, List<TaobaokeItem> items, String tags);

	/**
	 * 计算推广链接数量
	 * 
	 * @param userId
	 * @return
	 */
	Integer countMyXintaoLink(String userId);

	/**
	 * 自定义二级域名
	 * 
	 * @param sid
	 * @param domainName
	 */
	void createDomainName(String sid, String domainName);

	/**
	 * 审核独立域名(设置站点独立域名，追加Rewrite Map)
	 * 
	 * @param dh
	 */
	void checkWWW(DomainHistory dh);

	/**
	 * 删除推广记录
	 * 
	 * @param tid
	 */
	void deleteThread(String tid);

	/**
	 * 新增推广记录
	 * 
	 * @param thread
	 */
	void addThread(ForumThread thread);

	/**
	 * 删除推广帐号信息
	 * 
	 * @param aid
	 */
	void deleteAccount(String aid);

	/**
	 * 删除已收藏的阵地
	 * 
	 * @param ffid
	 */
	void deleteMyFavoriteForum(String ffid);

	/**
	 * 收藏指定阵地
	 * 
	 * @param fid
	 * @param type
	 */
	void addMyFavoriteForum(String fid, String type);

	/**
	 * 收藏总数
	 * 
	 * @param userId
	 * @return
	 */
	Integer countMyFavoriteForumByUserId(String userId);

	/**
	 * 查询我收藏的阵地ID列表
	 * 
	 * @param userId
	 * @param type
	 * @return
	 */
	String getMyFavoriteForumIds(String userId, String type);

	/**
	 * 根据组件ID查询使用记录
	 * 
	 * @param cwid
	 * @return
	 */
	List<UsedCustomeWidget> getUsedCustomeWidget(Page<UsedCustomeWidget> page,
			String cwid);

	/**
	 * 根据组件ID查询收藏记录
	 * 
	 * @param cwid
	 * @return
	 */
	List<FavoriteWidget> getFavoriteWidget(Page<FavoriteWidget> page,
			String cwid);

	/**
	 * 根据自定义组件查找已使用人ID列表
	 * 
	 * @param cwid
	 * @return
	 */
	String getUcidsByUsedWidget(String cwid);

	/**
	 * 新增自定义组件
	 * 
	 * @param widget
	 */
	void createCustomeWidget(CustomeWidget widget);

	/**
	 * 删除自定义组件
	 * 
	 * @param cwid
	 */
	void deleteCustomeWidget(CustomeWidget widget);

	/**
	 * 查询我收藏的组件ID列表
	 * 
	 * @param userId
	 * @return
	 */
	String getMyFavoriteIds(String userId);

	/**
	 * 删除收藏的组件
	 * 
	 * @param cwid
	 */
	void deleteMyFavoriteWidget(String cwid);

	/**
	 * 收藏组件
	 * 
	 * @param String
	 *            cwid
	 */
	void addMyFavoriteWidget(String cwid);

	/**
	 * 查找指定会员所有收藏数
	 * 
	 * @param userId
	 * @return
	 */
	Integer countAllFavoriteWidgetByUserId(String userId);

	/**
	 * 查找指定会员所有组件使用数
	 * 
	 * @param userId
	 * @return
	 */
	Integer countAllUsedWidgetByUserId(String userId);

	/**
	 * 查找指定会员的组件数
	 * 
	 * @param userId
	 * @return
	 */
	Integer countCustomeWidgetByUserId(String userId);

	/**
	 * 查找指定会员收藏组件数
	 * 
	 * @param userId
	 * @return
	 */
	Integer countFavoriteWidgetByUserId(String userId);

	/**
	 * 返回所有组件数
	 * 
	 * @return
	 */
	Integer countCustomeWidget();

	/**
	 * 返回所有组件
	 * 
	 * @return
	 */
	Integer countWidget();

	/**
	 * 新增单个商品进入推广组
	 * 
	 * @param numiid
	 * @param gid
	 */
	void addItem2ItemGroup(String numiid, String gid);

	/**
	 * 添加店铺收藏
	 * 
	 * @param gid
	 * @param ids
	 */
	void addShopFav(Long gid, String[] userids);

	/**
	 * 删除店铺收藏
	 * 
	 * @param ids
	 */
	void deleteShopFav(Long gid, String ids);

	/**
	 * 设置更换站点首页
	 * 
	 * @param tid
	 */
	void setSiteIndex(String tid, FreeMarkerConfigurer fcg,
			IDeployZone deployZone, WidgetCustomerMethod widgetCustomer);

	/**
	 * 新增模板
	 * 
	 * @param template
	 */
	void addTemplate(UserTemplate template);

	/**
	 * 查询所有模板(非主页，不含内容和Header)
	 * 
	 * @param userId
	 * @return
	 */
	List<Map<String, Object>> findUserTemplates(String userId);

	/**
	 * 根据站点ID修改酷站
	 * 
	 * @param sid
	 */
	void updateCoolSite(String sid);

	/**
	 * 同步PID
	 * 
	 * @param id
	 */
	void synPID(String id);

	/**
	 * 同步淘宝个人信息
	 * 
	 * @param user_id
	 * @param nick
	 * @return
	 */
	User synUser(String user_id, String nick);

	/**
	 * 查询推广组商品(排序)
	 * 
	 * @param gid
	 * @return
	 */
	List<T_TaobaokeItem> getItems(String gid, String sortBy);

	/**
	 * 删除无效商品
	 * 
	 * @param id
	 */
	void deleteInvalidItemsByItemGroup(String id);

	/**
	 * 检测推广组
	 * 
	 * @param uid
	 * @return
	 */
	List<ItemGroupDoctor> itemGroupDoctor(String uid);

	/**
	 * 商品是否检测中
	 * 
	 * @param uid
	 * @return
	 */
	Boolean isProcessingItemGroupDoctor(String uid);

	/**
	 * 查询指定用户指定状态的检测数量
	 * 
	 * @param uid
	 * @param state
	 * @return
	 */
	Integer countItemGroupDoctor(String uid, String state);

	/**
	 * 查询检测结果
	 * 
	 * @param uid
	 * @return
	 */
	List<ItemGroupDoctor> getItemGroupDoctors(String uid);

	/**
	 * 新增或修改推广组内商品
	 * 
	 * @param item
	 * @return
	 */
	void saveTaobaokeItems(Set<T_TaobaokeItem> items);

	/**
	 * 重命名推广组
	 * 
	 * @param id
	 * @param name
	 * @return
	 */
	ItemGroup renameItemGroup(String id, String name);

	/**
	 * 计算推广组商品数量
	 * 
	 * @param gid
	 * @return
	 */
	Integer countItemsByGid(String gid);

	/**
	 * 删除推广组(需删除当前推广组下的所有商品)
	 * 
	 * @param gid
	 */
	void deleteItemGroup(String gid);

	/**
	 * 删除指定商品
	 * 
	 * @param itemIds
	 */
	void deleteItemsFromItemGroup(String itemIds);

	/**
	 * 更新商品顺序
	 * 
	 * @param items
	 */
	void updateItemsSorts(String[] items);

	/**
	 * 移动商品至其他推广组
	 * 
	 * @param gid
	 */
	void moveItemGroup(String gid, String itemIds);

	/**
	 * 查询店铺分组内店铺(排序)
	 * 
	 * @param gid
	 * @return
	 */
	List<T_TaobaokeShop> getShops(Long gid, String sortBy, Boolean isValid);

	/**
	 * 计算收藏数量
	 * 
	 * @param id
	 * @return
	 */
	Integer countFavShops(Long id);

	/**
	 * 计算收藏分组数量
	 * 
	 * @param id
	 * @return
	 */
	Integer countShopGroups(String userid);

	/**
	 * 删除店铺分组
	 * 
	 * @param id
	 */
	void deleteShopGroup(Long id);

	/**
	 * 重命名店铺分组
	 * 
	 * @param id
	 * @param name
	 * @return
	 */
	ShopGroup renameShopGroup(Long id, String name);

	/**
	 * 添加店铺
	 * 
	 * @param nick
	 */
	void addShop(String nick);

}
