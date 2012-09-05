package com.wind.site.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.Writer;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.domain.TradeRate;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.core.util.DateUtils;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.FanliFriendLinks;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.model.KeFuSupport;
import com.wind.site.model.Layout;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.Limit;
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
import com.wind.site.model.RegionModel;
import com.wind.site.model.ShareSupport;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SiteMetadata;
import com.wind.site.model.SiteTheme;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserPageDetail;
import com.wind.site.model.UserPageSearch;
import com.wind.site.service.IPageService;
import com.wind.site.util.PageUtils;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

import freemarker.template.Template;
import freemarker.template.TemplateModelException;

/**
 * 页面业务实现类
 * 
 * @author fxy
 * 
 */
public class PageServiceImpl extends BaseServiceImpl implements IPageService {

	@Override
	public void deployAlimamaRoot(FreeMarkerConfigurer fcg, String userId,
			String code) {
		// 发布阿里妈妈验证
		try {
			File htmlFile = new File(getAlimamaRootPath("shop" + userId));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/root.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("code", code);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void fixedPageHeader(String siteId) {
		PageMeta meta = this.getIndexPageMeta(siteId);
		if (meta != null) {
			PageModel indexModel = PageUtils.convertPageModel(meta
					.getMetadata());
			if (indexModel != null) {
				LayoutModel hd = null;
				List<LayoutModel> hds = indexModel.getHd();
				if (hds != null && hds.size() > 0) {
					hd = hds.get(0);// 获取首页页头布局
					if (hd != null) {
						RegionModel regionModel = hd.getMain();
						if (regionModel != null) {
							List<ModuleModel> models = regionModel.getModules();
							PageRegion region = this.get(PageRegion.class,
									regionModel.getId());// 获得首页页头区域
							if (region != null) {
								regionModel.setModules(this.fixedPageRegion(
										siteId, region, models));// 修复页头
								meta.setMetadata(PageUtils
										.covertPageModel2Json(indexModel));// 设置最新的meta
								this.update(meta);
							}
						}
					}
				}
			}
		}
	}

	@Override
	public void fixedPage(String siteId, Page page) {
		if (page != null) {
			PageMeta meta = this.get(PageMeta.class, page.getId());
			if (meta != null) {
				PageModel model = PageUtils
						.convertPageModel(meta.getMetadata());
				if (model != null) {
					List<LayoutModel> bds = model.getBd();
					if (bds != null && bds.size() > 0) {
						for (LayoutModel layout : bds) {
							if (layout != null) {
								RegionModel main = layout.getMain();
								RegionModel sub = layout.getSub();
								RegionModel extra = layout.getExtra();
								if (main != null) {// 主内容区修复
									List<ModuleModel> models = main
											.getModules();
									PageRegion region = this.get(
											PageRegion.class, main.getId());
									if (region != null) {
										main.setModules(this.fixedPageRegion(
												siteId, region, models));// 修复页头
									}
								}
								if (sub != null) {// 次内容区修复
									List<ModuleModel> models = sub.getModules();
									PageRegion region = this.get(
											PageRegion.class, sub.getId());
									if (region != null) {
										sub.setModules(this.fixedPageRegion(
												siteId, region, models));// 修复页头
									}
								}
								if (extra != null) {// 附加内容区修复
									List<ModuleModel> models = extra
											.getModules();
									PageRegion region = this.get(
											PageRegion.class, extra.getId());
									if (region != null) {
										extra.setModules(this.fixedPageRegion(
												siteId, region, models));// 修复页头
									}
								}
							}
						}
						meta.setMetadata(PageUtils.covertPageModel2Json(model));// 设置最新的meta
						this.update(meta);
					}
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ModuleModel> fixedPageRegion(String siteId, PageRegion region,
			List<ModuleModel> models) {
		// 增加了站点标识过滤，避免影响所有站点数据
		if (models == null || models.size() == 0) {// 如果元信息没有配置模块，则删除所有数据库中的模块
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("region", region.getId());
			params.put("siteId", siteId);
			String sql = "delete from w_page_module where region=:region and site_id=:siteId";
			this.executeNativeUpdateSql(sql, params);
			models = new ArrayList<ModuleModel>();// 设置为空
		} else {
			// 两种情况：元信息有(删除)，数据库没|元信息无，数据库有(删除)
			String ids = "";
			Boolean isFirst = true;
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("siteId", siteId);
			Iterator<ModuleModel> itr = models.iterator();
			while (itr.hasNext()) {// 同步元信息及数据库（删除元信息中有，数据库里没有的模块），同时生成过滤条件
				ModuleModel m = itr.next();
				if (m != null) {
					Long id = m.getId();
					params.put("id", id);
					// 删除元信息中数据库里没有的模块
					List<Map<String, Object>> modules = (List<Map<String, Object>>) this
							.findByHql(
									"select new map(id as id) from PageModule where id=:id",
									params);
					if (modules == null || modules.size() != 1) {// 符合第一种情况
						itr.remove();// 移除当前元素
						continue;
					}
					if (isFirst) {
						isFirst = false;
					} else {
						ids += ",";
					}
					ids += "'" + m.getId() + "'";
				}
			}
			Map<String, Object> _params = new HashMap<String, Object>();
			_params.put("region", region.getId());
			_params.put("siteId", siteId);
			// 处理第二种情况
			if (StringUtils.isNotEmpty(ids)) {
				String sql = "delete from w_page_module where region=:region and site_id=:siteId and id not in ("
						+ ids + ")";// 删除所有未在页头元信息中配置的模块
				this.executeNativeUpdateSql(sql, _params);
			}
		}
		return models;
	}

	@Override
	public void saveOrUpdateItemLog(CopyOnWriteArraySet<ItemCacheLog> itemLogs) {
		Session session = this.getHibernateSession();
		for (ItemCacheLog log : itemLogs) {
			session.saveOrUpdate(log);
		}
		itemLogs.clear();// 清除
	}

	@Override
	public void deployShopCats(FreeMarkerConfigurer fcg, String cid,
			List<T_TaobaokeShop> shops) {
		// 发布店铺同类推荐页
		try {
			File htmlFile = new File(getShopCatsPath(cid));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/shopdetail/pageShopCats.ftl");
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("shops", shops);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployUserShopDetail(FreeMarkerConfigurer fcg, String userId) {
		// 发布站长店铺详情页
		try {
			File htmlFile = new File(getUserShopDetailPath("shop" + userId));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/shopdetail/pageShopDetail.ftl");
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(this, maps, userId);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployShopDetail(FreeMarkerConfigurer fcg, Shop shop,
			TaobaokeShop tShop, List<TaobaokeItem> items) {
		// 发布店铺详情
		try {
			File htmlFile = new File(getShopDetailPath(String.valueOf(shop
					.getSid())));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg
					.getConfiguration()
					.getTemplate(
							"site/designer/template/shopdetail/pageShopDetailAndDesc.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			htmlFile.setExecutable(true);
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("shop", shop);
			maps.put("tShop", tShop);
			maps.put("items", items);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployShopDetailMeta(FreeMarkerConfigurer fcg, Shop shop) {
		// 发布店铺详情SEO
		try {
			File htmlFile = new File(getShopDetailMetaPath(String.valueOf(shop
					.getSid())));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/shopdetail/pageShopDetailMeta.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("shop", shop);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployItemDetailMeta(FreeMarkerConfigurer fcg,
			TaobaokeItemDetail detail) {
		// 发布页头
		try {
			File htmlFile = new File(
					getItemDetailMetaPath(String.valueOf(detail.getItem()
							.getNumIid())));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/itemdetail/pageItemDetailMeta.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("item", detail.getItem());
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployUserHtmlHeader(FreeMarkerConfigurer fcg, String userId) {
		// 发布页头
		try {
			File htmlFile = new File(getUserHtmlHeaderPath("shop" + userId));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/pageHtmlHeader.ftl");
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(this, maps, userId);
			maps.put("dateVersion",
					DateUtils.format(new Date(), "yyyyMMddHHmmss"));// 资源版本号
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployUserItemDetail(FreeMarkerConfigurer fcg, String userId) {
		// 发布页尾
		try {
			File htmlFile = new File(getUserItemDetailPath("shop" + userId));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/itemdetail/pageItemDetail.ftl");
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(this, maps, userId);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void deployItemDetail(FreeMarkerConfigurer fcg,
			TaobaokeItemDetail detail) {
		try {
			File htmlFile = new File(
					getItemDetailDescPath(String.valueOf(detail.getItem()
							.getNumIid())));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/itemdetail/detail.ftl");
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("desc", detail.getItem().getDesc());
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployItemDetailAndComments(FreeMarkerConfigurer fcg,
			TaobaokeItemDetail detail, Long totalResults, List<TradeRate> rates) {
		try {
			File htmlFile = new File(getItemDetailPath(String.valueOf(detail
					.getItem().getNumIid())));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Template template = fcg
					.getConfiguration()
					.getTemplate(
							"site/designer/template/itemdetail/pageItemDetailAndComments.ftl");
			htmlFile.setExecutable(true);
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("item", detail.getItem());
			String nick = detail.getItem().getNick();
			if (StringUtils.isNotEmpty(nick)) {
				Long sid = TaobaoFetchUtil.getTaobaoShop(nick);
				params.put("shopId", sid);
			}
			params.put("detail", detail);
			params.put("totalResults", totalResults);
			params.put("rates", rates);
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployBlog(FreeMarkerConfigurer fcg, PageModule module,
			Map<String, Object> params) {
		try {
			File htmlFile = new File(getModulePath(
					"shop" + module.getUser_id(), module.getId()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			htmlFile.setExecutable(true);// 设置为可执行即chmod +x
			Template template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/template/shopBlogTemplate.ftl");
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void reCopyUserPage(UserPage page, String userId, String nick,
			String pid, String siteId, String id) {
		List<LayoutModel> layouts = EnvManager.getTemplates().get(id);
		if (layouts == null || layouts.size() == 0) {
			SystemException.handleMessageException("指定页面模板不存在");
		}
		PageMeta meta = this.get(PageMeta.class, page.getId());
		if (meta == null) {
			SystemException.handleMessageException("要修改的页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());// 获取旧页面元信息模型
		// 删除当前页面BD内所有模块,区域,布局【为避免元信息内与数据库实际不符，查询数据库内实际布局进行删除】
		List<PageLayout> oLayouts = this.findAllByCriterion(PageLayout.class,
				R.eq("page", page.getId()));
		// List<LayoutModel> oBd = model.getBd();
		if (oLayouts != null && oLayouts.size() > 0) {
			for (PageLayout olm : oLayouts) {
				List<PageRegion> oRegions = this.findAllByCriterion(
						PageRegion.class, R.eq("layout", olm.getId()));
				if (oRegions != null && oRegions.size() > 0) {
					for (PageRegion oRm : oRegions) {
						this.deleteAll(PageModule.class,
								R.eq("region", oRm.getId()));// 删除容器内所有模块
					}
				}
				this.deleteAll(PageRegion.class, R.eq("layout", olm.getId()));// 删除布局内所有区域
			}
			this.deleteAll(PageLayout.class, R.eq("page", page.getId()));// 删除页面BD内所有布局
		}
		// 拷贝生成新的
		List<LayoutModel> bd = new ArrayList<LayoutModel>();
		for (LayoutModel bLayout : layouts) {// 主内容区
			LayoutModel lm = new LayoutModel();
			RegionModel mRm = null;
			RegionModel sRm = null;
			RegionModel eRm = null;
			PageLayout _layout = PageUtils.copyPageLayout(bLayout, userId,
					siteId, nick, page.getId());// 拷贝生成布局
			this.save(_layout);
			if (bLayout.getMain() != null) {
				PageRegion _region = PageUtils.copyPageRegion(
						bLayout.getMain(), PageRegion.MAIN_WRAP, userId,
						siteId, nick, page.getId(), _layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getMain().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				mRm = new RegionModel();
				mRm.setId(_region.getId());
				mRm.setModules(mRms);
			} else {
				SystemException.handleMessageException("模块信息错误：未找到主内容区");
			}
			if (bLayout.getSub() != null) {
				PageRegion _region = PageUtils.copyPageRegion(bLayout.getSub(),
						PageRegion.COL_SUB, userId, siteId, nick, page.getId(),
						_layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getSub().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				sRm = new RegionModel();
				sRm.setId(_region.getId());
				sRm.setModules(mRms);
			}
			if (bLayout.getExtra() != null) {
				PageRegion _region = PageUtils.copyPageRegion(
						bLayout.getExtra(), PageRegion.COL_EXTRA, userId,
						siteId, nick, page.getId(), _layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getExtra().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				eRm = new RegionModel();
				eRm.setId(_region.getId());
				eRm.setModules(mRms);
			}
			// 生成布局元信息
			lm.setId(_layout.getId());
			lm.setLayout(_layout.getLayout());
			lm.setMain(mRm);
			if (sRm != null)
				lm.setSub(sRm);
			if (eRm != null)
				lm.setExtra(eRm);
			bd.add(lm);
		}
		model.setBd(bd);
		// 更新最终的元信息
		meta.setMetadata(PageUtils.covertPageModel2Json(model));
		this.update(meta);
		this.update(page);
	}

	@Override
	public void copyUserPage(UserPage page, String userId, String nick,
			String pid, String siteId, String id) {
		Limit limit = EnvManager.getUser().getLimit();
		Integer count = this.countPages(EnvManager.getUser().getSites().get(0)
				.getId());
		if (count >= limit.getPages()) {
			SystemException.handleMessageException("您的页面限额已使用完毕，无法添加新页面");
		}
		List<LayoutModel> layouts = EnvManager.getTemplates().get(id);
		if (layouts == null || layouts.size() == 0) {
			SystemException.handleMessageException("指定页面模板不存在");
		}
		this.save(page);
		List<LayoutModel> hd = new ArrayList<LayoutModel>();
		if (page.getIsIndex()) {// 如果是创建首页，则生成默认区域和模块，否则页头为空
			// 新增默认的页头布局
			Layout layout = PageUtils.createPageHeaderLayout((UserPage) page);
			this.save(layout);
			// 新增默认的页头布局内容器
			PageRegion region = PageUtils.createRegion(layout,
					PageRegion.MAIN_WRAP);
			this.save(region);
			// 新增默认页头
			PageModule module = PageUtils.createShopHeader(region, null);
			this.save(module);
			// 生成默认店标模块模型
			ModuleModel hModule = PageUtils.convertModule(this, module);// 店标
			List<ModuleModel> hmms = new ArrayList<ModuleModel>();
			hmms.add(hModule);
			// 生成默认页头区域模型
			RegionModel hRegion = new RegionModel();
			hRegion.setId(region.getId());
			hRegion.setModules(hmms);
			// 生成默认页头布局模型
			LayoutModel hLayout = new LayoutModel();
			hLayout.setId(layout.getId());
			hLayout.setLayout(layout.getLayout());
			hLayout.setMain(hRegion);
			hd.add(hLayout);
		}
		PageModel model = new PageModel();
		model.setHd(hd);
		List<LayoutModel> bd = new ArrayList<LayoutModel>();
		for (LayoutModel bLayout : layouts) {// 主内容区
			LayoutModel lm = new LayoutModel();
			RegionModel mRm = null;
			RegionModel sRm = null;
			RegionModel eRm = null;
			PageLayout _layout = PageUtils.copyPageLayout(bLayout, userId,
					siteId, nick, page.getId());// 拷贝生成布局
			this.save(_layout);
			if (bLayout.getMain() != null) {
				PageRegion _region = PageUtils.copyPageRegion(
						bLayout.getMain(), PageRegion.MAIN_WRAP, userId,
						siteId, nick, page.getId(), _layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getMain().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				mRm = new RegionModel();
				mRm.setId(_region.getId());
				mRm.setModules(mRms);
			} else {
				SystemException.handleMessageException("模块信息错误：未找到主内容区");
			}
			if (bLayout.getSub() != null) {
				PageRegion _region = PageUtils.copyPageRegion(bLayout.getSub(),
						PageRegion.COL_SUB, userId, siteId, nick, page.getId(),
						_layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getSub().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				sRm = new RegionModel();
				sRm.setId(_region.getId());
				sRm.setModules(mRms);
			}
			if (bLayout.getExtra() != null) {
				PageRegion _region = PageUtils.copyPageRegion(
						bLayout.getExtra(), PageRegion.COL_EXTRA, userId,
						siteId, nick, page.getId(), _layout.getId());// 拷贝生成区域
				this.save(_region);
				List<ModuleModel> mRms = new ArrayList<ModuleModel>();
				List<ModuleModel> _mms = bLayout.getExtra().getModules();
				if (_mms != null && _mms.size() > 0) {
					for (ModuleModel bModule : _mms) {
						PageModule _module = PageUtils.copyPageModule(bModule,
								userId, siteId, nick, pid, page.getId(),
								_region.getId());
						this.save(_module);
						mRms.add(PageUtils.convertModule(this, _module));// 添加模块元信息
					}
				}
				eRm = new RegionModel();
				eRm.setId(_region.getId());
				eRm.setModules(mRms);
			}
			// 生成布局元信息
			lm.setId(_layout.getId());
			lm.setLayout(_layout.getLayout());
			lm.setMain(mRm);
			if (sRm != null)
				lm.setSub(sRm);
			if (eRm != null)
				lm.setExtra(eRm);
			bd.add(lm);
		}
		model.setBd(bd);
		// 保存最终的元信息
		PageMeta meta = new PageMeta();
		meta.setId(page.getId());
		meta.setMetadata(PageUtils.covertPageModel2Json(model));
		this.save(meta);
	}

	@SuppressWarnings("unchecked")
	@Override
	public PageMeta getIndexPageMeta(String siteId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isIndex", true);
		params.put("siteId", siteId);
		String hql = "select pm from PageMeta pm,UserPage up where up.isIndex=:isIndex and up.id=pm.id and up.site_id=:siteId";
		List<PageMeta> pms = (List<PageMeta>) this.findByHql(hql, params);
		if (pms != null && pms.size() == 1) {
			return pms.get(0);
		}
		return null;
	}

	@Override
	public UserPageDetail createPageDetail(User user) {
		Site site = user.getSites().get(0);
		UserPageDetail page = PageUtils.createPageDetail(EnvManager.getUser());// 创建详情页
		this.save(page);
		PageDetailLayout layout = this.findByCriterion(PageDetailLayout.class,
				R.eq("site_id", site.getId()));
		if (layout == null) {
			layout = PageUtils.createPageDetailLayout(EnvManager.getUser(),
					Layout.S5M0);// 默认左侧190，右侧760
			layout.setPage(page.getId());
			this.save(layout);// 保存布局
			this.saveAll(PageUtils.createPageRegions(layout));// 保存布局容器
			PageMeta meta = PageUtils.convertNoSort(this, page.getUser_id(),
					page);
			meta.setUser_id(page.getUser_id());
			this.save(meta);// 新版本不排序
		} else {// 更新布局所属页面
			layout.setPage(page.getId());
			this.update(layout);
			PageMeta meta = PageUtils
					.convertSort(this, page.getUser_id(), page);
			this.save(meta);// 旧版本排序
		}

		return page;
	}

	@Override
	public UserPageSearch createPageSearch(User user) {
		Site site = user.getSites().get(0);
		UserPageSearch page = PageUtils.createPageSearch(EnvManager.getUser());// 创建详情页
		this.save(page);
		PageSearchLayout layout = this.findByCriterion(PageSearchLayout.class,
				R.eq("site_id", site.getId()));
		if (layout == null) {
			layout = PageUtils.createPageSearchLayout(EnvManager.getUser(),
					Layout.S5M0);// 默认左侧190，右侧760
			layout.setPage(page.getId());
			this.save(layout);// 保存布局
			this.saveAll(PageUtils.createPageRegions(layout));// 保存布局容器
			PageMeta meta = PageUtils.convertNoSort(this, page.getUser_id(),
					page);
			this.save(meta);// 新版本不排序
		} else {// 更新布局所属页面
			layout.setPage(page.getId());
			this.update(layout);
			PageMeta meta = PageUtils
					.convertSort(this, page.getUser_id(), page);
			this.save(meta);// 旧版本排序
		}
		return page;
	}

	@Override
	public void indexNewSet(String pageId) {
		UserPage newIndex = this.get(UserPage.class, pageId);
		if (newIndex == null) {
			SystemException.handleMessageException("指定要设置为首页的页面不存在");
		}
		if (newIndex.getIsIndex()) {
			SystemException.handleMessageException("指定的页面已经是首页");
		}
		if (!newIndex.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		newIndex.setIsIndex(true);// 新首页
		if (StringUtils.isNotEmpty(newIndex.getCss())
				|| StringUtils.isNotEmpty(newIndex.getSkin())) {
			SiteTheme theme = this.get(SiteTheme.class, newIndex.getSite_id());
			if (theme != null) {
				theme.setSkin(newIndex.getSkin());
				if (StringUtils.isNotEmpty(newIndex.getCss()))
					theme.setTheme(Long.valueOf(newIndex.getCss()));
				this.update(theme);
				SiteImpl siteImpl = EnvManager.getSites().get(
						EnvManager.getUser().getUser_id());
				if (siteImpl != null) {// 设置缓存中的皮肤，主题
					siteImpl.setSite_skin(theme.getSkin());
					siteImpl.setSite_theme(theme.getTheme() != null ? String
							.valueOf(theme.getTheme()) : null);
					EnvManager.getSites().put(
							EnvManager.getUser().getUser_id(), siteImpl);
				}
			}
		}
	}

	@Override
	public void indexSet(String pageId) {
		UserPage newIndex = this.get(UserPage.class, pageId);
		if (newIndex == null) {
			SystemException.handleMessageException("指定要设置为首页的页面不存在");
		}
		if (newIndex.getIsIndex()) {
			SystemException.handleMessageException("指定的页面已经是首页");
		}
		if (!newIndex.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		UserPage oldIndex = this.findByCriterion(UserPage.class,
				R.eq("user_id", newIndex.getUser_id()), R.eq("isIndex", true));
		if (oldIndex == null) {
			SystemException.handleMessageException("您之前尚未设置首页");
		}
		newIndex.setIsIndex(true);// 新首页
		oldIndex.setIsIndex(false);// 旧首页
		// 处理页头模块
		PageMeta oldMeta = this.get(PageMeta.class, oldIndex.getId());// 获取旧的首页元信息
		if (oldMeta != null) {
			PageModel oldModel = new Gson().fromJson(oldMeta.getMetadata(),
					PageModel.class);
			if (oldModel != null) {
				List<LayoutModel> hd = oldModel.getHd();
				PageMeta newMeta = this.get(PageMeta.class, newIndex.getId());
				if (newMeta != null) {
					PageModel newModel = new Gson().fromJson(
							newMeta.getMetadata(), PageModel.class);
					if (newModel != null) {
						newModel.setHd(hd);// 设置新首页的页头元信息
						newMeta.setMetadata(PageUtils
								.covertPageModel2Json(newModel));// 保存
						this.update(newMeta);
					} else {
						SystemException.handleMessageException("获取新首页元信息失败");
					}
				} else {
					SystemException.handleMessageException("获取新首页元信息失败");
				}
			} else {
				SystemException.handleMessageException("获取旧首页元信息失败");
			}

		} else {
			SystemException.handleMessageException("无法获取站点页头信息");
		}
		if (StringUtils.isNotEmpty(newIndex.getCss())
				|| StringUtils.isNotEmpty(newIndex.getSkin())) {
			SiteTheme theme = this.get(SiteTheme.class, newIndex.getSite_id());
			if (theme != null) {
				theme.setSkin(newIndex.getSkin());
				if (StringUtils.isNotEmpty(newIndex.getCss()))
					theme.setTheme(Long.valueOf(newIndex.getCss()));
				this.update(theme);
				SiteImpl siteImpl = EnvManager.getSites().get(
						EnvManager.getUser().getUser_id());
				if (siteImpl != null) {// 设置缓存中的皮肤，主题
					siteImpl.setSite_skin(theme.getSkin());
					siteImpl.setSite_theme(theme.getTheme() != null ? String
							.valueOf(theme.getTheme()) : null);
					EnvManager.getSites().put(
							EnvManager.getUser().getUser_id(), siteImpl);
				}
			}
		}
	}

	@Override
	public void deployPage(FreeMarkerConfigurer fcg, String userId, String id,
			ModuleMethod moduleMethod, Boolean isHeader) {
		UserPage page = this.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		Template template = null;
		if (!page.getUser_id().equals(userId)) {
			SystemException.handleMessageException("您无权发布此页面");
		}
		template = PageUtils.getUserTemplate(page, null, null, null, this, fcg,
				false);
		if (template == null) {
			SystemException.handleMessageException("模板生成错误");
		}
		Integer type = 0;
		if (!page.getIsIndex()) {
			type = 1;// 子页面
		}
		PageMeta meta = this.get(PageMeta.class, id);
		if (meta == null) {
			SystemException.handleMessageException("未找到页面元信息");
		}
		Site site = this.get(Site.class, page.getSite_id());
		site.setUser_id(page.getUser_id());
		try {
			File htmlFile = new File(getPath(type, "shop" + page.getUser_id(),
					page.getCreated()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				if (page.getIsIndex()) {// 如果是首页
					EnvManager.addLastSite(site);
				}
				htmlFile.createNewFile();
			}
			htmlFile.setExecutable(true);// 设置为可执行即chmod +x
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("module", moduleMethod);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
			if (site.getStatus() == null || 0 == site.getStatus()) {// 如果状态为未发布,则修改状态为已发布
				site.setStatus(1);
			}
			if (page.getStatus() == null || !page.getStatus()) {
				if (page != null) {
					page.setStatus(true);
				}
				// TODO 创建对应的广告计划投放对象
			}
			page.setDeployDate(new Date());// 设置发布时间
			if (page.getIsIndex() != null && page.getIsIndex()) {
				htmlFile = new File(getMetadataPath("shop" + page.getUser_id()));
				parent = new File(htmlFile.getParent());
				if (!parent.exists()) {
					parent.mkdirs();
				}
				if (!htmlFile.exists()) {// 如果不存在则是第一次发布
					htmlFile.createNewFile();
					List<SiteMetadata> metas = this.findAllByCriterion(
							SiteMetadata.class, R.eq("site_id", site.getId()));
					template = new Template(
							"template_meta_" + page.getId(),
							new StringReader(
									"<#if metas??&&metas?size!=0><#list metas as m>${m.metadata}<#t></#list></#if>"),
							fcg.getConfiguration());
					out = new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(htmlFile), "UTF-8"));
					maps = new HashMap<String, Object>();
					maps.put("metas", metas);
					template.setEncoding("UTF-8");
					template.process(maps, out);// 生成具体模块内容并输出
					out.flush();
					out.close();
				}
			}
			if (page.getIsIndex()) {// 页头|页尾异步发布命令
				deployHeader(page, meta, moduleMethod, fcg);
				deployFooter(fcg, page.getUser_id());
				// PageHeaderCommand command = new PageHeaderCommand();
				// command.setFcg(fcg);
				// command.setId(id);
				// command.setModuleMethod(moduleMethod);
				// command.setPageService(this);
				// CommandExecutor.getCommands().add(command);
			}
			T_UserSubscribe usb = this.get(T_UserSubscribe.class, userId);
			WindSiteDelay
					.addPageQueue(page.getId(), page.getDeployDate(),
							WindSiteDelay.getDays(usb.getVersionNo()),
							TimeUnit.SECONDS);// 加入超时队列(加入5分钟的随机)
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void deployHeaderAndFooter(String id, FreeMarkerConfigurer fcg,
			ModuleMethod moduleMethod) {
		UserPage page = this.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		if (!page.getIsIndex()) {
			SystemException.handleMessageException("指定的页面不是首页");
		}
		PageMeta meta = this.get(PageMeta.class, id);
		if (meta == null) {
			SystemException.handleMessageException("未找到页面元信息");
		}
		deployHeader(page, meta, moduleMethod, fcg);
		deployFooter(fcg, page.getUser_id());
	}

	public void deployHeader(UserPage page, PageMeta meta,
			ModuleMethod moduleMethod, FreeMarkerConfigurer fcg) {
		// 发布页头
		try {
			PageModel model = PageUtils.convertPageModel(meta.getMetadata());
			List<LayoutModel> lm = model.getHd();
			if (lm != null && lm.size() == 1) {// 根据当前页面元信息生成页头
				RegionModel rm = lm.get(0).getMain();
				if (rm != null) {
					List<ModuleModel> mms = rm.getModules();
					if (mms != null && mms.size() > 0) {
						User user = this.findByCriterion(User.class,
								R.eq("user_id", page.getUser_id()));
						String ftl = "";
						for (ModuleModel mm : mms) {
							ftl += PageUtils.createModule(mm, user.getNick(),
									user.getPid(), false);
						}
						File htmlFile = new File(getHeaderPath("shop"
								+ page.getUser_id()));
						File parent = new File(htmlFile.getParent());
						if (!parent.exists()) {
							parent.mkdirs();
						}
						if (!htmlFile.exists()) {// 如果不存在则是第一次发布
							htmlFile.createNewFile();
						}
						htmlFile.setExecutable(true);// 设置为可执行即chmod +x
						Template template = new Template("template_header_"
								+ page.getId(), new StringReader(ftl),
								fcg.getConfiguration());
						Writer out = new BufferedWriter(new OutputStreamWriter(
								new FileOutputStream(htmlFile), "UTF-8"));
						Map<String, Object> maps = new HashMap<String, Object>();
						maps.put("module", moduleMethod);
						template.setEncoding("UTF-8");
						template.process(maps, out);// 生成具体模块内容并输出
						out.flush();
						out.close();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployMetaData(FreeMarkerConfigurer fcg, String userId) {
		// 发布页尾
		try {
			List<SiteMetadata> metas = this.findAllByCriterion(
					SiteMetadata.class, R.eq("user_id", userId));
			if (metas != null && metas.size() > 0) {
				File htmlFile = new File(getMetadataPath("shop" + userId));
				File parent = new File(htmlFile.getParent());
				if (!parent.exists()) {
					parent.mkdirs();
				}
				if (!htmlFile.exists()) {// 如果不存在则是第一次发布
					htmlFile.createNewFile();
				}
				htmlFile.setExecutable(true);// 设置为可执行即chmod +x
				Template template = new Template(
						"template_meta_" + userId,
						new StringReader(
								"<#if metas??&&metas?size!=0><#list metas as m>${m.metadata}<#t></#list></#if>"),
						fcg.getConfiguration());
				Writer out = new BufferedWriter(new OutputStreamWriter(
						new FileOutputStream(htmlFile), "UTF-8"));
				Map<String, Object> maps = new HashMap<String, Object>();
				maps.put("metas", metas);
				template.setEncoding("UTF-8");
				template.process(maps, out);// 生成具体模块内容并输出
				out.flush();
				out.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deployFooter(FreeMarkerConfigurer fcg, String userId) {
		// 发布页尾
		try {
			File htmlFile = new File(getFooterPath("shop" + userId));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			htmlFile.setExecutable(true);// 设置为可执行即chmod +x
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/include/pageFooterTemplate.ftl");
			List<FanliFriendLinks> links = this.findAllByCriterionAndOrder(
					FanliFriendLinks.class, Order.asc("sortOrder"),
					R.eq("user_id", userId));
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(this, maps, userId);
			KeFuSupport kefu = this
					.get(KeFuSupport.class, Long.valueOf(userId));
			if (kefu != null) {
				maps.put("kefu", kefu);
			}
			ShareSupport share = this.get(ShareSupport.class,
					Long.valueOf(userId));
			if (share != null) {
				maps.put("share", share);
			}
			maps.put("channels", EnvManager.getChannels());// TODO
			// 普及版（收费）临时使用淘宝频道做友情链接
			maps.put("friendLinks", links);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("resource")
	@Override
	public void deployDetail(FreeMarkerConfigurer fcg, User user,
			ModuleMethod moduleMethod) {
		List<UserPageDetail> details = this.findAllByCriterion(
				UserPageDetail.class, R.eq("user_id", user.getUser_id()));
		if (details == null || details.size() == 0) {
			SystemException.handleMessageException("您尚未设计宝贝详情页");
		}
		Template template = null;
		PageMeta meta = this.get(PageMeta.class, details.get(0).getId());
		if (meta == null) {
			SystemException.handleMessageException("未找到宝贝详情页的页面元信息");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		if (model == null) {
			SystemException.handleMessageException("宝贝详情页元信息不正确");
		}
		RegionModel regionModel = model.getBd().get(0).getSub();
		if (regionModel == null) {
			SystemException.handleMessageException("您设计的宝贝详情页没有发现侧边栏");
		}
		List<ModuleModel> mms = regionModel.getModules();
		if (mms == null || mms.size() == 0) {
			SystemException.handleMessageException("您设计的宝贝详情页侧边栏没有添加模块");
		}
		String ftl = "";
		for (ModuleModel mm : mms) {
			ftl += PageUtils.createModule(mm, user.getNick(), user.getPid(),
					false);
		}
		try {
			File htmlFile = new File(getDetailPath("shop" + user.getUser_id()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template = new Template("template_detail_" + user.getUser_id(),
					new StringReader(ftl), fcg.getConfiguration());
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("module", moduleMethod);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
			String userId = user.getUser_id();
			if (!CommandExecutor.getCachecommands().containsKey(
					"user-" + userId)) {// 如果不在队列中
				UserItemDetailCommand command = new UserItemDetailCommand();
				command.setFcg(fcg);
				command.setPageService(this);
				command.setUserId(userId);
				CommandExecutor.getCachecommands().put("user-" + userId,
						command);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("resource")
	@Override
	public void deploySearch(FreeMarkerConfigurer fcg, User user,
			ModuleMethod moduleMethod) {
		List<UserPageSearch> searchs = this.findAllByCriterion(
				UserPageSearch.class, R.eq("user_id", user.getUser_id()));
		if (searchs == null || searchs.size() == 0) {
			SystemException.handleMessageException("您尚未设计搜索列表页");
		}
		Template template = null;
		PageMeta meta = this.get(PageMeta.class, searchs.get(0).getId());
		if (meta == null) {
			SystemException.handleMessageException("未找到搜索列表页的页面元信息");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		if (model == null) {
			SystemException.handleMessageException("搜索列表页元信息不正确");
		}
		RegionModel regionModel = model.getBd().get(0).getSub();
		if (regionModel == null) {
			SystemException.handleMessageException("您设计的搜索列表页没有发现侧边栏");
		}
		List<ModuleModel> mms = regionModel.getModules();
		if (mms == null || mms.size() == 0) {
			SystemException.handleMessageException("您设计的搜索列表页侧边栏没有添加模块");
		}
		String ftl = "";
		for (ModuleModel mm : mms) {
			ftl += PageUtils.createModule(mm, user.getNick(), user.getPid(),
					false);
		}
		try {
			File htmlFile = new File(getSearchPath("shop" + user.getUser_id()));
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			htmlFile.setExecutable(true);
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template = new Template("template_search_" + user.getUser_id(),
					new StringReader(ftl), fcg.getConfiguration());
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("module", moduleMethod);
			template.setEncoding("UTF-8");
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private String getHeaderPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "header.html";
	}

	private String getMetadataPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "metadata.html";
	}

	private String getAlimamaRootPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "root.txt";
	}

	private String getItemDetailPath(String numIid) {
		return EnvManager.getItemPath() + File.separator
				+ numIid.substring(numIid.length() - 3, numIid.length())
				+ File.separator + numIid + File.separator + numIid + ".html";
	}

	private String getItemDetailDescPath(String numIid) {
		return EnvManager.getItemPath() + File.separator
				+ numIid.substring(numIid.length() - 3, numIid.length())
				+ File.separator + numIid + File.separator + "detail.html";
	}

	private String getShopDetailMetaPath(String sid) {
		return EnvManager.getShopPath() + File.separator
				+ sid.substring(sid.length() - 2, sid.length())
				+ File.separator + sid + File.separator + "meta.html";
	}

	private String getShopCatsPath(String cid) {
		return EnvManager.getShopPath() + File.separator + "cats"
				+ File.separator + cid + ".html";
	}

	private String getItemDetailMetaPath(String numIid) {
		return EnvManager.getItemPath() + File.separator
				+ numIid.substring(numIid.length() - 3, numIid.length())
				+ File.separator + numIid + File.separator + "meta.html";
	}

	private String getShopDetailPath(String sid) {
		return EnvManager.getShopPath() + File.separator
				+ sid.substring(sid.length() - 2, sid.length())
				+ File.separator + sid + File.separator + sid + ".html";
	}

	private String getModulePath(String domainName, Long moduleId) {
		return EnvManager.getUserPath(domainName) + File.separator + "module"
				+ File.separator + moduleId + ".html";
	}

	private String getUserHtmlHeaderPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "pageHtmlHeader.html";
	}

	private String getUserShopDetailPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "shopDetail.html";
	}

	private String getUserItemDetailPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "itemDetail.html";
	}

	private String getFooterPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "footer.html";
	}

	private String getDetailPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "detail.html";
	}

	private String getSearchPath(String domainName) {
		return EnvManager.getUserPath(domainName) + "search.html";
	}

	private String getPath(Integer type, String domainName, Date created) {
		switch (type) {
		case 1:// 子页面
			return EnvManager.getUserPath(domainName) + "pages"
					+ File.separator + created.getTime() + ".html";
		case 0:// 主页
			return EnvManager.getUserPath(domainName) + domainName + ".html";

		}
		return EnvManager.getUserPath(domainName) + domainName + ".html";
	}

	@Override
	public void updatePageStatus(String id, Boolean status) {
		Page page = this.get(Page.class, id);
		if (page != null) {
			page.setStatus(status);
		}
		if (status) { // TODO 创建对应的广告计划投放对象

		}

	}

	@Override
	public void updatePage(Page page) {
		this.update(page);
		// TODO 自动发布此页面
	}

	@Override
	public Integer countPages(String siteId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("siteId", siteId);
		return ((Long) this.findByHql(
				"select count(t) from UserPage t where t.site_id=:siteId", map)
				.get(0)).intValue();
	}

	@Override
	public Integer countPageLayouts(String page) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("page", page);
		return ((Long) this.findByHql(
				"select count(t) from PageLayout t where t.page=:page", map)
				.get(0)).intValue();
	}

	@Override
	public Integer countPageModules(String page) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("page", page);
		return ((Long) this.findByHql(
				"select count(t) from PageModule t where t.page=:page", map)
				.get(0)).intValue();
	}

	@SuppressWarnings("unchecked")
	@Override
	public PageRegion getUserPageHeaderRegion(String siteId) {
		String hql = "select r from PageRegion r,PageHeaderLayout l where l.site_id=:siteId and r.layout=l.id and r.region='"
				+ PageRegion.MAIN_WRAP + "'";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("siteId", siteId);
		params.put("isIndex", true);
		List<PageRegion> regions = (List<PageRegion>) this.findByHql(hql,
				params);
		if (regions.size() == 1) {
			return regions.get(0);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PageRegion getUserPageDetailRegion(String siteId) {
		String hql = "select r from PageRegion r,PageDetailLayout l where l.site_id=:siteId and r.layout=l.id and r.region='"
				+ PageRegion.COL_SUB + "'";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("siteId", siteId);
		List<PageRegion> regions = (List<PageRegion>) this.findByHql(hql,
				params);
		if (regions.size() == 1) {
			return regions.get(0);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PageRegion getUserPageSearchRegion(String siteId) {
		String hql = "select r from PageRegion r,PageSearchLayout l where l.site_id=:siteId and r.layout=l.id and r.region='"
				+ PageRegion.COL_SUB + "'";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("siteId", siteId);
		List<PageRegion> regions = (List<PageRegion>) this.findByHql(hql,
				params);
		if (regions.size() == 1) {
			return regions.get(0);
		}
		return null;
	}

	@Override
	public void addPage(Page page, String layout) {
		Limit limit = EnvManager.getUser().getLimit();
		Integer count = this.countPages(EnvManager.getUser().getSites().get(0)
				.getId());
		if (count >= limit.getPages()) {
			SystemException.handleMessageException("您的页面限额已使用完毕，无法添加新页面");
		}
		this.save(page);// 保存页面
		Timestamp stamp = new Timestamp(page.getCreated().getTime());
		((UserPage) page).setPageid(Math.abs(stamp.getTime()) + "");
		if (page.getIsIndex()) {// 如果是创建首页，则生成默认区域和模块，否则页头为空
			// 新增默认的页头布局
			Layout layoutHeader = PageUtils
					.createPageHeaderLayout((UserPage) page);
			this.save(layoutHeader);
			// 新增默认的页头布局内容器
			PageRegion region = PageUtils.createRegion(layoutHeader,
					PageRegion.MAIN_WRAP);
			this.save(region);
			// 新增默认页头
			PageModule module = PageUtils.createShopHeader(region, null);
			this.save(module);
		}
		if (null == page.getIsIndex())
			page.setIsIndex(false);
		PageLayout pageLayout = PageUtils.createPageLayout((UserPage) page,
				layout, null);
		this.save(pageLayout);// 保存指定布局
		this.saveAll(PageUtils.createPageRegions(pageLayout));// 保存布局内容器
		// 保存元信息
		PageMeta meta = PageUtils.convertNoSort(this, EnvManager.getUser()
				.getUser_id(), page);
		this.save(meta);
	}

	@Override
	public void addPage(Page page) {
		this.save(page);
		if (page instanceof UserPage) {// 如果是会员页面[首页]
			Timestamp stamp = new Timestamp(page.getCreated().getTime());
			((UserPage) page).setPageid(Math.abs(stamp.getTime()) + "");
			page.setIsIndex(true);
			// 新增默认的页头布局
			PageHeaderLayout layout = PageUtils
					.createPageHeaderLayout((UserPage) page);
			this.save(layout);
			// 新增默认的页头布局内容器
			PageRegion region = PageUtils.createRegion(layout,
					PageRegion.MAIN_WRAP);
			this.save(region);
			// 新增默认店标模块
			PageModule module = PageUtils.createShopHeader(region, null);
			this.save(module);

			// 新增默认的两栏布局
			PageLayout pLayout = PageUtils.createPageLayout((UserPage) page,
					Layout.S5M0, null);
			this.save(pLayout);
			// 新增默认的页头布局内容器
			// 左侧190
			PageRegion subRegion = PageUtils.createRegion(pLayout,
					PageRegion.COL_SUB);
			this.save(subRegion);
			// 默认简易搜索框模块
			PageModule shopSearch = PageUtils.createShopSearch(subRegion, null);
			this.save(shopSearch);
			// 默认分类模块
			PageModule shopCategory = PageUtils.createShopCategory(subRegion,
					shopSearch);
			this.save(shopCategory);
			// 默认友情链接模块
			PageModule shopLinks = PageUtils.createShopLinks(subRegion,
					shopCategory);
			this.save(shopLinks);
			// 右侧550
			PageRegion mainRegion = PageUtils.createRegion(pLayout,
					PageRegion.MAIN_WRAP);
			this.save(mainRegion);
			PageModule shopDisplay1 = PageUtils.createShopDisplay(mainRegion,
					null, "新品上架");
			this.save(shopDisplay1);
			PageModule shopDisplay2 = PageUtils.createShopDisplay(mainRegion,
					shopDisplay1, "热卖宝贝");
			this.save(shopDisplay2);
			PageModule shopDisplay3 = PageUtils.createShopDisplay(mainRegion,
					shopDisplay2, "人气宝贝");
			this.save(shopDisplay3);
		}
		this.update(page);
		// 保存元信息
		PageMeta meta = PageUtils.convertSort(this, EnvManager.getUser()
				.getUser_id(), page);
		this.save(meta);
	}

	@Override
	public void addLayout(Layout layout) {
		PageMeta meta = this.get(PageMeta.class, layout.getPage());
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		this.save(layout);// 保存布局
		this.saveAll(PageUtils.createPageRegions(layout));// 保存布局容器
		List<LayoutModel> layouts = model.getBd();
		if (layouts == null) {
			layouts = new ArrayList<LayoutModel>();
		}
		layouts.add(PageUtils.convertLayout(this, layout, false));
		String metaStr = PageUtils.covertPageModel2Json(model);
		meta.setMetadata(metaStr);
		this.update(meta);// 更新元信息
	}

	@Override
	public void deleteLayout(Long layout, String page, String metaStr) {
		PageLayout current = this.get(PageLayout.class, layout);// 查询要删除的布局
		if (current == null) {
			SystemException.handleMessageException("要删除的布局不存在");
		}
		if (!current.getUser_id().equals(EnvManager.getUser().getUser_id())) {//
			SystemException.handleMessageException("您无权删除该布局");
		}
		PageMeta meta = this.get(PageMeta.class, page);
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(metaStr);
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		// 删除布局下所有内容，PageRegion,PageModule
		List<PageRegion> regions = this.findAllByCriterion(PageRegion.class,
				R.eq("layout", layout));
		if (regions.size() > 0) {
			for (PageRegion region : regions) {// 删除容器内所有模块,然后删除该容器
				List<PageModule> modules = this.findAllByCriterion(
						PageModule.class, R.eq("region", region.getId()));
				if (modules != null && modules.size() > 0) {
					for (PageModule m : modules) {
						Map<String, Object> params = new HashMap<String, Object>();
						params.put("mId", m.getId());
						this.executeNativeUpdateSql(
								"delete from w_ad_module_item where mId=:mId",
								params);// 删除之前的推广记录
					}
					this.executeNativeUpdateSql(
							"delete from w_page_module where region="
									+ region.getId(),
							new HashMap<String, Object>());// 删除模块
				}
				this.delete(PageRegion.class, region.getId());
			}
		}
		this.delete(PageLayout.class, layout);// 删除当前布局
		meta.setMetadata(metaStr);
		this.update(meta);// 更新元信息
	}

	@Override
	public void updateLayoutSort(String page, String metaStr) {
		PageModel model = PageUtils.convertPageModel(metaStr);
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		PageMeta meta = this.get(PageMeta.class, page);
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		meta.setMetadata(metaStr);
		this.update(meta);
	}

	@Override
	public String updateModule(PageModule module, ModuleMethod moduleMethod,
			FreeMarkerConfigurer fcg) {
		this.update(module);// 更新
		// 返回模块内容
		List<String> args = new ArrayList<String>();
		args.add(module.getId() + "");
		args.add(EnvManager.getUser().getNick());
		args.add(EnvManager.getUser().getPid());
		args.add("true");
		try {
			return String.valueOf(moduleMethod.exec(args));
		} catch (TemplateModelException e) {
			SystemException.handleMessageException(e);
		}
		return "";
	}

	@Override
	public String addModule(String page, PageModule module,
			ModuleMethod moduleMethod, FreeMarkerConfigurer fcg) {
		PageMeta meta = this.get(PageMeta.class, page);
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		this.save(module);// 保存模块
		if (PageUtils.addModule2PageModel(module, model)) {
			meta.setMetadata(PageUtils.covertPageModel2Json(model));
			this.update(meta);
		} else {
			SystemException.handleMessageException("新增模块失败，页面元信息生成失败");
		}
		// 返回模块内容
		List<String> args = new ArrayList<String>();
		args.add(module.getId() + "");
		args.add(EnvManager.getUser().getNick());
		args.add(EnvManager.getUser().getPid());
		args.add("true");
		try {
			return String.valueOf(moduleMethod.exec(args));
		} catch (TemplateModelException e) {
			SystemException.handleMessageException(e);
		}
		return "";
	}

	@Override
	public void addModule(PageModule module) {
		PageMeta meta = this.get(PageMeta.class, module.getPage());
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		this.save(module);// 保存模块
		if (PageUtils.addModule2PageModel(module, model)) {
			meta.setMetadata(PageUtils.covertPageModel2Json(model));
			this.update(meta);
		} else {
			SystemException.handleMessageException("新增模块失败，页面元信息生成失败");
		}
	}

	@Override
	public void deleteModule(Long module, String page, String metaStr) {
		PageModule current = this.get(PageModule.class, module);// 查询要删除的模块
		if (current == null) {
			SystemException.handleMessageException("要删除的模块不存在");
		}
		if (!current.getUser_id().equals(EnvManager.getUser().getUser_id())) {//
			SystemException.handleMessageException("您无权删除该模块");
		}

		PageMeta meta = this.get(PageMeta.class, page);
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		PageModel model = PageUtils.convertPageModel(metaStr);
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mId", module);
		this.executeNativeUpdateSql(
				"delete from w_ad_module_item where mId=:mId", params);// 删除之前的推广记录
		this.delete(PageModule.class, module);// 删除当前模块
		meta.setMetadata(metaStr);
		this.update(meta);// 更新元信息
	}

	@Override
	public void updateModuleSort(String page, String metaStr) {
		PageModel model = PageUtils.convertPageModel(metaStr);
		if (model == null) {
			SystemException.handleMessageException("页面元信息转换失败");
		}
		PageMeta meta = this.get(PageMeta.class, page);
		if (meta == null) {
			SystemException.handleMessageException("页面元信息不存在");
		}
		meta.setMetadata(metaStr);
		this.update(meta);
	}
}
