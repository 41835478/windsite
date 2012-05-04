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

import java.net.URL;

///////////////////////////////////////////////////////////////////////
//   
// Description: 图片新鲜事链接
// Parameters:  Pair<URL, URL>
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public class FeedImage extends Pair<URL, URL> implements IFeedImage
 {

///////////////////////////////////////////////////////////////////////
//
// Function:    Constructor
// Description: 
// Parameters:  URL - imgae
//              URL - link
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public FeedImage(URL image, URL link)
   {
    super(image, link);
    if (null == image || null == link)
        {
         throw new IllegalArgumentException("both image and link URLs are required");
        }
   }
///////////////////////////////////////////////////////////////////////
//
// Function:    Constructor
// Description: 
// Return:      the URL of the image
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public URL getImageUrl()
      {
       return getFirst();
      }
///////////////////////////////////////////////////////////////////////
//
// Function:    getImageUrlString
// Description: 
// Return:      the String representation of the image URL
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public String getImageUrlString()
      {
       return getImageUrl().toString();
      }
///////////////////////////////////////////////////////////////////////
//
// Function:    getLinkUrl
// Description: 
// Return:      link URL to which the feed image should link
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public URL getLinkUrl()
      {
       return getSecond();
      }
 }
