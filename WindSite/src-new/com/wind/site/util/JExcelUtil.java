package com.wind.site.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import com.google.gson.Gson;
import com.taobao.api.domain.TaobaokeReportMember;
import com.taobao.api.internal.util.StringUtils;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.model.MyYiqifaMall;
import com.wind.site.model.YiqifaMallPk;

/**
 * JExcel工具类
 * 
 * @author fxy
 * 
 */
public class JExcelUtil {

	public static void main(String[] args) {
		try {
			List<TaobaokeReportMember> members = readTaobao(new FileInputStream(
					new File(
							"/Users/fengxiaoyun/Downloads/Taokedetail-2013-08-16.xls")));
			Gson gson = new Gson();
			System.out.println(gson.toJson(members));

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static List<TaobaokeReportMember> readTaobao(InputStream in) {
		List<TaobaokeReportMember> members = new ArrayList<TaobaokeReportMember>();
		Map<String, Integer> INDEXS = new HashMap<String, Integer>();
		INDEXS.put("create_time", 0);
		INDEXS.put("item_title", 1);
		INDEXS.put("item_num", 2);
		INDEXS.put("pay_price", 3);
		INDEXS.put("status", 4);
		INDEXS.put("pay_time", 5);
		INDEXS.put("real_pay_fee", 6);
		INDEXS.put("commission_rate", 7);
		INDEXS.put("third_fee_rate", 8);
		INDEXS.put("commission", 9);
		INDEXS.put("num_iid", 10);
		INDEXS.put("seller_nick", 11);
		INDEXS.put("shop_title", 12);
		INDEXS.put("item_commission", 13);
		INDEXS.put("tmall_commission_rate", 14);
		INDEXS.put("tmall_commission", 15);
		INDEXS.put("commission_type", 16);
		INDEXS.put("is_third", 17);
		INDEXS.put("third", 18);
		INDEXS.put("third_fee", 19);
		INDEXS.put("trade_id", 20);

		try {
			Workbook workbook = Workbook.getWorkbook(in);
			Sheet sheet = workbook.getSheet(0);
			Integer columns = sheet.getColumns();// 列数
			if (columns != 21) {
				SystemException.handleMessageException("订单文件格式不正确【列数不正确】");
			}
			Integer rows = sheet.getRows();// 行数
			TaobaokeReportMember member = null;
			for (int i = 1; i < rows; i++) {
				if (sheet.getCell(INDEXS.get("status"), i).getContents()
						.equals("订单结算")) {
					member = new TaobaokeReportMember();
					member.setCommission(sheet.getCell(
							INDEXS.get("commission"), i).getContents());
					double commission_rate = Double.valueOf(sheet
							.getCell(INDEXS.get("commission_rate"), i)
							.getContents().replace("%", "")) * 100 / 10000;
					double mall_rate = Double.valueOf(sheet
							.getCell(INDEXS.get("tmall_commission_rate"), i)
							.getContents().replace("%", "")) * 100 / 10000;
					member.setCommissionRate(String.valueOf(commission_rate
							+ mall_rate));
					member.setItemNum(Long.valueOf(sheet.getCell(
							INDEXS.get("item_num"), i).getContents()));
					member.setItemTitle(sheet.getCell(INDEXS.get("item_title"),
							i).getContents());
					member.setNumIid(Long.valueOf(sheet.getCell(
							INDEXS.get("num_iid"), i).getContents()));
					member.setPayPrice(sheet
							.getCell(INDEXS.get("pay_price"), i).getContents());
					String[] formats = { DateUtils.YYYY_MM_DD };
					member.setPayTime(DateUtils.parseDate(
							sheet.getCell(INDEXS.get("pay_time"), i)
									.getContents(), formats));
					member.setRealPayFee(sheet.getCell(
							INDEXS.get("real_pay_fee"), i).getContents());
					member.setSellerNick(sheet.getCell(
							INDEXS.get("seller_nick"), i).getContents());
					member.setShopTitle(sheet.getCell(INDEXS.get("shop_title"),
							i).getContents());
					member.setTradeId(Long.valueOf(sheet.getCell(
							INDEXS.get("trade_id"), i).getContents()));
					members.add(member);
				}
			}
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return members;
	}

	public static Set<MyYiqifaMall> readYiqifa(Long userId, String wid,
			InputStream in) {
		Set<MyYiqifaMall> malls = new HashSet<MyYiqifaMall>();
		try {
			Workbook workbook = Workbook.getWorkbook(in);
			Sheet sheet = workbook.getSheet(0);
			Integer columns = sheet.getColumns();// 列数
			if (columns != 12) {
				SystemException.handleMessageException("链接文件格式不正确【列数不正确】");
			}
			Integer rows = sheet.getRows();// 行数
			MyYiqifaMall mall = null;
			YiqifaMallPk pk = null;
			for (int i = 1; i < rows; i++) {
				String clickUrl = sheet.getCell(11, i).getContents();
				if (StringUtils.isEmpty(clickUrl)
						|| !clickUrl.startsWith("http://p.yiqifa.com")) {// 如果不是url格式
					SystemException
							.handleMessageException("请下载推广链接时，链接类型选择纯URL");
				}
				if (!clickUrl.contains("w=" + wid)) {
					SystemException
							.handleMessageException("推广链接网站编号不正确，请确认您从亿起发下载的推广链接是您在新淘网配置的网站编号下的");
				}
				mall = new MyYiqifaMall();
				pk = new YiqifaMallPk();
				pk.setUser_id(userId);
				pk.setMall_id(Long.valueOf(sheet.getCell(0, i).getContents()));
				pk.setClickUrl(clickUrl);
				mall.setPk(pk);
				mall.setSortOrder(0);
				mall.setTitle(sheet.getCell(8, i).getContents());
				mall.setIsChange("yes"
						.equals(sheet.getCell(9, i).getContents()) ? true
						: false);
				malls.add(mall);
			}
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return malls;
	}
}
