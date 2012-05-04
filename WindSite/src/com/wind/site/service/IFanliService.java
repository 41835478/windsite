package com.wind.site.service;

import java.util.List;

import com.wind.core.service.IBaseService;
import com.wind.site.model.FanliKeyWordsLinks;
import com.wind.site.model.User;

/**
 * 返利业务接口
 * 
 * @author fxy
 * 
 */
public interface IFanliService extends IBaseService {
	/**
	 * 文章列表关键词变化
	 * 
	 * @param links
	 */
	void changeKeyWords(List<FanliKeyWordsLinks> links, User user);

	/**
	 * 查询指定站点的指定类型返利金额总数(可指定状态)
	 * 
	 * @param siteId
	 * @return
	 */
	Double sumFanliMoneyBySiteId(String siteId, String type, Integer... status);

	/**
	 * 查询指定会员的指定类型返利金额总数(可指定状态)
	 * 
	 * @param memberId
	 * @return
	 */
	Double sumFanliMoneyByMemberId(Long memberId, String type,
			Integer... status);

	/**
	 * 计算指定站点的指定类型返利记录（可指定状态）
	 * 
	 * @param siteId
	 * @param status
	 * @return
	 */
	Integer countFanliTradeBySiteId(String siteId, String type,
			Integer... status);

	/**
	 * 计算指定会员的指定类型返利记录（可指定状态）
	 * 
	 * @param memberId
	 * @param status
	 * @return
	 */
	Integer countFanliTradeByMemberId(Long memberId, String type,
			Integer... status);
}
