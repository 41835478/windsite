package com.wind.site.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.util.Version;
import org.hibernate.criterion.R;
import org.hibernate.search.FullTextQuery;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;

import com.taobao.api.domain.ItemCat;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.Huabao;
import com.wind.site.model.HuabaoData;
import com.wind.site.model.HuabaoTag;
import com.wind.site.model.Huabaos;
import com.wind.site.model.HuabaosTag;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterPicture;
import com.wind.site.service.ITaobaoService;

/**
 * 淘宝业务接口实现
 * 
 * @author fxy
 * 
 */
public class TaobaoServiceImpl extends BaseServiceImpl implements
		ITaobaoService {

	@Override
	public void addHuabaoPic(List<T_PosterPicture> pp, T_Poster poster) {
		this.saveAll(pp);
		poster.setIsPic(true);
		this.update(poster);
	}

	@Override
	public void addHuabao(Huabaos hbs, Set<HuabaoTag> tags, HuabaoData data) {
		if (tags != null && tags.size() > 0) {
			for (HuabaoTag tag : tags) {
				if (tag.getId() == null) {
					this.save(tag);
				} else {
					this.update(tag);
				}
				// 保存关系
				HuabaosTag htag = this.findByCriterion(HuabaosTag.class, R.eq(
						"hid", hbs.getId()), R.eq("tid", tag.getId()));
				if (htag == null) {
					htag = new HuabaosTag();
					htag.setHid(hbs.getId());// 专辑ID
					htag.setTid(tag.getId());// 标签ID
					this.save(htag);
				}
			}
		}
		if (data != null) {// 保存专辑内图片和关联商品
			List<Huabao> huabaos = data.getPosterInfo();
			if (huabaos != null && huabaos.size() > 0) {
				for (Huabao hb : huabaos) {
					Huabao old = this.get(Huabao.class, hb.getPicId());
					if (old == null) {// 新增
						hb.setHid(hbs.getId());
						hb.setNums(hb.getMarkedItem().size());
						this.save(hb);
					} else {// 更新
						old.setHid(hbs.getId());
						old.setNums(hb.getMarkedItem().size());
						old.setPicDesc(hb.getPicDesc());
						old.setPicSrc(hb.getPicSrc());
						old.setRelatedGoodsLink(hb.getRelatedGoodsLink());
						old.setMarkedItem(hb.getMarkedItem());
						this.update(old);
					}
				}
			}
			hbs.setNums(huabaos.size());
			hbs.setIsSuccess(true);
			this.update(hbs);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ADTaobaokeItem> searchADItemsByFilter(
			Page<ADTaobaokeItem> page, String cid, String keyword) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getHibernateSession());
		try {
			Query cidQuery, titleQuery;
			BooleanQuery bqf = new BooleanQuery();
			if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
				QueryParser cidParser = new QueryParser(Version.LUCENE_29,
						"cid", new StandardAnalyzer(Version.LUCENE_29));
				cidQuery = cidParser.parse(cid);
				bqf.add(cidQuery, BooleanClause.Occur.MUST);
			}
			if (StringUtils.isNotEmpty(keyword)) {
				MultiFieldQueryParser titleParser = new MultiFieldQueryParser(
						Version.LUCENE_29, new String[] { "title", "nick" },
						new StandardAnalyzer(Version.LUCENE_29));
				titleQuery = titleParser.parse(keyword);
				bqf.add(titleQuery, BooleanClause.Occur.MUST);
			}
			if (bqf.clauses().size() > 0) {
				FullTextQuery fullQuery = fullTextSession.createFullTextQuery(
						bqf, ADTaobaokeItem.class);
				if (page != null) {
					page.setTotalCount(fullQuery.getResultSize());
					fullQuery.setFirstResult(page.getStart());
					fullQuery.setMaxResults(page.getPageSize());
				}
				return fullQuery.list();
			} else {
				return this.findAllByCriterion(page, ADTaobaokeItem.class);
			}
		} catch (ParseException e) {
			SystemException.handleMessageException(e);
		}
		return new ArrayList<ADTaobaokeItem>();
	}

	@Override
	public List<T_ItemCat> saveTItemCat(List<ItemCat> cats) {
		List<T_ItemCat> icats = new ArrayList<T_ItemCat>();
		if (cats != null && cats.size() > 0) {
			for (ItemCat cat : cats) {
				T_ItemCat icat = new T_ItemCat();
				icat.setCid(String.valueOf(cat.getCid()));
				icat.setIsParent(cat.getIsParent());
				icat.setName(cat.getName());
				icat.setParentCid(String.valueOf(cat.getParentCid()));
				icat.setSortOrder(cat.getSortOrder() != null ? cat
						.getSortOrder().intValue() : 0);
				icat.setStatus(cat.getStatus());
				icat.setIsSuccess(true);
				save(icat);
				icats.add(icat);
			}
		}
		return icats;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wind.site.service.ITaobaoService#updateTItemCat(com.wind.site.model
	 * .T_ItemCat)
	 */
	@Override
	public void updateTItemCatUnSuccess(T_ItemCat cat) {
		cat = this.get(T_ItemCat.class, cat.getId());
		if (cat != null) {
			cat.setIsSuccess(false);
			this.update(cat);
		}
	}

}
