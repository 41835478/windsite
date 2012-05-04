package com.wind.site.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Set;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import com.taobao.api.internal.util.StringUtils;
import com.wind.core.exception.SystemException;
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
			System.out
					.println(readYiqifa(
							123L,
							"231622",
							new FileInputStream(
									new File(
											"C:\\Users\\Administrator\\Downloads\\爱ZIPPO自定义链接全表.xls"))));

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
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
