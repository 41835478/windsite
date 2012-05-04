///////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2005-2008 安石贝(北京)科技有限公司(AntsBase)
// All rights reserved.
// www.antsbase.com
// Project:     MymanRestClient
// Author:      Antsbase
// Date：       Aug 7, 2008
// Description：api
//
///////////////////////////////////////////////////////////////////////
package com.manyou.api;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.net.MalformedURLException;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

///////////////////////////////////////////////////////////////////////
//
// Description: JSON客户端
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public class ManyouJsonRestClient extends ManyouRestClient<Object>
 {
  public ManyouJsonRestClient(String apiKey, String secret)
      {
       this(SERVER_URL, apiKey, secret, null);
      }

  public ManyouJsonRestClient(String apiKey, String secret, String sessionKey)
      {
       this(SERVER_URL, apiKey, secret, sessionKey);
      }

  public ManyouJsonRestClient(String serverAddr, String apiKey, String secret,
      String sessionKey) throws MalformedURLException
      {
       this(new URL(serverAddr), apiKey, secret, sessionKey);
      }

  public ManyouJsonRestClient(URL serverUrl, String apiKey, String secret, String sessionKey)
      {
       super(serverUrl, apiKey, secret, sessionKey);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    getResponseFormat
// Description: The response format in which results to ManyouMethod calls are returned
// Parameters:  
// Returns:     null
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public String getResponseFormat()
      {
       return "JSON";
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractString
// Description: 从结果里提取字符串
// Parameters:  T result
// Returns:     String
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public String extractString(Object val)
      {
        try 
            {
             return ((JSONObject) val).get("result").toString();
            }
        catch (ClassCastException cce)
            {
             logException(cce);
             return null;
            }
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    parseCallResult
// Description: 获得请求结果
// Parameters:  InputStream data     - 获得结果
//              IManyouMethod method - 调用的方法
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected Object parseCallResult(InputStream data, IManyouMethod method)
    throws ManyouException, IOException
      {
       Object json = JSONValue.parse(new InputStreamReader(data));
       if (isDebug())
           {
            log(method.methodName() + ": " + (null != json ? json.toString() : "null"));
           }

       if (json instanceof JSONObject)
           {
            JSONObject jsonObj = (JSONObject) json;
            if (jsonObj.containsKey("error_code"))
                {
                 Long errorCode = (Long) jsonObj.get("error_code");
                 String message = (String) jsonObj.get("error_msg");
                 throw new ManyouException(errorCode.intValue(), message);
                }
           }
        return json;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractURL
// Description: 根据URL获得URL对象
// Parameters:  Object url - url地址
// Returns:     URL
// Throws:      IOException
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected URL extractURL(Object url)
    throws IOException
      {
       if (!(url instanceof String))
           {
            return null;
           }
       return (null == url || "".equals(url)) ? null : new URL( (String) url);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractInt
// Description: 获得整数
// Parameters:  Object val
// Returns:     int
// Throws:      ClassCastException
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected int extractInt(Object val)
      {
       try
           {
            return Integer.valueOf(((JSONObject) val).get("result").toString());
           }
       catch (ClassCastException cce)
           {
            logException(cce);
            return 0;
           }
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractBoolean
// Description: 获得Boolean
// Parameters:  Object val
// Returns:     boolean
// Throws:      ClassCastException
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected boolean extractBoolean(Object val)
      {
       try
           {
            return "true".equalsIgnoreCase(((JSONObject) val).get("result").toString());
           }
       catch (ClassCastException cce) 
           {
            logException(cce);
            return false;
           }
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractLong
// Description: 获得长整型
// Parameters:  Object val
// Returns:     Long
// Throws:      ClassCastException
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected Long extractLong(Object val)
      {
       try
           {
            return Long.valueOf(((JSONObject) val).get("result").toString());
           }
       catch (ClassCastException cce)
           {
            logException(cce);
            return null;
           }
      }

 }
