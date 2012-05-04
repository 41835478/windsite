package com.wind.core.exception;

import com.wind.core.i18n.I18N;

public class DaoException extends BaseException {

	private static final long serialVersionUID = 4029287627856368595L;
	private String key;
	private String[] arguments;
	private String defaultMessage;

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key, Throwable t) {
		throw new DaoException(key, null, null, t);
	}

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key) {
		throw new DaoException(key, null, null, null);
	}

	/**
	 * @param t
	 * @param operation
	 */
	public static void handleException(String key, String[] args) {
		throw new DaoException(key, args, null, null);
	}

	public static void handleException(String key, String defaultMessage,
			Throwable t) {
		throw new DaoException(key, null, defaultMessage, t);
	}

	public static void handleMessageException(String message) {
		throw new DaoException(message);
	}

	public static void handleMessageException(String message, Throwable t) {
		throw new DaoException(null, null, message, t);
	}

	public DaoException() {
		super();
	}

	public DaoException(String message) {
		this(message, null);
	}

	public DaoException(Throwable nested) {
		this(null, nested);
	}

	public DaoException(String msg, Throwable nested) {
		this(null, null, msg, nested);
	}

	public DaoException(String key, String[] args, String defaultMessage,
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
