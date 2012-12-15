package com.wind.site.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.domain.TradeRate;
import com.wind.core.service.IBaseService;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.model.Layout;
import com.wind.site.model.ModuleModel;
import com.wind.site.model.Page;
import com.wind.site.model.PageMeta;
import com.wind.site.model.PageModule;
import com.wind.site.model.PageRegion;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserPageDetail;
import com.wind.site.model.UserPageSearch;

/**
 * 新版本页面设计器业务接口
 * 
 * @author fxy
 * 
 */
public interface IPageService extends IBaseService {

	/**
	 * 发布阿里妈妈验证
	 * 
	 * @param fcg
	 * @param user
	 */
	void deployAlimamaRoot(FreeMarkerConfigurer fcg, String userId, String code);

	/**
	 * 发布xtao验证
	 * 
	 * @param fcg
	 * @param user
	 */
	void deployXtaoAuth(FreeMarkerConfigurer fcg, String userId, String code);

	/**
	 * 修复页面
	 * 
	 * @param id
	 * @param isHeader
	 */
	void fixedPage(String siteId, Page page);

	/**
	 * 修复页头
	 * 
	 * @param siteId
	 */
	void fixedPageHeader(String siteId);

	/**
	 * 修复区域
	 * 
	 * @param siteId
	 * @param region
	 * @param models
	 */
	List<ModuleModel> fixedPageRegion(String siteId, PageRegion region,
			List<ModuleModel> models);

	/**
	 * 保存或更新商品日志
	 * 
	 * @param itemLogs
	 */
	void saveOrUpdateItemLog(CopyOnWriteArraySet<ItemCacheLog> itemLogs);

	/**
	 * 发布页头和页尾
	 * 
	 * @param id
	 * @param fcg
	 * @param moduleMethod
	 */
	void deployHeaderAndFooter(String id, FreeMarkerConfigurer fcg,
			ModuleMethod moduleMethod);

	/**
	 * 静态化站长店铺详情页（新版静态化详情页）
	 * 
	 * @param fcg
	 * @param userId
	 */
	void deployUserShopDetail(FreeMarkerConfigurer fcg, String userId);

	/**
	 * 静态化店铺分类
	 * 
	 * @param fcg
	 * @param cid
	 * @param shops
	 */
	void deployShopCats(FreeMarkerConfigurer fcg, String cid,
			List<T_TaobaokeShop> shops);

	/**
	 * 静态化店铺详情
	 * 
	 * @param fcg
	 * @param shop
	 * @param tShop
	 */
	void deployShopDetail(FreeMarkerConfigurer fcg, Shop shop,
			TaobaokeShop tShop, List<TaobaokeItem> items);

	/**
	 * 静态化店铺详情SEO(标题，关键词)
	 * 
	 * @param fcg
	 * @param shop
	 */
	void deployShopDetailMeta(FreeMarkerConfigurer fcg, Shop shop);

	/**
	 * 静态化站长页面页头（包括js，css等信息）
	 * 
	 * @param fcg
	 * @param userId
	 */
	void deployUserHtmlHeader(FreeMarkerConfigurer fcg, String userId);

	/**
	 * 静态化站长宝贝详情页（新版静态化详情页）
	 * 
	 * @param fcg
	 * @param userId
	 */
	void deployUserItemDetail(FreeMarkerConfigurer fcg, String userId);

	/**
	 * 静态化商品详情页（仅详情）
	 * 
	 * @param fcg
	 * @param detail
	 */
	void deployItemDetail(FreeMarkerConfigurer fcg, TaobaokeItemDetail detail);

	/**
	 * 静态化商品详情SEO（标题，关键词）
	 * 
	 * @param fcg
	 * @param detail
	 */
	void deployItemDetailMeta(FreeMarkerConfigurer fcg,
			TaobaokeItemDetail detail);

	/**
	 * 静态化商品详情页（除详情）
	 * 
	 * @param fcg
	 * @param detail
	 * @param rates
	 */
	void deployItemDetailAndComments(FreeMarkerConfigurer fcg,
			TaobaokeItemDetail detail, Long totalResults, List<TradeRate> rates);

	/**
	 * 发布文章模块
	 * 
	 * @param fcg
	 * @param module
	 * @param params
	 */
	void deployBlog(FreeMarkerConfigurer fcg, PageModule module,
			Map<String, Object> params);

	/**
	 * 根据模板重新生成指定页面
	 * 
	 * @param page
	 * @param userId
	 * @param nick
	 * @param siteId
	 * @param id
	 */
	void reCopyUserPage(UserPage page, String userId, String nick, String pid,
			String siteId, String id);

	/**
	 * 拷贝并生成页面模板（新增）
	 * 
	 * @param userId
	 * @param nick
	 * @param siteId
	 * @param id
	 */
	void copyUserPage(UserPage page, String userId, String nick, String pid,
			String siteId, String id);

	/**
	 * 根据站点ID获取首页元信息
	 * 
	 * @param siteId
	 * @return
	 */
	PageMeta getIndexPageMeta(String siteId);

	/**
	 * 创建搜索列表页
	 * 
	 * @param user
	 */
	UserPageSearch createPageSearch(User user);

	/**
	 * 创建详情页
	 * 
	 * @param user
	 */
	UserPageDetail createPageDetail(User user);

	/**
	 * 设置当前指定页面为首页
	 * 
	 * @param pageId
	 */
	void indexSet(String pageId);

	/**
	 * 设置当前指定页面为首页（当用户没有首页时调用）
	 * 
	 * @param pageId
	 */
	void indexNewSet(String pageId);

	/**
	 * 部署MetaData
	 * 
	 * @param fcg
	 * @param userId
	 */
	void deployMetaData(FreeMarkerConfigurer fcg, String userId);

	/**
	 * 发布详情页
	 * 
	 * @param fcg
	 * @param user
	 * @param moduleMethod
	 */
	void deployDetail(FreeMarkerConfigurer fcg, User user,
			ModuleMethod moduleMethod);

	/**
	 * 发布页尾
	 * 
	 * @param fcg
	 * @param user
	 */
	void deployFooter(FreeMarkerConfigurer fcg, String userId);

	/**
	 * 发布搜索页
	 * 
	 * @param fcg
	 * @param user
	 * @param moduleMethod
	 */
	void deploySearch(FreeMarkerConfigurer fcg, User user,
			ModuleMethod moduleMethod);

	/**
	 * 发布页面
	 * 
	 * @param fcg
	 * @param userId
	 * @param id
	 * @param moduleMethod
	 * @param isHeader
	 */
	void deployPage(FreeMarkerConfigurer fcg, String userId, String id,
			ModuleMethod moduleMethod, Boolean isHeader);

	/**
	 * 获取站点常规参数
	 * 
	 * @param userId
	 * @return
	 */
	SiteImpl getSiteImplByUserId(String userId);

	/**
	 * 修改页面状态
	 * 
	 * @param id
	 * @param status
	 */
	void updatePageStatus(String id, Boolean status);

	/**
	 * 更新页面信息(自动发布)
	 * 
	 * @param page
	 */
	void updatePage(Page page);

	/**
	 * 计算指定站点页面数量
	 * 
	 * @param siteId
	 * @return
	 */
	Integer countPages(String siteId);

	/**
	 * 计算当前页面模块数量
	 * 
	 * @param page
	 * @return
	 */
	Integer countPageModules(String page);

	/**
	 * 计算当前页面布局数量
	 * 
	 * @param page
	 * @return
	 */
	Integer countPageLayouts(String page);

	/**
	 * 根据站点ID获取页头区域
	 * 
	 * @param site_id
	 * @return
	 */
	PageRegion getUserPageHeaderRegion(String site_id);

	/**
	 * 根据站点ID获取详情页侧边栏区域
	 * 
	 * @param site_id
	 * @return
	 */
	PageRegion getUserPageDetailRegion(String site_id);

	/**
	 * 根据站点ID获取搜索页侧边栏区域
	 * 
	 * @param site_id
	 * @return
	 */
	PageRegion getUserPageSearchRegion(String site_id);

	/**
	 * 新增页面(指定布局)
	 * 
	 * @param page
	 * @param layout
	 */
	void addPage(Page page, String layout);

	/**
	 * 新增页面
	 * 
	 * @param page
	 */
	void addPage(Page page);

	/**
	 * 删除布局
	 * 
	 * @param layout
	 * @param metaStr
	 */
	void deleteLayout(Long layout, String page, String metaStr);

	/**
	 * 修改布局顺序
	 * 
	 * @param page
	 * @param metaStr
	 */
	void updateLayoutSort(String page, String metaStr);

	/**
	 * 新增布局(仅支持插入链表最后)
	 * 
	 * @param next
	 * @param layout
	 */
	void addLayout(Layout layout);

	/**
	 * 修改模块顺序
	 * 
	 * @param page
	 *            (当前页面)
	 * @param metaStr
	 *            (页面元信息)
	 */
	void updateModuleSort(String page, String metaStr);

	/**
	 * 删除模块
	 * 
	 * @param module
	 */
	void deleteModule(Long module, String page, String metaStr);

	/**
	 * 新增模块(仅支持插入链表最后)
	 * 
	 * @param next
	 *            (要插入的模块位置)
	 * @param module
	 *            (新增的模块)
	 */
	void addModule(PageModule module);

	/**
	 * 新增模块(并返回模块内容)
	 * 
	 * @param module
	 *            (新增的模块)
	 * @param moduleMethod
	 *            (模块加载)
	 * @param fcg
	 *            (freemarker环境)
	 */
	String addModule(String page, PageModule module, ModuleMethod moduleMethod,
			FreeMarkerConfigurer fcg);

	/**
	 * 更新模块(并返回模块内容)
	 * 
	 * @param module
	 * @param moduleMethod
	 * @param fcg
	 * @return
	 */
	String updateModule(PageModule module, ModuleMethod moduleMethod,
			FreeMarkerConfigurer fcg);
}
