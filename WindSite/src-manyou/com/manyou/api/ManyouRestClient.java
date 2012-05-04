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

import java.io.BufferedInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

///////////////////////////////////////////////////////////////////////
//
// Description: API客户端
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public abstract class ManyouRestClient<T>
  implements IManyouRestClient<T>
 {
  public static URL SERVER_URL = null;
  public static URL HTTPS_SERVER_URL = null;
  static
      {
       try
           {
            SERVER_URL = new URL(SERVER_ADDR);
            HTTPS_SERVER_URL = new URL(HTTPS_SERVER_ADDR);
           }
       catch (MalformedURLException e)
           {
            System.err.println("MalformedURLException: " + e.getMessage());
            System.exit(1);
           }
      }

  protected final String _secret;
  protected final String _apiKey;
  protected final URL _serverUrl;

  protected String _sessionKey;
  protected int _userId = -1;

  ///////
  // filled in when session is established
  // only used for desktop apps
  //////
  protected String _sessionSecret;

  //////
  // The number of parameters required for every request.
  // see #callMethod(IManyouMethod,Collection)
  //////
  public static int NUM_AUTOAPPENDED_PARAMS = 6;

  private static boolean DEBUG = false;
  protected Boolean _debug = null;

  protected File _uploadFile = null;
  protected static final String CRLF = "\r\n";
  protected static final String PREF = "--";
  protected static final int UPLOAD_BUFFER_SIZE = 512;

  public static final String MARKETPLACE_STATUS_DEFAULT = "DEFAULT";
  public static final String MARKETPLACE_STATUS_NOT_SUCCESS = "NOT_SUCCESS";
  public static final String MARKETPLACE_STATUS_SUCCESS = "SUCCESS";

///////////////////////////////////////////////////////////////////////
//
// Function:    构造方法
// Description: 
// Parameters:  
// Returns:     
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected ManyouRestClient(URL serverUrl, String apiKey, String secret, String sessionKey)
      {
       _sessionKey = sessionKey;
       _apiKey = apiKey;
       _secret = secret;
       _serverUrl = (null != serverUrl) ? serverUrl : SERVER_URL;
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
       return null;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    friends_areFriends
// Description: 返回两个用户是否为好友
// Parameters:  Integer userId1 - 第一个用户的 ID
//              Integer userId2 - 第二个用户的 ID
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T friends_areFriends(Integer userId1, Integer userId2)
    throws ManyouException, IOException 
      {
       return this.callMethod(ManyouMethod.FRIENDS_ARE_FRIENDS,
                  new Pair<String, CharSequence>("args[uid1]", Integer.toString(userId1)),
                  new Pair<String, CharSequence>("args[uid2]", Integer.toString(userId2)));
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    profile_getMYML
// Description: 获得个人主页内容
// Parameters:  Long userId - 用户ID
// Returns:     Json object
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T profile_getMYML(Integer userId) throws ManyouException, IOException
      {
       return this.callMethod(ManyouMethod.PROFILE_GET_MYML,
                  new Pair<String, CharSequence>("args[uid]", Integer.toString(userId)));
      }
  
///////////////////////////////////////////////////////////////////////
//
// Function:    handleFeedImages
// Description: Adds image parameters to a list of parameters
// Parameters:  List<Pair<String, CharSequence>> params -  参数列表
//              Collection<IFeedImage> images           -  图片列表
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected void handleFeedImages(List<Pair<String, CharSequence>> params,
                                  Collection<IFeedImage> images)
      {
       if (images != null && images.size() > 4)
           {
            throw new IllegalArgumentException("At most four images are allowed, got " +
                 Integer.toString(images.size()));
           }
       if (null != images && !images.isEmpty())
           {
            int image_count = 0;
            for (IFeedImage image : images)
                {
                 ++image_count;
                 String imageUrl = image.getImageUrlString(); 
                 assert null != imageUrl && "".equals(imageUrl) : "Image URL must be provided";
                 params.add(new Pair<String, CharSequence>(String.format("args[image_%d]", image_count),
                     image.getImageUrlString()));
                 assert null != image.getLinkUrl() : "Image link URL must be provided";
                 params.add(new Pair<String, CharSequence>(String.format("args[image_%d_link]", image_count),
                     image.getLinkUrl().toString()));
                }
           }
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    feed_publishTemplatizedAction
// Description: 发送新鲜事
// Parameters:  CharSequence titleTemplate -  Feed 标题区域的模板标记，包含{actor}标记
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public boolean feed_publishTemplatizedAction(CharSequence titleTemplate)
    throws ManyouException, IOException
      {
       return feed_publishTemplatizedAction(titleTemplate, null, null, null, null, null,null);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    feed_publishTemplatizedAction
// Description: 发送新鲜事
// Parameters:   CharSequence titleTemplate          - Feed 标题
//               Map<String, CharSequence> titleData - JSON 格式的数组
//               CharSequence bodyTemplate           - Feed 主体
//               Map<String, CharSequence> bodyData  - JSON 格式的数组
//               CharSequence bodyGeneral            - Feed 中的引言部分
//               String target_ids                   - null
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public boolean feed_publishTemplatizedAction(CharSequence titleTemplate,
                                               Map<String, CharSequence> titleData,
                                               CharSequence bodyTemplate,
                                               Map<String, CharSequence> bodyData,
                                               CharSequence bodyGeneral,
                                               Collection<IFeedImage> images,
                                               String targetIds)
    throws ManyouException, IOException 
      {
       assert null != titleTemplate && !"".equals(titleTemplate);

       ManyouMethod method = ManyouMethod.FEED_PUBLISH_TEMPLATIZED_ACTION;
       ArrayList<Pair<String, CharSequence>> params =
          new ArrayList<Pair<String, CharSequence>>(method.numParams());
       
       if (null != bodyGeneral && !"".equals(bodyGeneral))
           {
            params.add(new Pair<String, CharSequence>("args[body_general]", bodyGeneral));
           }
       
       if (null != bodyTemplate && !"".equals(bodyTemplate))
           {
            params.add(new Pair<String, CharSequence>("args[body_template]", bodyTemplate));
            if (null != bodyData && !bodyData.isEmpty())
                {
                 JSONObject bodyDataJson = new JSONObject();
                 bodyDataJson.putAll(bodyData);
                 params.add(new Pair<String, CharSequence>("args[body_data]", bodyDataJson.toString()));
                }
           }
       
       handleFeedImages(params, images);
       
       if (targetIds != null) 
           {
            params.add(new Pair<String, CharSequence>("args[target_ids]", targetIds));
           }
       
       params.add(new Pair<String, CharSequence>("args[title_template]", titleTemplate));
       if (null != titleData && !titleData.isEmpty())
           {
            JSONObject titleDataJson = new JSONObject();
            titleDataJson.putAll(titleData);
            params.add(new Pair<String, CharSequence>("args[title_data]", titleDataJson.toString()));
           }
       return extractBoolean(this.callMethod(method, params));
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    encode
// Description: 将传递的参数进行转码
// Parameters:  CharSequence target  -  参数值
// Returns:     转码后的值
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  private static String encode(CharSequence target)
      {       
       if(target == null)
           {
            return "";
           }
       String result = target.toString();
       try {
            result = URLEncoder.encode(result, "UTF8");
           }
       catch (UnsupportedEncodingException e)
           {
            System.err.printf("Unsuccessful attempt to encode '%s' into UTF8", result);
           }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    friends_getAppUsers
// Description: 在当前用户的好友中，返回安装了指定应用的好友的用户ID
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T friends_getAppUsers()
    throws ManyouException, IOException
      {
       return this.callMethod(ManyouMethod.FRIENDS_GET_APP_USERS);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    setDebug
// Description: 设置是否将错误信息打印
// Parameters:  boolean isDebug - true or false
// Returns:
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static void setDebugAll(boolean isDebug)
      {
       ManyouRestClient.DEBUG = isDebug;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    setDebug
// Description: 设置是否将错误信息打印
// Parameters:  boolean isDebug - true or false
// Returns:
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public void setDebug(boolean isDebug)
      {
       _debug = isDebug;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    delimit
// Description: 使用 , 拼接uids列表
// Parameters:  Collection iterable - UID列表
// Returns:     String              - 例如：106584,1065245
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  private static CharSequence delimit(Collection iterable)
      {
       // could add a thread-safe version that uses StringBuffer as well
       if (iterable == null || iterable.isEmpty())
          {
           return null;
          }       

       StringBuilder buffer = new StringBuilder();
       boolean notFirst = false;
       for (Object item : iterable)
           {
            if (notFirst)
                {
                 buffer.append(",");
                }
            else
                {
                 notFirst = true;
                }
            buffer.append(item.toString());
           }
       return buffer.length() > 0 ? buffer.substring(0,buffer.length()) : "";
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    callMethod
// Description: Call the specified method, with the given parameters, and return a JsonObject or PHP with the results.
// Parameters:  IManyouMethod method                     - 执行的方法
//              Pair<String, CharSequence>... paramPairs - 传递一个参数
// Returns:     JsonObject or PHP
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected T callMethod(IManyouMethod method, Pair<String, CharSequence>... paramPairs)
    throws ManyouException, IOException
      {
       return callMethod(method, Arrays.asList(paramPairs));
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    callMethod
// Description: Call the specified method, with the given parameters, and return a JsonObject or PHP with the results.
// Parameters:  IManyouMethod method - 执行的方法
//              Collection<Pair<String, CharSequence>> paramPairs - 传递的参数列表
// Returns:     JsonObject or PHP
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected T callMethod(IManyouMethod method, Collection<Pair<String, CharSequence>> paramPairs)
    throws ManyouException, IOException
      {
       HashMap<String, CharSequence> params =
          new HashMap<String, CharSequence>(2 * method.numTotalParams());
       params.put("method", method.methodName());
       params.put("api_key", _apiKey);
       params.put("v", TARGET_API_VERSION);

       String format = getResponseFormat();
       if (null != format)
           {
            params.put("format", format);
           }
       else
          {
           params.put("format", "JSON");
          }
       
       params.put("session_key", _sessionKey);
       StringBuffer buffer = new StringBuffer();
       StringBuffer result = new StringBuffer();
       
       List<String> paramslist = ManyouSignatureUtil.convert(params.entrySet());
       Collections.sort(paramslist);       
       for (String param : paramslist)
           {
            buffer.append(param + "&");
           }
       
       for (Pair<String, CharSequence> p : paramPairs)
           {
            buffer.append(p.getFirst()+ "=" + p.getSecond() + "&");
           }
       buffer.append(this._secret);
       //System.out.println(buffer.toString());
       try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            for (byte b : md.digest(buffer.toString().getBytes("UTF-8")))
                {
                 result.append(Integer.toHexString((b & 0xf0) >>> 4));
                 result.append(Integer.toHexString(b & 0x0f));
                }
           }
       catch (java.security.NoSuchAlgorithmException ex)
           {
            //System.err.println("MD5 does not appear to be supported" + ex);
           }
       catch (UnsupportedEncodingException uee)
           {
            //System.err.println("UTF8 encoding does not appear to be supported" + uee);
           }
       CharSequence oldVal;
       for (Pair<String, CharSequence> p : paramPairs)
           {
            oldVal = params.put(p.first, p.second);
            if (oldVal != null)
               {
                //System.err.printf("For parameter %s, overwrote old value %s with new value %s.", p.first,
                //    oldVal, p.second);
               }
           }
       assert (!params.containsKey("sig"));
       String signature = result.toString();
       params.put("sig", signature);
       params.put("call_id", Long.toString(System.currentTimeMillis()));      

       boolean doHttps = false;
       InputStream data = method.takesFile() 
       ? postFileRequest(method.methodName(), params) 
       : postRequest(method.methodName(), params, doHttps, /*doEncode*/true);
       return parseCallResult(data, method);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    parseCallResult
// Description: 处理调用Result的返回值
// Parameters:  InputStream data     - 数据
//              IManyouMethod method - 执行的方法
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected abstract T parseCallResult(InputStream data, IManyouMethod method)
    throws ManyouException, IOException;

///////////////////////////////////////////////////////////////////////
//
// Function:    notifications_get
// Description: 获取指定用户的通知
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T notifications_get()
    throws ManyouException, IOException
      {
       return this.callMethod(ManyouMethod.NOTIFICATIONS_GET);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    users_getInfo
// Description: 获取指定用户的信息，查看权限同当前登录用户
// Parameters:  Collection<Integer> userIds  - 用户 ID
//              EnumSet<ProfileField> fields - 指定返回信息的字段
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T users_getInfo(Collection<Integer> userIds, EnumSet<ProfileField> fields)
    throws ManyouException, IOException 
      {
       // assertions test for invalid params
       assert (userIds != null);
       assert (fields != null);
       assert (!fields.isEmpty());
       System.out.println("users_getInfo(Ids, fields)");
       return this.callMethod(ManyouMethod.USERS_GET_INFO,
               new Pair<String, CharSequence>("args[fields]", delimit(fields)),
               new Pair<String, CharSequence>("args[uids]", delimit(userIds))
                  );
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    users_getLoggedInUser
// Description: 获取当前Session登录的用户ID
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public int users_getLoggedInUser()
    throws ManyouException, IOException
      {
       T result = this.callMethod(ManyouMethod.USERS_GET_LOGGED_IN_USER);
       return extractInt(result);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    users_isAppAdded
// Description: 返回当前用户是否添加该应用
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public boolean users_isAppAdded()
    throws ManyouException, IOException 
      {
       return extractBoolean(this.callMethod(ManyouMethod.USERS_IS_APP_ADDED));
      }
  
///////////////////////////////////////////////////////////////////////
  //
//   Function:    users_isAppAdded
//   Description: 返回当前用户是否添加该应用
//   Parameters:  Integer userid - 用户ID
//   Returns:    
//   Throws:      
//   History:     Aug 7,2008 Antsbase
  //
//////////////////////////////////////////////////////////////////////  /  
  public boolean users_isAppAdded(Integer userId) throws ManyouException, IOException
  {
   boolean isadded = extractBoolean(this.callMethod(ManyouMethod.USERS_IS_APP_ADDED,
            new Pair<String, CharSequence>("uid", Integer.toString(userId))));
    return isadded;
  }

///////////////////////////////////////////////////////////////////////
//
// Function:    postFileRequest
// Description: 更新文件，该方法未测试
// Parameters:  CharSequence message - 打印内容
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected InputStream postFileRequest(String methodName, Map<String, CharSequence> params)
    throws IOException
      {
       assert (null != _uploadFile);
       try {
             BufferedInputStream bufin = new BufferedInputStream(new FileInputStream(_uploadFile));
             String boundary = Long.toString(System.currentTimeMillis(), 16);
             URLConnection con = SERVER_URL.openConnection();
             con.setDoInput(true);
             con.setDoOutput(true);
             con.setUseCaches(false);
             con.setRequestProperty("Content-Type", "multipart/form-data; charset=UTF-8; boundary=" + boundary);
             con.setRequestProperty("MIME-version", "1.0");

             DataOutputStream out = new DataOutputStream(con.getOutputStream());

             for (Map.Entry<String, CharSequence> entry : params.entrySet())
                 {
                  out.writeBytes(PREF + boundary + CRLF);
                  out.writeBytes("Content-disposition: form-data; name=\"" + entry.getKey() + "\"");
                  out.writeBytes(CRLF + CRLF);
                  byte[] bytes = entry.getValue().toString().getBytes("UTF-8");
                  out.write(bytes);
                  out.writeBytes(CRLF);
                 }

             out.writeBytes(PREF + boundary + CRLF);
             out.writeBytes("Content-disposition: form-data; filename=\"" + _uploadFile.getName() + "\"" +
                            CRLF);
             out.writeBytes("Content-Type: image/jpeg" + CRLF);
             // out.writeBytes("Content-Transfer-Encoding: binary" + CRLF); // not necessary

             // Write the file
             out.writeBytes(CRLF);
             byte b[] = new byte[UPLOAD_BUFFER_SIZE];
             int byteCounter = 0;
             int i;
             while (-1 != (i = bufin.read(b)))
                 {
                  byteCounter += i;
                  out.write(b, 0, i);
                 }
             out.writeBytes(CRLF + PREF + boundary + PREF + CRLF);

             out.flush();
             out.close();

             InputStream is = con.getInputStream();
             return is;
            }
        catch (Exception e)
            {
             logException(e);
             return null;
            }
  }

///////////////////////////////////////////////////////////////////////
//
// Function:    logException
// Description: 在后台打印异常
// Parameters:  CharSequence message - 打印内容
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected final void logException(Exception e)
      {
       logException("exception", e);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    logException
// Description: 在后台打印异常
// Parameters:  CharSequence message - 打印内容
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected void logException(CharSequence msg, Exception e)
      {
       System.err.println(msg + ":" + e.getMessage());
       e.printStackTrace();
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    log
// Description: 在后台打印日志
// Parameters:  CharSequence message - 打印内容
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected void log(CharSequence message)
      {
       System.out.println(message);
      }

  public boolean isDebug()
      {
       return (null == _debug) ? DEBUG : _debug.booleanValue();
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    notifications_send
// Description: 发送给当前登陆的用户并在通知里不显示接收人的名字
// Parameters:   CharSequence notification - 指定在通知中包含的 MYML 代码
//               Collention recipientIds   - 接受者ID列表
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public void notifications_send(Collection<Integer> recipientIds, CharSequence notification)
    throws ManyouException, IOException
      {
       assert (null != notification);
       ArrayList<Pair<String, CharSequence>> args = new ArrayList<Pair<String, CharSequence>>(3);
       args.add(new Pair<String, CharSequence>("args[msg]", notification));
       if (null != recipientIds && !recipientIds.isEmpty())
           {
            args.add(new Pair<String, CharSequence>("args[uids]", delimit(recipientIds)));
           }       
       this.callMethod(ManyouMethod.NOTIFICATIONS_SEND, args);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    notifications_send
// Description: 发送给当前登陆的用户并在通知里不显示接收人的名字
// Parameters:   CharSequence notification - 指定在通知中包含的 MYML 代码
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public void notifications_send(CharSequence notification)
    throws ManyouException, IOException
      {
       notifications_send(/*recipients*/null, notification);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractURL
// Description: 从结果里提取URL
// Parameters:  T result
// Returns:     URL
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected abstract URL extractURL(T result)
    throws IOException;

///////////////////////////////////////////////////////////////////////
//
// Function:    profile_setProfileMYML
// Description: 设置个人主页
// Parameters:  CharSequence mymlMarkup - profile content
//              Long profileId          - 要设置用户ID
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public boolean profile_setProfileMYML(CharSequence mymlMarkup, Integer profileId) throws ManyouException, IOException
    {
     if (null == mymlMarkup )
         {
          throw new IllegalArgumentException("At least one of the MYML parameters must be provided");
         }
      
     ManyouMethod method = ManyouMethod.PROFILE_SET_MYML;
     ArrayList<Pair<String, CharSequence>> params = new ArrayList<Pair<String, CharSequence>>(method.numParams());
     
     if (null != mymlMarkup)
         {
          params.add(new Pair<String, CharSequence>("args[myml]", mymlMarkup));
         }
     
     if (null != profileId)
         {
          params.add(new Pair<String, CharSequence>("args[uid]", profileId.toString()));
         }
     return extractBoolean(this.callMethod(method, params));
    }

///////////////////////////////////////////////////////////////////////
//
// Function:    profile_setProfileMYML
// Description: 设置个人主页
// Parameters:  CharSequence mymlMarkup - profile content
//              Long profileId          - 要设置用户ID
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public boolean profile_setProfileMYML(CharSequence mymlMarkup) throws ManyouException, IOException
    {
     return profile_setProfileMYML(mymlMarkup,users_getLoggedInUser());
    }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractURL
// Description: 使用delimiter分割字符，用equals拼接分割后的字符
// Parameters:  Collection<Map.Entry<String, CharSequence>> entries - 参数值
//              CharSequence delimiter                              - 分割字符
//              CharSequence equals                                 - 拼接字符
//              boolean doEncode                                    - 是否将参数编码
// Returns:     URL
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected static CharSequence delimit(Collection<Map.Entry<String, CharSequence>> entries,
                                        CharSequence delimiter, CharSequence equals,
                                        boolean doEncode)
      {
       if (entries == null || entries.isEmpty())
          {
           return null;
          }
    
       StringBuilder buffer = new StringBuilder();
       boolean notFirst = false;
       for (Map.Entry<String, CharSequence> entry : entries)
           {
            if (notFirst)
               {
                buffer.append(delimiter);
               }
            else
               {
                notFirst = true;
               }
            CharSequence value = entry.getValue();
            buffer.append(entry.getKey()).append(equals).append(doEncode ? encode(value) : value);
           }
       return buffer;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractBoolean
// Description: 从结果里提取布尔值
// Parameters:  T result，包含"true" 或 "false"
// Returns:     boolean
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected boolean extractBoolean(T result)
      {
       return "true".equalsIgnoreCase(extractString(result));
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractInt
// Description: 从结果里提取整数值
// Parameters:  T result
// Returns:     int
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected abstract int extractInt(T result);

///////////////////////////////////////////////////////////////////////
//
// Function:    extractLong
// Description: 从结果里提取长整型
// Parameters:  T result
// Returns:     Long
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  protected abstract Long extractLong(T result);


///////////////////////////////////////////////////////////////////////
//
// Function:    friends_get
// Description: 返回当前用户的好友
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public T friends_get()
    throws ManyouException, IOException
      {                                                                                                                
       ManyouMethod method = ManyouMethod.FRIENDS_GET;
       Collection<Pair<String, CharSequence>> params =
           new ArrayList<Pair<String, CharSequence>>(method.numParams());
    
       return this.callMethod(method, params);
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    friends_get
// Description: 返回当前用户的好友
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  private InputStream postRequest(CharSequence method, Map<String, CharSequence> params,
                                  boolean doHttps, boolean doEncode)
    throws IOException 
      {
       CharSequence buffer = (null == params) ? "" : delimit(params.entrySet(), "&", "=", doEncode);
       URL serverUrl = (doHttps) ? HTTPS_SERVER_URL : _serverUrl;
       if (isDebug())
           {
            StringBuilder debugMsg =
                new StringBuilder().append(method).append(" POST: ").append(serverUrl.toString()).append("?");
                debugMsg.append(buffer);
                log(debugMsg);
           }

       HttpURLConnection conn = (HttpURLConnection) serverUrl.openConnection();
       try {
            conn.setRequestMethod("POST");
           }
       catch (ProtocolException ex)
           {
            logException(ex);
           }
      conn.setDoOutput(true);
      conn.connect();
      conn.getOutputStream().write(buffer.toString().getBytes());

      return conn.getInputStream();
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
  protected abstract String extractString(T result);

}
