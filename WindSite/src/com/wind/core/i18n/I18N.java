package com.wind.core.i18n;

import java.util.Locale;

import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * Spring 国际化辅助类
 * 
 * @author fxy
 * 
 */
public class I18N {
	private static ResourceBundleMessageSource resourceBundle = new ResourceBundleMessageSource();

	public static ResourceBundleMessageSource getResourceBundle() {
		return resourceBundle;
	}

	public void setResourceBundle(ResourceBundleMessageSource resourceBundle) {
		I18N.resourceBundle = resourceBundle;
	}

	public static String getMessage(String key, Object[] arguments,
			Locale locale) {
		return resourceBundle.getMessage(key, arguments, locale);
	}

	public static String getMessage(String key, Object[] arguments) {
		return getMessage(key, arguments, Locale.getDefault());
	}

	public static String getMessage(String key) {
		return getMessage(key, null);
	}

}
