var H5 = function(){
    this.id=('h5_' + Math.random()).replace(".","_");
	this.el = $('<div class="h5" id="'+ this.id +'">').hide();
	this.page = [];
	$('body').append(this.el);
    
    // 新増一个页
	this.addPage = function(name,text){
       var page = $('<div class="h5_page section">');

       if(name != undefined ){
       	page.addClass('h5_page_' + name);
       } 
       if(text != undefined){
       	page.text(text);
       }
       

       this.el.append(page);
       this.page.push(page);
       return this;//链式调用关键,返回this,new的h5对象,在重新使用addpage的方法
	}
	// 新增一个组件
	this.addComponent = function(name ,cfg){
		var cfg = cfg || {};
		cfg = $.extend({
			type:'base'
		},cfg);

		var component ; //定义一个变量，存储组件对象
		var page = this.page.slice(-1)[0];

		switch(cfg.type){
			case 'base':
			  component =new H5ComponentBase(name,cfg);
			  break;
			case 'polyline':
			  component = new H5ComponentPolyline("myPolylineComponent",cfg);
			  break;
			case 'pie':
			  component =new H5ComponentPie('myPieComponent',cfg);
			  break;
			case 'bar':
			  component = new H5ComponentBar('myPieComponent',cfg);
			  break;
			case 'radar':
			  component = new H5ComponentRadar('myRadarComponent',cfg);
			  break;
			case 'point':
			  component = new H5ComponentPoint('myRadarComponent',cfg);
			  break;
		}
		page.append(component);

		return this;//链式调用关键,返回this,new的h5对象,在重新使用addComponent的方法

	}
    // H5对象初始化呈现 ,
    this.loader=function(firstPage){
    	this.el.fullpage({
    		onLeave:function(index,nextIndex,direction){
					$(this).find(".h5_component").trigger("onLeave");
				},
			afterLoad:function(anchorLink,index){
					$(this).find(".h5_component").trigger("onLoad");
				}
    	});
    	this.page[0].find('.h5_component').trigger('onLoad');
    	this.el.show();

    	if(firstPage){
    		$.fn.fullpage.moveTo(firstPage);
    	}
    }

}