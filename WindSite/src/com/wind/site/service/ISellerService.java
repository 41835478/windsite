package com.wind.site.service;

import java.util.List;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;

/**
 * 卖家功能业务接口
 * 
 * @author fxy
 * 
 */
public interface ISellerService extends IBaseService {
	/**
	 * 查询卖家推广组类淘客推广
	 * 
	 * @param nick
	 * @param num_iid
	 * @param member
	 * @param page
	 * @return
	 */
	List<?> sellerGroupMembers(String nick, String num_iid, String member,
			Page<?> page);

	/**
	 * 查询卖家店铺收藏类淘客推广
	 * 
	 * @param userId
	 * @param page
	 * @return
	 */
	List<?> sellerShopMembers(String userId, Page<?> page);

	/**
	 * 查询卖家组件淘客推广
	 * 
	 * @param user_id
	 * @param wid
	 * @param page
	 * @return
	 */
	List<?> sellerWidgetMembers(String user_id, String wid, Page<?> page);
}
