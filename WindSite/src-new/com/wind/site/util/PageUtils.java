package com.wind.site.util;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.core.util.DateUtils;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ADModuleItemCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADModuleItem;
import com.wind.site.model.ADModuleItemPK;
import com.wind.site.model.Layout;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.ModuleModel;
import com.wind.site.model.Page;
import com.wind.site.model.PageDetailLayout;
import com.wind.site.model.PageHeaderLayout;
import com.wind.site.model.PageLayout;
import com.wind.site.model.PageMeta;
import com.wind.site.model.PageModel;
import com.wind.site.model.PageModule;
import com.wind.site.model.PageRegion;
import com.wind.site.model.PageSearchLayout;
import com.wind.site.model.PageTheme;
import com.wind.site.model.RegionModel;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SiteMetadata;
import com.wind.site.model.SiteTheme;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserPageDetail;
import com.wind.site.model.UserPageSearch;
import com.wind.site.service.IPageService;

import freemarker.template.Template;

public class PageUtils {
	public static void createADModuleItemCommand(Long mId, String page,
			SiteImpl impl, List<T_TaobaokeItem> items) {
		if (items == null || items.size() == 0) {
			return;
		}
		Set<ADModuleItem> ads = new HashSet<ADModuleItem>();
		ADModuleItem ad = null;
		ADModuleItemPK pk = null;
		Date date = new Date();
		String userId = impl.getUser_id();
		String nick = impl.getNick();
		String www = impl.getWww();
		String domainName = impl.getDomainName();
		for (T_TaobaokeItem item : items) {
			pk = new ADModuleItemPK();
			pk.setmId(mId);
			pk.setNumIid(item.getNum_iid());
			ad = new ADModuleItem();
			ad.setPk(pk);
			ad.setAdDate(date);
			ad.setNick(nick);
			ad.setPage(page);
			ad.setTitle(item.getTitle());
			ad.setSellerNick(item.getNick());
			ad.setUserId(userId);
			ads.add(ad);
		}
		ADModuleItemCommand command = new ADModuleItemCommand();
		command.setItems(ads);
		command.setModuleId(mId);
		command.setPage(page);
		command
				.setWww(StringUtils.isEmpty(www) ? (domainName + ".xintaonet.com")
						: www);
		CommandExecutor.getCommands().add(command);
	}

	/**
	 * 根据布局模型生成指定的布局实体
	 * 
	 * @param model
	 * @param userId
	 * @param siteId
	 * @param nick
	 * @param page
	 * @return
	 */
	public static PageLayout copyPageLayout(LayoutModel model, String userId,
			String siteId, String nick, String page) {
		PageLayout layout = new PageLayout();
		layout.setLayout(model.getLayout());
		layout.setPage(page);
		layout.setUser_id(userId);
		layout.setSite_id(siteId);
		layout.setNick(nick);
		return layout;
	}

	/**
	 * 根据区域模型生成指定的区域实体
	 * 
	 * @param model
	 * @param regionStr
	 * @param userId
	 * @param siteId
	 * @param nick
	 * @param page
	 * @param layout
	 * @return
	 */
	public static PageRegion copyPageRegion(RegionModel model,
			String regionStr, String userId, String siteId, String nick,
			String page, Long layout) {
		PageRegion region = new PageRegion();
		region.setRegion(regionStr);
		region.setLayout(layout);
		region.setUser_id(userId);
		region.setNick(nick);
		region.setPage(page);
		region.setIsEdit(true);
		region.setSite_id(siteId);
		return region;
	}

	/**
	 * 根据模块模型生成指定的模块实体
	 * 
	 * @param model
	 * @param userId
	 * @param siteId
	 * @param nick
	 * @param page
	 * @param region
	 * @return
	 */
	public static PageModule copyPageModule(ModuleModel model, String userId,
			String siteId, String nick, String pid, String page, Long region) {
		PageModule from = EnvManager.getModules().get(model.getId());// 查找指定的源模块
		if (from == null) {
			SystemException.handleMessageException("生成页面失败：未找到指定的模块");
		}
		PageModule module = new PageModule();
		String metadata = from.getMetadata();
		if (StringUtils.isNotEmpty(metadata) && StringUtils.isNotEmpty(pid)) {// 替换原数据里边的PID
			metadata.replaceAll("mm_[0-9]+_[0-9]+_[0-9]+", pid);
		}
		module.setMetadata(metadata);
		module.setName(from.getName());
		module.setTitle(from.getTitle());
		module.setNick(nick);
		module.setPage(page);
		module.setRegion(region);
		module.setSite_id(siteId);
		module.setUser_id(userId);
		return module;
	}

	public static Boolean addModule2PageModel(PageModule module, PageModel model) {
		if (model != null && module != null) {
			List<LayoutModel> hLayouts = model.getHd();
			if (hLayouts != null && hLayouts.size() > 0) {// 查找页头
				for (LayoutModel layout : hLayouts) {
					if (addModule2RegionModel(module, layout.getMain())) {// 主区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getSub())) {// 子区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getExtra())) {// 副区域
						return true;
					}
				}
			}
			List<LayoutModel> bLayouts = model.getBd();
			if (bLayouts != null && bLayouts.size() > 0) {// 查找主内容区
				for (LayoutModel layout : bLayouts) {
					if (addModule2RegionModel(module, layout.getMain())) {// 主区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getSub())) {// 子区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getExtra())) {// 副区域
						return true;
					}
				}
			}
			List<LayoutModel> fLayouts = model.getFt();
			if (fLayouts != null && fLayouts.size() > 0) {// 查找页尾
				for (LayoutModel layout : fLayouts) {
					if (addModule2RegionModel(module, layout.getMain())) {// 主区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getSub())) {// 子区域
						return true;
					}
					if (addModule2RegionModel(module, layout.getExtra())) {// 副区域
						return true;
					}
				}
			}
		}
		return false;
	}

	public static Boolean addModule2RegionModel(PageModule module,
			RegionModel model) {
		if (model != null) {
			if (model.getId().equals(module.getRegion())) {// 如果是该区域
				ModuleModel mm = new ModuleModel();
				mm.setId(module.getId());
				List<ModuleModel> modules = model.getModules();
				if (modules == null) {
					modules = new ArrayList<ModuleModel>();
				}
				modules.add(mm);
				return true;
			}
		}
		return false;
	}

	public static PageModel convertPageModel(String meta) {
		return new Gson().fromJson(meta, PageModel.class);
	}

	public static String covertPageModel2Json(PageModel model) {
		return new Gson().toJson(model, new TypeToken<PageModel>() {
		}.getType());
	}

	/**
	 * 根据元信息生成布局FTL
	 * 
	 * @param service
	 * @param page
	 */
	@SuppressWarnings("unchecked")
	public static String createPageFtl(IBaseService service, PageMeta meta,
			String user_id, String nick, String pid, Boolean isDesigner) {
		String ftl = "";
		PageModel model = null;
		try {
			model = new Gson().fromJson(meta.getMetadata(), PageModel.class);
		} catch (Exception e) {
			SystemException.handleMessageException("page[" + meta.getId()
					+ "]:" + meta.getMetadata() + " cannot parse");
		}
		if (model == null) {
			SystemException.handleMessageException("自定义页面的元信息格式错误");
		}
		// 查询首页页头
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isIndex", true);
		params.put("userId", user_id);
		String hql = "select pm from PageMeta pm,UserPage up where up.isIndex=:isIndex and up.id=pm.id and up.user_id=:userId";
		List<PageMeta> pms = (List<PageMeta>) service.findByHql(hql, params);
		List<LayoutModel> hd = new ArrayList<LayoutModel>();
		if (pms != null && pms.size() == 1) {
			PageMeta indexMeta = pms.get(0);
			PageModel indexModel = new Gson().fromJson(indexMeta.getMetadata(),
					PageModel.class);
			if (indexModel != null) {
				hd = indexModel.getHd();
			}
		}
		// List<LayoutModel> hd = model.getHd();
		if (hd != null && hd.size() > 0) {
			ftl += "<div id=\"hd\">";
			if (isDesigner) {
				for (LayoutModel layout : hd) {
					ftl += createLayout(layout, nick, pid, isDesigner);
				}
			} else {
				String filePath = user_id.substring(user_id.length() - 2,
						user_id.length());
				ftl += "<div class=\"layout grid-m ks-clear\"><div class=\"col-main\"><div class=\"main-wrap J_TRegion\"><!--#include virtual=\"/zone/"
						+ filePath
						+ "/"
						+ user_id
						+ "/header.html\"--></div></div></div>";
			}
			ftl += "</div>";
		}
		List<LayoutModel> bd = model.getBd();
		if (bd != null && bd.size() > 0) {
			ftl += "<div id=\"bd\">";
			for (LayoutModel layout : bd) {
				ftl += createLayout(layout, nick, pid, isDesigner);
			}
			ftl += "</div>";
		}
		return ftl;
	}

	@SuppressWarnings("unchecked")
	public static String createUserPageDetailFtl(IBaseService service,
			PageMeta meta, String user_id, String nick, String pid,
			Boolean isDesigner) {
		String ftl = "";
		PageModel model = new Gson().fromJson(meta.getMetadata(),
				PageModel.class);
		if (model == null) {
			SystemException.handleMessageException("自定义页面的元信息格式错误");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isIndex", true);
		params.put("userId", user_id);
		String hql = "select pm from PageMeta pm,UserPage up where up.isIndex=:isIndex and up.id=pm.id and up.user_id=:userId";
		List<PageMeta> pms = (List<PageMeta>) service.findByHql(hql, params);
		List<LayoutModel> hd = new ArrayList<LayoutModel>();
		if (pms != null && pms.size() == 1) {
			PageMeta indexMeta = pms.get(0);
			PageModel indexModel = new Gson().fromJson(indexMeta.getMetadata(),
					PageModel.class);
			if (indexModel != null) {
				hd = indexModel.getHd();
			}
		}
		// List<LayoutModel> hd = model.getHd();
		if (hd != null && hd.size() > 0) {
			ftl += "<div id=\"hd\">";
			if (isDesigner) {
				for (LayoutModel layout : hd) {
					ftl += createLayout(layout, nick, pid, isDesigner);
				}
			} else {
				String filePath = user_id.substring(user_id.length() - 2,
						user_id.length());
				ftl += "<div class=\"layout grid-m ks-clear\"><div class=\"col-main\"><div class=\"main-wrap J_TRegion\"><!--#include virtual=\"/zone/"
						+ filePath
						+ "/"
						+ user_id
						+ "/header.html\"--></div></div></div>";
			}
			ftl += "</div>";
		}
		List<LayoutModel> bd = model.getBd();
		if (bd != null && bd.size() > 0) {
			ftl += "<div id=\"bd\">";
			for (LayoutModel layout : bd) {
				ftl += createDetailLayout(layout, nick, pid, isDesigner);
			}
			ftl += "</div>";
		}
		return ftl;
	}

	@SuppressWarnings("unchecked")
	public static String createUserPageSearchFtl(IBaseService service,
			PageMeta meta, String user_id, String nick, String pid,
			Boolean isDesigner) {
		String ftl = "";
		PageModel model = new Gson().fromJson(meta.getMetadata(),
				PageModel.class);
		if (model == null) {
			SystemException.handleMessageException("自定义页面的元信息格式错误");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isIndex", true);
		params.put("userId", user_id);
		String hql = "select pm from PageMeta pm,UserPage up where up.isIndex=:isIndex and up.id=pm.id and up.user_id=:userId";
		List<PageMeta> pms = (List<PageMeta>) service.findByHql(hql, params);
		List<LayoutModel> hd = new ArrayList<LayoutModel>();
		if (pms != null && pms.size() == 1) {
			PageMeta indexMeta = pms.get(0);
			PageModel indexModel = new Gson().fromJson(indexMeta.getMetadata(),
					PageModel.class);
			if (indexModel != null) {
				hd = indexModel.getHd();
			}
		}
		// List<LayoutModel> hd = model.getHd();
		if (hd != null && hd.size() > 0) {
			ftl += "<div id=\"hd\">";
			if (isDesigner) {
				for (LayoutModel layout : hd) {
					ftl += createLayout(layout, nick, pid, isDesigner);
				}
			} else {
				String filePath = user_id.substring(user_id.length() - 2,
						user_id.length());
				ftl += "<div class=\"layout grid-m ks-clear\"><div class=\"col-main\"><div class=\"main-wrap J_TRegion\"><!--#include virtual=\"/zone/"
						+ filePath
						+ "/"
						+ user_id
						+ "/header.html\"--></div></div></div>";
			}
			ftl += "</div>";
		}
		List<LayoutModel> bd = model.getBd();
		if (bd != null && bd.size() > 0) {
			ftl += "<div id=\"bd\">";
			for (LayoutModel layout : bd) {
				ftl += createSearchLayout(layout, nick, pid, isDesigner);
			}
			ftl += "</div>";
		}
		return ftl;
	}

	public static String createDetailLayout(LayoutModel layout, String nick,
			String pid, Boolean isDesigner) {
		String ftl = "";
		if (layout != null) {
			ftl = "<div class=\"layout " + layout.getLayout()
					+ " ks-clear\" data-id=\"" + layout.getId() + "\">";
			if (layout.getMain() != null) {
				ftl += "<div class=\"col-main\"><div class=\"main-wrap J_TRegion\" data-id=\""
						+ layout.getMain().getId()
						+ "\" data-edit=\"false\"><img src=\"/assets/min/stylesheets/images/detailresult.jpg\"></div></div>";
				if (layout.getSub() != null) {
					ftl += createRegion(layout.getSub(), PageRegion.COL_SUB,
							nick, pid, isDesigner);
				}
			}
			ftl += "</div>";

		}
		return ftl;
	}

	public static String createSearchLayout(LayoutModel layout, String nick,
			String pid, Boolean isDesigner) {
		String ftl = "";
		if (layout != null) {
			ftl = "<div class=\"layout " + layout.getLayout()
					+ " ks-clear\" data-id=\"" + layout.getId() + "\">";
			if (layout.getMain() != null) {
				ftl += "<div class=\"col-main\"><div class=\"main-wrap J_TRegion\" data-id=\""
						+ layout.getMain().getId()
						+ "\" data-edit=\"false\"><img src=\"/assets/min/stylesheets/images/searchresult.jpg\"></div></div>";
				if (layout.getSub() != null) {
					ftl += createRegion(layout.getSub(), PageRegion.COL_SUB,
							nick, pid, isDesigner);
				}
			}
			ftl += "</div>";
		}
		return ftl;
	}

	public static void main(String[] args) {

	}

	public static String createLayout(LayoutModel layout, String nick,
			String pid, Boolean isDesigner) {
		String ftl = "";
		if (layout != null) {
			ftl = "<div class=\"layout " + layout.getLayout()
					+ " ks-clear\" data-id=\"" + layout.getId() + "\">";
			if (layout.getMain() != null) {
				ftl += createRegion(layout.getMain(), PageRegion.MAIN_WRAP,
						nick, pid, isDesigner);
				if (layout.getSub() != null) {
					ftl += createRegion(layout.getSub(), PageRegion.COL_SUB,
							nick, pid, isDesigner);
					if (layout.getExtra() != null) {
						ftl += createRegion(layout.getExtra(),
								PageRegion.COL_EXTRA, nick, pid, isDesigner);
					}
				}
			}
			ftl += "</div>";

		}
		return ftl;
	}

	public static String createRegion(RegionModel region, String regionStr,
			String nick, String pid, Boolean isDesigner) {
		String ftl = "";
		if (region != null) {
			if (PageRegion.MAIN_WRAP.equals(regionStr)) {// 如果是主内容区
				ftl = "<div class=\"col-main\"><div class=\"main-wrap J_TRegion\" data-edit=\""
						+ (region.getIsEdit() != null ? region.getIsEdit()
								: true)
						+ "\" data-id=\""
						+ region.getId()
						+ "\">";
				List<ModuleModel> models = region.getModules();
				if (models != null && models.size() > 0) {
					for (ModuleModel model : models) {
						ftl += createModule(model, nick, pid, isDesigner);
					}
				}
				ftl += "</div></div>";
			} else {
				ftl += "<div class=\"" + regionStr + " J_TRegion\" data-id=\""
						+ region.getId() + "\">";
				List<ModuleModel> models = region.getModules();
				if (models != null && models.size() > 0) {
					for (ModuleModel model : models) {
						ftl += createModule(model, nick, pid, isDesigner);
					}
				}
				ftl += "</div>";
			}
		}
		return ftl;
	}

	public static String createModule(ModuleModel model, String nick,
			String pid, Boolean isDesigner) {
		String ftl = "";
		if (model != null) {
			ftl = "${module('" + model.getId() + "','" + nick + "','" + pid
					+ "','" + isDesigner + "')}";
		}
		return ftl;
	}

	public static PageMeta convertNoSort(IBaseService service, String user_id,
			Page page) {
		return convert(service, user_id, page, false);
	}

	public static PageMeta convertSort(IBaseService service, String user_id,
			Page page) {
		return convert(service, user_id, page, true);
	}

	/**
	 * 根据页面生成元信息
	 * 
	 * @param page
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static PageMeta convert(IBaseService service, String user_id,
			Page page, Boolean isSort) {
		PageMeta meta = new PageMeta();
		meta.setUser_id(user_id);
		meta.setId(page.getId());
		List<LayoutModel> hd = new ArrayList<LayoutModel>();
		List<LayoutModel> bd = new ArrayList<LayoutModel>();
		List<LayoutModel> ft = new ArrayList<LayoutModel>();
		// 页头布局
		List<PageHeaderLayout> layouts = service.findAllByCriterion(
				PageHeaderLayout.class, R.eq("user_id", user_id));
		if (layouts != null && layouts.size() > 0) {
			LayoutModel lm = null;
			for (PageHeaderLayout layout : layouts) {
				lm = convertLayout(service, layout, false);
				if (lm != null) {
					hd.add(lm);
				}
			}
		}
		// 内容区布局
		List<Layout> layouts1 = new ArrayList<Layout>();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", page.getId());
		if (page instanceof UserPage) {
			layouts1 = (List<Layout>) service.findByHql(
					"from PageLayout where page=:page", params);
		} else if (page instanceof UserPageDetail) {
			layouts1 = (List<Layout>) service.findByHql(
					"from PageDetailLayout where page=:page", params);
		} else if (page instanceof UserPageSearch) {
			layouts1 = (List<Layout>) service.findByHql(
					"from PageSearchLayout where page=:page", params);
		}
		if (layouts1 != null && layouts1.size() > 0) {
			LayoutModel lm = null;
			if (isSort)
				PageUtils.sortLayouts(layouts1);
			for (Layout layout : layouts1) {
				lm = convertLayout(service, layout, isSort);
				if (lm != null) {
					bd.add(lm);
				}
			}
		}
		PageModel pm = new PageModel();
		pm.setHd(hd);
		pm.setBd(bd);
		pm.setFt(ft);
		String json = new Gson().toJson(pm, new TypeToken<PageModel>() {
		}.getType());
		meta.setMetadata(json);
		return meta;
	}

	public static LayoutModel convertLayout(IBaseService service,
			Layout layout, Boolean isSort) {
		if (layout != null) {
			LayoutModel lm = new LayoutModel();
			lm.setId(layout.getId());
			lm.setLayout(layout.getLayout());
			List<PageRegion> regions = service.findAllByCriterion(
					PageRegion.class, R.eq("layout", layout.getId()));
			if (regions != null && regions.size() > 0) {
				RegionModel rm = null;
				for (PageRegion region : regions) {
					rm = convertRegion(service, region, isSort);
					if (rm != null) {
						if (PageRegion.MAIN_WRAP.equals(region.getRegion())) {
							lm.setMain(rm);
						} else if (PageRegion.COL_SUB
								.equals(region.getRegion())) {
							lm.setSub(rm);
						} else if (PageRegion.COL_EXTRA.equals(region
								.getRegion())) {
							lm.setExtra(rm);
						}
					}
				}
			}
			return lm;
		}
		return null;
	}

	public static RegionModel convertRegion(IBaseService service,
			PageRegion region, Boolean isSort) {
		if (region != null) {
			RegionModel rm = new RegionModel();
			rm.setId(region.getId());
			List<ModuleModel> models = new ArrayList<ModuleModel>();
			List<PageModule> modules = service.findAllByCriterion(
					PageModule.class, R.eq("region", region.getId()));
			if (modules != null && modules.size() > 0) {
				ModuleModel mm = null;
				if (isSort)
					PageUtils.sortModules(modules);// 排序
				for (PageModule module : modules) {
					mm = convertModule(service, module);
					if (mm != null) {
						models.add(mm);// 加入容器元信息
					}
				}
			}
			rm.setModules(models);// 容器内模块的元信息
			return rm;
		}
		return null;
	}

	public static ModuleModel convertModule(IBaseService service,
			PageModule module) {
		if (module != null) {
			ModuleModel mm = new ModuleModel();
			mm.setId(module.getId());
			return mm;
		}
		return null;
	}

	/**
	 * 获取会员个人页面(生成除模块内容外的其他内容)
	 * 
	 * @param page
	 * @param theme
	 * @param skin
	 * @param pageService
	 * @param fcg
	 * @return
	 */
	public static Template getUserTemplate(UserPage page, String userId,
			String theme, String skin, IPageService pageService,
			FreeMarkerConfigurer fcg, Boolean isDesigner) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("page", page);// 设置页面参数
		// 用户
		if (StringUtils.isEmpty(userId)) {
			userId = page.getUser_id();
		}
		User user = pageService.findByCriterion(User.class, R.eq("user_id",
				userId));
		user.setSites(pageService.findAllByCriterion(Site.class, R.eq(
				"user_id", user.getUser_id())));
		// 订购
		T_UserSubscribe usb = pageService.get(T_UserSubscribe.class, user
				.getUser_id());
		user.setUsb(usb);
		result.put("user", user);// 设置用户参数
		// 站点
		if (user.getSites().size() == 0) {
			SystemException.handleMessageException(user.getUser_id()
					+ "'site[user_id] is null");
		}
		Site site = user.getSites().get(0);
		result.put("site", site);// 设置站点参数
		List<SiteMetadata> metas = pageService.findAllByCriterion(
				SiteMetadata.class, R.eq("site_id", site.getId()));
		result.put("metas", metas);// 设置第三方META验证
		if (StringUtils.isEmpty(theme)) {// 此路径为普及版装修预览或者系统内部命令
			if (StringUtils.isNotEmpty(skin)) {// 皮肤不为空（从普及版装修过来）
				// skin = "yellow";
			} else {// 未指定皮肤，则说明是系统内部命令
				SiteTheme st = pageService.get(SiteTheme.class, site.getId());
				if (st != null) {// 如果已配置主题
					if ((usb != null && usb.getVersionNo() > 1)
							&& st.getTheme() != null) {// 高级版本可使用个性化模板主题
						PageTheme pt = pageService.get(PageTheme.class, st
								.getTheme());
						if (pt != null) {
							theme = String.valueOf(st.getTheme());
							skin = StringUtils.isNotEmpty(st.getSkin()) ? st
									.getSkin() : pt.getSkin();
						}
					} else {
						if (StringUtils.isNotEmpty(st.getSkin())) {
							skin = st.getSkin();
						} else {
							skin = "yellow";
						}
					}
				} else {
					skin = "yellow";
				}
			}
		} else {// 此路径为模板装修市场预览（指定了主题）
			try {
				PageTheme pt = pageService.get(PageTheme.class, Long
						.valueOf(theme));
				if (pt != null && pt.getIsValid()
						&& StringUtils.isNotEmpty(pt.getSkin())) {
					skin = pt.getSkin();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		result.put("theme", theme);// 设置主题参数
		result.put("skin", skin);// 设置皮肤参数
		result.put("pid", user.getPid());// 设置PID
		result.put("dateVersion", DateUtils
				.format(new Date(), "yyyyMMddHHmmss"));// 资源版本号
		PageMeta meta = pageService.get(PageMeta.class, page.getId());
		result.put("content", PageUtils.createPageFtl(pageService, meta, user
				.getUser_id(), user.getNick(), user.getPid(), isDesigner));// 页面布局及模块
		result.put("isDesigner", isDesigner);
		WindSiteRestUtil.covertPID(pageService, result, user.getUser_id());// 转换生成更多的参数
		try {
			Template temp = fcg.getConfiguration().getTemplate(
					"site/designer/page.ftl");// 生成除具体模块的其他内容
			Template template = new Template("template_" + page.getId(),
					new StringReader(FreeMarkerTemplateUtils
							.processTemplateIntoString(temp, result)), fcg
							.getConfiguration());

			return template;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static List<PageRegion> createPageRegions(Layout layout) {
		List<PageRegion> regions = new ArrayList<PageRegion>();
		PageRegion main = new PageRegion();
		main.setLayout(layout.getId());
		main.setNick(layout.getNick());
		main.setSite_id(layout.getSite_id());
		main.setUser_id(layout.getUser_id());
		main.setRegion(PageRegion.MAIN_WRAP);
		main.setPage(layout.getPage());
		regions.add(main);
		layout.setMain(main);
		String grid = layout.getLayout();
		if (!PageLayout.M.equals(grid)) {// 非单栏，则创建sub
			PageRegion sub = new PageRegion();
			sub.setPage(layout.getPage());
			sub.setLayout(layout.getId());
			sub.setNick(layout.getNick());
			sub.setSite_id(layout.getSite_id());
			sub.setUser_id(layout.getUser_id());
			sub.setRegion(PageRegion.COL_SUB);
			regions.add(sub);
			layout.setSub(sub);
		}
		if (PageLayout.M0S5E5.equals(grid) || PageLayout.S5E5M0.equals(grid)
				|| PageLayout.S5M0E5.equals(grid)
				|| PageLayout.S310M0E310.equals(grid)) {// 如果是三栏，则创建extra
			PageRegion extra = new PageRegion();
			extra.setPage(layout.getPage());
			extra.setLayout(layout.getId());
			extra.setNick(layout.getNick());
			extra.setSite_id(layout.getSite_id());
			extra.setUser_id(layout.getUser_id());
			extra.setRegion(PageRegion.COL_EXTRA);
			regions.add(extra);
			layout.setExtra(extra);
		}
		return regions;
	}

	/**
	 * 生成当前REGION的模块内容宏
	 * 
	 * @param modules
	 * @return
	 */
	public static String createPageRegionContent(List<PageModule> modules,
			String nick, String pid, Boolean isDesigner) {
		StringBuilder sb = new StringBuilder("");
		if (modules.size() > 0) {
			sortModules(modules);
			for (PageModule module : modules) {
				sb.append("${module('" + module.getId() + "','" + nick + "','"
						+ pid + "','" + isDesigner + "')}");
			}
		}
		return sb.toString();
	}

	/**
	 * 排序模块
	 * 
	 * @param modules
	 * @return
	 */
	private static List<PageModule> sortModules(List<PageModule> modules) {
		List<PageModule> result = new ArrayList<PageModule>();
		sortModules(null, modules, result);
		modules.addAll(result);
		return modules;
	}

	/**
	 * 排序布局
	 * 
	 * @param layouts
	 * @return
	 */
	private static List<Layout> sortLayouts(List<Layout> layouts) {
		List<Layout> result = new ArrayList<Layout>();
		sortLayouts(null, layouts, result);
		layouts.addAll(result);
		return layouts;
	}

	private static void sortLayouts(Layout layout, List<Layout> layouts,
			List<Layout> result) {
		if (layout == null) {// 取根
			Iterator<Layout> itr = layouts.iterator();
			while (itr.hasNext()) {
				Layout l = itr.next();
				if (null == l.getParent()) {
					result.add(l);
					itr.remove();
					layout = l;
				}
			}
		} else {// 取子
			Iterator<Layout> itr = layouts.iterator();
			while (itr.hasNext()) {
				Layout l = itr.next();
				if (layout.getId().equals(l.getParent())) {
					result.add(l);
					itr.remove();
					layout = l;
				}
			}
		}
		if (layouts.size() > 0) {// 递归
			sortLayouts(layout, layouts, result);
		}
	}

	private static void sortModules(PageModule module,
			List<PageModule> modules, List<PageModule> result) {
		// TODO 需处理多个parent为NULL的bug
		if (module == null) {// 取根
			Iterator<PageModule> itr = modules.iterator();
			while (itr.hasNext()) {
				PageModule m = itr.next();
				if (null == m.getParent()) {
					result.add(m);
					itr.remove();
					module = m;
				}
			}
		} else {// 取子
			Iterator<PageModule> itr = modules.iterator();
			while (itr.hasNext()) {
				PageModule m = itr.next();
				if (module.getId().equals(m.getParent())) {
					result.add(m);
					itr.remove();
					module = m;
				}
			}
		}
		if (modules.size() > 0) {// 递归
			sortModules(module, modules, result);
		}
	}

	/**
	 * 创建一个指定的页头布局
	 * 
	 * @param region
	 * @param type
	 * @return
	 */
	public static PageHeaderLayout createPageHeaderLayout(UserPage page) {
		PageHeaderLayout layout = new PageHeaderLayout();
		layout.setLayout(Layout.M);
		layout.setNick(page.getNick());
		layout.setSite_id(page.getSite_id());
		layout.setUser_id(page.getUser_id());
		layout.setPage(null);
		layout.setParent(null);
		return layout;
	}

	/**
	 * 创建一个指定的布局
	 * 
	 * @param region
	 * @param type
	 * @return
	 */
	public static PageLayout createPageLayout(UserPage page, String type,
			PageLayout parent) {
		PageLayout layout = new PageLayout();
		layout.setLayout(type);
		layout.setNick(page.getNick());
		layout.setSite_id(page.getSite_id());
		layout.setUser_id(page.getUser_id());
		layout.setPage(page.getId());
		layout.setParent(parent != null ? parent.getId() : null);
		return layout;
	}

	public static UserPageDetail createPageDetail(User user) {
		UserPageDetail page = new UserPageDetail();
		page.setIsIndex(false);
		page.setStatus(true);
		page.setTitle("宝贝详情页");
		page.setNick(user.getNick());
		page.setSite_id(user.getSites().get(0).getId());
		page.setUser_id(user.getUser_id());
		return page;
	}

	public static UserPageSearch createPageSearch(User user) {
		UserPageSearch page = new UserPageSearch();
		page.setIsIndex(false);
		page.setStatus(true);
		page.setTitle("搜索列表页");
		page.setNick(user.getNick());
		page.setSite_id(user.getSites().get(0).getId());
		page.setUser_id(user.getUser_id());
		return page;
	}

	/**
	 * 创建一个指定详情页的布局
	 * 
	 * @param region
	 * @param type
	 * @return
	 */
	public static PageDetailLayout createPageDetailLayout(User user, String type) {
		PageDetailLayout layout = new PageDetailLayout();
		layout.setLayout(type);
		layout.setNick(user.getNick());
		layout.setSite_id(user.getSites().get(0).getId());
		layout.setUser_id(user.getUser_id());
		layout.setParent(null);
		return layout;
	}

	/**
	 * 创建一个指定详情页的布局
	 * 
	 * @param region
	 * @param type
	 * @return
	 */
	public static PageSearchLayout createPageSearchLayout(User user, String type) {
		PageSearchLayout layout = new PageSearchLayout();
		layout.setLayout(type);
		layout.setNick(user.getNick());
		layout.setSite_id(user.getSites().get(0).getId());
		layout.setUser_id(user.getUser_id());
		layout.setParent(null);
		return layout;
	}

	/**
	 * 创建一个指定的布局容器
	 * 
	 * @param region
	 * @param type
	 * @return
	 */
	public static PageRegion createRegion(Layout layout, String type) {
		PageRegion region = new PageRegion();
		region.setLayout(layout.getId());
		region.setNick(layout.getNick());
		region.setRegion(type);
		region.setSite_id(layout.getSite_id());
		region.setUser_id(layout.getUser_id());
		region.setPage(layout.getPage());
		return region;
	}

	/**
	 * 创建一个默认的店标模块
	 * 
	 * @param region
	 * @param parent
	 * @return
	 */
	public static PageModule createShopHeader(PageRegion region,
			PageModule parent) {
		PageModule module = new PageModule();
		module.setName(PageModule.M_SHOPHEADER);
		module.setNick(region.getNick());
		module.setParent(parent != null ? parent.getId() : null);
		module.setRegion(region.getId());
		module.setSite_id(region.getSite_id());
		module.setTitle("店标模块");
		module.setUser_id(region.getUser_id());
		module.setPage(region.getPage());
		return module;
	}

	/**
	 * 创建一个默认的简易搜索框模块
	 * 
	 * @param region
	 * @param parent
	 * @return
	 */
	public static PageModule createShopSearch(PageRegion region,
			PageModule parent) {
		PageModule module = new PageModule();
		module.setName(PageModule.M_SHOPSEARCH);
		module.setNick(region.getNick());
		module.setParent(parent != null ? parent.getId() : null);
		module.setRegion(region.getId());
		module.setSite_id(region.getSite_id());
		module.setTitle("搜索淘宝宝贝");
		module.setUser_id(region.getUser_id());
		module.setPage(region.getPage());
		return module;
	}

	/**
	 * 创建一个默认的分类模块
	 * 
	 * @param region
	 * @param parent
	 * @return
	 */
	public static PageModule createShopCategory(PageRegion region,
			PageModule parent) {
		PageModule module = new PageModule();
		module.setName(PageModule.M_SHOPCATEGORY);
		module.setNick(region.getNick());
		module.setParent(parent != null ? parent.getId() : null);
		module.setRegion(region.getId());
		module.setSite_id(region.getSite_id());
		module.setTitle("宝贝分类");
		module.setUser_id(region.getUser_id());
		module.setPage(region.getPage());
		return module;
	}

	/**
	 * 创建一个默认的友情链接模块
	 * 
	 * @param region
	 * @param parent
	 * @return
	 */
	public static PageModule createShopLinks(PageRegion region,
			PageModule parent) {
		PageModule module = new PageModule();
		module.setName(PageModule.M_SHOPLINKS);
		module.setNick(region.getNick());
		module.setParent(parent != null ? parent.getId() : null);
		module.setRegion(region.getId());
		module.setSite_id(region.getSite_id());
		module.setTitle("友情链接");
		module.setUser_id(region.getUser_id());
		module.setPage(region.getPage());
		return module;
	}

	/**
	 * 创建一个默认的宝贝显示模块
	 * 
	 * @param region
	 * @param parent
	 * @return
	 */
	public static PageModule createShopDisplay(PageRegion region,
			PageModule parent, String title) {
		PageModule module = new PageModule();
		module.setName(PageModule.M_SHOPDISPLAY);
		module.setNick(region.getNick());
		module.setParent(parent != null ? parent.getId() : null);
		module.setRegion(region.getId());
		module.setSite_id(region.getSite_id());
		module.setTitle(title);
		module.setUser_id(region.getUser_id());
		module.setPage(region.getPage());
		return module;
	}
}
