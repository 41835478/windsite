package com.wind.site.command.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import org.hibernate.criterion.R;

import com.sun.syndication.feed.synd.SyndContent;
import com.sun.syndication.feed.synd.SyndContentImpl;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndEntryImpl;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.feed.synd.SyndFeedImpl;
import com.sun.syndication.io.SyndFeedOutput;
import com.wind.site.command.ICommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.Site;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.User;
import com.wind.site.service.ICommandService;

/**
 * RSS生成命令
 * 
 * @author fxy
 * 
 */
public class RssCommand implements ICommand {

	private String feedType;
	/**
	 * 当前用户
	 */
	private User user;
	/**
	 * 当前推广组
	 */
	private List<ItemGroup> groups;

	/**
	 * @return the groups
	 */
	public List<ItemGroup> getGroups() {
		return groups;
	}

	/**
	 * @param groups
	 *            the groups to set
	 */
	public void setGroups(List<ItemGroup> groups) {
		this.groups = groups;
	}

	@Override
	public void execute(ICommandService service) {
		// TODO 暂停RSS

		// if (user == null) {
		// return;
		// }
		// List<Site> sites = user.getSites();
		// if (sites == null || sites.size() == 0) {
		// return;
		// }
		// Site site = sites.get(0);
		// if (site == null) {
		// return;
		// }
		// List<T_TaobaokeItem> _items = service.findAllByCriterion(
		// T_TaobaokeItem.class, R.eq("createdBy", user.getUser_id()), R
		// .eq("isValid", true), R.eq("isRss", false));
		// if (_items == null || _items.size() == 0) {
		// return;
		// }
		// SyndFeed feed = new SyndFeedImpl();
		//
		// feed.setFeedType(feedType);
		// feed.setTitle(site.getTitle());
		// feed.setLink(site.getDomainName() + ".xintaonet.com");
		// feed.setDescription("新淘网");
		// feed.setAuthor("新淘网");
		// feed.setEncoding("UTF-8");
		//
		// List<SyndEntry> entries = new ArrayList<SyndEntry>();
		// SyndEntry entry;
		// SyndContent description;
		//
		// // groups = new ArrayList<ItemGroup>();
		// Map<String, ItemGroup> _groups = new HashMap<String, ItemGroup>();
		// if (_items != null && _items.size() > 0) {
		// for (T_TaobaokeItem item : _items) {
		// if (item != null) {
		// String gid = item.getGid();
		// ItemGroup group = null;
		// if (_groups.containsKey(gid)) {// 如果已加载推广组
		// group = _groups.get(gid);
		// } else {// 如果没有
		// group = service.get(ItemGroup.class, gid);
		// _groups.put(gid, group);
		// }
		// if (group != null) {
		// if (group.getItems() == null) {
		// group.setItems(new ArrayList<T_TaobaokeItem>());
		// }
		// group.getItems().add(item);
		// }
		// }
		// }
		// }
		// if (_groups != null) {
		// for (ItemGroup group : _groups.values()) {
		// List<T_TaobaokeItem> items = group.getItems();
		// if (items == null || items.size() == 0) {
		// return;
		// }
		// entry = new SyndEntryImpl();
		// entry.setTitle(group.getName());
		// entry.setLink("http://shop" + user.getUser_id()
		// + ".xintaonet.com/router/site/group/" + group.getId()
		// + "?pid=" + user.getPid());
		// entry.setUpdatedDate(Calendar.getInstance(Locale.CHINA)
		// .getTime());
		// entry.setPublishedDate(Calendar.getInstance(Locale.CHINA)
		// .getTime());
		//
		// description = new SyndContentImpl();
		// description.setType("text/html");
		// description.setValue(convertDesc(user, site, group, items));
		// entry.setDescription(description);
		// entries.add(entry);
		// }
		// }
		// feed.setEntries(entries);
		// try {
		// File htmlFile = new File(getPath("shop" + site.getUser_id()));
		// File parent = new File(htmlFile.getParent());
		// if (!parent.exists()) {
		// parent.mkdirs();
		// }
		// if (!htmlFile.exists()) {
		// htmlFile.createNewFile();
		// }
		// Writer writer;
		// writer = new BufferedWriter(new OutputStreamWriter(
		// new FileOutputStream(htmlFile), "UTF-8"));
		// SyndFeedOutput output = new SyndFeedOutput();
		// output.output(feed, writer);
		// writer.close();
		// System.out.println("The feed has been written to the file ["
		// + htmlFile.getAbsolutePath() + "]");
		// Map<String, Object> params = new HashMap<String, Object>();
		// params.put("userId", user.getUser_id());
		// service.executeNativeUpdateSql(
		// "update t_item t set t.isRss=1 where t.createdBy=:userId",
		// params);
		// } catch (Exception e) {
		// e.printStackTrace();
		// }// RSS文件

	}

	public String getPath(String domainName) {
		return EnvManager.getUserPath(domainName) + domainName + ".xml";
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @param user
	 *            the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}

	private String convertDesc(User user, Site site, ItemGroup group,
			List<T_TaobaokeItem> items) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<p><a href=\"http://" + site.getDomainName()
				+ ".xintaonet.com\" target=\"_blank\">" + site.getTitle()
				+ "</a></p>");
		buffer.append("<p><a href=\"http://" + site.getDomainName()
				+ ".xintaonet.com/router/site/group/" + group.getId()
				+ "/?pid=" + user.getPid() + "\" target=\"_blank\">"
				+ group.getName() + "</a></p>");
		buffer.append("<ul style=\"list-style:none\">");
		for (T_TaobaokeItem item : items) {
			buffer.append(convertLi(item));
		}
		return buffer.append("</ul>").toString();

	}

	private String convertLi(T_TaobaokeItem item) {
		String li = "<LI style=\"padding:0 20px 20px 0; float:left; height:280px; width:185px;\">"
				+ "<DIV style=\"width:160px;height:160px;overflow:hidden; margin:0px;padding:0px; text-align:center; border: 1px solid #ccc;\">"
				+ "<A style=\"display:table-cell;font-size:140px;width:160px;height:160px;\" href=\""
				+ item.getClick_url()
				+ "\" target=\"_blank\" title=\""
				+ item.getTitle()
				+ "\">"
				+ "<IMG style=\"vertical-align: middle;\" src=\""
				+ item.getPic_url().replaceAll("bao/uploaded", "imgextra")
				+ "_160x160.jpg\" alt=\""
				+ item.getTitle()
				+ "\">"
				+ "</A></DIV><BR>"
				+ "<SPAN style=\"font-size:14px;\">￥<STRONG style=\"color:#f60;\">"
				+ item.getPrice()
				+ "元</STRONG></SPAN><BR>"
				+ "<A href=\""
				+ item.getClick_url()
				+ "\" title=\""
				+ item.getTitle()
				+ "\">"
				+ item.getTitle() + "</A></LI>";
		return li;
	}

	public void setFeedType(String feedType) {
		this.feedType = feedType;
	}

	public String getFeedType() {
		return feedType;
	}

	public static void main(String[] args) {
		System.out.println(TimeZone.getTimeZone("Asia/Shanghai") + "|"
				+ Calendar.getInstance(Locale.CHINA).getTime());
	}
}
