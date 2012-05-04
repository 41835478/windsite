package com.wind.core.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang.StringUtils;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * WebSnaprUtils辅助类
 * 
 * @author fxy
 * 
 */
public class WebSnaprUtils {

	private static List<String> keys = new ArrayList<String>();
	private static final List<String> sizes = new ArrayList<String>();
	public static final String T = "T";
	public static final String S = "S";
	static {
		keys.add("9S4lg4eZQC5b");
		sizes.add("T");
		sizes.add("S");
	}

	public static void flushSnapr(String site, String size) {
		if (StringUtils.isEmpty(size)) {
			size = "T";
		}
		HttpClient client = new HttpClient();
		if (sizes.contains(size)) {// 是否包含在指定size
			for (String key : keys) {
				String url = "http://images.websnapr.com/?size=" + size
						+ "&key=" + key + "&url=" + site;
				HttpMethod method = new GetMethod(url);
				try {
					client.executeMethod(method);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static InputStream getSnapr(String site, String size) {
		if (StringUtils.isEmpty(size)) {
			size = "T";
		}
		HttpClient client = new HttpClient();
		if (sizes.contains(size)) {// 是否包含在指定size
			for (String key : keys) {
				String url = "http://images.websnapr.com/?size=" + size
						+ "&key=" + key + "&url=" + site;
				HttpMethod method = new GetMethod(url);
				try {
					client.executeMethod(method);
					return method.getResponseBodyAsStream();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	public static Boolean createFileBySnapr(String path, String site,
			String size) {
		InputStream input = getSnapr(site, size);
		if (input != null) {
			File snaprFile = new File(path);
			File parent = new File(snaprFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			FileOutputStream out;
			try {
				out = new FileOutputStream(snaprFile);

				Image img = javax.imageio.ImageIO.read(input);
				int width = img.getWidth(null); // 得到源图宽
				int height = img.getHeight(null); // 得到源图长
				BufferedImage buffer = new BufferedImage(width, height,
						BufferedImage.TYPE_INT_RGB);
				JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
				encoder.encode(buffer);
				out.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	public static void main(String[] args) {
		WebSnaprUtils.getKeys().add("9S4lg4eZQC5b");
		WebSnaprUtils.getKeys().add("9S4lg4eZQC5b");
		WebSnaprUtils.getKeys().add("9S4lg4eZQC5b");
		WebSnaprUtils.createFileBySnapr("C:\\x_t.jpg", "www.xintaonet.com",
				WebSnaprUtils.T);
		WebSnaprUtils.createFileBySnapr("C:\\x_s.jpg", "www.xintaonet.com",
				WebSnaprUtils.S);
	}

	/**
	 * @return the keys
	 */
	public static List<String> getKeys() {
		return keys;
	}

	/**
	 * @param keys
	 *            the keys to set
	 */
	public void setKeys(List<String> keys) {
		WebSnaprUtils.keys = keys;
	}

}
