package com.wind.weibo.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.ElementHandler;
import org.dom4j.ElementPath;
import org.hibernate.criterion.R;

import com.google.gson.Gson;
import com.wind.core.service.IBaseService;
import com.wind.weibo.model.VanclCat;
import com.wind.weibo.model.VanclProduct;
import com.wind.weibo.model.VanclProductDesc;
import com.wind.weibo.model.VanclWashing;

public class VanclElementHandler implements ElementHandler {

	private IBaseService service;

	public VanclElementHandler() {

	}

	public VanclElementHandler(IBaseService service) {
		this.service = service;
	}

	/**
	 * 保存凡客分类，同时计数商品
	 * 
	 * @param name
	 * @param parentId
	 */
	private Integer saveCat(String name, Integer parentId, Integer level,
			String path) {
		VanclCat cat = service.findByCriterion(VanclCat.class, R.eq("name",
				name), R.eq("parentCid", parentId));
		if (cat == null) {
			cat = new VanclCat();
			cat.setName(name);
			cat.setParentCid(parentId);
			cat.setNums(1L);
			cat.setLevel(level);
			cat.setPath(path);
			service.save(cat);
		} else {
			cat.setNums(cat.getNums() + 1);
			service.update(cat);
		}
		return cat.getId();
	}

	/**
	 * 保存或修改凡客Washing
	 * 
	 * @param name
	 * @param pic
	 * @return
	 */
	private Integer saveWashing(String name, String pic) {
		VanclWashing wash = service.findByCriterion(VanclWashing.class, R.eq(
				"name", name));
		if (wash == null) {
			wash = new VanclWashing();
			wash.setName(name);
			wash.setPic(pic);
			service.save(wash);
		}
		return wash.getId();
	}

	private void saveProduct(String productCode, String name, String photos,
			String currentPrice, String originalPrice, Boolean isSpecial,
			Integer cat1, Integer cat2, Integer cat3, Integer cat4,
			Integer cat5, String washing, String color, String props,
			String sizes, String description, String sizeTable) {
		VanclProduct product = service.get(VanclProduct.class, productCode);
		if (product == null) {// 新增
			product = new VanclProduct();
			product.setCat1(cat1);
			product.setCat2(cat2);
			product.setCat3(cat3);
			product.setCat4(cat4);
			product.setCat5(cat5);
			product.setCurrentPrice(currentPrice);
			product.setIsSpecial(isSpecial);
			product.setName(name);
			product.setOriginalPrice(originalPrice);
			product.setPhotos(photos.split(",")[0]);
			product.setProductCode(productCode);
			product.setIsValid(true);
			product.setIsNew(true);
			service.save(product);
		} else {// 修改
			product.setCat1(cat1);
			product.setCat2(cat2);
			product.setCat3(cat3);
			product.setCat4(cat4);
			product.setCat5(cat5);
			product.setCurrentPrice(currentPrice);
			product.setIsSpecial(isSpecial);
			product.setName(name);
			product.setOriginalPrice(originalPrice);
			product.setPhotos(photos.split(",")[0]);
			product.setProductCode(productCode);
			product.setIsValid(true);
			product.setIsNew(false);
			service.update(product);
		}
		VanclProductDesc desc = service
				.get(VanclProductDesc.class, productCode);
		if (desc == null) {
			desc = new VanclProductDesc();
			desc.setColor(color);
			desc.setDescription(description);
			desc.setProductCode(productCode);
			desc.setPhotos(photos);
			desc.setProps(props);
			desc.setSizes(sizes);
			desc.setSizeTable(sizeTable);
			desc.setWashing(washing);
			service.save(desc);
		} else {
			desc.setColor(color);
			desc.setDescription(description);
			desc.setProductCode(productCode);
			desc.setPhotos(photos);
			desc.setProps(props);
			desc.setSizes(sizes);
			desc.setSizeTable(sizeTable);
			desc.setWashing(washing);
			service.update(desc);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public void onEnd(ElementPath path) {
		Element row = path.getCurrent();
		@SuppressWarnings("unused")
		Element rowSet = row.getParent();
		Document document = row.getDocument();
		Element root = document.getRootElement();
		Iterator it = root.elementIterator();
		while (it.hasNext()) {
			Element element = (Element) it.next();
			String productCode = element.elementText("productCode");
			String name = element.elementText("name");
			String currentPrice = element.elementText("currentPrice");
			String originalPrice = element.elementText("originalPrice");
			String color = element.elementText("color");
			Boolean isSpecial = "True".equals(element.elementText("isSpecial")) ? true
					: false;
			String description = element.elementText("description");
			String sizeTable = element.elementText("sizeTable");

			Iterator<Element> photoItr = element.element("photos").elements()
					.iterator();
			String photos = "";
			while (photoItr.hasNext()) {
				photos += photoItr.next().getText().split("mid/")[1].replace(
						".jpg", "")
						+ ",";
			}
			String washing = "";
			Element washingInstructions = element
					.element("washingInstructions");
			if (washingInstructions != null) {
				List washingInstructionsElements = washingInstructions
						.elements();
				if (washingInstructionsElements != null
						&& washingInstructionsElements.size() > 0) {
					Iterator<Element> washingItr = washingInstructionsElements
							.iterator();
					while (washingItr.hasNext()) {
						Element washingE = washingItr.next();
						Integer wash = saveWashing(
								washingE.elementText("name"),
								washingE.elementText("url").split("Washing/")[1]
										.replace(".gif", ""));
						washing += (wash + ",");
					}
				}
			}
			String props = "";
			Element properties = element.element("properties");
			if (properties != null) {
				List propertiesElements = properties.elements();
				if (propertiesElements != null && propertiesElements.size() > 0) {
					Iterator<Element> propsItr = propertiesElements.iterator();
					List<Map<String, String>> objs = new ArrayList<Map<String, String>>();
					Map<String, String> obj = null;
					while (propsItr.hasNext()) {
						Element prop = propsItr.next();
						obj = new HashMap<String, String>();
						obj.put("n", prop.elementText("name"));
						obj.put("v", prop.elementText("value"));
						objs.add(obj);
					}
					props = new Gson().toJson(objs);
				}
			}
			String sizes = "";
			Element sizess = element.element("sizes");
			if (sizess != null) {
				List sizesElement = sizess.elements();
				if (sizesElement != null && sizesElement.size() > 0) {
					Iterator<Element> sizesItr = sizesElement.iterator();
					while (sizesItr.hasNext()) {
						sizes += sizesItr.next().getText() + ",";
					}
				}
			}
			Element catss = element.element("category");
			Integer c0 = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0;
			if (catss != null) {
				List<Element> catsElement = catss.elements();
				if (catsElement != null && catsElement.size() == 5) {
					Gson gson = new Gson();
					List<Map<String, String>> catJson = new ArrayList<Map<String, String>>();
					String cat0 = catsElement.get(0).getTextTrim();
					if (StringUtils.isNotEmpty(cat0)) {
						c0 = saveCat(cat0, 0, 1, gson.toJson(catJson));// 一级分类
					}
					String cat1 = catsElement.get(1).getTextTrim();
					if (StringUtils.isNotEmpty(cat1)) {
						Map<String, String> cat = new HashMap<String, String>();
						cat.put("n", c0 + "");
						cat.put("v", cat0);
						catJson.add(cat);
						c1 = saveCat(cat1, c0, 2, gson.toJson(catJson));// 二级分类
					}
					String cat2 = catsElement.get(2).getTextTrim();
					if (StringUtils.isNotEmpty(cat2)) {
						Map<String, String> cat = new HashMap<String, String>();
						cat.put("n", c1 + "");
						cat.put("v", cat1);
						catJson.add(cat);
						c2 = saveCat(cat2, c1, 3, gson.toJson(catJson));// 三级分类
					}
					String cat3 = catsElement.get(3).getTextTrim();
					if (StringUtils.isNotEmpty(cat3)) {
						Map<String, String> cat = new HashMap<String, String>();
						cat.put("n", c2 + "");
						cat.put("v", cat2);
						catJson.add(cat);
						c3 = saveCat(cat3, c2, 4, gson.toJson(catJson));// 四级分类
					}
					String cat4 = catsElement.get(4).getTextTrim();
					if (StringUtils.isNotEmpty(cat4)) {
						Map<String, String> cat = new HashMap<String, String>();
						cat.put("n", c3 + "");
						cat.put("v", cat3);
						catJson.add(cat);
						c4 = saveCat(cat4, c3, 5, gson.toJson(catJson));// 五级分类
					}
				}
			}
			saveProduct(productCode, name, photos, currentPrice, originalPrice,
					isSpecial, c0, c1, c2, c3, c4, washing, color, props,
					sizes, description, sizeTable);
		}
		row.detach();

	}

	@Override
	public void onStart(ElementPath path) {
	}

}