/**
 * 
 */
//动态加载的行数
var DynamicloadCounts=5;
//搜索按钮 事件(实际上是设置动态加载的行数)
function SetDynamicLoadCounts(){
	DynamicloadCounts=document.getElementById("Main_Top_Bottom_Middle_Search_input").value;
	window.alert("设置成功 将会动态加载"+DynamicloadCounts+"页。");
	    
}
//滚动事件
function scroll(){
	var hl=document.documentElement; 						 //获取html对象
	var anchor=document.getElementById("Main_Middle_Anchor");//获取悬浮锚点对象
	//动态锚点div移动
	if(anchor.getBoundingClientRect().top<0&&anchor.style.position!="fixed"){
		anchor.style.position="fixed";
		var spikeLocation=document.getElementById("Main_Middle_Spike").getBoundingClientRect();
		anchor.style.left=(spikeLocation.left+spikeLocation.width+20)+"px";
		anchor.style.top=(hl.clientHeight/2-anchor.offsetHeight/2)+"px";
	}else if(hl.scrollTop<650&&anchor.style.position!="absolute"){
		anchor.style.position="absolute";
		anchor.style.left="1210px";
		anchor.style.top="500px";
	}
	//动态加载
	if(hl.scrollTop+hl.clientHeight-document.getElementById("Main_Top").clientHeight>=document.getElementById("Main_Middle").clientHeight){
		Div_Main_Middle_Add();
	}
}
//动态加载
function Div_Main_Middle_Add(){
	var table=document.getElementById("Main_Middle_recommend_table");
	if(DynamicloadCounts>0){
		DynamicloadCounts--;
		for(var i=0;i<4;i++){
			table.innerHTML+="<tr><td><div id='com1'></div></td><td><div id='com2'></div></td><td><div id='com3'></div></td><td><div id='com4'></div></td><td><div id='com5'></div></td></tr>";	
		}
	}
}
//顶部导航
function TopNavigateOver(obj){
	obj.style.background="white";
	obj.style.borderStyle="solid";
	obj.style.borderColor="#cccccc" ;
	obj.style.borderWidth="1px";
	obj.style.borderBottomWidth="0px";
	var nodes=obj.childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].getAttribute("id")==null){continue}
		if(nodes[i].getAttribute("id").indexOf("Main_Top_Top_navigate_detail_")!=-1){
			document.getElementById(nodes[i].getAttribute("id")).style.visibility="visible";
			
		}
	}
}
function TopNavigateOut(obj){
	obj.style.background="transparent";
	obj.style.borderWidth="0px";
	var nodes=obj.childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].getAttribute("id")==null){continue}
		if(nodes[i].getAttribute("id").indexOf("Main_Top_Top_navigate_detail_")!=-1){
			document.getElementById(nodes[i].getAttribute("id")).style.visibility="hidden";
		}
	}
}
//首页左边导航
function MMTLNavigateOver(obj){
	obj.style.background="#d9d9d9";
	var nodes=obj.childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].nodeName=="DIV"){
			if(nodes[i].getAttribute("id")==null){continue;}
			if(nodes[i].getAttribute("id").indexOf("Main_Middle_Top_Left_navigateAll_detail")!=-1){
				document.getElementById(nodes[i].getAttribute("id")).style.visibility="visible";
			}
		}
	}
}
function MMTLNavigateOut(obj){
	obj.style.background="white";
	var nodes=obj.childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].nodeName=="DIV"){
			if(nodes[i].getAttribute("id")==null){continue;}
			if(nodes[i].getAttribute("id").indexOf("Main_Middle_Top_Left_navigateAll_detail")!=-1){
				document.getElementById(nodes[i].getAttribute("id")).style.visibility="hidden";
			}
		}
	}
}
//需要初始化的函数
function AllOnLoad(divAndCounts){
	AllimageAutoPlay(divAndCounts);
	SpikeTime();
}
//倒计时
var min=30,sec=60;
function SpikeTime(){
	var div=document.getElementById("Main_Middle_Spike_Left_Time");
	if(sec<=0){
		sec=60
		min-=1;
	}else{
		sec-=1;
	}
	div.innerHTML=""+min+" : "+sec;
	window.setTimeout(function timer(){SpikeTime()},1000);
}
//图片轮播 搜索当前div对应的所有图片轮播
//divAndCounts二维数组   [x][0]divid [x][1]div轮播间隔时间   [x][2]对应的轮播图片总数
function AllimageAutoPlay(divAndCounts){
	for(var i=0;i<divAndCounts.length;i++){
		imageAutoPlay(document.getElementById(divAndCounts[i][0]),divAndCounts[i][2],divAndCounts[i][1]);
	}
}
//用id轮播对应的图片合集
function imageAutoPlay(div,imageCount,time){
	var imgClass=div.getAttribute("src").substring(0,div.getAttribute("src").length-5);
	var nowindeximg=div.getAttribute("src").substring(imgClass.length,imgClass.length+1);
	if(nowindeximg<imageCount){
		nowindeximg++;
		div.setAttribute("src",imgClass+nowindeximg+".bmp");
	}else{
		div.setAttribute("src",imgClass+1+".bmp");
	}
	window.setTimeout(function timer(){imageAutoPlay(div,imageCount,time)},time);
}
//浮动锚点按钮功能
function AnchorTo(obj){
	var hl=document.documentElement; 	
	switch(obj.getAttribute("id")){
		case "Main_Middle_Anchor_Ul_Spike":
			hl.scrollTop=660;
		break;
		case "Main_Middle_Anchor_Ul_Year":
			hl.scrollTop=960;
		break;
		case "Main_Middle_Anchor_Ul_Recommend":
			hl.scrollTop=1500;
		break;
		case "Main_Middle_Anchor_Ul_Top":
			hl.scrollTop=0;
		break;
	}
}
