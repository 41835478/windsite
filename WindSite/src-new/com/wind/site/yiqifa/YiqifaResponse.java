package com.wind.site.yiqifa;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.wind.site.model.YiqifaReport;

/**
 * 亿起发接口2返回
 * 
 * @author fxy
 * 
 */
public class YiqifaResponse {
	private static final Logger logger = Logger.getLogger(YiqifaResponse.class
			.getName());
	private List<String> body;
	private Integer errorCode;
	private List<YiqifaReport> reports;

	public YiqifaResponse(List<String> body, YiqifaRequest request) {
		super();
		this.body = body;
		convert(request);
	}

	/**
	 * 转换为报表LIST
	 */
	private void convert(YiqifaRequest request) {
		if (body == null || body.size() == 0) {
			return;
		}
		String first = body.get(0);
		if ("1".equals(first)) {
			errorCode = 1;// 参数不全
		} else if ("2".equals(first)) {
			errorCode = 2;// 参数格式错误
		} else if ("3".equals(first)) {
			errorCode = 3;// 时间超过范围
		}
		List<YiqifaReport> reports = new ArrayList<YiqifaReport>();
		if (isSuccess()) {
			String user_id = request.getUser_id();
			String site_id = request.getSite_id();
			String user_name = request.getUser_name();
			YiqifaReport report = null;
			for (String line : body) {
				String[] rs = line.split("\\|\\|");
				if (rs.length >= 16) {// 结果集是否16位以上
					report = new YiqifaReport();
					report.setYiqifaId(rs[0]);// 亿起发唯一编号
					report.setActionId(rs[1]);// 联盟活动编号
					report.setSid(rs[2]);// 网营商ID（商城）
					report.setWid(rs[3]);// 网站编号
					report.setOrderTime(rs[4]);// 下单时间
					report.setOrderNo(rs[5]);// 订单编号
					report.setCommissionType(rs[6]);// 佣金分类
					report.setItemId(rs[7]);// 商品编号
					report.setItemNums(rs[8]);// 订单商品件数
					report.setItemPrice(rs[9]);// 订单商品价格
					report.setOuterCode(rs[10]);// 反馈标签（返利标识）
					report.setOrderStatus(rs[11]);// 订单状态
					report.setCommission(rs[12]);// 网站主佣金
					report.setCid(rs[13]);// 商品分类
					// 预留两个位置，暂不处理
					// 新淘网
					report.setUser_id(user_id);
					report.setSite_id(site_id);
					report.setUser_name(user_name);
					reports.add(report);
				} else {
					logger.info(line + " length is wrong");
				}
			}
		}
		this.setReports(reports);// 设置结果集
	}

	public boolean isSuccess() {
		return null == errorCode ? true : false;
	}

	/**
	 * @return the body
	 */
	public List<String> getBody() {
		return body;
	}

	/**
	 * @param body
	 *            the body to set
	 */
	public void setBody(List<String> body) {
		this.body = body;
	}

	/**
	 * @return the errorCode
	 */
	public Integer getErrorCode() {
		return errorCode;
	}

	/**
	 * @param errorCode
	 *            the errorCode to set
	 */
	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * @return the reports
	 */
	public List<YiqifaReport> getReports() {
		return reports;
	}

	/**
	 * @param reports
	 *            the reports to set
	 */
	public void setReports(List<YiqifaReport> reports) {
		this.reports = reports;
	}

}
