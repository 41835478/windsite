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
import java.util.Collection;
import java.util.EnumSet;
import java.util.Map;

public interface IManyouRestClient<T>
 {
  public static final String TARGET_API_VERSION = "0.1";
  public static final String ERROR_TAG         = "error_response";
  public static final String MY_SERVER         = "api.manyou.com/openapi.php";
  public static final String SERVER_ADDR       = "http://" + MY_SERVER;
  public static final String HTTPS_SERVER_ADDR = "https://" + MY_SERVER;
  
  public void setDebug(boolean isDebug);

  public boolean isDebug();

///////////////////////////////////////////////////////////////////////
//
// Function:    profile_setProfileMYML
// Description: 设置个人主页
// Parameters:  CharSequence mymlMarkup - profile content
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public boolean profile_setProfileMYML(CharSequence mymlMarkup)
    throws ManyouException, IOException;

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
  public boolean profile_setProfileMYML(CharSequence mymlMarkup, Integer profileId)
    throws ManyouException, IOException;

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
  public T profile_getMYML(Integer userId)
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;


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
                                               String target_ids)
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;

  
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
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;

///////////////////////////////////////////////////////////////////////
//
// Function:    notifications_send
// Description: 向指定用户发送通知
// Parameters:  Collection<Integer> recipientIds - 指定接收通知用户的 ID
//              CharSequence notification - 指定在通知中包含的 MYML 代码
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public void notifications_send(Collection<Integer> recipientIds, CharSequence notification)
    throws ManyouException, IOException;

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
    throws ManyouException, IOException;
 
}
