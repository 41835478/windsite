package com.wind.site.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.HashSet;
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
			Set<TaobaokeReportMember> members = readTaobao(new FileInputStream(
					new File(
							"/Users/fengxiaoyun/Downloads/Taokedetail-2013-06-18.xls")));
			Gson gson = new Gson();
			System.out.println(gson.toJson(members));

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static Set<TaobaokeReportMember> readTaobao(InputStream in) {
		Set<TaobaokeReportMember> members = new HashSet<TaobaokeReportMember>();
		try {
			Workbook workbook = Workbook.getWorkbook(in);
			Sheet sheet = workbook.getSheet(0);
			Integer columns = sheet.getColumns();// 列数
			if (columns != 20) {
				SystemException.handleMessageException("订单文件格式不正确【列数不正确】");
			}
			Integer rows = sheet.getRows();// 行数
			TaobaokeReportMember member = null;
			for (int i = 1; i < rows; i++) {
				if (sheet.getCell(18, i).getContents().equals("订单结算")) {
					member = new TaobaokeReportMember();
					member.setCommission(sheet.getCell(16, i).getContents());
					double commission_rate = Double.valueOf(sheet.getCell(8, i)
							.getContents().replace("%", "")) * 100 / 10000;
					double mall_rate = Double.valueOf(sheet.getCell(10, i)
							.getContents().replace("%", "")) * 100 / 10000;
					member.setCommissionRate(String.valueOf(commission_rate
							+ mall_rate));
					member.setItemNum(Long.valueOf(sheet.getCell(5, i)
							.getContents()));
					member.setItemTitle(sheet.getCell(1, i).getContents());
					member.setNumIid(Long.valueOf(sheet.getCell(2, i)
							.getContents()));
					member.setPayPrice(sheet.getCell(6, i).getContents());
					String[] formats = { DateUtils.YYYY_MM_DD };
					member.setPayTime(DateUtils.parseDate(sheet.getCell(19, i)
							.getContents(), formats));
					member.setRealPayFee(sheet.getCell(7, i).getContents());
					member.setSellerNick(sheet.getCell(3, i).getContents());
					member.setShopTitle(sheet.getCell(4, i).getContents());
					member.setTradeId(Long.valueOf(sheet.getCell(17, i)
							.getContents()));
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
