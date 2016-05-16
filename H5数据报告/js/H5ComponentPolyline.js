// 折线图组件对象

var H5ComponentPolyline = function(name,cfg){
   var component = new H5ComponentBase(name ,cfg);
    
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布
    var cns = document.createElement("canvas");
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w ;
    cns.height = ctx.height =h;
    component.append(cns);

    // 水平网格线，100份--> 10份
    var step =10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle="#AAA";
    for(var i = 0 ;i<step+1;i++ ){
        var y = (h/step) * i;
    	ctx.moveTo(0,y);
    	ctx.lineTo(w,y);
    }

    // 垂直网格线 根据项目的个数去分

    step = cfg.data.length + 1;

    var text_w = w/step >>0 ;

    for(var i=0 ;i<step+1 ;i++){
        var x = w/step * i;
    	ctx.moveTo(x,0);
    	ctx.lineTo(x,h);


    	if(cfg.data[i]){
    	var text = $('<div class="text">');
    	text.text(cfg.data[i][0]);
        text.css('width',text_w/2).css('left',x/2 + text_w/4);
    	component.append(text);
    }
    }
    

    ctx.stroke();
   
   //绘制折线数据 添加画布
    var cns = document.createElement("canvas");
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w ;
    cns.height = ctx.height =h;
    component.append(cns);

    var draw = function(per){

     // 清空画布
     ctx.clearRect(0,0,w,h);
     //绘制折线数据
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle="#ff8878";
    

    var x =0;
    var y =0;
    var row_w = w/(cfg.data.length+1);
    //画点
    for(i in cfg.data){
    	var item = cfg.data[i];
        x = row_w*i + row_w;
        y=h-(item[1]*h*per);
        ctx.moveTo(x,y);
        ctx.arc(x,y,5,0,2*Math.PI);
    }
    //连线
    //移动画笔到第一个数据的位置
    ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
    for(i in cfg.data){
    	var item = cfg.data[i];
        x = row_w*i + row_w;
        y=h-(item[1]*h*per);
        ctx.lineTo(x,y);
    }
    ctx.stroke();

    ctx.lineWidth=1;
    ctx.strokeStyle="rgba(255, 118, 118, 0)";
    //绘制阴影
    ctx.lineTo(x,h);
    ctx.lineTo(row_w,h);
    ctx.fillStyle= 'rgba(255, 118, 118, 0.4)';
    ctx.fill();
    
   //写数据
   for(i in cfg.data){
    	var item = cfg.data[i];
        x = row_w*i + row_w;
        y=h-(item[1]*h*per);
        ctx.fillStyle = item[2] ? item[2] : '#111' ;
        ctx.fillText((item[1]*100) + '%',x-10,y-10)
    }
    ctx.stroke();
    }
    draw(1);

    component.on('onLoad',function(){
    // 出场动画
    	var s =0;
    	for(i=0;i<100;i++){
    		setTimeout(function(){
    			s+=0.01;
                draw(s);
    		},i*10)
    		// 每0,10,20,30...时间触发
    	}
    });
    component.on('onLeave',function(){
    // 入场动画
    	var s =1;
    	for(i=0;i<100;i++){
    		setTimeout(function(){
    			s-=0.01;
                draw(s);
    		},i*10)
    		// 每0,10,20,30...时间触发
    	}
    })
    return component;
}