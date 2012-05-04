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

import java.net.URL;

import java.util.EnumSet;

///////////////////////////////////////////////////////////////////////
//
// Description: ManyouExtendedPerm
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public enum ManyouExtendedPerm 
  implements CharSequence {  

  STATUS_UPDATE("status_update"),
  PHOTO_UPLOAD("photo_upload"),
  MARKETPLACE("create_listing"),
  SMS("sms"),
  ;
  public static final String PERM_AUTHORIZE_ADDR = "http://api.manyou.com/openapi.php";
  private  String permissionName;

  ManyouExtendedPerm(String name) {
    setPermissionName(name);
  }

  public void setPermissionName(String permissionName) {
    this.permissionName = permissionName;
  }

  public String getPermissionName() {
    return permissionName;
  }

///////////////////////////////////////////////////////////////////////
//
// Function:    authorizationUrl
// Description: 
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static URL authorizationUrl(String apiKey, ManyouExtendedPerm permission)
    throws IOException {
    return authorizationUrl(apiKey, permission.getPermissionName());
  }

///////////////////////////////////////////////////////////////////////
//
// Function:    authorizationUrl
// Description: 
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static URL authorizationUrl(String apiKey, CharSequence permission)
    throws IOException {
    String url = String.format("%s?api_key=%s&v=1.0&ext_perm=%s", PERM_AUTHORIZE_ADDR, apiKey, permission);
    return new URL(url);
  }

  public char charAt(int index) {
    return this.permissionName.charAt(index);
  }

  public int length() {
    return this.permissionName.length();
  }

  public CharSequence subSequence(int start, int end) {
    return this.permissionName.subSequence(start, end);
  }

  public String toString() {
    return this.permissionName;
  }
}
