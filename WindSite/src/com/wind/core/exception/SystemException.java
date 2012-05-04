package com.wind.core.exception;

import com.wind.core.i18n.I18N;

/**
 * 系统异常
 * 
 * @author fxy
 * 
 */
public class SystemException extends BaseException {

	private static final long serialVersionUID = 8609054239806280747L;
	private String key;
	private String[] arguments;
	private String defaultMessage;

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key, Throwable t) {
		throw new SystemException(key, null, null, t);
	}

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key) {
		throw new SystemException(key, null, null, null);
	}

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key, String[] args) {
		throw new SystemException(key, args, null, null);
	}

	public static void handleException(String key, String defaultMessage,
			Throwable t) {
		throw new SystemException(key, null, defaultMessage, t);
	}

	public static void handleException(String key, String defaultMessage) {
		throw new SystemException(key, null, defaultMessage, null);
	}

	public static void handleMessageException(String message) {
		throw new SystemException(message);
	}

	public static void handleMessageException(String message, Throwable t) {
		throw new SystemException(null, null, message, t);
	}

	public static void handleMessageException(Throwable t) {
		throw new SystemException(null, null, null, t);
	}

	public SystemException() {
		super();
	}

	public SystemException(String message) {
		this(message, null);
	}

	public SystemException(Throwable nested) {
		this(null, nested);
	}

	public SystemException(String msg, Throwable nested) {
		this(null, null, msg, nested);
	}

	public SystemException(String key, String[] args, String defaultMessage,
			Throwable nested) {
		super(nested);
		this.key = key;
		this.arguments = args;
		this.defaultMessage = defaultMessage;
	}

	@Override
	public String getMessage() {
		String strMessage = null;
		try {
			strMessage = I18N.getMessage(this.key, this.arguments);
		} catch (Exception ex) {
		}
		if (strMessage == null) {
			if (this.defaultMessage == null)
				return super.getMessage();
			else
				return this.defaultMessage;
		} else
			return strMessage;
	}

	@Override
	public String[] getArguments() {
		return arguments;
	}

	public void setArguments(String[] arguments) {
		this.arguments = arguments;
	}

	@Override
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
