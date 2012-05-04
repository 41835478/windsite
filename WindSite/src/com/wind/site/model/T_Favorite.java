package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 淘江湖喜好
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_favorite")
public class T_Favorite extends TimestampModel {

	private static final long serialVersionUID = -6939739860518533296L;

	private String recentlyWant; // 最近想要的

	private String musics; // 喜欢的音乐。

	private String games; // 喜欢的游戏。

	private String books; // 喜欢的书籍。

	private String brands; //

	private String favoriteSongs; // 喜欢的歌。

	private String favoriteStar; // 喜欢的明星。

	private String catoon; // 喜欢的卡通。

	private String interest; // 兴趣

	private String sports; // 喜欢的运动。

	private String films; // 喜欢的电影。

	private String favoriteFood; // 喜欢的食物。

	/**
	 * @return the recentlyWant
	 */
	public String getRecentlyWant() {
		return recentlyWant;
	}

	/**
	 * @param recentlyWant
	 *            the recentlyWant to set
	 */
	public void setRecentlyWant(String recentlyWant) {
		this.recentlyWant = recentlyWant;
	}

	/**
	 * @return the musics
	 */
	public String getMusics() {
		return musics;
	}

	/**
	 * @param musics
	 *            the musics to set
	 */
	public void setMusics(String musics) {
		this.musics = musics;
	}

	/**
	 * @return the games
	 */
	public String getGames() {
		return games;
	}

	/**
	 * @param games
	 *            the games to set
	 */
	public void setGames(String games) {
		this.games = games;
	}

	/**
	 * @return the books
	 */
	public String getBooks() {
		return books;
	}

	/**
	 * @param books
	 *            the books to set
	 */
	public void setBooks(String books) {
		this.books = books;
	}

	/**
	 * @return the brands
	 */
	public String getBrands() {
		return brands;
	}

	/**
	 * @param brands
	 *            the brands to set
	 */
	public void setBrands(String brands) {
		this.brands = brands;
	}

	/**
	 * @return the favoriteSongs
	 */
	public String getFavoriteSongs() {
		return favoriteSongs;
	}

	/**
	 * @param favoriteSongs
	 *            the favoriteSongs to set
	 */
	public void setFavoriteSongs(String favoriteSongs) {
		this.favoriteSongs = favoriteSongs;
	}

	/**
	 * @return the favoriteStar
	 */
	public String getFavoriteStar() {
		return favoriteStar;
	}

	/**
	 * @param favoriteStar
	 *            the favoriteStar to set
	 */
	public void setFavoriteStar(String favoriteStar) {
		this.favoriteStar = favoriteStar;
	}

	/**
	 * @return the catoon
	 */
	public String getCatoon() {
		return catoon;
	}

	/**
	 * @param catoon
	 *            the catoon to set
	 */
	public void setCatoon(String catoon) {
		this.catoon = catoon;
	}

	/**
	 * @return the interest
	 */
	public String getInterest() {
		return interest;
	}

	/**
	 * @param interest
	 *            the interest to set
	 */
	public void setInterest(String interest) {
		this.interest = interest;
	}

	/**
	 * @return the sports
	 */
	public String getSports() {
		return sports;
	}

	/**
	 * @param sports
	 *            the sports to set
	 */
	public void setSports(String sports) {
		this.sports = sports;
	}

	/**
	 * @return the films
	 */
	public String getFilms() {
		return films;
	}

	/**
	 * @param films
	 *            the films to set
	 */
	public void setFilms(String films) {
		this.films = films;
	}

	/**
	 * @return the favoriteFood
	 */
	public String getFavoriteFood() {
		return favoriteFood;
	}

	/**
	 * @param favoriteFood
	 *            the favoriteFood to set
	 */
	public void setFavoriteFood(String favoriteFood) {
		this.favoriteFood = favoriteFood;
	}
}
