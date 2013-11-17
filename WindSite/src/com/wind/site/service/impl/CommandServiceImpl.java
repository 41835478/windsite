package com.wind.site.service.impl;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.taobao.api.domain.TaobaokeReportMember;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADBlogPK;
import com.wind.site.model.ADBlogStatus;
import com.wind.site.model.ADBlogSystem;
import com.wind.site.model.ADModuleItem;
import com.wind.site.model.ADPagePK;
import com.wind.site.model.ADPageStatus;
import com.wind.site.model.ADPageSystem;
import com.wind.site.model.ADPlan;
import com.wind.site.model.AdsFanliTrade;
import com.wind.site.model.BuyFanliTrade;
import com.wind.site.model.FanliTrade;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.Member;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.T_TaobaokeReportMember;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.ICommandService;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 异步命令业务实现类
 * 
 * @author fxy
 * 
 */
public class CommandServiceImpl extends BaseServiceImpl implements
		ICommandService {
	private static final Logger logger = Logger
			.getLogger(CommandServiceImpl.class.getName());

	@Override
	public void synADModuleItem(Long mId, Set<ADModuleItem> items) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("mId", mId);
		this.executeNativeUpdateSql(
				"delete from w_ad_module_item where mId=:mId", params);// 删除之前的推广记录
		this.saveAll(items);// 保存最新的推广记录
	}

	@Override
	public Boolean confirmMallReportTrade(String id, Long memberId) {
		YiqifaReport report = this.get(YiqifaReport.class, id);
		if (report == null) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		Member m = this.get(Member.class, memberId);
		if (m == null) {
			SystemException.handleMessageException("当前指定会员不存在");
		}
		if (!(report.getUser_id().equals(m.getUser_id()) && report.getSite_id()
				.equals(m.getSite_id()))) {
			SystemException.handleMessageException("您无权确认当前订单");
		}
		if (StringUtils.isNotEmpty(report.getNick())) {
			SystemException.handleMessageException("当前订单已经被【"
					+ report.getNick() + "】确认成功");
		}
		String user_id = report.getUser_id();
		String site_id = report.getSite_id();
		// 新淘网字段
		report.setNick(m.getInfo().getUsername());// 当前购买会员
		report.setAdNick(m.getParentUserName());// 购买人的上级推广人
		report.setOuterCode("xtfl" + m.getId());// 外部推广标识
		this.update(report);// 更新交易记录
		if (!"A".equals(report.getOrderStatus())) {// 如果订单状态是不是成功订单（未确认或无效订单）
			return true;
		}
		DecimalFormat df = new DecimalFormat("#0.##");
		df.setMaximumFractionDigits(2);
		df.setGroupingSize(0);
		df.setRoundingMode(RoundingMode.FLOOR);

		// 生成购买人的返利记录
		BuyFanliTrade buyTrade = new BuyFanliTrade();
		buyTrade.setFlMember(m);
		buyTrade.setYiqifa(report);
		buyTrade.setSite_id(site_id);
		buyTrade.setUser_id(user_id);
		buyTrade.setStatus(0);
		Integer commissionRate = m.getCommissionRate();
		SiteCommission sc = null;
		if (commissionRate == null) {// 如果没有设置返利比例，则取当前站点的返利比例
			sc = this.get(SiteCommission.class, site_id);
			commissionRate = sc.getCommissionRate();
		}
		Double dc = Double.valueOf(report.getCommission());// 双精度佣金
		String re = df.format(dc * commissionRate / 100);// 计算最终返利并字符串化
		buyTrade.setCommission(convertCommission(re));// 只保留小数点后两位
		report.setBuyCommission(buyTrade.getCommission());// 设置交易记录的购买返利
		buyTrade.setStatusDate(new Date());
		this.save(buyTrade);
		if (m.getParentId() != null) {// 如果存在父推广人
			Member parentM = this.get(Member.class, m.getParentId());
			if (parentM != null && parentM.getUser_id().equals(user_id)
					&& parentM.getSite_id().equals(site_id)) {// 如果父推广人存在并且是该站点会员,则生成推广人的返利记录
				AdsFanliTrade trade = new AdsFanliTrade();
				trade.setFlMember(parentM);
				trade.setYiqifa(report);
				trade.setSite_id(site_id);
				trade.setUser_id(user_id);
				trade.setStatus(0);
				Integer adCommissionRate = parentM.getAdCommissionRate();
				if (adCommissionRate == null) {// 如果没有设置推广返利比例，则取当前站点的推广返利比例
					if (sc == null)
						sc = this.get(SiteCommission.class, site_id);
					adCommissionRate = sc.getAdCommissionRate();
				}
				re = df.format(dc * adCommissionRate / 100);// 计算最终返利并字符串化
				trade.setCommission(convertCommission(re));// 只保留小数点后两位
				report.setAdsCommission(trade.getCommission());// 设置交易记录的推广返利
				trade.setStatusDate(new Date());
				this.save(trade);
			}
		}
		return true;
	}

	@Override
	public Boolean confirmReportTrade(Long tradeId, Long memberId) {
		List<T_TaobaokeReportMember> reports = this
				.findAllByCriterion(
						T_TaobaokeReportMember.class,
						R.eq("mini_trade_id",
								WindSiteRestUtil.getMiniTradeId(tradeId)));
		if (reports == null || reports.size() == 0) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		Member m = this.get(Member.class, memberId);
		if (m == null) {
			SystemException.handleMessageException("当前指定会员不存在");
		}
		T_TaobaokeReportMember firstReport = reports.get(0);
		if (!(firstReport.getUser_id().equals(m.getUser_id()) && firstReport
				.getSite_id().equals(m.getSite_id()))) {
			SystemException.handleMessageException("您无权确认当前订单");
		}
		if (StringUtils.isNotEmpty(firstReport.getNick())) {
			SystemException.handleMessageException("当前订单已经被【"
					+ firstReport.getNick() + "】确认成功");
		}
		String user_id = firstReport.getUser_id();
		String site_id = firstReport.getSite_id();
		for (T_TaobaokeReportMember report : reports) {
			// 新淘网字段
			report.setNick(m.getInfo().getUsername());// 当前购买会员
			report.setAdNick(m.getParentUserName());// 购买人的上级推广人
			report.setOuter_code("xtfl" + m.getId());// 外部推广标识
			this.update(report);// 更新交易记录
			// 生成购买人的返利记录
			DecimalFormat df = new DecimalFormat("#0.##");
			df.setMaximumFractionDigits(2);
			df.setGroupingSize(0);
			df.setRoundingMode(RoundingMode.FLOOR);

			BuyFanliTrade buyTrade = new BuyFanliTrade();
			buyTrade.setFlMember(m);
			buyTrade.setReport(report);
			buyTrade.setSite_id(site_id);
			buyTrade.setUser_id(user_id);
			buyTrade.setStatus(0);
			Integer commissionRate = m.getCommissionRate();
			SiteCommission sc = null;
			if (commissionRate == null) {// 如果没有设置返利比例，则取当前站点的返利比例
				sc = this.get(SiteCommission.class, site_id);
				commissionRate = sc.getCommissionRate();
			}
			Double dc = Double.valueOf(report.getCommission());// 双精度佣金
			String re = df.format(dc * commissionRate / 100);// 计算最终返利并字符串化
			buyTrade.setCommission(convertCommission(re));// 只保留小数点后两位
			report.setBuyCommission(buyTrade.getCommission());// 设置交易记录的购买返利
			buyTrade.setStatusDate(new Date());
			this.save(buyTrade);
			if (m.getParentId() != null) {// 如果存在父推广人
				Member parentM = this.get(Member.class, m.getParentId());
				if (parentM != null && parentM.getUser_id().equals(user_id)
						&& parentM.getSite_id().equals(site_id)) {// 如果父推广人存在并且是该站点会员,且推广比例大于0,则生成推广人的返利记录
					Integer adCommissionRate = parentM.getAdCommissionRate();
					if (adCommissionRate == null) {// 如果没有设置推广返利比例，则取当前站点的推广返利比例
						if (sc == null)
							sc = this.get(SiteCommission.class, site_id);
						adCommissionRate = sc.getAdCommissionRate();
					}
					if (adCommissionRate > 0) {
						AdsFanliTrade trade = new AdsFanliTrade();
						trade.setFlMember(parentM);
						trade.setReport(report);
						trade.setSite_id(site_id);
						trade.setUser_id(user_id);
						trade.setStatus(0);

						re = df.format(dc * adCommissionRate / 100);// 计算最终返利并字符串化
						trade.setCommission(convertCommission(re));// 只保留小数点后两位
						report.setAdsCommission(trade.getCommission());// 设置交易记录的推广返利
						trade.setStatusDate(new Date());
						this.save(trade);
					}
				}
			}
		}

		return true;
	}

	@Override
	public Boolean mergeYiqifaReportTrade(Long member_id, String user_id,
			String site_id, YiqifaReport yiqifa) {
		Member m = this.get(Member.class, member_id);
		if (m != null && m.getUser_id().equals(user_id)
				&& m.getSite_id().equals(site_id)) {// 如果购买人存在，并且是该站点的会员
			YiqifaReport report = this.findByCriterion(YiqifaReport.class,
					R.eq("yiqifaId", yiqifa.getYiqifaId()));
			Boolean isNew = false;
			if (report == null) {
				// 新淘网字段
				yiqifa.setNick(m.getInfo().getUsername());// 当前购买会员
				yiqifa.setAdNick(m.getParentUserName());// 购买人的上级推广人
				yiqifa.setUser_id(user_id);
				yiqifa.setSite_id(site_id);
				isNew = true;
				this.save(yiqifa);// 保存交易记录
			} else {
				if (!report.getOrderStatus().equals(yiqifa.getOrderStatus())) {
					report.setOrderStatus(yiqifa.getOrderStatus());
					this.update(report);
				}
				yiqifa = report;
			}
			// 判断是否生成返利记录
			if ("A".equals(yiqifa.getOrderStatus())) {// 如果订单状态是成功
				List<FanliTrade> trades = this.findAllByCriterion(
						FanliTrade.class, R.eq("yiqifa.id", yiqifa.getId()));
				if (trades.size() > 0) {// 如果已经生成返利记录
					return isNew;
				}
				DecimalFormat df = new DecimalFormat("#0.##");
				df.setMaximumFractionDigits(2);
				df.setGroupingSize(0);
				df.setRoundingMode(RoundingMode.FLOOR);

				// 生成购买人的返利记录
				BuyFanliTrade buyTrade = new BuyFanliTrade();
				buyTrade.setFlMember(m);
				buyTrade.setYiqifa(yiqifa);
				buyTrade.setSite_id(site_id);
				buyTrade.setUser_id(user_id);
				buyTrade.setStatus(0);
				Integer commissionRate = m.getCommissionRate();
				SiteCommission sc = null;
				if (commissionRate == null) {// 如果没有设置返利比例，则取当前站点的返利比例
					sc = this.get(SiteCommission.class, site_id);
					commissionRate = sc.getCommissionRate();
				}
				Double dc = Double.valueOf(yiqifa.getCommission());// 双精度佣金
				String re = df.format(dc * commissionRate / 100);// 计算最终返利并字符串化
				buyTrade.setCommission(convertCommission(re));// 只保留小数点后两位
				yiqifa.setBuyCommission(buyTrade.getCommission());// 设置交易记录的购买返利
				buyTrade.setStatusDate(new Date());
				this.save(buyTrade);
				if (m.getParentId() != null) {// 如果存在父推广人
					Member parentM = this.get(Member.class, m.getParentId());
					if (parentM != null && parentM.getUser_id().equals(user_id)
							&& parentM.getSite_id().equals(site_id)) {// 如果父推广人存在并且是该站点会员,且推广比例大于0,则生成推广人的返利记录
						Integer adCommissionRate = parentM
								.getAdCommissionRate();
						if (adCommissionRate == null) {// 如果没有设置推广返利比例，则取当前站点的推广返利比例
							if (sc == null)
								sc = this.get(SiteCommission.class, site_id);
							adCommissionRate = sc.getAdCommissionRate();
						}
						if (adCommissionRate > 0) {
							AdsFanliTrade trade = new AdsFanliTrade();
							trade.setFlMember(parentM);
							trade.setYiqifa(yiqifa);
							trade.setSite_id(site_id);
							trade.setUser_id(user_id);
							trade.setStatus(0);

							re = df.format(dc * adCommissionRate / 100);// 计算最终返利并字符串化
							trade.setCommission(convertCommission(re));// 只保留小数点后两位
							yiqifa.setAdsCommission(trade.getCommission());// 设置交易记录的推广返利
							trade.setStatusDate(new Date());
							this.save(trade);
						}
					}
				}
				return isNew;
			} else {
				return isNew;
			}
		}
		return false;
	}

	@Override
	public Boolean mergeYiqifaReportTrade(String userId, String siteId,
			YiqifaReport yiqifa) {
		YiqifaReport report = this.findByCriterion(YiqifaReport.class,
				R.eq("yiqifaId", yiqifa.getYiqifaId()));
		Boolean isNew = false;
		if (report == null) {// 新增
			// 新淘网字段
			yiqifa.setUser_id(userId);
			yiqifa.setSite_id(siteId);
			isNew = true;
			this.save(yiqifa);
		} else {// 更新状态
			if (!report.getOrderStatus().equals(yiqifa.getOrderStatus())) {
				report.setOrderStatus(yiqifa.getOrderStatus());
				this.update(report);
			}
		}
		return isNew;
	}

	@Override
	public Integer mergeReportTrades(String userId, String siteId,
			List<TaobaokeReportMember> members) {
		Integer success = 0;
		logger.info("trade count:" + members.size());
		List<T_TaobaokeReportMember> successReports = new ArrayList<T_TaobaokeReportMember>();
		if (members != null && members.size() > 0) {
			for (TaobaokeReportMember member : members) {
				List<T_TaobaokeReportMember> olds = this.findAllByCriterion(
						T_TaobaokeReportMember.class, R.eq("mini_trade_id",
								WindSiteRestUtil.getMiniTradeId(member
										.getTradeId())));
				if (olds == null || olds.size() == 0) {
					T_TaobaokeReportMember report = new T_TaobaokeReportMember();
					// 淘宝字段
					report.setApp_key(member.getAppKey());
					report.setCategory_id(member.getCategoryId());
					report.setCategory_name(member.getCategoryName());
					report.setCommission(member.getCommission());
					report.setCommission_rate(member.getCommissionRate());
					report.setItem_num(member.getItemNum());
					report.setItem_title(member.getItemTitle());
					report.setNum_iid(member.getNumIid());
					report.setOuter_code(member.getOuterCode());
					report.setPay_price(member.getPayPrice());
					report.setPay_time(member.getPayTime());
					report.setSeller_nick(member.getSellerNick());
					report.setShop_title(member.getShopTitle());
					report.setTrade_id(member.getTradeId());
					report.setMini_trade_id(WindSiteRestUtil
							.getMiniTradeId(member.getTradeId()));
					// 新淘网字段
					report.setUser_id(userId);
					report.setSite_id(siteId);
					successReports.add(report);
					success++;
				} else {
					logger.info("trade[" + member.getTradeId() + "] is existed");
				}
			}
		}
		if (successReports.size() > 0) {
			this.saveAll(successReports);
		}
		logger.info("trade insert success count:" + successReports.size());
		return success;
	}

	@Override
	public Boolean mergeReportTrade(String userId, String siteId,
			TaobaokeReportMember member) {
		List<T_TaobaokeReportMember> olds = this.findAllByCriterion(
				T_TaobaokeReportMember.class,
				R.eq("trade_id", member.getTradeId()));
		if (olds == null || olds.size() == 0) {
			T_TaobaokeReportMember report = new T_TaobaokeReportMember();
			// 淘宝字段
			report.setApp_key(member.getAppKey());
			report.setCategory_id(member.getCategoryId());
			report.setCategory_name(member.getCategoryName());
			report.setCommission(member.getCommission());
			report.setCommission_rate(member.getCommissionRate());
			report.setItem_num(member.getItemNum());
			report.setItem_title(member.getItemTitle());
			report.setNum_iid(member.getNumIid());
			report.setOuter_code(member.getOuterCode());
			report.setPay_price(member.getPayPrice());
			report.setPay_time(member.getPayTime());
			report.setSeller_nick(member.getSellerNick());
			report.setShop_title(member.getShopTitle());
			report.setTrade_id(member.getTradeId());
			report.setMini_trade_id(WindSiteRestUtil.getMiniTradeId(member
					.getTradeId()));
			// 新淘网字段
			report.setUser_id(userId);
			report.setSite_id(siteId);
			this.save(report);// 保存交易记录
			return true;
		}
		return false;
	}

	@Override
	public Boolean mergeReportTrade(Long member_id, String user_id,
			String site_id, TaobaokeReportMember member) {
		Member m = this.get(Member.class, member_id);
		if (m != null && m.getUser_id().equals(user_id)
				&& m.getSite_id().equals(site_id)) {// 如果购买人存在，并且是该站点的会员
			List<T_TaobaokeReportMember> olds = this.findAllByCriterion(
					T_TaobaokeReportMember.class,
					R.eq("trade_id", member.getTradeId()));
			if (olds == null || olds.size() == 0) {
				DecimalFormat df = new DecimalFormat("#0.##");
				df.setMaximumFractionDigits(2);
				df.setGroupingSize(0);
				df.setRoundingMode(RoundingMode.FLOOR);

				T_TaobaokeReportMember report = new T_TaobaokeReportMember();
				// 淘宝字段
				report.setApp_key(member.getAppKey());
				report.setCategory_id(member.getCategoryId());
				report.setCategory_name(member.getCategoryName());
				report.setCommission(member.getCommission());
				report.setCommission_rate(member.getCommissionRate());
				report.setItem_num(member.getItemNum());
				report.setItem_title(member.getItemTitle());
				report.setNum_iid(member.getNumIid());
				report.setOuter_code(member.getOuterCode());
				report.setPay_price(member.getPayPrice());
				report.setPay_time(member.getPayTime());
				report.setSeller_nick(member.getSellerNick());
				report.setShop_title(member.getShopTitle());
				report.setTrade_id(member.getTradeId());
				report.setMini_trade_id(WindSiteRestUtil.getMiniTradeId(member
						.getTradeId()));
				// 新淘网字段
				report.setNick(m.getInfo().getUsername());// 当前购买会员
				report.setAdNick(m.getParentUserName());// 购买人的上级推广人
				report.setUser_id(user_id);
				report.setSite_id(site_id);
				this.save(report);// 保存交易记录
				// 生成购买人的返利记录
				BuyFanliTrade buyTrade = new BuyFanliTrade();
				buyTrade.setFlMember(m);
				buyTrade.setReport(report);
				buyTrade.setSite_id(site_id);
				buyTrade.setUser_id(user_id);
				buyTrade.setStatus(0);
				Integer commissionRate = m.getCommissionRate();
				SiteCommission sc = null;
				if (commissionRate == null) {// 如果没有设置返利比例，则取当前站点的返利比例
					sc = this.get(SiteCommission.class, site_id);
					commissionRate = sc.getCommissionRate();
				}
				Double dc = Double.valueOf(report.getCommission());// 双精度佣金
				String re = df.format(dc * commissionRate / 100);// 计算最终返利并字符串化
				buyTrade.setCommission(convertCommission(re));// 只保留小数点后两位
				report.setBuyCommission(buyTrade.getCommission());// 设置交易记录的购买返利
				buyTrade.setStatusDate(new Date());
				this.save(buyTrade);
				if (m.getParentId() != null) {// 如果存在父推广人
					Member parentM = this.get(Member.class, m.getParentId());
					if (parentM != null && parentM.getUser_id().equals(user_id)
							&& parentM.getSite_id().equals(site_id)) {// 如果父推广人存在并且是该站点会员,则生成推广人的返利记录
						AdsFanliTrade trade = new AdsFanliTrade();
						trade.setFlMember(parentM);
						trade.setReport(report);
						trade.setSite_id(site_id);
						trade.setUser_id(user_id);
						trade.setStatus(0);
						Integer adCommissionRate = parentM
								.getAdCommissionRate();
						if (adCommissionRate == null) {// 如果没有设置推广返利比例，则取当前站点的推广返利比例
							if (sc == null)
								sc = this.get(SiteCommission.class, site_id);
							adCommissionRate = sc.getAdCommissionRate();
						}
						re = df.format(dc * adCommissionRate / 100);// 计算最终返利并字符串化
						trade.setCommission(convertCommission(re));// 只保留小数点后两位
						report.setAdsCommission(trade.getCommission());// 设置交易记录的推广返利
						trade.setStatusDate(new Date());
						this.save(trade);
					}
				}
				return true;
			}

		}
		return false;
	}

	public static String convertCommission(String str) {
		if (str.indexOf(".") != -1) {
			String[] array = str.split("\\.");
			str = array[0]
					+ "."
					+ (array[1].length() > 2 ? array[1].substring(0, 2)
							: array[1]);
		}
		return str;
	}

	public static final Integer RANDOM = 1;

	public static <T> List<T> randomSubList(List<T> parent, Integer subCount) {
		List<T> result = new ArrayList<T>();
		if (parent == null || parent.size() == 0 || parent.size() < subCount) {
			return result;
		}
		Random random = new Random();
		for (int i = 0, odd = parent.size() - 1; i < subCount; i++, odd--) {
			int ranindex = random.nextInt(odd);
			result.add(parent.get(ranindex));
		}
		return result;
	}

	@Override
	public void clearAdsBlog(ADPlan plan) {
		// 第一步清理已有系统推荐
		List<ADBlogSystem> adps = this.findAllByCriterion(ADBlogSystem.class,
				R.eq("pk.aid", plan.getId()));
		if (adps != null && adps.size() > 0) {
			for (ADBlogSystem aps : adps) {
				ADBlogStatus apsa = this.get(ADBlogStatus.class, aps.getPk()
						.getSid());// 查询被投放的页面
				Integer count = apsa.getAds();
				if (count != null && count > 0) {
					apsa.setAds(count - 1);
					this.update(apsa);// 更新页面投放广告数
				}
				this.delete(ADBlogSystem.class, aps.getPk());// 删除投放记录
			}
		}

	}

	@Override
	public void clearUserTemplate(ADPlan plan) {
		// 第一步清理已有系统推荐
		List<ADPageSystem> adps = this.findAllByCriterion(ADPageSystem.class,
				R.eq("pk.aid", plan.getId()));
		if (adps != null && adps.size() > 0) {
			for (ADPageSystem aps : adps) {
				ADPageStatus apsa = this.get(ADPageStatus.class, aps.getPk()
						.getPid());// 查询被投放的页面
				Integer count = apsa.getAds();
				if (count != null && count > 0) {
					apsa.setAds(count - 1);
					this.update(apsa);// 更新页面投放广告数
				}
				this.delete(ADPageSystem.class, aps.getPk());// 删除投放记录
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void adsBlog(ADPlan plan) {
		plan = this.get(ADPlan.class, plan.getId());
		// 暂时不根据限量来投放

		Integer validAds = EnvManager.getADBlogLimit();// 投放限额
		if (validAds > 0) {// 如果会员有投放限额，并且投放限额大于已投放
			// 优先级：分类精确投放》所有分类投放》尚未有投放的站点》空闲投放
			// 排序：PV
			// 查找是否还有分类精确投放
			Map<String, Object> _params = new HashMap<String, Object>();
			_params.put("cid", plan.getCid());
			_params.put("status", true);
			String hql = "select new map(id as id) from ADBlogStatus where isValid=1 and cid=:cid and ads<5 order by uv desc";
			List<Map<String, Object>> accurateAds = (List<Map<String, Object>>) this
					.findByHql(hql, _params);
			if (accurateAds != null && accurateAds.size() > 0) {
				for (Map<String, Object> ad : accurateAds) {
					if (validAds > 0) {
						// 生成投放记录
						if (createAdBlog(plan.getId(),
								String.valueOf(ad.get("id")))) {
							validAds--;
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找分类为所有分类的投放站点继续投放
				_params.put("cid", "0");
				List<Map<String, Object>> allCidAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (allCidAds != null && allCidAds.size() > 0) {
					for (Map<String, Object> ad : allCidAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdBlog(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找尚未有投放的站点继续投放
				hql = "select new map(id as id) from ADBlogStatus where isValid=1 and (ads=0 or ads is null) order by uv desc";
				List<Map<String, Object>> nullAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (nullAds != null && nullAds.size() > 0) {
					for (Map<String, Object> ad : nullAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdBlog(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找空闲站点继续投放
				hql = "select new map(id as id) from ADBlogStatus where isValid=1 and ads<5 order by uv desc";
				List<Map<String, Object>> freeAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (freeAds != null && freeAds.size() > 0) {
					for (Map<String, Object> ad : freeAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdBlog(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果还未投放完
				// TODO 尚未处理
			}
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("aid", plan.getId());
			// 刷新最新的投放计划（修正投放）
			Integer used = ((Long) this.findByHql(
					"select count(*) from ADBlogSystem where pk.aid=:aid",
					params).get(0)).intValue();
			plan.setUsed(used);
			plan.setIsSuccess(true);
			this.update(plan);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void adsUserTemplate(ADPlan plan) {
		plan = this.get(ADPlan.class, plan.getId());
		// 暂时不根据限量来投放

		Integer validAds = EnvManager.getADPageLimit();// 投放限额
		if (validAds > 0) {// 如果会员有投放限额，并且投放限额大于已投放
			// 优先级：分类精确投放》所有分类投放》尚未有投放的站点》空闲投放
			// 排序：PV
			// 查找是否还有分类精确投放
			Map<String, Object> _params = new HashMap<String, Object>();
			_params.put("cid", plan.getCid());
			_params.put("status", true);
			String hql = "select new map(id as id) from ADPageStatus where isValid=1 and cid=:cid and ads<5 order by uv desc";
			List<Map<String, Object>> accurateAds = (List<Map<String, Object>>) this
					.findByHql(hql, _params);
			if (accurateAds != null && accurateAds.size() > 0) {
				for (Map<String, Object> ad : accurateAds) {
					if (validAds > 0) {
						// 生成投放记录
						if (createAdPage(plan.getId(),
								String.valueOf(ad.get("id")))) {
							validAds--;
						}
					} else {
						break;
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找分类为所有分类的投放站点继续投放
				_params.put("cid", "0");
				List<Map<String, Object>> allCidAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (allCidAds != null && allCidAds.size() > 0) {
					for (Map<String, Object> ad : allCidAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdPage(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找尚未有投放的站点继续投放
				hql = "select new map(id as id) from ADPageStatus where isValid=1 and (ads=0 or ads is null) order by uv desc";
				List<Map<String, Object>> nullAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (nullAds != null && nullAds.size() > 0) {
					for (Map<String, Object> ad : nullAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdPage(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果尚未投放完毕，查找空闲站点继续投放
				hql = "select new map(id as id) from ADPageStatus where isValid=1 and ads<5 order by uv desc";
				List<Map<String, Object>> freeAds = (List<Map<String, Object>>) this
						.findByHql(hql, _params);
				if (freeAds != null && freeAds.size() > 0) {
					for (Map<String, Object> ad : freeAds) {
						if (validAds > 0) {
							// 生成投放记录
							if (createAdPage(plan.getId(),
									String.valueOf(ad.get("id")))) {
								validAds--;
							}
						} else {
							break;
						}
					}
				}
			}
			if (validAds > 0) {// 如果还未投放完
				// TODO 尚未处理
			}
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("aid", plan.getId());
			// 刷新最新的投放计划（修正投放）
			Integer used = ((Long) this.findByHql(
					"select count(*) from ADPageSystem where pk.aid=:aid",
					params).get(0)).intValue();
			plan.setUsed(used);
			plan.setIsSuccess(true);
			this.update(plan);
		}
	}

	private Boolean createAdBlog(String aid, String sid) {
		// 生成投放记录
		try {
			ADBlogPK pk = new ADBlogPK();
			pk.setAid(aid);
			pk.setSid(sid);
			ADBlogSystem aps = this.get(ADBlogSystem.class, pk);
			if (aps == null) {
				aps = new ADBlogSystem();
				aps.setPk(pk);
				this.save(aps);
				ADBlogStatus apsa = this.get(ADBlogStatus.class, pk.getSid());
				if (apsa != null) {// 更新投放数
					Integer count = apsa.getAds();
					if (count == null || count < 0) {
						count = 0;
					}
					apsa.setAds(count + 1);
					this.update(apsa);
				}
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	private Boolean createAdPage(String aid, String pid) {
		// 生成投放记录
		try {
			ADPagePK pk = new ADPagePK();
			pk.setAid(aid);
			pk.setPid(pid);
			ADPageSystem aps = this.get(ADPageSystem.class, pk);
			if (aps == null) {
				aps = new ADPageSystem();
				aps.setPk(pk);
				this.save(aps);
				ADPageStatus apsa = this.get(ADPageStatus.class, pk.getPid());
				if (apsa != null) {// 更新投放数
					Integer count = apsa.getAds();
					if (count == null || count < 0) {
						count = 0;
					}
					apsa.setAds(count + 1);
					this.update(apsa);
				}
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public void updateItemsDoctor(ItemGroupDoctor doctor, Boolean isUpdateItems) {
		if (isUpdateItems)
			this.updateAll(doctor.getGroup().getItems());// 更新推广组内所有商品
		this.update(doctor);// 更新检测结果
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getUcidsByUsedWidget(String cwid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("cwid", cwid);
		String hql = "select u.uc_id from User as u,UsedCustomeWidget as ucw where ucw.widget.id=:cwid and u.user_id=ucw.user_id and u.uc_id is not null";
		List<Integer> ids = (List<Integer>) this.findByHql(hql, params);
		if (ids.size() > 0) {
			Iterator<Integer> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append(i.next());
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return null;
	}

	public static void main(String[] args) {

		AdsFanliTrade trade = new AdsFanliTrade();

		// DecimalFormat df = new DecimalFormat("#0.##");
		// df.setMaximumFractionDigits(2);
		// df.setGroupingSize(0);
		// df.setRoundingMode(RoundingMode.FLOOR);
		// Double dc = Double.valueOf("0.04");// 双精度佣金
		// String re = String.valueOf(dc * 90 / 100);// 计算最终返利并字符串化
		// System.out.println(convertCommission(re));
		// re = String.valueOf(dc * 1 / 100);// 计算最终返利并字符串化
		// System.out.println(convertCommission(re));
		// System.out.println(convertCommission(df.format(dc * 90 / 100)));
		// System.out.println(convertCommission(df.format(dc * 1 / 100)));
	}
}
