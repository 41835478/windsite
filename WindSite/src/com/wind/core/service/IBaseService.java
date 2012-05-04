package com.wind.core.service;

import java.util.List;
import java.util.Map;

import com.wind.core.dao.IDaoService;
import com.wind.site.model.SiteImpl;

/**
 * Service基类接口
 * 
 * @author fxy
 * 
 */
public interface IBaseService extends IDaoService {
	/**
	 * 查询广告位
	 * 
	 * @param user_id
	 * @return
	 */
	Map<String, List<Map<String, Object>>> getAds(String user_id);

	/**
	 * 根据UserId查询
	 * 
	 * @param userId
	 * @return
	 */
	SiteImpl getSiteImplByUserId(String userId);
}
