/*
	1.正文和标题
	2.确定和关闭之后的回调函数
	3.宽高
	4.位置
	5.当弹出层出现时要不要让页面可以滚动
	6.遮罩层的不透明度
	7.出现/隐藏的方式
	8.过渡时间
	9.按钮
	10.X
*/
function createPopup(opt){
	//获取所传入的实参
	var title = opt.title || "我是标题"
	var content = opt.content || ""
	var width = opt.width || 300
	var height = opt.height || 200
	var opsition = opt.opsition || "middle"   //内置位置
	var fix = opt.fix || "absolute"  //定位方式
	var roll = opt.roll || false  //是否滚动 ?????
	var shadeBgColor = opt.shadeBgColor || "rgba(0,0,0,.3)"  //遮罩层背景颜色
	var Appearance = opt.Appearance || "upward"    //出场方式
	var time = opt.Time || 15    //动画执行时间
	var btn = opt.button || ["确定","取消"]    //按钮
	var fn = opt.fn || function(){return null} //要执行的函数
	var X = opt.X || false  //叉叉   ？？？？

	var popmTop = "20px"  //向上淡出

	var html = document.querySelector("html")
	var body = document.querySelector('body')
	html.style.width = "100%"
	html.style.height = "100%"
	body.style.width = "100%"	//设置body的宽高
	body.style.height = "100%"


	//获取浏览器可视区域的宽高
	var lookWidth = document.documentElement.clientWidth
	var lookHeight = document.documentElement.clientHeight

	//创建遮罩层,并设置样式
	var shade = document.createElement("div")
	shade.style.position = "absolute"
	shade.style.zIndex = 999;
	shade.style.top = 0;
	shade.style.left = 0;
	shade.style.width = lookWidth + "px"
	shade.style.height = body.scrollHeight + "px"
	shade.style.backgroundColor = shadeBgColor
	body.appendChild(shade)





	//创建弹出框,并设置样式
	var Tipswindown = document.createElement("div")
	body.style.overflowX = "hidden"  //遮罩层出来后的宽度就比body的宽度多了0.4像素，会出现横向滚动条
	Tipswindown.style.width = width + "px"
	Tipswindown.style.height = height + "px"
	Tipswindown.style.backgroundColor = "#fff"
	Tipswindown.style.borderRadius = "3px"
	Tipswindown.style.boxShadow = "0 0 5px #666"





	/*************弹出框位置************/
	Tipswindown.style.position = fix
	var bodyScrollTop = document.documentElement.scrollTop //卷曲的高度
	Tipswindown.style.left = (lookWidth-width)/2 + "px"
	if(fix == "fixed"){
		Tipswindown.style.position = "fixed"
		// 内置几种位置
		if(opsition == "middle"){
			Tipswindown.style.top = (lookHeight-height)/2 + "px"
		}
		if(opsition == "top"){

			Tipswindown.style.top = 30 + "px"	
		}
		if(opsition == "bottom"){
			Tipswindown.style.bottom = 30 + "px"	
		}
		if(typeof opsition == "object"){
			Tipswindown.style.left = opsition.x + "px"
			Tipswindown.style.top = opsition.y + "px"
		}
	}
	if(fix == "absolute"){  //绝对套绝对
		// 内置几种位置
		if(opsition == "middle"){
			Tipswindown.style.top = (lookHeight-height)/2 + bodyScrollTop + "px"
		}
		if(opsition == "top"){
			Tipswindown.style.top = 30 + bodyScrollTop + "px"	
		}
		if(opsition == "bottom"){
			Tipswindown.style.bottom =body.scrollHeight - bodyScrollTop - lookHeight + 30 + "px"	
		}
		//自定义位置
		if(typeof opsition == "object"){
			Tipswindown.style.left = opsition.x + "px"
			Tipswindown.style.top = opsition.y + bodyScrollTop + "px"
		}
	}

	/*************弹出框入场方式************/
	Tipswindown.style.marginTop = popmTop
	Tipswindown.style.opacity = 0
	shade.appendChild(Tipswindown)

	// 滑动淡入
	if(Appearance == "upward"){
		var slide = setInterval(function(){
			var O = Number(Tipswindown.style.opacity)
			var PMT = parseInt(Tipswindown.style.marginTop)
			if(O===1){
				clearInterval(slide)
				return
			}
			if(PMT===0){
				clearInterval(slide)
			}
			Tipswindown.style.opacity = O + 0.05
			Tipswindown.style.marginTop = PMT - 1 + "px"
		},time)
	}

	// 缩放
	if(Appearance == "zoom"){
		var Size = 0
		var scaling = setInterval(function(){
			var O = Number(Tipswindown.style.opacity)
			Size = Size + 0.03 + (1-Size)/20
			Tipswindown.style.transform = "scale(" + Size + ")"
			Tipswindown.style.opacity = O + 0.05
			if(O===1){
				clearInterval(scaling)
			}
			if(Size >= 1){
				clearInterval(scaling)
				return
			}
		},time)
	}

	// 插入XX
	var cha = document.createElement("span")
	cha.style.position = "absolute"
	cha.style.top = "8px";
	cha.style.right = "3px";
 	cha.style.display = "block"
	cha.style.lineHeight = "30px"
	cha.style.width = "30px"
	cha.style.height = "30px"
	cha.style.textAlign = "center"
	cha.style.cursor = "pointer"
	cha.innerHTML = "×"
	cha.style.fontSize = "20px"	
	cha.style.fontWeight = "600"
	cha.style.color = "#666"
	if(X){
		cha.style.display = "none"
	}
	Tipswindown.appendChild(cha)
	// X 的hover样式
	cha.onmouseenter = function(){
		cha.style.fontSize = "30px"
		cha.style.transition = "all 0.3s"
		cha.onmouseleave = function(){
			cha.style.fontSize = "20px"
			cha.style.transition = "all 0.3s"
		}
	}
	//点×后出去
	cha.onclick = function(){
		//滑动淡出
		shade.style.backgroundColor = "transparent"
		if(Appearance == "upward"){
			var slide = setInterval(function(){
				var O = Number(Tipswindown.style.opacity)
				var PMT = parseInt(Tipswindown.style.marginTop)
				if(O===0){
					clearInterval(slide)
					body.removeChild(shade)
					return
				}
				if(PMT===15){
					clearInterval(slide)
				}
				Tipswindown.style.opacity = O - 0.05
				Tipswindown.style.marginTop = PMT - 1 + "px"
			},time)
		}

		// 缩放
		if(Appearance == "zoom"){
			var Size = 1
			var scaling = setInterval(function(){
				var O = Number(Tipswindown.style.opacity)
				Size = Size -(0.03 + (1-Size)/20) 
				Tipswindown.style.transform = "scale(" + Size+","+Size + ")"
				Tipswindown.style.opacity = O - 0.05
				if(O===0){
					clearInterval(scaling)
				}
				if(Size >= 1){
					clearInterval(scaling)
					body.removeChild(shade)
					return
				}
			},time)
		}
	}




	/*********************插入主要内容部分********************/
	//插入标题
	var TitleP = document.createElement("p")
	TitleP.innerHTML = title
	TitleP.style.textIndent = "10px"
	/******************************************/
	// TitleP.style.height = "50px"
	TitleP.style.lineHeight = "50px"
	TitleP.style.borderBottom = "1px solid #eee"
	/******************************************/
	Tipswindown.appendChild(TitleP)



	var btns = document.createElement("div")
	btns.style.textAlign = "right"
	btns.style.height = "50px"
	btns.style.position = "absolute"
	btns.style.bottom = "0"
	btns.style.right = "0"
	btns.style.display = "block"
	btns.style.borderBottom = "1px solid #eee"
	//插入按钮
	for(var i=0;i<btn.length;i++){
		var button = document.createElement("span")
		button.innerHTML = btn[i]
		button.style.display = "inline-block"
		button.style.backgroundColor = "#eee"
		button.style.padding = "5px 20px"
		button.style.border = "none"
		button.style.borderRadius = "3px"
		button.style.margin = "10px 10px"
		button.style.color = "#e3e3e3"
		button.style.letterSpacing = "3px"
		button.style.cursor = "pointer"
		btns.appendChild(button)

		if(button.innerHTML == "确定"){
			button.style.backgroundColor = "#0095D9"
			button.className = "assure"

			button.onmouseenter = function(){
				this.style.opacity = ".85"
			}
			button.onmouseleave = function(){
				this.style.opacity = "1"
			}
		}
		if(button.innerHTML == "取消"){
			button.style.backgroundColor = "#536978"
			button.className = "cancal"

			button.onmouseenter = function(){
				this.style.opacity = ".8"
			}
			button.onmouseleave = function(){
				this.style.opacity = "1"
			}
		}
		button.onclick = function(){
			if(this.innerHTML == "确定"){
				cha.click() 
				fn()
			}
			if(this.innerHTML == "取消"){
				cha.click()
			}
		}
	}
	Tipswindown.appendChild(btns)




	//插入内容
	var contentDiv = document.createElement("div")
	contentDiv.style.padding = "8px"
	contentDiv.style.wordWrap  = "break-word"
	contentDiv.style.height = height - parseInt(TitleP.style.height) - parseInt(btns.style.height) - 18 +"px"

	//判断是str类型
	if(typeof content == "string"){
		contentDiv.innerHTML = content
	}
	//判断是obj类型(节点)
	if(content.nodeType === 1){
		contentDiv.appendChild(content)
	}
	//判断是jQuery对象
	if(typeof content === "object" && "addClass" in content){
		contentDiv.appendChild(content[0])
	}
	Tipswindown.insertBefore(contentDiv,btns)


}
		