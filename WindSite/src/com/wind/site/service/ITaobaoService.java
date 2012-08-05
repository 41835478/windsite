package com.wind.site.service;

import java.util.List;
import java.util.Set;

import com.taobao.api.domain.ItemCat;
import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.HuabaoData;
import com.wind.site.model.HuabaoTag;
import com.wind.site.model.Huabaos;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterPicture;

/**
 * 淘宝业务接口
 * 
 * @author fxy
 * 
 */
public interface ITaobaoService extends IBaseService {
	/**
	 * 保存画报图片集
	 * 
	 * @param pp
	 * @param poster
	 */
	void addHuabaoPic(List<T_PosterPicture> pp, T_Poster poster);

	/**
	 * 新增画报
	 * 
	 * @param tags
	 * @param data
	 */
	void addHuabao(Huabaos hbs, Set<HuabaoTag> tags, HuabaoData data);

	/**
	 * 搜索推广商品
	 * 
	 * @param page
	 * @param cid
	 * @param keyword
	 * @return
	 */
	List<ADTaobaokeItem> searchADItemsByFilter(Page<ADTaobaokeItem> page,
			String cid, String keyword);

	/**
	 * 保存类目集合
	 * 
	 * @param cats
	 * @return
	 */
	List<T_ItemCat> saveTItemCat(List<ItemCat> cats);

	/**
	 * 更新指定cid
	 * 
	 * @param cid
	 */
	void updateTItemCatUnSuccess(T_ItemCat cat);
}
