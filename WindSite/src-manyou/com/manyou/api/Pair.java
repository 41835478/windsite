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
// Description: 参数对，包含参数名(first)和参数值(second)
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
class Pair<N, V>
 {
  public N first;
  public V second;

  public Pair(N name, V value)
      {
       this.first = name;
       this.second = value;
      }

  public void setFirst(N first)
      {
       this.first = first;
      }

  public N getFirst()
      {
       return first;
      }

  public void setSecond(V second)
      {
       this.second = second;
      }

  public V getSecond()
      {
       return second;
      }
 }
