package com.wind.site.command.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.site.command.ICommand;
import com.wind.site.model.ShopCatCacheLog;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;

/**
 * 店铺同类推荐静态化
 * 
 * @author fxy
 * 
 */
public class ShopCatsCommand implements ICommand {
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;

	private Long cid;

	private Boolean isAll = false;

	@Override
	public void execute(ICommandService service) {
		ShopCatCacheLog log = pageService.get(ShopCatCacheLog.class, cid);
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -3);// 3天有效期
		if (log != null) {
			if (!isAll && calendar.getTime().before(log.getDeploy())) {// 3天有效期内
				return;
			}
			if (deployShopCats()) {
				log.setDeploy(new Date());
				pageService.update(log);
			}
		} else {
			if (deployShopCats()) {
				log = new ShopCatCacheLog();
				log.setId(cid);
				log.setHits(1L);
				log.setTotalHits(1L);
				log.setDeploy(new Date());
				pageService.save(log);
			}
		}
	}

	public Boolean deployShopCats() {
		if (cid != null) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("cid", cid);
			List<T_TaobaokeShop> shops = pageService
					.findByHql(
							new Page<T_TaobaokeShop>(1, 20),
							"from T_TaobaokeShop where cid=:cid and sid is not null order by sellerCredit*1 desc,commissionRate*1 desc",
							params);
			if (shops != null && shops.size() > 0) {
				pageService.deployShopCats(fcg, String.valueOf(cid), shops);
				return true;
			}
		}
		return false;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

	/**
	 * @return the cid
	 */
	public Long getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(Long cid) {
		this.cid = cid;
	}

	public void setIsAll(Boolean isAll) {
		this.isAll = isAll;
	}

	public Boolean getIsAll() {
		return isAll;
	}

}
