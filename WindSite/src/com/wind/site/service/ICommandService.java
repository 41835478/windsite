package com.wind.site.service;

import java.util.List;
import java.util.Set;

import com.taobao.api.domain.TaobaokeReportMember;
import com.wind.core.service.IBaseService;
import com.wind.site.model.ADModuleItem;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.YiqifaReport;

/**
 * 异步命令业务接口类
 * 
 * @author fxy
 * 
 */
public interface ICommandService extends IBaseService {

	/**
	 * 同步模块商品广告投放
	 * 
	 * @param mId
	 * @param items
	 */
	void synADModuleItem(Long mId, Set<ADModuleItem> items);

	/**
	 * 确认商城订单
	 * 
	 * @param trade_id
	 * @param member_id
	 * @return
	 */
	Boolean confirmMallReportTrade(String id, Long member_id);

	/**
	 * 确认淘宝订单
	 * 
	 * @param trade_id
	 * @param member_id
	 * @return
	 */
	Boolean confirmReportTrade(Long trade_id, Long member_id);

	/**
	 * 同步亿起发返利收入报表（非跟单）
	 * 
	 * @param user_id
	 * @param site_id
	 * @param report
	 * @return
	 */
	Boolean mergeYiqifaReportTrade(String user_id, String site_id,
			YiqifaReport report);

	/**
	 * 同步亿起发返利收入报表（跟单）
	 * 
	 * @param member_id
	 * @param user_id
	 * @param site_id
	 * @param report
	 * @return
	 */
	Boolean mergeYiqifaReportTrade(Long member_id, String user_id,
			String site_id, YiqifaReport report);

	/**
	 * 同步返利收入报表(非跟单)
	 * 
	 * @param user_id
	 * @param site_id
	 * @param member
	 */
	Boolean mergeReportTrade(String user_id, String site_id,
			TaobaokeReportMember member);

	
	/**
	 * 同步返利收入报表(非跟单，批量)
	 * 
	 * @param user_id
	 * @param site_id
	 * @param member
	 */
	Integer mergeReportTrades(String user_id, String site_id,
			List<TaobaokeReportMember> members);

	/**
	 * 同步返利收入报表(跟单)
	 * 
	 * @param member_id
	 * @param user_id
	 * @param site_id
	 * @param member
	 */
	Boolean mergeReportTrade(Long member_id, String user_id, String site_id,
			TaobaokeReportMember member);

	/**
	 * 清理当前Plan的投放
	 * 
	 * @param plan
	 */
	void clearAdsBlog(ADPlan plan);

	/**
	 * 清理当前Plan的投放
	 * 
	 * @param plan
	 */
	void clearUserTemplate(ADPlan plan);

	/**
	 * 首页投放
	 * 
	 * @param plan
	 */
	void adsUserTemplate(ADPlan plan);

	/**
	 * 文章投放
	 * 
	 * @param plan
	 */
	void adsBlog(ADPlan plan);

	/**
	 * 更新检测状态及同步商品
	 * 
	 * @param doctor
	 * @param isUpdateItems
	 */
	void updateItemsDoctor(ItemGroupDoctor doctor, Boolean isUpdateItems);

	/**
	 * 根据自定义组件查找已使用人ID列表
	 * 
	 * @param cwid
	 * @return
	 */
	String getUcidsByUsedWidget(String cwid);

}
