package com.wind.site.command;

import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.wind.site.model.Member;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.ICommandService;
import com.wind.site.yiqifa.YiqifaClient;
import com.wind.site.yiqifa.YiqifaRequest;
import com.wind.site.yiqifa.YiqifaResponse;

/**
 * 亿起发获取报表
 * 
 * @author fxy
 * 
 */
public class YiqifaReportsGetCommand implements ICommand {
	private static final Logger logger = Logger
			.getLogger(YiqifaReportsGetCommand.class.getName());
	private YiqifaRequest request;

	@Override
	public void execute(ICommandService service) {
		// logger.info(request.toString() + " is starting");
		YiqifaResponse response = YiqifaClient.reportsGet(request);
		if (response != null && response.isSuccess()) {
			List<YiqifaReport> reports = response.getReports();
			if (reports != null && reports.size() > 0) {
				for (YiqifaReport report : reports) {
					try {
						if (report != null) {
							String outCode = report.getOuterCode();
							if (StringUtils.isNotEmpty(outCode)
									&& outCode.startsWith("xtfl")) {// 如果推广渠道不为空，并且是新淘返利
								Member m = service.get(Member.class, Long
										.valueOf(outCode.replace("xtfl", "")));
								if (m != null
										&& m.getUser_id().equals(
												request.getUser_id())
										&& m.getSite_id().equals(
												request.getSite_id())) {// 如果用户存在，且是该站点的会员
									service.mergeYiqifaReportTrade(Long
											.valueOf(outCode
													.replace("xtfl", "")),
											request.getUser_id(), request
													.getSite_id(), report);
								} else {
									service.mergeYiqifaReportTrade(request
											.getUser_id(),
											request.getSite_id(), report);
								}
							} else {
								service.mergeYiqifaReportTrade(request
										.getUser_id(), request.getSite_id(),
										report);
							}
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} else {
			logger.info(request.toString() + " error");
		}
		// logger.info(request.toString() + " is ended");
	}

	/**
	 * @return the request
	 */
	public YiqifaRequest getRequest() {
		return request;
	}

	/**
	 * @param request
	 *            the request to set
	 */
	public void setRequest(YiqifaRequest request) {
		this.request = request;
	}

}
