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

///////////////////////////////////////////////////////////////////////
//
// Description: 参数的名称
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public enum ProfileField
 {
    UID("uid"),
    UCH_ID("uch_id"),
    NAME("name"), 
    HANDLE("handle"),
    SITE("site"),
    SEX("sex"), 
    BIRTHDAY("birthday"), 
    BLOOD_TYPE("blood_type"), 
    RELATIONSHIP_STATUS("relationship_status"), 
    CURRENT_LOCATION("current_location"), 
    HOMETOWN_LOCATION("hometown_location"),
    HAS_ADDED_APP("has_added_app"), 
    PRIVILEGE("privilege"), 
    ;

  private String fieldName;

  ProfileField(String name)
      {
       this.fieldName = name;
      }

  public String fieldName()
      {
       return this.fieldName;
      }

  public String toString()
      {
       return fieldName();
      }
  
///////////////////////////////////////////////////////////////////////
//
// Function:    isName
// Description: 判断参数域的名称
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public boolean isName(String name)
      {
       return toString().equals(name);
      }
 }
