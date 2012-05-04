package com.wind.site.env;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.wind.site.model.Activity;
import com.wind.site.model.Channel;
import com.wind.site.model.CoolSite;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.ForumType;
import com.wind.site.model.KeyWord;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.PageModule;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_MallBrandCat;
import com.wind.site.model.T_PosterTag;
import com.wind.site.model.T_ShopCat;
import com.wind.site.model.TaobaoKeywordCategory;
import com.wind.site.model.User;
import com.wind.site.model.WidgetType;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;

/**
 * 站点环境
 * 
 * @author fxy
 * 
 */
public class SiteEnv {

	private Map<String, SiteImpl> sites = new HashMap<String, SiteImpl>();
	/**
	 * 亿起发商城分类
	 */
	private List<YiqifaCategory> yiqifaCats = new ArrayList<YiqifaCategory>();
	/**
	 * 所有B2C商城
	 */
	private Map<String, YiqifaMall> yiqifaMalls = null;
	/**
	 * 页面模板主内容区
	 */
	private Map<String, List<LayoutModel>> tempaltes = new HashMap<String, List<LayoutModel>>();
	/**
	 * 页面模板使用的模块
	 */
	private Map<Long, PageModule> modules = new HashMap<Long, PageModule>();
	/**
	 * 店铺中间模型（含所有分类）
	 */
	private Map<String, List<DianPuCategory>> dianpuCats = new HashMap<String, List<DianPuCategory>>();
	/**
	 * 淘客展示组件集合
	 */
	private List<WidgetType> widgets = new ArrayList<WidgetType>();
	/**
	 * 所有类目
	 */
	private List<T_ItemCat> cats = new ArrayList<T_ItemCat>();
	/**
	 * 品牌类目
	 */
	private List<T_MallBrandCat> brandCats = new ArrayList<T_MallBrandCat>();
	/**
	 * 根类目
	 */
	private List<T_ItemCat> rootCats = new ArrayList<T_ItemCat>();
	/**
	 * 店铺前台类目
	 */
	private List<T_ShopCat> shopCats = new ArrayList<T_ShopCat>();
	/**
	 * 关键词分类
	 */
	private List<TaobaoKeywordCategory> keywordCats = new ArrayList<TaobaoKeywordCategory>();
	/**
	 * 阵地类型
	 */
	private List<ForumType> forumTypes = new ArrayList<ForumType>();
	/**
	 * 活动
	 */
	private List<Activity> activities = new ArrayList<Activity>();
	/**
	 * 频道
	 */
	private List<Channel> channels = new ArrayList<Channel>();
	/**
	 * 会员普通功能视图集合
	 */
	private List<String> memberViews = new ArrayList<String>();
	/**
	 * 站点普通功能视图集合
	 */
	private List<String> siteViews = new ArrayList<String>();

	/**
	 * 在线用户集合
	 */
	private Map<String, User> members = new ConcurrentHashMap<String, User>();
	/**
	 * 新加入用户集合
	 */
	private List<User> lastUsers = new ArrayList<User>();
	/**
	 * 新增站点
	 */
	private List<Site> lastSites = new ArrayList<Site>();
	/**
	 * 酷站
	 */
	private List<CoolSite> coolSites = new ArrayList<CoolSite>();

	/**
	 * 昨日淘客排行
	 */
	private List<Map<String, Object>> dayTaoke = new ArrayList<Map<String, Object>>();
	/**
	 * 昨日卖家排行
	 */
	private List<Map<String, Object>> daySeller = new ArrayList<Map<String, Object>>();
	/**
	 * 本周淘客排行
	 */
	private List<Map<String, Object>> weekTaoke = new ArrayList<Map<String, Object>>();
	/**
	 * 本周卖家排行
	 */
	private List<Map<String, Object>> weekSeller = new ArrayList<Map<String, Object>>();
	/**
	 * 本月淘客排行
	 */
	private List<Map<String, Object>> monthTaoke = new ArrayList<Map<String, Object>>();
	/**
	 * 本月卖家排行
	 */
	private List<Map<String, Object>> monthSeller = new ArrayList<Map<String, Object>>();
	/**
	 * 淘客总排行
	 */
	private List<Map<String, Object>> allTaoke = new ArrayList<Map<String, Object>>();
	/**
	 * 卖家总排行
	 */
	private List<Map<String, Object>> allSeller = new ArrayList<Map<String, Object>>();
	/**
	 * 综合金词
	 */
	private List<KeyWord> totalWords = new ArrayList<KeyWord>();
	/**
	 * 女人金词
	 */
	private List<KeyWord> ladyWords = new ArrayList<KeyWord>();
	/**
	 * 男人金词
	 */
	private List<KeyWord> manWords = new ArrayList<KeyWord>();
	/**
	 * 画报统计数据[画报总数，图片总数]
	 */
	private Map<String, Integer> huabaoCounts = new HashMap<String, Integer>();
	/**
	 * 画报热门标签
	 */
	private List<T_PosterTag> hotTags = new ArrayList<T_PosterTag>();
	/**
	 * 画报所有标签
	 */
	private List<T_PosterTag> posterTags = new ArrayList<T_PosterTag>();
	/**
	 * 画报权限有限会员集合
	 */
	private Set<String> validHuabaoMembers = new HashSet<String>();

	private Integer adPageLimit = 50;
	private Integer adBlogLimit = 10;

	/**
	 * @return the sites
	 */
	public Map<String, SiteImpl> getSites() {
		return sites;
	}

	/**
	 * @param sites
	 *            the sites to set
	 */
	public void setSites(Map<String, SiteImpl> sites) {
		this.sites = sites;
	}

	public List<String> getMemberViews() {
		return memberViews;
	}

	public void setMemberViews(List<String> memberViews) {
		this.memberViews = memberViews;
	}

	public List<String> getSiteViews() {
		return siteViews;
	}

	public void setSiteViews(List<String> siteViews) {
		this.siteViews = siteViews;
	}

	public Map<String, User> getMembers() {
		return members;
	}

	public void setMembers(Map<String, User> members) {
		this.members = members;
	}

	public List<User> getLastUsers() {
		return lastUsers;
	}

	public void setLastUsers(List<User> lastUsers) {
		this.lastUsers = lastUsers;
	}

	public List<Site> getLastSites() {
		return lastSites;
	}

	public void setLastSites(List<Site> lastSites) {
		this.lastSites = lastSites;
	}

	public void setWidgets(List<WidgetType> widgets) {
		this.widgets = widgets;
	}

	public List<WidgetType> getWidgets() {
		return widgets;
	}

	public void setCats(List<T_ItemCat> cats) {
		this.cats = cats;
	}

	public List<T_ItemCat> getCats() {
		return cats;
	}

	public void setCoolSites(List<CoolSite> coolSites) {
		this.coolSites = coolSites;
	}

	public List<CoolSite> getCoolSites() {
		return coolSites;
	}

	public void setForumTypes(List<ForumType> forumTypes) {
		this.forumTypes = forumTypes;
	}

	public List<ForumType> getForumTypes() {
		return forumTypes;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

	public List<Activity> getActivities() {
		return activities;
	}

	/**
	 * @return the dayTaoke
	 */
	public List<Map<String, Object>> getDayTaoke() {
		return dayTaoke;
	}

	/**
	 * @param dayTaoke
	 *            the dayTaoke to set
	 */
	public void setDayTaoke(List<Map<String, Object>> dayTaoke) {
		this.dayTaoke = dayTaoke;
	}

	/**
	 * @return the daySeller
	 */
	public List<Map<String, Object>> getDaySeller() {
		return daySeller;
	}

	/**
	 * @param daySeller
	 *            the daySeller to set
	 */
	public void setDaySeller(List<Map<String, Object>> daySeller) {
		this.daySeller = daySeller;
	}

	/**
	 * @return the weekTaoke
	 */
	public List<Map<String, Object>> getWeekTaoke() {
		return weekTaoke;
	}

	/**
	 * @param weekTaoke
	 *            the weekTaoke to set
	 */
	public void setWeekTaoke(List<Map<String, Object>> weekTaoke) {
		this.weekTaoke = weekTaoke;
	}

	/**
	 * @return the weekSeller
	 */
	public List<Map<String, Object>> getWeekSeller() {
		return weekSeller;
	}

	/**
	 * @param weekSeller
	 *            the weekSeller to set
	 */
	public void setWeekSeller(List<Map<String, Object>> weekSeller) {
		this.weekSeller = weekSeller;
	}

	/**
	 * @return the monthTaoke
	 */
	public List<Map<String, Object>> getMonthTaoke() {
		return monthTaoke;
	}

	/**
	 * @param monthTaoke
	 *            the monthTaoke to set
	 */
	public void setMonthTaoke(List<Map<String, Object>> monthTaoke) {
		this.monthTaoke = monthTaoke;
	}

	/**
	 * @return the monthSeller
	 */
	public List<Map<String, Object>> getMonthSeller() {
		return monthSeller;
	}

	/**
	 * @param monthSeller
	 *            the monthSeller to set
	 */
	public void setMonthSeller(List<Map<String, Object>> monthSeller) {
		this.monthSeller = monthSeller;
	}

	/**
	 * @return the allTaoke
	 */
	public List<Map<String, Object>> getAllTaoke() {
		return allTaoke;
	}

	/**
	 * @param allTaoke
	 *            the allTaoke to set
	 */
	public void setAllTaoke(List<Map<String, Object>> allTaoke) {
		this.allTaoke = allTaoke;
	}

	/**
	 * @return the allSeller
	 */
	public List<Map<String, Object>> getAllSeller() {
		return allSeller;
	}

	/**
	 * @param allSeller
	 *            the allSeller to set
	 */
	public void setAllSeller(List<Map<String, Object>> allSeller) {
		this.allSeller = allSeller;
	}

	public void setTotalWords(List<KeyWord> totalWords) {
		this.totalWords = totalWords;
	}

	public List<KeyWord> getTotalWords() {
		return totalWords;
	}

	public void setLadyWords(List<KeyWord> ladyWords) {
		this.ladyWords = ladyWords;
	}

	public List<KeyWord> getLadyWords() {
		return ladyWords;
	}

	public void setManWords(List<KeyWord> manWords) {
		this.manWords = manWords;
	}

	public List<KeyWord> getManWords() {
		return manWords;
	}

	public void setRootCats(List<T_ItemCat> rootCats) {
		this.rootCats = rootCats;
	}

	public List<T_ItemCat> getRootCats() {
		return rootCats;
	}

	public void setChannels(List<Channel> channels) {
		this.channels = channels;
	}

	public List<Channel> getChannels() {
		return channels;
	}

	/**
	 * @return the hotTags
	 */
	public List<T_PosterTag> getHotTags() {
		return hotTags;
	}

	/**
	 * @param hotTags
	 *            the hotTags to set
	 */
	public void setHotTags(List<T_PosterTag> hotTags) {
		this.hotTags = hotTags;
	}

	/**
	 * @return the posterTags
	 */
	public List<T_PosterTag> getPosterTags() {
		return posterTags;
	}

	/**
	 * @param posterTags
	 *            the posterTags to set
	 */
	public void setPosterTags(List<T_PosterTag> posterTags) {
		this.posterTags = posterTags;
	}

	public void setHuabaoCounts(Map<String, Integer> huabaoCounts) {
		this.huabaoCounts = huabaoCounts;
	}

	public Map<String, Integer> getHuabaoCounts() {
		return huabaoCounts;
	}

	public void setValidHuabaoMembers(Set<String> validHuabaoMembers) {
		this.validHuabaoMembers = validHuabaoMembers;
	}

	public Set<String> getValidHuabaoMembers() {
		return validHuabaoMembers;
	}

	public void setShopCats(List<T_ShopCat> shopCats) {
		this.shopCats = shopCats;
	}

	public List<T_ShopCat> getShopCats() {
		return shopCats;
	}

	public void setKeywordCats(List<TaobaoKeywordCategory> keywordCats) {
		this.keywordCats = keywordCats;
	}

	public List<TaobaoKeywordCategory> getKeywordCats() {
		return keywordCats;
	}

	public void setBrandCats(List<T_MallBrandCat> brandCats) {
		this.brandCats = brandCats;
	}

	public List<T_MallBrandCat> getBrandCats() {
		return brandCats;
	}

	public void setAdBlogLimit(Integer adBlogLimit) {
		this.adBlogLimit = adBlogLimit;
	}

	public Integer getAdBlogLimit() {
		return adBlogLimit;
	}

	public void setAdPageLimit(Integer adPageLimit) {
		this.adPageLimit = adPageLimit;
	}

	public Integer getAdPageLimit() {
		return adPageLimit;
	}

	public void setDianpuCats(Map<String, List<DianPuCategory>> dianpuCats) {
		this.dianpuCats = dianpuCats;
	}

	public Map<String, List<DianPuCategory>> getDianpuCats() {
		return dianpuCats;
	}

	public void setTempaltes(Map<String, List<LayoutModel>> tempaltes) {
		this.tempaltes = tempaltes;
	}

	public Map<String, List<LayoutModel>> getTempaltes() {
		return tempaltes;
	}

	public void setModules(Map<Long, PageModule> modules) {
		this.modules = modules;
	}

	public Map<Long, PageModule> getModules() {
		return modules;
	}

	public void setYiqifaCats(List<YiqifaCategory> yiqifaCats) {
		this.yiqifaCats = yiqifaCats;
	}

	public List<YiqifaCategory> getYiqifaCats() {
		return yiqifaCats;
	}

	/**
	 * @return the yiqifaMalls
	 */
	public Map<String, YiqifaMall> getYiqifaMalls() {
		return yiqifaMalls;
	}

	/**
	 * @param yiqifaMalls
	 *            the yiqifaMalls to set
	 */
	public void setYiqifaMalls(Map<String, YiqifaMall> yiqifaMalls) {
		this.yiqifaMalls = yiqifaMalls;
	}

}
