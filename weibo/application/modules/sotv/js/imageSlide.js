var playUrl = 'http://open.tv.sohu.com/play.do?api_key=4a62c00db90213d0f54115e0b3ab5535&vid=';
(function($){
	var defaults = {
		spacing : 94,
		navNum : 6,
		playerWidth : 980,
		playerHeight : 380,
		preloadingImg : 'upload/loading_black.gif',
		preloading : !0,
		hoverPause : !0,
		animateSpeed : 'fast',
		autoPlay : !0,
		autoScrollSpeed : 4e3,
		loop : true,
		ptStepX : 5
		// timeout : 7e3
	};
	
	$.ImgSlide = function(el,o){
		this.$container = $(el).addClass('fi_movie');
		
		this.config = $.extend({}, defaults, o||{});
		this.spacing = this.config.spacing;
		this.animateSpeed = this.config.animateSpeed;
		this.data = this.config.data;
		this.autoPlay = this.config.autoPlay;
		this.timeout = this.config.timeout;
		this.autoScrollSpeed = this.config.autoScrollSpeed;
		
		this.index = 0;//current slide index
		this.loop = this.config.loop;
		this.imgComplete = [];
		this.clickDone = true;
		this._autoPlay = true;
		this._firstPlay = true;
		this.navNum = this.config.navNum;
		this.timeoutId = null;
		this.ptStepX = this.config.ptStepX;
		
		if(this.config.data){
			this.totalNum = this.config.data.length;
			this.initImgSlide();
			this.start();
		}else{
			return;
		}
	};
	
	var $s = $.ImgSlide;
	
	$s.fn = $s.prototype = {
		version : '1.0.0'
	};
	
	$s.extend = $s.fn.extend = $.extend;
	
	$s.fn.extend({
		initImgSlide : function(){
			this.initHTML();
			this.initEvents();
		},
		
		initHTML : function(){
			var self = this;
			
			this.slides = [];
			this.$player = $('<div class="fi_ct"></div>');
			this.$preloading = $(['<div class="fi_loading" style="display:none;z-index:-999;"><img src="',this.config.preloadingImg,'"/><div>'].join('')).css({opacity : 0.5});
			this.$player.append(this.$preloading);
			this.$nav = $('<div class="fi_tab"></div>');
			this.$preBtn = $('<div class="fi_btn fi_prev"><a href="javascript:void(0)"></a></div>');
			this.$nextBtn = $('<div class="fi_btn fi_next"><a href="javascript:void(0)"></a></div>');
			this.$list = $('<div class="fi_tab_inner"></div>');
			this.$list.css({
				width : (this.config.spacing * this.config.navNum) + 'px'
			});
			
			var $ul = $('<ul style="left:0px;" class="fi_tab_ clear"></ul>'),i,len,$li,item,$a;
			for(i=0,len=this.config.data.length; i < len; i++){
				item = this.config.data[i];
				$a = $(['<a href="',playUrl,item.vid,'" target="_blank"><img lazysrc="',item.p,'" class="fi_player" height="',this.config.playerHeight,'" width="',this.config.playerWidth,'"></a>'].join(''))
						.css({
							opacity: 0,
							position : 'absolute',
							left : 0,
							top : 0
						});
				
				this.slides.push($a);
				this.$player.append($a);
				
				$li = $(['<li><a target="_blank" href="',playUrl,item.vid,'"><img height="45" width = "80" src="',item.p1,'"><div class="fi_ovl_tab" style="opacity: 0.3; display: block;"></div></a></li>'].join(''));
				$li.find('div.fi_ovl_tab').css({opacity: 0.3});
				$li.data('data',item);
				$li.data('index',i);
				$ul.append($li);
			}
			$ul.css({
				width : this.spacing * len + 'px'
			});
			this.$list.append($ul);
			
			this.$pointer = $('<div class="fi_pointer" style="left: 5px; display: block;"></div>');
			this.$list.append(this.$pointer);
			
			this.$note = $('<div class="fi_note"></div>');
			this.$acts = $('<div class="fi_acts"></div>');
			this.$noteBackground = $('<div class="fi_ovl_note"></div>').css({opacity: 0.5});
			
			this.$nav.append(this.$preBtn,this.$list,this.$nextBtn);
			this.$container.append(this.$player,this.$nav,this.$note,this.$acts,this.$noteBackground);
			
			this.$list.css({height : $ul.find('li:first').outerHeight()});
			
			this.$list = $ul;
			
			if(this.config.loop){
				this.$list.find('li').each(function(index){
					$(this).css({position : 'absolute',left : index * self.spacing});
				});
			}
		},
		
		initEvents : function(){
			var self = this;
			this.$nextBtn.bind('click',{self:this},this.nextClick[this.config.loop]);
			this.$preBtn.bind('click',{self:this},this.preClick[this.config.loop]);
			this.$list.find('li').bind('mouseenter',{self:this},this.hoverHandler);
			
			if(this.config.hoverPause){
				this.$container.hover(function(){
					self.stop();
				},function(){
					self.start();
				});
			}
		},
		
		hoverHandler : function(e){
			var self = e.data.self,
				$li = $(this);
			if(self.loop){
				self.setPointer($li,false);
			}
			self.display($(this));
		},
		
		showPreloading : function(){
			this.getSlide(this.index).animate({opacity: 0},this.animateSpeed);
			this.$preloading.show();
		},
		
		hidePreloading : function(){
			this.$preloading.hide();
		},
		
		nextClick : {
			'true' : function(e){
				var self = e.data.self;
				if(!self.clickDone){
					return;
				}
				self.clickDone = false;
				
				var spacing = self.spacing,
					n=self.config.navNum,
					$list=self.$list
					$pointer = self.$pointer;
					
				$list.find('li').each(function(index){
					$(this).animate({left : spacing * (index-1)},self.animateSpeed,function(){
						if(index === self.totalNum-1){
							self.clickDone = true;
							$list.find('li:first').insertAfter($list.find('li:last')).css({left : (self.totalNum-1)*spacing});
						}
					});
				});
				
				var $li = self.indexAt(self.index);
				if(parseInt($li.css('left')) === 0){
					$pointer.css({left : self.ptStepX + (self.totalNum-1) * spacing});
				}else{
					$pointer.animate({left : self.ptStepX + parseInt($li.css('left')) - spacing},self.animateSpeed);
				}
				
			},
			'false' : function(e){
				var self = e.data.self;
				if(!self.clickDone){
					return;
				}
				var spacing = self.spacing,
					n=self.config.navNum,
					count = self.totalNum,
					$list=self.$list;
				
				self.enablePreBtn();
				
				if(Math.abs(parseInt($list.css('left'))) === (count - n)*spacing){
					return;
				}
				
				self.clickDone = false;
				self.pointerPre();
				self.scrollNext(function(){
					if(Math.abs(parseInt($list.css('left'))) === (count - n)*spacing){
						self.disableNextBtn();
					}
					self.clickDone = true;
				});
			}
		},
		
		preClick : {
			'true' : function(e){
				var self = e.data.self;
				if(!self.clickDone){
					return;
				}
				self.clickDone = false;
				
				var $list = self.$list,
					spacing = self.spacing,
					$pointer = self.$pointer;;
					
				$list.find('li:last').insertBefore($list.find('li:first')).css({left : -spacing});
				var $li = self.indexAt(self.index);
				
				$list.find('li').each(function(index){
					$(this).animate({left : spacing * index},self.animateSpeed,function(){
						if(index === self.totalNum-1){
							self.clickDone = true;
							if(parseInt($pointer.css('left')) === (self.ptStepX+(self.totalNum-1) * spacing)){
								$pointer.css({left : self.ptStepX});
							}
						}
					});
				});
				
				if(parseInt($pointer.css('left')) !== (self.ptStepX+(self.totalNum-1) * spacing)){
					$pointer.animate({left : self.ptStepX + parseInt($li.css('left')) + spacing},self.animateSpeed);
				}
			},
			'false' : function(e){
				var self = e.data.self;
				if(!self.clickDone){
					return;
				}
				
				var $list = self.$list,
					spacing = self.spacing;
				
				self.enableNextBtn();
				
				if(parseInt($list.css('left')) === 0){
					return;
				}
				
				self.clickDone = false;
				self.pointerNext();
				self.scrollPre(function(){
					if(parseInt($list.css('left')) === 0){
						self.disablePreBtn();
					}
					self.clickDone = true;
				});
			}
		},
		
		setMovieInfo : function(item){
			var i,c,len,
				info = ['<div class="fi_jb"></div>'];
				
			function isString(s){
				return typeof s === 'string';
			}
			
			if(item.minfo && isString(item.minfo)){
				this.$note.html(item.minfo);
			}else{
				if(item.t){
					info.push('<h2 class="fi_tt"><a target="_blank" href="',playUrl,item.vid,'">',item.t,'</a></h2>');
				}
				if(item.t_){
					info.push('<h3 class="fi_tt0"><a target="_blank" href="',playUrl,item.vid,'">',item.t_,'</a></h3>');
				}
				
				info.push('<div class="fi_meta">');
				if(item.mtype && item.mtype.length>0){
					if(isString(item.mtype)){
						info.push(item.mtype);
					}else{
						info.push('<div class="fi_mtype"><label>类型：</label><p>');
						for(i=0,len=item.mtype.length;i < len;i++){
							c = item.mtype[i];
                            info.push('<span>',c['t'],'</span> ');
						}
						info.push('</p></div>');
					}
				}
				
				if(item.mdirector && item.mdirector.length > 0){
					if(isString(item.mdirector)){
						info.push(item.mdirector);
					}else{
						info.push('<div class="fi_mdirector"><label>导演：</label><p>');
						for(i=0,len=item.mdirector.length;i < len;i++){
							c = item.mdirector[i];
                            info.push('<span>',c['t'],'</span> ');
						}
						info.push('</p></div>');
					}
				}
				
				if(item.mactor && item.mactor.length > 0){
					if(isString(item.mactor)){
						info.push(item.mactor);
					}else{
						info.push('<div class="fi_mactor"><label>主演：</label><p>');
						for(i=0,len=item.mactor.length;i < len;i++){
							c = item.mactor[i];
                            info.push('<span>',c['t'],'</span> ');
						}
						info.push('</p></div>');
					}
				}
				
				if(item.t1){
					info.push('<div class="fi_mdesc">',item.t1,'<div>');
				}
				
				info.push('</div>');
				this.$note.html(info.join(''));
				
				this.$acts.html(['<a class="fi_btnplay" target="_blank" href="',playUrl,item.vid,'">马上观看</a>'].join(''));
			}
		},
		
		startAt : function(index){
			var $li = this.indexAt(index),
				$pointer = this.$pointer,
				$list = this.$list,
				spacing = this.spacing;
			this._autoPlay = true;
			// var $li = typeof index === 'number' ? this.$list.find('li:eq(' + index + ')') : index;
			if(this.loop && parseInt($pointer.css('left')) > ((this.navNum-1)*spacing + this.ptStepX)){
				//$pointer.css({left : 5+((this.navNum-1)*spacing)});
				$li = $list.find('li:first');
			}
			this.setPointer($li,false);
			this.display($li);
		},
		
		start : function(){
			this.startAt(this.index);
		},
		
		stop : function(){
			this.clearLoadTimout();
			this.imgUnbind(this.index);
			clearTimeout(this.timer);
			this.timer = null;
			this._autoPlay = false;
		},
		
		navReset : function(fn){
			this.$list.animate({left : 0},'fast',fn);
		},
		
		pointerNext : function(step,animate){
			var $pointer = this.$pointer,
				spacing = this.spacing,
				step = step || 1,
				animate = typeof animate === 'undefined' ? true : animate;
			
			if(animate){
				$pointer.animate({left : parseInt($pointer.css('left')) + step * spacing},this.animateSpeed);
			}else{
				$pointer.css({left : parseInt($pointer.css('left')) + step * stspacing});
			}
		},
		
		pointerPre : function(step,animate){
			var $pointer = this.$pointer,
				spacing = this.spacing,
				step = step || 1,
				animate = typeof animate === 'undefined' ? true : animate;
			if(animate){
				$pointer.animate({left : parseInt($pointer.css('left')) - step * spacing},this.animateSpeed);
			}else{
				$pointer.css({left : parseInt($pointer.css('left')) - step * stspacing});
			}
		},
		
		scrollPre : function(fn){
			var spacing = this.spacing,
				$list = this.$list,
				fn = fn || function(){};
			$list.animate({left : parseInt($list.css('left'))+spacing},this.animateSpeed,fn);
		},
		
		scrollNext : function(fn){
			var self = this,
				spacing = this.spacing,
				$list = this.$list,
				fn = fn || function(){},li;
			if(this.loop){
				$list.find('li').each(function(index){
					$(this).animate({left : spacing * (index-1)},self.animateSpeed,function(){
						if(index === self.totalNum-1){
							self.clickDone = true;
							$list.find('li:first').insertAfter($list.find('li:last')).css({left : (self.totalNum-1)*spacing});
						}
					});
				});
				// $li = self.indexAt(self.index).next();
				// this.index = $li.data('index');
				// if(parseInt($li.css('left')) === 0){
					// $pointer.css({left : 5 + (self.totalNum-1) * spacing});
				// }else{
					// $pointer.animate({left : 5 + parseInt($li.css('left')) - spacing},self.animateSpeed);
				// }
			}else{
				$list.animate({left : parseInt($list.css('left'))-spacing},this.animateSpeed,fn);
			}
		},
		
		enablePreBtn : function(){
			this.$preBtn.find('a').removeClass('fi_off');
		},
		
		disablePreBtn : function(){
			this.$preBtn.find('a').addClass('fi_off');
		},
		
		enableNextBtn : function(){
			this.$nextBtn.find('a').removeClass('fi_off');
		},
		
		disableNextBtn : function(){
			this.$nextBtn.find('a').addClass('fi_off');
		},
		
		displayNext : function(){
			var self = this,
				spacing = this.spacing,
				n = this.config.navNum,
				$list = this.$list,
				$li = null,
				$pointer = this.$pointer,
				changePointer = true;
				
			if(this.loop){
				var $li = this.indexAt(this.index).next();
				var animate = false;
				if(parseInt($li.css('left')) >= this.navNum * spacing){
					if(parseInt($pointer.css('left')) >= (((this.navNum-1) * spacing) + this.ptStepX)){
						$pointer.hide();
					}
					$list.find('li').each(function(index){
						$(this).animate({left : spacing * (index-1)},self.animateSpeed,function(){
							if(index === self.totalNum-1){
								self.clickDone = true;	
								$pointer.show();
								$list.find('li:first').insertAfter($list.find('li:last')).css({left : (self.totalNum-1)*spacing});
							}
						});
					});
				}

				if(parseInt($pointer.css('left')) < (((this.navNum-1) * spacing) + this.ptStepX)){
					this.setPointer($li,animate);
				}
				this.display($li,false,changePointer);
			}else{
				$li = this.$list.find('li:eq(' + (this.index+1) + ')')
				if((this.index+1) !== this.data.length){
					if((($li.data('index')+1) * spacing + parseInt($list.css('left'))) > n * spacing){
						this.scrollNext();
						changePointer = false;
					}
					this.display($li,false,changePointer);
				}else{
					this.stop();
					this.navReset(function(){
						self.startAt(0);
					});
				}
			}
		},
		
		setPointer : function($li,animate){
			var $list = this.$list,
				$pointer = this.$pointer,
				spacing = this.spacing,
				animate = animate || false,
				index = this.indexOf($li);
			if(this.loop){
				if(animate){
					$pointer.animate({left : this.ptStepX + index * spacing},this.animateSpeed);
				}else{
					$pointer.css({left : this.ptStepX + index * spacing});
				}
			}else{
				if(animate){
					$pointer.animate({left : this.ptStepX + index * spacing + parseInt($list.css('left'))},this.animateSpeed);
				}else{
					$pointer.css({left : this.ptStepX + index * spacing + parseInt($list.css('left'))});
				}
			}
		},
		
		indexOf : function($li){
			var $lis = this.$list.find('li'),
				i,len,index = -1;
			for(i = 0,len = $lis.length; i < len; i++){
				if($($lis[i]).data('index') === $li.data('index')){
					index = i;
					break;
				}
			}
			return index;
		},
		
		indexAt : function(index){
			var $lis = this.$list.find('li'),
				i,len,$li = null;
			var $item;
			for(i = 0,len = $lis.length; i < len; i++){
				$item = $($lis[i]);
				if($item.data('index') === index){
					$li = $item;
					break;
				}
			}
			return $li;
		},
		
		display : function($li,animate,changePointer){
			var $list = this.$list,
				$player = this.$player,
				$pointer = this.$pointer,
				animate = animate || false,
				changePointer = typeof changePointer === 'undefined' ? true : changePointer,
				self = this;
			$list.find('li').removeClass('fi_now');
			$list.find('li a div').css({display : 'block'});
			$li.addClass('fi_now');
			$li.find('a div').css({display : 'none'});
			if(changePointer && !this.loop){
				this.setPointer($li,animate);
			}
			
			var data = $li.data('data'),
					index = $li.data('index'),
					$newSlide = this.getSlide(index);

			if(index == this.index && !this._firstPlay){
				if(this._autoPlay){
					this.autoPlayNext();
				}
				return;
			}
			this._firstPlay = false;
			
			this.setMovieInfo($li.data('data'));
			
			function imgLoaded(e){
				var self = e.data.self,
					index = e.data.index;
				self.clearLoadTimout();
				self.hidePreloading();
				self.doAnimate(self.getSlide(self.index) || [],self.getSlide(index),changePointer);
				self.imgComplete[index] = true;
				self.autoPlayNext();
				$(this).unbind('load.all');
			}
			
			function imgLoadedAction(e){
				var self = e.data.self,
					index = e.data.index;
				self.imgComplete[index] = true;
				$(this).unbind('load.action');
			}
			
			function imgLoadError(e){
				var self = e.data.self,
					index = e.data.index;
				self.clearLoadTimout();
				$(this).unbind('load');
				self.autoPlayNext();
			}
			
			function imgLoadTimeout(){
				self.imgUnbind(self.index);
				if(self.autoPlay && self._autoPlay){
					self.autoPlayNext(0);
				}
			}
			
			this.imgUnbind(this.index);
			this.clearLoadTimout();
			
			if(this.imgComplete[index]){
				this.doAnimate(this.getSlide(this.index),$newSlide,changePointer);
				this.index = index;
				this.autoPlayNext();
			}else{
				if(self.config.preloading){
					self.showPreloading();
				}
				this.index = index;
				this.loadImage(index,[imgLoaded,imgLoadedAction],imgLoadError,this.timeout ? function(){imgLoadTimeout();} : null);
			}
		},
		
		imgUnbind : function(index){
			var $img = this.getSlideImage(index);
			$img.unbind('load.all');
			$img.unbind('error');
		},
		
		allImgUnbind : function(){
			var i,$img,len;
			for(i=0,len=this.data.length; i<len; i++){
				$img = this.getSlideImage(i);
				$img.unbind('load');
				$img.unbind('error');
			}
		},
		
		autoPlayNext : function(speed){
			
			var self = this;
			speed = (speed == null || typeof speed === 'undefined') ? this.autoScrollSpeed : speed;
			if(this.autoPlay && this._autoPlay){
				this.timer = setTimeout(function(){self.displayNext()},speed);
			}
		},
		
		doAnimate : function($oldSlide,$newSlide,changePointer){
			var self = this,
				$pointer = this.$pointer,
				i,len;
			if(changePointer){
				$oldSlide.animate({opacity: 0},this.config.animateSpeed);
				for(i=0,len=this.slides.length;i<len;i++){
					this.slides[i].css({'z-index' : -100});
				}
				$newSlide.css({'z-index' : 0});
				$newSlide.animate({opacity:1},this.config.animateSpeed);
			}else{
				$pointer.hide();
				$oldSlide.animate({opacity: 0},this.config.animateSpeed);
				for(i=0,len=this.slides.length;i<len;i++){
					this.slides[i].css({'z-index' : -100});
				}
				$newSlide.css({'z-index' : 0});
				$newSlide.animate({opacity:1},this.config.animateSpeed,function(){
					$pointer.show();
				});
			}
		},
		
		loadImage : function(index,fns,efn,timeoutfn){
			var $img = this.getSlideImage(index);
			if(fns && fns.length > 0){
				$img.bind('load.all',{self : this, index : index},fns[0]);
				$img.bind('load.action',{self : this, index : index},fns[1]);
			}
			if(efn){
				$img.bind('error',{self : this, index : index},efn);
			}
			if(timeoutfn){
				this.timeoutId = setTimeout(timeoutfn,this.timeout);
			}
			// $img.removeAttr('src');
			$img[0].src = $img.attr('lazysrc');
		},
		
		clearLoadTimout : function(){
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		},
		
		getSlide : function(index){
			return this.slides[index];
		},
		
		getSlideImage : function(index){
			return this.getSlide(index).find('img');
		}
		
	});
	
	$.fn.ImgSlide = function(o){
		return this.each(function(){
			$(this).data('imgslide', new $s(this,o));
		});
	};
	
})(jQuery);
