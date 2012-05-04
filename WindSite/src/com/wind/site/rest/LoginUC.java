package com.wind.site.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fivestars.interfaces.bbs.client.Client;
import com.fivestars.interfaces.bbs.util.XMLHelper;
import com.wind.site.env.EnvManager;
import com.wind.site.model.User;

/**
 * 登录论坛
 * 
 * @author fxy
 * 
 */
public class LoginUC extends HttpServlet {
	private static final Logger logger = Logger.getLogger(LoginUC.class
			.getName());
	private static final long serialVersionUID = 2785763152407934077L;

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String redirect = request.getParameter("redirect");
		if (EnvManager.getUser() != null) {
			loginDiscuz(EnvManager.getUser(), response);
		} else {
			try {
				response.sendRedirect(redirect);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public void registerDiscuz(User user, HttpServletResponse response) {
		Client uc = new Client();
		String $returns = uc.uc_user_register(user.getNick(), "_i8c8e5u8y4",
				"test@xintaonet.com");
		int $uid = Integer.parseInt($returns);
		if ($uid <= 0) {
			if ($uid == -1) {
				logger.info("【" + user.getNick() + "】用户名不合法");
			} else if ($uid == -2) {
				logger.info("【" + user.getNick() + "】包含要允许注册的词语");
			} else if ($uid == -3) {
				logger.info("【" + user.getNick() + "】用户名已经存在");
				loginDiscuz(user, response);// 如果存在以当前用户名登录
			} else if ($uid == -4) {
				logger.info("【" + user.getNick() + "】Email 格式有误");
			} else if ($uid == -5) {
				logger.info("【" + user.getNick() + "】Email 不允许注册");
			} else if ($uid == -6) {
				logger.info("【" + user.getNick() + "】该 Email 已经被注册");
			} else {
				logger.info("【" + user.getNick() + "】未定义");
			}
		} else {
			logger.info("【" + user.getNick() + "】OK:" + $returns);
			loginDiscuz(user, response);
		}
	}

	public void loginDiscuz(User user, HttpServletResponse response) {
		Client e = new Client();
		String result = e.uc_user_login(user.getNick(), "_i8c8e5u8y4");
		LinkedList<String> rs = XMLHelper.uc_unserialize(result);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if (rs.size() > 0) {
			int $uid = Integer.parseInt(rs.get(0));
			String $username = rs.get(1);
			String $password = rs.get(2);
			String $email = rs.get(3);
			if ($uid > 0) {
				logger.info("【" + user.getNick() + "】" + $username);
				logger.info("【" + user.getNick() + "】" + $password);
				logger.info("【" + user.getNick() + "】" + $email);

				String $ucsynlogin = e.uc_user_synlogin($uid);
				out.println("登录成功" + $ucsynlogin);
				logger.info("【" + user.getNick() + "】登录成功" + $ucsynlogin);
				Cookie auth = new Cookie("auth", e.uc_authcode($password + "\t"
						+ $uid, "ENCODE"));
				auth.setMaxAge(31536000);
				response.addCookie(auth);
				Cookie cuser = new Cookie("uchome_loginuser", $username);
				response.addCookie(cuser);
			} else if ($uid == -1) {
				logger.info("【" + user.getNick() + "】用户不存在,或者被删除");
				registerDiscuz(user, response);// 重新注册
			} else if ($uid == -2) {
				logger.info("【" + user.getNick() + "】密码错");
				updateDiscuz(user, response);// 密码错误则修改为默认密码
			} else {
				out.println("【" + user.getNick() + "】未定义");
			}
		} else {
			out.println("【" + user.getNick() + "】" + result);
		}
		out.close();
	}

	public void updateDiscuz(User user, HttpServletResponse response) {
		Client e = new Client();
		try {
			String result = e.uc_user_edit(user.getNick(), null, "_i8c8e5u8y4",
					null, 1, null, null);
			int i = Integer.parseInt(result);
			switch (i) {
			case 1:
				logger.info("【" + user.getNick() + "】修改成功");
				loginDiscuz(user, response);// 修改成功则登录
				break;
			case 0:
				logger.info("【" + user.getNick() + "】没有任何修改");
				break;
			case -1:
				logger.info("【" + user.getNick() + "】旧密码不正确");
				break;
			case -4:
				logger.info("【" + user.getNick() + "】email 格式有误");
				break;
			case -5:
				logger.info("【" + user.getNick() + "】email 不允许注册");
				break;
			case -6:
				logger.info("【" + user.getNick() + "】该 email 已经被注册");
				break;
			case -7:
				logger.info("【" + user.getNick() + "】没有做任何修改");
				break;
			case -8:
				logger.info("【" + user.getNick() + "】受保护的用户，没有权限修改");
				break;
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.doPost(req, resp);
	}

}
