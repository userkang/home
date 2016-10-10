require.config({
	paths:{
		jquery: 'jquery-3.0.0',
		jqueryUI: 'jqueryUI-1.10.4'
	}
});

require(['jquery', 'jqueryUI', 'window'], function($, $UI, w){
	$('#a').click(function(){
		var win = new w.Window();
		win.alert({
			title: '提示',
			content: 'welcome!',
			// handler: function(){
			// 	alert('you click the button');
			// },
			width: 300,
			height: 150,
			y: 50,
			hasCloseBtn: true,
			skinClassName: "window_skin_a",
			text4Alert: "ok",
			isDraggable: true,
			dragHandle: ".window_header",
			handler4AlertBtn: function(){
				alert('you click the alert button');
			},
			handler4CloseBtn: function(){
				alert('you click the close button');
			}
		});
		win.on('alert', function(){
			alert('the second alert handler');
		});
		win.on('alert', function(){
			alert('the third alert handler');
		});
		win.on('close', function(){
			alert('the second close handler');
		});
	});
});