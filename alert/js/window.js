define(['jquery'], function($){
	function Window(){
		this.conf = {
			width: 500,
			height: 300,
			title: '系统消息',
			content: '',
			hander: null,
			hasCloseBtn: null,
			windowClassName: null,
			text4Alert: "确定",
			hasMask: true,
			isDraggable: true,
			dragHandle: null,
			handler4AlertBtn: null,
			handler4CloseBtn: null
		};
		this.handlers = {};
	};
	Window.prototype = {
		alert: function(conf){
			var C = $.extend(this.conf, conf);
			var boundingBox = $('<div class="window_boundingBox">' +
					'<div class="window_header">'+ C.title +'</div>' +
					'<div class="window_body">' + C.content +'</div>' +
					'<div class="window_footer"><input class="window_alertBtn" type="button" value="'+C.text4Alert+'" /></div>' 
				+ '</div>');
			var btn = boundingBox.find('.window_footer input');
			var mask = null;
			var that = this;
			if(C.hasMask){
				mask = $('<div class="window_mask"></div>');
				mask.appendTo('body');
			}
			boundingBox.appendTo('body');
			btn.click(function(){
				// C.handler && C.handler();
				boundingBox.remove();
				mask && mask.remove();
				that.fire("alert");
			});
			boundingBox.css({
				width: C.width + 'px',
				height: C.height + 'px',
				left: (C.x || (window.innerWidth - C.width)/2) + 'px',
				top: (C.y || (window.innerHeight - C.height)/2) + 'px'
			});
			if(C.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn"> </span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					boundingBox.remove();
					mask && mask.remove();
					that.fire("close");
				})
			}
			if(C.windowClassName){
				boundingBox.addClass(C.windowClassName);
			}
			if(C.isDraggable){
				if(C.dragHandle){
					boundingBox.draggable({handle: C.dragHandle});
				} else {
					boundingBox.draggable();
				}
			}
			if(C.handler4AlertBtn){
				this.on('alert', C.handler4AlertBtn);
			}
			if(C.handler4CloseBtn){
				this.on('close', C.handler4CloseBtn);
			}
		},
		confirm: function(){},
		prompt: function(){},
		on: function(type, handler){
			if (typeof this.handlers[type] == 'undefined'){
					this.handlers[type] = [];
				}
			this.handlers[type].push(handler);	
		},
		fire: function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0, len=handlers.length; i<len; i++){
					handlers[i](data);
				}
			}
		}
	}

	return {
		Window: Window
	}
});