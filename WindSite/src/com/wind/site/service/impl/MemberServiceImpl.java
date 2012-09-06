package com.wind.site.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.criterion.R;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.Shop;
import com.taobao.api.domain.ShopScore;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ADPlanCommand;
import com.wind.site.command.impl.SendFeedCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADPlanTag;
import com.wind.site.model.ADPlanTags;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.CoolSite;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.FavoriteForum;
import com.wind.site.model.FavoriteWidget;
import com.wind.site.model.Forum;
import com.wind.site.model.ForumAccount;
import com.wind.site.model.ForumThread;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.Limit;
import com.wind.site.model.MyYiqifaMall;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.Site;
import com.wind.site.model.SiteMap;
import com.wind.site.model.SiteMapCategory;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.UsedCustomeWidget;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;
import com.wind.site.model.W_ShopFavorite;
import com.wind.site.service.IMemberService;
import com.wind.site.util.TaobaoFetchUtil;

/**
 * 会员服务业务实现
 * 
 * @author fxy
 * 
 */
@Transactional
public class MemberServiceImpl extends BaseServiceImpl implements
		IMemberService {

	@SuppressWarnings("unchecked")
	@Override
	public void synMyYiqifaMalls(Long userId, Set<MyYiqifaMall> malls) {
		List<MyYiqifaMall> olds = this.findAllByCriterion(MyYiqifaMall.class,
				R.eq("pk.user_id", userId));// 获取之前版本
		if (olds != null && olds.size() > 0) {
			Collection<MyYiqifaMall> subs = CollectionUtils.subtract(olds,
					malls);// 求差删除无效的
			System.out.println("subs:" + subs);
			if (subs != null && subs.size() > 0) {
				for (MyYiqifaMall m : subs) {
					this.delete(MyYiqifaMall.class, m.getPk());
				}
			}
			for (MyYiqifaMall m : malls) {
				if (!olds.contains(m)) {// 如果不存在，则新增
					this.save(m);// 新增
				}
			}
		} else {
			this.saveAll(malls);// 新增最新的推广
		}
	}

	@Override
	public void deleteSiteMapCategory(Long id) {
		this.deleteAll(SiteMap.class, R.eq("cid", id));// 删除分类下所有地图
		this.delete(SiteMapCategory.class, id);// 删除分类
	}

	@Override
	public void modifySiteMap(List<SiteMapCategory> cats, String userId,
			String nick) {
		for (SiteMapCategory cat : cats) {
			if (cat.getId() != null) {// 更新分类
				SiteMapCategory oCat = this.get(SiteMapCategory.class,
						cat.getId());
				oCat.setSortOrder(cat.getSortOrder());
				oCat.setTitle(cat.getTitle());
				if (SiteMapCategory.CUSTOM.equals(oCat.getType())) {// 自定义
					List<SiteMap> sites = cat.getSites();// 同步分类下的地图
					if (sites != null && sites.size() > 0) {
						for (SiteMap site : sites) {
							if (site.getId() != null) {// 更新
								SiteMap oSite = this.get(SiteMap.class,
										site.getId());
								oSite.setDescription(site.getDescription());
								oSite.setSortOrder(site.getSortOrder());
								oSite.setTitle(site.getTitle());
								oSite.setUrl(site.getUrl());
								this.update(oSite);
							} else {// 新增
								site.setCid(cat.getId());
								this.save(site);
							}
						}
					}
				} else {// 系统
					this.update(oCat);// 更新
				}
			} else {// 新增分类
				cat.setType(SiteMapCategory.CUSTOM);// 自定义类型
				cat.setNick(nick);
				cat.setUser_id(userId);
				this.save(cat);// 新增分类
				List<SiteMap> sites = cat.getSites();// 同步分类下的地图
				if (sites != null && sites.size() > 0) {
					for (SiteMap site : sites) {
						// 新增地图
						site.setCid(cat.getId());
						this.save(site);
					}
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> findUserTemplates(String userId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", userId);
		params.put("isDefault", false);
		List<Map<String, Object>> ts = (List<Map<String, Object>>) this
				.findByHql(
						"select new map(id as id,user_id as user_id,name as name,status as status,created as created) from UserTemplate where user_id=:userId and isDefault=:isDefault",
						params);
		if (ts != null && ts.size() > 0) {
			for (Map<String, Object> t : ts) {
				t.put("path", ((Date) (t.get("created"))).getTime() + ".html");
			}
		}
		return ts;
	}

	@Override
	public Integer countADPlan(String userId, String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("type", type);
		return ((Long) this
				.findByHql(
						"select count(t) from ADPlan t where t.createdBy=:userId and type=:type",
						map).get(0)).intValue();

	}

	@Override
	public void addADPlan(ADPlan plan, List<TaobaokeItem> items, String tags) {
		Integer count = this.countADPlan(EnvManager.getUser().getUser_id(),
				plan.getType());
		Integer limit = 0;
		if (plan.getType().equals("index")) {
			limit = EnvManager.getUser().getLimit().getIndexAds();
		} else if (plan.getType().equals("blog")) {
			limit = EnvManager.getUser().getLimit().getBlogAds();
		}
		if (count >= limit) {
			SystemException.handleMessageException("广告计划限额不足");
		}
		if (items == null || items.size() != 5) {
			SystemException.handleMessageException("广告计划添加的推广商品数量不足5个");
		}
		this.save(plan);
		/**
		 * 处理广告计划标签
		 */
		if (StringUtils.isNotEmpty(tags)) {
			String[] tagArray = tags.split(" ");
			ADPlanTag tag = null;
			for (String tagStr : tagArray) {
				if (StringUtils.isEmpty(tagStr)) {
					continue;
				}
				tag = this.findByCriterion(ADPlanTag.class,
						R.eq("name", tagStr));
				if (tag == null) {// 新增标签
					tag = new ADPlanTag();
					tag.setName(tagStr);
					tag.setNums(1);
					this.save(tag);
				} else {// 更新标签所含广告计划数量
					Integer nums = tag.getNums();
					if (nums == null) {
						nums = 0;
					}
					tag.setNums(nums + 1);
					this.update(tag);
				}
				ADPlanTags planTags = new ADPlanTags();
				planTags.setPid(plan.getId());
				planTags.setTid(tag.getId());
				this.save(planTags);
			}
		}
		/**
		 * 处理推广商品
		 */
		ADTaobaokeItem adItem = null;
		Boolean isFirst = true;
		for (TaobaokeItem item : items) {
			adItem = new ADTaobaokeItem();
			TaobaoFetchUtil.convertItems(adItem, item);
			adItem.setPlanid(plan.getId());
			this.save(adItem);
			if (isFirst) {
				plan.setItemid(adItem.getId());
				this.update(plan);
			} else {
				isFirst = false;
			}
		}
		if (plan.getIsDefault()) {
			/**
			 * 查找是否已有主推广计划，【指定类型，指定用户的主推广计划】
			 */
			List<ADPlan> defaultPlans = this.findAllByCriterion(ADPlan.class,
					R.eq("type", plan.getType()), R.eq("isDefault", true),
					R.eq("createdBy", EnvManager.getUser().getUser_id()),
					R.not(R.eq("id", plan.getId())));
			if (defaultPlans == null || defaultPlans.size() == 0) {// 如果尚未设置主推广计划，则处理该主推广广告计划
				ADPlanCommand command = new ADPlanCommand();// 产生广告投放异步命令
				command.setPlan(plan);
				CommandExecutor.getCommands().add(command);
			} else {// 将其他已设置主推的取消
				for (ADPlan p : defaultPlans) {
					p.setIsDefault(false);
				}
			}
		}
	}

	@Override
	public void updateADPlan(ADPlan plan, List<TaobaokeItem> items,
			String tags, Boolean isDefault) {
		if (items == null || items.size() != 5) {
			SystemException.handleMessageException("广告计划添加的推广商品数量不足5个");
		}
		plan.setIsDefault(isDefault);
		/**
		 * 处理广告计划标签
		 */
		List<ADPlanTags> planTagsList = this.findAllByCriterion(
				ADPlanTags.class, R.eq("pid", plan.getId()));
		if (planTagsList != null && planTagsList.size() > 0) {
			for (ADPlanTags planTags : planTagsList) {
				ADPlanTag tag = this.get(ADPlanTag.class, planTags.getTid());
				if (tag != null) {
					Integer nums = tag.getNums();
					if (nums == null || nums < 1) {
						nums = 1;
					}
					tag.setNums(nums - 1);// 减少标签计数
				}
				this.delete(ADPlanTags.class, planTags.getId());// 删除关系
			}
		}
		// 重新添加标签并计数，并建立关系
		if (StringUtils.isNotEmpty(tags)) {
			String[] tagArray = tags.split(" ");
			ADPlanTag tag = null;
			for (String tagStr : tagArray) {
				if (StringUtils.isEmpty(tagStr)) {
					continue;
				}
				tag = this.findByCriterion(ADPlanTag.class,
						R.eq("name", tagStr));
				if (tag == null) {// 新增标签
					tag = new ADPlanTag();
					tag.setName(tagStr);
					tag.setNums(1);
					this.save(tag);
				} else {// 更新标签所含广告计划数量
					Integer nums = tag.getNums();
					if (nums == null || nums < 0) {
						nums = 0;
					}
					tag.setNums(nums + 1);
					this.update(tag);
				}
				ADPlanTags planTags = new ADPlanTags();
				planTags.setPid(plan.getId());
				planTags.setTid(tag.getId());
				this.save(planTags);
			}
		}
		/**
		 * 处理推广商品
		 */
		this.deleteAll(ADTaobaokeItem.class, R.eq("planid", plan.getId()));// 删除计划内所有推广商品
		ADTaobaokeItem adItem = null;
		Boolean isFirst = true;
		for (TaobaokeItem item : items) {// 重新添加新的推广商品
			adItem = new ADTaobaokeItem();
			TaobaoFetchUtil.convertItems(adItem, item);
			adItem.setPlanid(plan.getId());
			this.save(adItem);
			if (isFirst) {
				plan.setItemid(adItem.getId());
				this.update(plan);
			} else {
				isFirst = false;
			}
		}
		if (isDefault) {
			/**
			 * 查找是否已有主推广计划，【指定类型，指定用户的主推广计划】
			 */
			List<ADPlan> defaultPlans = this.findAllByCriterion(ADPlan.class,
					R.eq("type", plan.getType()), R.eq("isDefault", true),
					R.eq("createdBy", EnvManager.getUser().getUser_id()),
					R.not(R.eq("id", plan.getId())));
			if (!plan.getIsDefault()
					&& (defaultPlans == null || defaultPlans.size() == 0)) {// 如果尚未设置主推广计划，则处理该主推广广告计划
				// TODO 正常修改需要处理不产生异常事件
				ADPlanCommand command = new ADPlanCommand();// 产生广告投放异步命令
				command.setPlan(plan);
				CommandExecutor.getCommands().add(command);
			} else {// 将其他已设置主推的取消
				for (ADPlan p : defaultPlans) {
					p.setIsDefault(false);
				}
			}
		}
		this.update(plan);// 更新计划基本信息
	}

	@Override
	public Integer countMyXintaoLink(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		return ((Long) this.findByHql(
				"select count(t) from XintaoLink t where t.createdBy=:userId",
				map).get(0)).intValue();
	}

	@Override
	public void createDomainName(String sid, String domainName) {
		Site site = this.get(Site.class, sid);
		if (site == null) {
			SystemException.handleMessageException("未找到指定站点");
		}
		if (!site.getDomainName().startsWith("shop")) {
			SystemException.handleMessageException("您的站点已经配置二级域名【"
					+ site.getDomainName() + "】");
		}
		domainName = domainName.toLowerCase();
		List<Site> sites = this.findAllByCriterion(Site.class,
				R.eq("domainName", domainName));
		if (sites.size() > 0) {
			SystemException.handleMessageException("自定义二级域名【" + domainName
					+ "】重复,请重新输入");
		}
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "seconddomain.txt", true);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(domainName + ".xintaonet.com" + "					http://shop"
					+ site.getUser_id() + ".xintaonet.com");
			bw.newLine();
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			SystemException.handleMessageException(e);
		}
		site.setDomainName(domainName);
		EnvManager.getUser().getSites().get(0).setDomainName(domainName);
	}

	@Override
	public void checkWWW(DomainHistory dh) {
		this.update(dh);
		if (dh.getStatus() == 1) {// 审核通过
			Site site = this.get(Site.class, dh.getSite_id());
			if (site == null) {
				SystemException.handleMessageException("未找到指定站点");
			}
			if (StringUtils.isNotEmpty(site.getWww())) {
				SystemException.handleMessageException("指定站点已配置独立域名");
			}
			site.setWww(dh.getWww());
			try {
				FileWriter fw = new FileWriter(EnvManager.getApachePath()
						+ File.separator + "domain.txt", true);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(dh.getWww() + "					http://shop" + dh.getUser_id()
						+ ".xintaonet.com");
				bw.newLine();
				bw.flush();
				bw.close();
				fw.close();
			} catch (IOException e) {
				SystemException.handleMessageException(e);
			}
		}
	}

	@Override
	public void addThread(ForumThread thread) {
		// 当前收藏阵地推广记录加1
		FavoriteForum ff = this.get(FavoriteForum.class, thread.getFav()
				.getId());
		Integer fThreads = ff.getThreads();
		if (fThreads == null || fThreads < 0) {
			ff.setThreads(1);
		} else {
			ff.setThreads(fThreads + 1);
		}
		// 当前阵地推广记录加1
		Forum forum = ff.getForum();
		Integer threads = forum.getThreads();
		if (threads == null || threads < 0) {
			forum.setThreads(1);
		} else {
			forum.setThreads(threads + 1);
		}
		this.save(thread);
		if (EnvManager.getUser().getUc_id() != null) {// 生成动态命令
			SendFeedCommand command = new SendFeedCommand();
			command.setUsername(EnvManager.getUser().getNick());
			command.setUid(EnvManager.getUser().getUc_id());
			Map<String, Object> title_data = new HashMap<String, Object>();
			String feed = EnvManager.getUser().getNick()
					+ "又开始了新的一轮淘宝客推广，快去看看吧！";
			title_data.put("feed", feed);
			command.setTitle_template("<b>{feed}</b>");
			command.setTitle_data(title_data);
			Map<String, Object> body_data = new HashMap<String, Object>();
			String title = "<a href='"
					+ thread.getUrl()
					+ "' style='color:#F60' target='_blank'>"
					+ thread.getTitle()
					+ "</a>--【<a href='"
					+ (thread.getFav().getForum().getRealUrl() != null ? thread
							.getFav().getForum().getRealUrl() : thread.getFav()
							.getForum().getUrl()) + "' target='_blank'>"
					+ thread.getFav().getForum().getTitle() + "</a>】";
			Site site = EnvManager.getUser().getSites().get(0);
			String description = "";
			if (site.getStatus() == 1) {// 已发布
				description += "新淘购物站点:<a href='http://shop"
						+ EnvManager.getUser().getUser_id()
						+ ".xintaonet.com' target='_blank'>"
						+ site.getTitle()
						+ "</a><p>"
						+ (StringUtils.isNotEmpty(thread.getDescription()) ? thread
								.getDescription() : (StringUtils
								.isNotEmpty(site.getDescription()) ? site
								.getDescription() : "")) + "</p>";
			}
			body_data.put("title", title);
			body_data.put("description", description);
			command.setBody_template("<b>{title}</b><br>{description}");
			command.setBody_data(body_data);

			CommandExecutor.getCommands().add(command);
		}
	}

	@Override
	public void deleteThread(String tid) {
		ForumThread thread = this.get(ForumThread.class, tid);
		if (thread != null) {
			if (!thread.getCreatedBy()
					.equals(EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您无权删除此条推广记录!");
			}
			// 当前收藏阵地推广记录减1
			FavoriteForum ff = thread.getFav();
			Integer fThreads = ff.getThreads();
			if (fThreads == null || fThreads < 0) {
				ff.setThreads(0);
			} else {
				ff.setThreads(fThreads - 1);
			}
			// 当前阵地推广记录减1
			Forum forum = thread.getFav().getForum();
			Integer threads = forum.getThreads();
			if (threads == null || threads < 0) {
				forum.setThreads(0);
			} else {
				forum.setThreads(threads - 1);
			}
			this.delete(ForumThread.class, tid);
		}
	}

	@Override
	public void deleteAccount(String aid) {
		ForumAccount account = this.get(ForumAccount.class, aid);
		if (account != null) {
			if (!account.getCreatedBy().equals(
					EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您无权删除此推广阵地!");
			}
			// this.deleteAll(ForumThread.class, R.eq("account.id", aid));//
			// 删除当前帐号关联的推广
			this.delete(ForumAccount.class, aid);// 删除当前帐号
		}

	}

	@Override
	public void deleteMyFavoriteForum(String ffid) {
		FavoriteForum ff = this.get(FavoriteForum.class, ffid);
		if (ff != null) {
			if (!ff.getCreatedBy().equals(EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您无权删除此推广阵地!");
			}
			Forum f = ff.getForum();
			Integer favorite = f.getFavorite();
			if (favorite == null) {
				favorite = 0;
			}
			f.setFavorite(favorite - 1);// 减少一个收藏
			Integer thread = f.getThreads();
			// 当前会员在该阵地下的推广记录
			List<ForumThread> threads = this.findAllByCriterion(
					ForumThread.class, R.eq("fav.id", ffid));
			if (thread == null) {// 减少该阵地下的推广记录数
				f.setThreads(0);
			} else {
				f.setThreads(thread - threads.size());
			}
			// 删除当前会员在该阵地下所有推广记录
			if (threads.size() > 0) {
				this.deleteAll(ForumThread.class, R.eq("fav.id", ffid));
			}
			this.delete(FavoriteForum.class, ff.getId());
		}

	}

	@Override
	public void addMyFavoriteForum(String fid, String type) {
		Limit limit = EnvManager.getUser().getLimit();
		if (limit.getFavForums() <= this.countFavoriteWidgetByUserId(EnvManager
				.getUser().getUser_id())) {
			SystemException.handleMessageException("您的收藏限额不足。无法添加收藏");
		}
		Forum forum = this.get(Forum.class, fid);
		if (forum == null) {
			SystemException.handleMessageException("当前阵地不存在");
		}
		FavoriteForum ff = new FavoriteForum();
		ff.setUser_id(EnvManager.getUser().getUser_id());
		ff.setForum(forum);
		ff.setNick(EnvManager.getUser().getNick());
		ff.setType(type);
		ff.setThreads(0);
		Integer favorite = forum.getFavorite();
		if (favorite == null) {
			favorite = 0;
		}
		forum.setFavorite(favorite + 1);// 收藏数加1
		this.save(ff);
	}

	@Override
	public Integer countMyFavoriteForumByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		List<?> result = this.findByHql(
				"select count(id) from FavoriteForum where user_id=:userId",
				map);
		if (result.size() == 1) {
			Object obj = result.get(0);
			if (obj != null) {
				return ((Long) obj).intValue();
			}
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getMyFavoriteForumIds(String userId, String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("type", type);
		String hql = "select f.forum.id from FavoriteForum f where f.user_id=:userId and type=:type";
		List<String> ids = (List<String>) this.findByHql(hql, map);
		if (ids.size() > 0) {
			Iterator<String> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append(i.next());
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return "";
	}

	@Override
	public List<FavoriteWidget> getFavoriteWidget(Page<FavoriteWidget> page,
			String cwid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("cwid", cwid);
		String hql = "from FavoriteWidget where widget.id=:cwid order by createdBy desc";
		return this.findByHql(page, hql, params);
	}

	@Override
	public List<UsedCustomeWidget> getUsedCustomeWidget(
			Page<UsedCustomeWidget> page, String cwid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("cwid", cwid);
		String hql = "from UsedCustomeWidget where widget.id=:cwid order by createdBy desc";
		return this.findByHql(page, hql, params);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getUcidsByUsedWidget(String cwid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("cwid", cwid);
		String hql = "select u.uc_id from User as u,UsedCustomeWidget as ucw where ucw.widget.id=:cwid and u.user_id=ucw.user_id and u.uc_id is not null";
		List<Integer> ids = (List<Integer>) this.findByHql(hql, params);
		if (ids.size() > 0) {
			Iterator<Integer> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append(i.next());
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return null;
	}

	@Override
	public void deleteCustomeWidget(CustomeWidget widget) {
		// 删除已收藏
		this.deleteAll(FavoriteWidget.class, R.eq("widget.id", widget.getId()));
		// 删除自身
		this.delete(CustomeWidget.class, widget.getId());

	}

	@Override
	public void deleteMyFavoriteWidget(String cwid) {
		FavoriteWidget fw = this.findByCriterion(FavoriteWidget.class,
				R.eq("widget.id", cwid),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (fw != null) {
			CustomeWidget cw = fw.getWidget();
			Integer favorite = cw.getFavorite();
			if (favorite == null) {
				favorite = 0;
			}
			cw.setFavorite(favorite - 1);
			this.delete(FavoriteWidget.class, fw.getId());
		}
	}

	@Override
	public void createCustomeWidget(CustomeWidget widget) {
		Boolean isDesigner = EnvManager.getUser().getIsWidgetDesigner();
		if (isDesigner == null || !isDesigner) {// 如果还不是设计师
			User user = this.get(User.class, EnvManager.getUser().getId());
			user.setIsWidgetDesigner(true);
		}
		Limit limit = EnvManager.getUser().getLimit();
		if (limit.getWidgets() <= this.countCustomeWidgetByUserId(EnvManager
				.getUser().getUser_id())) {
			SystemException.handleMessageException("您的收藏限额不足。无法添加收藏");
		}
		this.save(widget);
	}

	@Override
	public void addMyFavoriteWidget(String cwid) {
		Limit limit = EnvManager.getUser().getLimit();
		if (limit.getFavWidgets() <= this
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您的收藏限额不足。无法添加收藏");
		}
		CustomeWidget cw = this.get(CustomeWidget.class, cwid);
		if (cw == null) {
			SystemException.handleMessageException("当前组件不存在");
		}
		if (cw.getCreatedBy().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("自己不能收藏自己的组件");
		}
		FavoriteWidget fw = new FavoriteWidget();
		fw.setUser_id(EnvManager.getUser().getUser_id());
		fw.setWidget(cw);
		fw.setNick(EnvManager.getUser().getNick());
		Integer favorite = cw.getFavorite();
		if (favorite == null) {
			favorite = 0;
		}
		cw.setFavorite(favorite + 1);
		this.save(fw);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getMyFavoriteIds(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		String hql = "select f.widget.id from FavoriteWidget f where f.user_id=:userId";
		List<String> ids = (List<String>) this.findByHql(hql, map);
		if (ids.size() > 0) {
			Iterator<String> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append(i.next());
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return "";
	}

	@Override
	public Integer countAllFavoriteWidgetByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		List<?> result = this
				.findByHql(
						"select sum(favorite) from CustomeWidget where createdBy=:userId and favorite is not null",
						map);
		if (result.size() == 1) {
			Object obj = result.get(0);
			if (obj != null) {
				return ((Long) obj).intValue();
			}
		}
		return 0;
	}

	@Override
	public Integer countAllUsedWidgetByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		List<?> result = this
				.findByHql(
						"select sum(used) from CustomeWidget where createdBy=:userId and used is not null",
						map);
		if (result.size() == 1) {
			Object obj = result.get(0);
			if (obj != null) {
				return ((Long) obj).intValue();
			}
		}
		return 0;
	}

	@Override
	public Integer countCustomeWidget() {
		return ((Long) this.findByHql(
				"select count(t) from CustomeWidget t where t.friend=0",
				new HashMap<String, Object>()).get(0)).intValue();
	}

	@Override
	public Integer countFavoriteWidgetByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		return ((Long) this.findByHql(
				"select count(t) from FavoriteWidget t where user_id=:userId",
				map).get(0)).intValue();
	}

	@Override
	public Integer countWidget() {
		return ((Long) this.findByHql("select count(t) from Widget t",
				new HashMap<String, Object>()).get(0)).intValue();
	}

	@Override
	public Integer countCustomeWidgetByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		return ((Long) this.findByHql(
				"select count(t) from CustomeWidget t where createdBy=:userId",
				map).get(0)).intValue();
	}

	@Override
	public void addItem2ItemGroup(String numiids, String gid) {
		List<TaobaokeItem> items = TaobaoFetchUtil.itemsConvert(EnvManager
				.getUser().getAppKey(), EnvManager.getUser().getAppSecret(),
				EnvManager.getUser().getAppType(), numiids, EnvManager
						.getUser().getNick(), EnvManager.getUser().getPid());
		Integer count = this.countItemsByGid(gid);
		if (items != null && items.size() > 0 && count < 30) {
			Integer length = items.size();
			if (length > (30 - count)) {// 如果大于可放入的商品
				length = 30 - count;
			}
			for (int j = 0; j < length; j++) {
				TaobaokeItem i = items.get(j);
				T_TaobaokeItem item = this.findByCriterion(
						T_TaobaokeItem.class, R.eq("num_iid", i.getNumIid()),
						R.eq("gid", gid));
				if (item == null) {// 新增
					item = new T_TaobaokeItem();
					TaobaoFetchUtil.convertItems(item, i);
					item.setGid(gid);
					item.setIsValid(true);
					item.setIsRss(false);
					item.setSortOrder(0);
					this.save(item);
				} else {// 更新
					TaobaoFetchUtil.convertItems(item, i);
				}
			}
		}
	}

	@Override
	public void addShop(String nick) {
		Shop shop = TaobaoFetchUtil.getTaobaoShop("0", nick);
		if (shop != null) {
			List<TaobaokeShop> shops = TaobaoFetchUtil
					.convertTaobaoShop(null, null, "0", "fxy060608",
							String.valueOf(shop.getSid()), null);
			if (shops != null && shops.size() == 1) {
				TaobaokeShop tShop = shops.get(0);
				T_TaobaokeShop oShop = this.get(T_TaobaokeShop.class,
						tShop.getUserId());
				if (oShop != null) {// 更新
					oShop.setCid(shop.getCid());
					oShop.setTitle(shop.getTitle());
					oShop.setPicPath(shop.getPicPath());
					oShop.setSid(shop.getSid());
					oShop.setNick(shop.getNick());
					ShopScore score = shop.getShopScore();
					if (score != null) {
						oShop.setItemScore(score.getItemScore());
						oShop.setServiceScore(score.getServiceScore());
						oShop.setDeliveryScore(score.getDeliveryScore());
					}
					oShop.setCommissionRate(tShop.getCommissionRate());
					oShop.setIsValid(true);
					this.update(oShop);
				} else {// 新增
					oShop = new T_TaobaokeShop();
					oShop.setUserId(tShop.getUserId());
					oShop.setCid(shop.getCid());
					oShop.setTitle(shop.getTitle());
					oShop.setPicPath(shop.getPicPath());
					oShop.setSid(shop.getSid());
					oShop.setNick(shop.getNick());
					ShopScore score = shop.getShopScore();
					if (score != null) {
						oShop.setItemScore(score.getItemScore());
						oShop.setServiceScore(score.getServiceScore());
						oShop.setDeliveryScore(score.getDeliveryScore());
					}
					oShop.setCommissionRate(tShop.getCommissionRate());
					oShop.setIsValid(true);
					this.save(oShop);
				}
			} else {
				SystemException.handleMessageException("您选择要添加的店铺【"
						+ shop.getTitle() + "】尚未加入淘宝客推广计划！");
			}
		} else {
			SystemException.handleMessageException("您选择要添加的店铺卖家【" + nick
					+ "】不存在！");
		}
	}

	@Override
	public void deleteShopFav(Long gid, String ids) {
		String[] idArray = ids.split(",");
		for (String id : idArray) {
			if (StringUtils.isNotEmpty(id)) {
				this.deleteAll(W_ShopFavorite.class,
						R.eq("user_id", Long.valueOf(id)), R.eq("gid", gid));
			}
		}
	}

	@Override
	public void addShopFav(Long gid, String[] ids) {
		if (ids.length > 0)
			for (String id : ids) {
				if (StringUtils.isNotEmpty(id)) {
					W_ShopFavorite sf = this.findByCriterion(
							W_ShopFavorite.class,
							R.eq("gid", Long.valueOf(gid)),
							R.eq("user_id", Long.valueOf(id)));
					if (sf == null) {
						sf = new W_ShopFavorite();
						sf.setGid(gid);
						sf.setUser_id(Long.valueOf(id));
						this.save(sf);
					}
				}
			}
	}

	@Override
	public void setSiteIndex(String tid, FreeMarkerConfigurer fcg,
			IDeployZone deployZone, WidgetCustomerMethod widgetCustomer) {
		UserTemplate index = this.findByCriterion(UserTemplate.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.isNull("parent"));
		if (index != null) {
			UserTemplate current = this.get(UserTemplate.class, tid);
			if (current != null) {// 准备替换
				current.setParent(null);
				current.setIsDefault(true);
				index.setParent(current.getId());
				index.setIsDefault(false);
				deployZone.deploy(fcg, EnvManager.getUser().getUser_id(),
						current.getId(), widgetCustomer);// 部署新首页
				deployZone.deploy(fcg, EnvManager.getUser().getUser_id(),
						index.getId(), widgetCustomer);// 部署旧首页
			}
		}
	}

	@Override
	public void addTemplate(UserTemplate template) {
		this.save(template);
		template.setPageid(template.getCreated().getTime() + "");
		this.update(template);
	}

	@Override
	public void updateCoolSite(String sid) {
		Site site = this.get(Site.class, sid);
		if (site == null) {
			SystemException.handleMessageException("淘站不存在");
		} else {
			if (!site.getUser_id().equals(EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您无权限上传该站点缩略图");
			}
		}
		CoolSite coolSite = this.findByCriterion(CoolSite.class,
				R.eq("site.id", sid));
		if (coolSite != null) {
			coolSite.setIsValid(false);
			coolSite.setRemark(null);
		} else {
			coolSite = new CoolSite();
			coolSite.setSite(site);
			coolSite.setIsValid(false);
			coolSite.setUser_id(EnvManager.getUser().getUser_id());
			this.save(coolSite);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_TaobaokeItem> getItems(String gid, String sortBy) {
		if (sortBy == null) {
			sortBy = "sortOrder asc";
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("gid", gid);
		List<T_TaobaokeItem> items = (List<T_TaobaokeItem>) this.findByHql(
				"from T_TaobaokeItem i where i.gid=:gid order by " + sortBy
						+ ",sortOrder asc", params);// 查询指定推广组的商品(排序)
		return items;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_TaobaokeShop> getShops(Long gid, String sortBy,
			Boolean isValid) {
		if (sortBy == null) {
			sortBy = "sellerCredit*1 desc";
		}
		if (sortBy.indexOf("commissionRate") != -1) {
			sortBy = "commissionRate*1 desc";
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select s from T_TaobaokeShop s,W_ShopFavorite sf where sf.gid=:gid and s.userId=sf.user_id ";
		if (isValid) {
			params.put("isValid", true);
			hql += " and s.isValid=:isValid ";
		}
		hql += " order by s." + sortBy;
		params.put("gid", gid);
		List<T_TaobaokeShop> shops = (List<T_TaobaokeShop>) this.findByHql(hql,
				params);// 查询指定推广组的商品(排序)
		return shops;
	}

	@Override
	public void updateItemsSorts(String[] items) {
		for (int i = 0; i < items.length; i++) {
			T_TaobaokeItem item = this.get(T_TaobaokeItem.class, items[i]);
			if (item != null) {
				item.setSortOrder(i);
			}
		}
	}

	@Transactional
	@Override
	public void saveTaobaokeItems(Set<T_TaobaokeItem> items) {
		// 第一步:转换商品(检测是否有效,加入outer_id)

		String num_iids = "";
		for (T_TaobaokeItem item : items) {
			num_iids += item.getNum_iid() + ",";
		}
		if (num_iids.length() == 0) {
			return;
		}
		List<TaobaokeItem> tItems = TaobaoFetchUtil.itemsConvert(EnvManager
				.getUser().getAppKey(), EnvManager.getUser().getAppSecret(),
				EnvManager.getUser().getAppType(), num_iids.substring(0,
						num_iids.length() - 1), null, null);
		if (tItems == null) {
			tItems = new ArrayList<TaobaokeItem>();
		}
		Set<T_TaobaokeItem> itemsSet = new HashSet<T_TaobaokeItem>();
		for (T_TaobaokeItem item : items) {
			Boolean isValid = false;
			for (TaobaokeItem tItem : tItems) {
				if (item.getNum_iid().longValue() == tItem.getNumIid()
						.longValue()) {
					TaobaoFetchUtil.convertItems(item, tItem);
					isValid = true;
					break;
				}
			}
			item.setIsValid(isValid);
			// 查询当前淘客是否已有此商品
			T_TaobaokeItem oldItem = this.findByCriterion(T_TaobaokeItem.class,
					R.eq("num_iid", item.getNum_iid()),
					R.eq("gid", item.getGid()));
			if (oldItem != null) {// 如果存在,将当前商品最新信息同步至数据库
				TaobaoFetchUtil.convertItems(oldItem, item);
				oldItem.setIsValid(true);
			} else {// 如果不存在
				itemsSet.add(item);
			}
		}
		if (itemsSet.size() > 0) {
			this.saveAll(itemsSet);
		}

	}

	@Transactional
	@Override
	public ItemGroup renameItemGroup(String id, String name) {
		ItemGroup group = null;
		if (id != null) {
			if (StringUtils.isNotEmpty(name)) {
				ItemGroup oldGroup = this.findByCriterion(ItemGroup.class,
						R.eq("name", name),
						R.eq("user_id", EnvManager.getUser().getUser_id()));
				if (oldGroup != null) {
					SystemException.handleMessageException("重命名推广组[" + name
							+ "]冲突，请重新命名");
				}
				group = this.get(ItemGroup.class, id);
				if (group != null) {
					group.setName(name);
				} else {
					SystemException.handleMessageException("推广组[" + id
							+ "]不存在！");
				}
			} else {
				SystemException.handleMessageException("未指定推广组名称！");
			}
		} else {
			SystemException.handleMessageException("未指定推广组！");
		}
		return group;
	}

	@Transactional
	@Override
	public ShopGroup renameShopGroup(Long id, String name) {
		ShopGroup group = null;
		if (id != null) {
			if (StringUtils.isNotEmpty(name)) {
				ShopGroup oldGroup = this.findByCriterion(ShopGroup.class,
						R.eq("name", name),
						R.eq("user_id", EnvManager.getUser().getUser_id()));
				if (oldGroup != null) {
					SystemException.handleMessageException("重命名店铺分组[" + name
							+ "]冲突，请重新命名");
				}
				group = this.get(ShopGroup.class, id);
				if (group != null) {
					group.setName(name);
				} else {
					SystemException.handleMessageException("店铺分组[" + id
							+ "]不存在！");
				}
			} else {
				SystemException.handleMessageException("未指定店铺分组名称！");
			}
		} else {
			SystemException.handleMessageException("未指定店铺分组！");
		}
		return group;
	}

	@Transactional
	@Override
	public void moveItemGroup(String gid, String itemIds) {
		for (String id : itemIds.split(",")) {
			T_TaobaokeItem item = this.get(T_TaobaokeItem.class, id);
			if (item != null) {
				item.setGid(gid);
			}
		}

	}

	@Transactional
	@Override
	public Integer countItemsByGid(String gid) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("gid", gid);
		return ((Long) this.findByHql(
				"select count(t) from T_TaobaokeItem t where gid=:gid", map)
				.get(0)).intValue();
	}

	@Override
	public Integer countShopGroups(String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userid);
		return ((Long) this.findByHql(
				"select count(t) from ShopGroup t where user_id=:userId", map)
				.get(0)).intValue();
	}

	@Transactional
	@Override
	public void deleteItemGroup(String gid) {
		this.deleteAll(T_TaobaokeItem.class, R.eq("gid", gid));// 删除关联商品
		this.deleteAll(ItemGroupDoctor.class, R.eq("group.id", gid));// 删除关联检测结果
		this.delete(ItemGroup.class, gid);
	}

	@Override
	public void deleteShopGroup(Long id) {
		this.deleteAll(W_ShopFavorite.class, R.eq("gid", id));// 删除关联的店铺收藏关系
		this.delete(ShopGroup.class, id);// 删除店铺分组
	}

	@Transactional
	@Override
	public void deleteItemsFromItemGroup(String itemIds) {
		for (String itemId : itemIds.split(",")) {// 删除商品
			this.delete(T_TaobaokeItem.class, itemId);
		}
	}

	@Override
	public void deleteInvalidItemsByItemGroup(String id) {
		ItemGroup group = this.get(ItemGroup.class, id);
		if (group == null) {
			SystemException.handleMessageException("推广组[" + id + "]不存在！");
		}
		if (!group.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权删除[" + group.getName()
					+ "]中的无效商品！");
		}
		this.deleteAll(T_TaobaokeItem.class, R.eq("gid", id),
				R.eq("isValid", false));
		// 修改检测状态及结果
		ItemGroupDoctor doctor = this.findByCriterion(ItemGroupDoctor.class,
				R.eq("group.id", id));
		if (doctor != null) {
			doctor.setState(ItemGroupDoctor.STATE_SUCCESS);
			doctor.setMsg("共有<span style='color:red;font-weight:bold;'>[" + 0
					+ "]</span>件商品无效");
		}

	}

	@Transactional
	@Override
	public Integer countItemGroupDoctor(String uid, String state) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("state", state);
		return ((Long) findByHql(
				"select count(i) from ItemGroupDoctor i where user_id=:uid and state=:state",
				map).get(0)).intValue();
	}

	@Transactional
	@Override
	public Integer countFavShops(Long gid) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("gid", gid);
		return ((Long) findByHql(
				"select count(i) from W_ShopFavorite i where gid=:gid", map)
				.get(0)).intValue();
	}

	@Transactional
	@Override
	public Boolean isProcessingItemGroupDoctor(String uid) {
		if (countItemGroupDoctor(uid, ItemGroupDoctor.STATE_WAIT) > 0)
			return true;
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ItemGroupDoctor> getItemGroupDoctors(String uid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("user_id", EnvManager.getUser().getUser_id());
		List<ItemGroupDoctor> doctors = (List<ItemGroupDoctor>) this
				.findByHql(
						"from ItemGroupDoctor where user_id=:user_id order by group.name",
						params);
		if (doctors.size() > 0) {
			for (ItemGroupDoctor doctor : doctors) {
				try {
					doctor.getGroup().setCount(
							this.countItemsByGid(doctor.getGroup().getId()));// 设置商品数
				} catch (ObjectNotFoundException e) {// 如果推广组已经被删除
					this.getHibernateSession().delete(doctor);// 则删除此推广组检测结果
					doctors.remove(doctor);// 移除
				}
			}
		}
		return doctors;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	@Override
	public List<ItemGroupDoctor> itemGroupDoctor(String uid) {
		List<ItemGroupDoctor> doctors = new ArrayList<ItemGroupDoctor>();
		// 第一步:删除以前的检测结果
		this.deleteAll(ItemGroupDoctor.class, R.eq("user_id", uid));
		// 第二步:生成本次检测结果
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("user_id", EnvManager.getUser().getUser_id());
		List<ItemGroup> groups = (List<ItemGroup>) this.findByHql(
				"from ItemGroup where user_id=:user_id order by name", params);
		if (groups.size() > 0) {
			for (ItemGroup group : groups) {
				List<T_TaobaokeItem> items = this.getItems(group.getId(), null);
				if (items.size() > 0) {
					group.setItems(items);
					group.setCount(items.size());
					ItemGroupDoctor doctor = new ItemGroupDoctor();
					doctor.setGroup(group);
					doctor.setState(ItemGroupDoctor.STATE_WAIT);
					doctor.setUser_id(uid);
					doctors.add(doctor);
				}
			}
			this.saveAll(doctors);// 保存本次检测
		}
		return doctors;
	}

	/**
	 * 同步PID
	 * 
	 * @param user
	 */
	public void synPID(String id) {
		User user = this.get(User.class, id);
		if (user == null) {
			SystemException.handleMessageException("用户[" + id + "]不存在");
		}
		TaobaokeCaturlGetRequest request = new TaobaokeCaturlGetRequest();
		request.setCid(0L);
		request.setNick(user.getNick());
		request.setOuterCode(EnvManager.getCatsOuterCode());
		try {
			String url = TaobaoFetchUtil.getItemCatUrl(null, null, "0",
					request, user.getPid());
			String pid = StringUtils.substringBetween(url, "&p=", "&u=");
			if (StringUtils.isNotEmpty(pid)) {
				user.setPid(pid);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public User synUser(String userId, String nick) {
		com.taobao.api.domain.User tUser = TaobaoFetchUtil.getTaobaoUser(
				EnvManager.getUser().getAppType(), userId, nick);
		User user = this.findByCriterion(User.class, R.eq("user_id", userId));
		user.setAlipay_account(tUser.getAlipayAccount());
		user.setAlipay_bind(tUser.getAlipayBind());
		user.setAlipay_no(tUser.getAlipayNo());
		user.setAuto_repost(tUser.getAutoRepost());
		user.setBirthday(tUser.getBirthday());
		// TODO 暂时屏蔽信用
		// UserCredit bCredit = tUser.getBuyerCredit();
		// this.deleteAll(T_UserCredit.class, R.eq("createdBy", userId));
		// if (bCredit != null) {
		// T_UserCredit tbCredit = new T_UserCredit();
		// tbCredit.setLevel(bCredit.getLevel().intValue());
		// tbCredit.setGoodNum(bCredit.getGoodNum().intValue());
		// tbCredit.setScore(bCredit.getScore().intValue());
		// tbCredit.setTotalNum(bCredit.getTotalNum().intValue());
		// user.setBuyer_credit(tbCredit);
		// }
		// UserCredit sCredit = tUser.getSellerCredit();
		// if (sCredit != null) {
		// T_UserCredit tsCredit = new T_UserCredit();
		// tsCredit.setLevel(sCredit.getLevel().intValue());
		// tsCredit.setGoodNum(sCredit.getGoodNum().intValue());
		// tsCredit.setScore(sCredit.getScore().intValue());
		// tsCredit.setTotalNum(sCredit.getTotalNum().intValue());
		// user.setSeller_credit(tsCredit);
		// }
		user.setCity(tUser.getLocation() != null ? tUser.getLocation()
				.getCity() : null);
		user.setConsumer_protection("true".equals(tUser.getConsumerProtection()) ? true
				: false);
		user.setHas_more_pic(tUser.getHasMorePic());
		user.setItem_img_num(tUser.getItemImgNum().intValue());
		user.setItem_img_size(tUser.getItemImgSize().intValue());
		user.setPromoted_type(tUser.getPromotedType());
		user.setProp_img_num(tUser.getPropImgNum().intValue());
		user.setProp_img_size(tUser.getPropImgSize().intValue());
		user.setSex(tUser.getSex());
		user.setT_created(tUser.getCreated());
		user.setT_last_visit(tUser.getLastVisit());
		user.setT_status(tUser.getStatus());
		user.setT_type(tUser.getType());
		user.setIsNew(EnvManager.getUser().getIsNew());
		Limit limit = this.findByCriterion(Limit.class,
				R.eq("user_id", user.getUser_id()));
		user.setLimit(limit);
		T_UserSubscribe usb = this.findByCriterion(T_UserSubscribe.class,
				R.eq("user_id", user.getUser_id()));
		user.setSites(this.findAllByCriterion(Site.class,
				R.eq("user_id", user.getUser_id())));
		user.setUsb(usb);
		EnvManager.setUser(user);

		return user;
	}
}
