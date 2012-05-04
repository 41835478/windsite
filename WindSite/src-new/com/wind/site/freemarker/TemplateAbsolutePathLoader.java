package com.wind.site.freemarker;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import freemarker.cache.TemplateLoader;

/**
 * 加载绝对路径下模板
 * 
 * @author fxy
 * 
 */
public class TemplateAbsolutePathLoader implements TemplateLoader {
	private String htmlPath;

	public Object findTemplateSource(String name) throws IOException {
		File source = new File(htmlPath + File.separator + name);
		return source.isFile() ? source : null;
	}

	public long getLastModified(Object templateSource) {
		return ((File) templateSource).lastModified();
	}

	public Reader getReader(Object templateSource, String encoding)
			throws IOException {
		if (!(templateSource instanceof File)) {
			throw new IllegalArgumentException("templateSource is a: "
					+ templateSource.getClass().getName());
		}
		return new InputStreamReader(
				new FileInputStream((File) templateSource), encoding);
	}

	public void closeTemplateSource(Object templateSource) throws IOException {
		// Do nothing.
	}

	public void setHtmlPath(String htmlPath) {
		this.htmlPath = htmlPath;
	}

	public String getHtmlPath() {
		return htmlPath;
	}

}
