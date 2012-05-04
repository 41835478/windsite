package com.wind.site.command;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.request.VasOrderSearchRequest;
import com.taobao.api.response.VasOrderSearchResponse;
import com.wind.core.dao.Page;
import com.wind.site.model.T_ArticleBizOrder;
import com.wind.site.service.IAdminService;
import com.wind.site.util.TaobaoFetchUtil;

/**
 * 获取订单记录
 * 
 * @author fxy
 * 
 */
public class ArticleBizOrderCommand {

	private IAdminService adminService;

	public void synOrders() {
		getLastDayOrders();
	}

	private void getOrdersByRequest(VasOrderSearchRequest request,
			Page<ArticleBizOrder> page) {
		request.setPageNo(Long.valueOf(page.getPageNo()));
		VasOrderSearchResponse response = TaobaoFetchUtil
				.vasOrderSearch(request);
		if (response != null) {
			if (response.getTotalItem() > 0) {
				page.setTotalCount(response.getTotalItem().intValue());// 设置总记录数
			}
			List<ArticleBizOrder> orders = response.getArticleBizOrders();
			if (orders != null && orders.size() > 0) {
				T_ArticleBizOrder bizOrder = null;
				for (ArticleBizOrder order : orders) {
					bizOrder = adminService.get(T_ArticleBizOrder.class, order
							.getOrderId());
					if (bizOrder == null) {
						bizOrder = new T_ArticleBizOrder();
						bizOrder.setArticle_code(order.getArticleCode());
						bizOrder.setArticle_name(order.getArticleName());
						bizOrder.setBiz_order_id(order.getBizOrderId());
						bizOrder.setBiz_type(order.getBizType().intValue());
						bizOrder.setCreated(order.getCreate());
						bizOrder.setFee(order.getFee());
						bizOrder.setItem_code(order.getItemCode());
						bizOrder.setItem_name(order.getItemName());
						bizOrder.setNick(order.getNick());
						bizOrder.setOrder_cycle(order.getOrderCycle());
						bizOrder.setOrder_cycle_end(order.getOrderCycleEnd());
						bizOrder.setOrder_cycle_start(order
								.getOrderCycleStart());
						bizOrder.setOrder_id(order.getOrderId());
						bizOrder.setProm_fee(order.getPromFee());
						bizOrder.setRefund_fee(order.getRefundFee());
						bizOrder.setTotal_pay_fee(order.getTotalPayFee());
						adminService.save(bizOrder);
					}
				}
				System.out
						.println("page[" + page.getPageNo() + "] is finished");
				if (page.isHasNextPage()) {
					page.setPageNo(page.getNextPage());
					getOrdersByRequest(request, page);
				}
			}
		}
	}

	/**
	 * 前一天到当前的订单记录
	 */
	public void getLastDayOrders() {
		Page<ArticleBizOrder> page = new Page<ArticleBizOrder>(1, 20);
		VasOrderSearchRequest request = new VasOrderSearchRequest();
		request.setArticleCode(TaobaoFetchUtil.VAS_APPSTORE);
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		request.setStartCreated(calendar.getTime());
		request.setEndCreated(new Date());
		getOrdersByRequest(request, page);
	}

	/**
	 * 所有的订单记录
	 */
	public void getAllOrders() {
		Page<ArticleBizOrder> page = new Page<ArticleBizOrder>(3585, 20);
		VasOrderSearchRequest request = new VasOrderSearchRequest();
		request.setArticleCode(TaobaoFetchUtil.VAS_APPSTORE);
		getOrdersByRequest(request, page);
	}

	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public IAdminService getAdminService() {
		return adminService;
	}
}
