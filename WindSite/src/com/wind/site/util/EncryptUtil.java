/**
 * 
 */
package com.wind.site.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import java.util.logging.Logger;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import com.google.gdata.util.common.util.Base64DecoderException;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;

/**
 * @version 2008-12-1
 * @author <a href="mailto:zixue@taobao.com">zixue</a>
 * @author jeck218@gmail.com 2009-12-1
 */
public class EncryptUtil {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(EncryptUtil.class
			.getName());

	/**
	 * 校验版本号【如果未指定版本号访问，则返回false，如果指定了版本号访问，则校验合法，不合法异常，合法则返回true】
	 * 
	 * @param sign
	 * @param secret
	 * @param appkey
	 * @param leaseId
	 * @param timestamp
	 * @param versionNo
	 * @return
	 */
	public static boolean verifyVersionNo(String appType, String sign,
			String secret, String appkey, String leaseId, String timestamp,
			String versionNo, String itemCode) {
		// if (StringUtils.isNotEmpty(sign) && StringUtils.isNotEmpty(secret)
		// && StringUtils.isNotEmpty(appkey)
		// && StringUtils.isNotEmpty(leaseId)
		// && StringUtils.isNotEmpty(timestamp)
		// && StringUtils.isNotEmpty(versionNo)) {
		// Map<String, CharSequence> params = new HashMap<String,
		// CharSequence>();
		// params.put("appkey", appkey);
		// params.put("leaseId", leaseId);
		// params.put("timestamp", timestamp);
		// params.put("versionNo", versionNo);
		// if (StringUtils.isNotEmpty(itemCode)) {
		// params.put("itemCode", itemCode);
		// }
		// String realSign = md5Signature(params, secret, "sign");
		// Boolean isCheck = realSign.equals(sign);
		// if (!isCheck) {
		// SystemException
		// .handleMessageException("当前登录访问地址无效，请从新淘网官方网站登录或者从淘宝服务登录新淘网");
		// }
		// return true;
		// } else {
		if (EnvManager.isAudit() && appType.equals("1")) {// 如果是审核状态，并且为分成版本，则下一步直接设置版本号
			return true;
		}
		return false;
		// }
		// return true;
	}

	/**
	 * 验证TOP回调地址的签名是否合法。要求所有参数均为已URL反编码的。
	 * 
	 * @param topParams
	 *            TOP私有参数（未经BASE64解密）
	 * @param topSession
	 *            TOP私有会话码
	 * @param topSign
	 *            TOP回调签名
	 * @param appKey
	 *            应用公钥
	 * @param appSecret
	 *            应用密钥
	 * @return 验证成功返回true，否则返回false
	 * @throws Base64DecoderException
	 * @throws NoSuchAlgorithmException
	 * @throws IOException
	 */
	public static boolean verifyTopResponse(String topParams,
			String topSession, String topSign, String appKey, String appSecret) {
		StringBuilder result = new StringBuilder();
		String sign = "";
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			result.append(appKey).append(topParams).append(topSession).append(
					appSecret);
			byte[] bytes = md5.digest(result.toString().getBytes("UTF-8"));
			BASE64Encoder encode = new BASE64Encoder();
			sign = encode.encode(bytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sign.equals(topSign);
	}

	/**
	 * 生成有效签名
	 * 
	 * @param params
	 * @param secret
	 * @return
	 */
	public static String signature(Map<String, CharSequence> params,
			String secret, String signName) {
		String result = null;
		StringBuffer orgin = getBeforeSign(params, new StringBuffer(secret),
				signName);
		if (orgin == null)
			return result;

		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			result = byte2hex(md.digest(orgin.toString().getBytes("utf-8")));
		} catch (Exception e) {
			throw new java.lang.RuntimeException("sign error !");
		}
		return result;
	}

	/**
	 * 新的md5签名，首尾放secret
	 * 
	 * @param params
	 * @param secret
	 * @param signName
	 * @return
	 * @author jeck218@gmail.com 2009-12-1
	 */
	public static String md5Signature(Map<String, CharSequence> params,
			String secret, String signName) {
		String result = null;
		StringBuffer orgin = getBeforeSign(params, new StringBuffer(secret),
				signName);
		if (orgin == null)
			return result;

		// secret last
		orgin.append(secret);
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			result = byte2hex(md.digest(orgin.toString().getBytes("utf-8")));
		} catch (Exception e) {
			throw new java.lang.RuntimeException("sign error !");
		}
		return result;
	}

	public static String md5SignatureGBK(Map<String, CharSequence> params,
			String secret, String signName) {
		String result = null;
		StringBuffer orgin = getBeforeSign(params, new StringBuffer(secret),
				signName);
		if (orgin == null)
			return result;

		// secret last
		orgin.append(secret);
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			result = byte2hex(md.digest(orgin.toString().getBytes("GBK")));
		} catch (Exception e) {
			throw new java.lang.RuntimeException("sign error !");
		}
		return result;
	}

	public static String hmacSignature(Map<String, CharSequence> params,
			String secret, String signName) {
		String result = null;
		StringBuffer orgin = getBeforeSign(params, new StringBuffer(), signName);
		if (orgin == null)
			return result;

		try {
			result = byte2hex(encryptHMAC(orgin.toString().getBytes("utf-8"),
					secret));
		} catch (Exception e) {
			throw new java.lang.RuntimeException("sign error !");
		}
		return result;
	}

	private static StringBuffer getBeforeSign(Map<String, CharSequence> params,
			StringBuffer orgin, String signName) {
		if (params == null)
			return null;
		// remove sign parameter
		params.remove(signName);
		Map<String, CharSequence> treeMap = new TreeMap<String, CharSequence>();
		treeMap.putAll(params);
		Iterator<String> iter = treeMap.keySet().iterator();
		while (iter.hasNext()) {
			String name = (String) iter.next();
			orgin.append(name).append(params.get(name));
		}

		return orgin;
	}

	/**
	 * 二行制转字符串
	 * 
	 * @param b
	 * @return
	 */
	private static String byte2hex(byte[] b) {
		StringBuffer hs = new StringBuffer();
		String stmp = "";
		for (int n = 0; n < b.length; n++) {
			stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
			if (stmp.length() == 1)
				hs.append("0").append(stmp);
			else
				hs.append(stmp);
		}
		return hs.toString().toUpperCase();
	}

	/**
	 * HMAC加密
	 * 
	 * @param data
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptHMAC(byte[] data, String key) throws Exception {
		SecretKey secretKey = new SecretKeySpec(key.getBytes("utf-8"),
				"HmacMD5");
		Mac mac = Mac.getInstance(secretKey.getAlgorithm());
		mac.init(secretKey);

		return mac.doFinal(data);

	}

	/**
	 * 把经过BASE64编码的字符串转换为Map对象
	 * 
	 * @param str
	 * @return
	 * @throws Exception
	 */

	public static Map<String, String> convertBase64StringtoMap(String str) {
		if (str == null)
			return null;
		String keyvalues = null;
		try {
			BASE64Decoder decoder = new BASE64Decoder();
			keyvalues = new String(decoder.decodeBuffer(str), "GBK");
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		if (keyvalues == null || keyvalues.length() == 0)
			return null;
		String[] keyvalueArray = keyvalues.split("&");
		Map<String, String> map = new HashMap<String, String>();
		for (String keyvalue : keyvalueArray) {
			String[] s = keyvalue.split("=");
			if (s == null || s.length != 2)
				return null;
			map.put(s[0], s[1]);
		}
		return map;
	}

	/**
	 * 把Map对象转换为BASE64编码的字符串(需处理换行符)
	 * 
	 * @param str
	 * @return
	 * @throws Exception
	 */

	public static String encodeMaptoString(Map<String, CharSequence> params) {
		Map<String, CharSequence> treeMap = new TreeMap<String, CharSequence>();
		treeMap.putAll(params);
		Iterator<String> iter = treeMap.keySet().iterator();
		StringBuffer orgin = new StringBuffer("");
		while (iter.hasNext()) {
			String name = (String) iter.next();
			orgin.append(name).append("=").append(params.get(name)).append("&");
		}
		String keyvalues = null, temp = "";
		try {
			BASE64Encoder encoder = new BASE64Encoder();
			keyvalues = encoder.encodeBuffer(orgin.toString().getBytes("GBK"));
			StringReader sr = new StringReader(keyvalues);
			BufferedReader br = new BufferedReader(sr);
			String line = null;
			while ((line = br.readLine()) != null) {
				temp += line;
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		return temp;
	}

	public static void main(String[] args) throws NoSuchAlgorithmException,
			UnsupportedEncodingException {
		String orgin = "f7bb5d5aef06f4e2d3cfa3de6782f833fieldsiid,title,nick,pic_url,price,click_url,commission,commission_num,commission_rate,commission_volumeformatjsonmethodtaobao.taobaoke.items.getpage_no1page_size10sign_methodmd5timestamp2010-01-07 04:01:53v2.0f7bb5d5aef06f4e2d3cfa3de6782f833";
		MessageDigest md = MessageDigest.getInstance("MD5");
		System.out.println(byte2hex(md.digest(orgin.toString()
				.getBytes("utf-8"))));
	}
}
