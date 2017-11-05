define(["jquery"],function(require){
	return commonObj = {
        ajaxstatus:true,
        pagesize : 5,
        winH: $(window).height(),
		loadCanvas:function(){
		 var imglength = $("#productul").find("canvas").length;
            if (imglength > 0) {
                $("#productul").find("canvas").each(function () {
                    var imgSrc = $(this).data("src"); //获得canvas的src
                    var imageObj = new Image();
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc; 
                    }
                })
            }
		},
        getData: function (pagenumber) {
            $.ajax({
                type: "post",
                url: "/wxshop/static/script/test.json",
                data: {
                    page:commonObj.pagenumber,
                    row:  commonObj.pagesize, 
                },
                dataType: "json",
                success: function (result) {
                    $(".loaddiv").hide();
                    if (result.length > 0) {
                         commonObj.ajaxstatus=true;
                        commonObj.insertDiv(result); //写入html
                        commonObj.loadCanvas(); //渲染
                    }else {
                        $("#pagenumlength").val("0");
                        // alert('暂无数据');
                    }
                },
                beforeSend: function () {
                    //console.dir(323);
                    $(".loaddiv").show();
                },
                error: function () {
                    $(".loaddiv").hide();
                }
            });
 
        },
        insertDiv: function (json) {
            var $mainDiv = $("#scrollAdd");
            var html = '';
            var showlength=5;
            if(json.length<5){
                showlength=json.length;
            }

            for (var i = 0; i < showlength; i++) {              
                html += '<li><a href="#">'+
                    '<div class="triangle-topleft"></div>'+
                    '<span class="shuxing" data_url="productinfo.html">专属</span>'+
                    '<div class="leftimages fl"><canvas data-src="images/product/pro1.jpg" ></canvas></div>'+
                     '<div class="productcontent fr">'+
                         '<p class="ptitle pl10">芒果干</p>'+
                          '<p class="pdes pl10">女神蜜饯果脯东南亚零食酸甜水果干片类休闲食品</p>'+
                          '<p class="pprice pl10">价格：<span class="green">￥23.9</span></p>'+
                    '</div></a></li>'+
                    '<li><a href="#">'+
                    '<div class="triangle-topleft rexiao"></div>'+
                    '<span class="shuxing" data_url="productinfo.html">热销</span>'+
                    '<div class="leftimages fl"><canvas data-src="images/product/pro2.jpg" ></canvas></div>'+
                     '<div class="productcontent fr">'+
                         '<p class="ptitle pl10">鸡蛋干</p>'+
                          '<p class="pdes pl10">小包装四川特产香辣味豆腐干小吃零食麻辣休闲食品</p>'+
                          '<p class="pprice pl10">价格：<span class="green">￥17</span></p>'+
                    '</div></a></li>'+
                    '<li><a href="#">'+
                    '<div class="triangle-topleft xiangou"></div>'+
                    '<span class="shuxing" data_url="productinfo.html">限购</span>'+
                    '<div class="leftimages fl"><canvas data-src="images/product/pro3.jpg" ></canvas></div>'+
                     '<div class="productcontent fr">'+
                         '<p class="ptitle pl10">靖江猪肉脯</p>'+
                          '<p class="pdes pl10">特产肉类零食小吃休闲干肉脯麻辣食品小包装</p>'+
                          '<p class="pprice pl10">价格：<span class="green">￥38</span></p>'+
                    '</div></a></li>';
            }
            $mainDiv.append(html);
        },
        scrollHandler: function () {
            var pageH = $(document).height(); //文档高度
            var scrollT = $(window).scrollTop(); //滚动条top   
             var winheight=$(window).height();  //浏览器窗口高度
           if (parseInt(scrollT)+parseInt(winheight)+50>=parseInt(pageH) && commonObj.ajaxstatus) {
                if($("#pagenumlength").val()=="1"){
               commonObj.ajaxstatus=false;
               commonObj.currentpage++;
               commonObj.getData(commonObj.currentpage)
            }else{
                return
            }
            }
        },
        addnums:function(){
            var number=parseInt($(this).prev().val());
            if(!isNaN(number)){
                if(number<1){
                    number=1;
                }else{
                  number+=1; 
                }
            }else{
                number=1

            }
           $(this).prev().val(number);
        },
        reducenums:function(){
            var number=parseInt($(this).next().val());
            if(!isNaN(number)){
                if(number<2){
                    number=1;
                }else{
                    number-=1;
                }
            }else{
                number=1
            }
            $(this).next().val(number);
        },
        addcatAnimate:function(e){
            e.stopPropagation(); //阻止事件分派到其他节点
            var number=Number($("#cartnumbers").val());
            var productimg=$("#productimg"),
               imgsrc=$("#productimg").children("img").attr("src"),
                x = productimg.offset().left + 30,
                y = productimg.offset().top -10,
                X = $("#n_2").offset().left,
                Y = $("#n_2").offset().top;
                if ($('#flydiv').length <= 0) {
                    $('body').append('<div id="flydiv"><img src="'+imgsrc+'" width="50" height="50" /></div');
                };
                var $obj=$('#flydiv');
                if(!$obj.is(':animated')){
                    $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
                        $obj.stop(false, false).animate({'top': Y-20,'opacity':0},1000,function(){
                            $obj.fadeOut(300,function(){
                                $obj.remove();  
                                var num=Number($(".cartnums").text());
                                $(".cartnums").text(num+number);
                                $(".cartnums").show();
                            });
                        });
                    }); 
                };

        },
        set_address:function(){
                    var addr_id = $("input[name='address_options']:checked").val();
                    if(addr_id == 0)
                    {

                            $('#address_form').show();
                    }
                    else
                    {
                            $('#address_form').hide();

                    }
        },
        address_huitian:function(){
            var name=$(this).parents("li").find(".name").text();
            var phone=$(this).parents("li").find(".phone").text();
            var allAddress=$(this).parents("li").find(".all-address").html();
            var addressArray = allAddress.split("&nbsp;"); //分割
            var s1=addressArray[0]; //市
            var s2=addressArray[1];  //地区类别
            var s3=addressArray[2];  //区或县
            var addressinfo=addressArray[3]; //具体地址
            $("#consignee").val(name);
            $("#s1").val(s1);
            $("#s1").trigger("change"); //规定#s1对象要触发的事件
            $("#s2").val(s2);
           $("#s2").trigger("change");
            $("#s3").val(s3);
            $("#address").val(addressinfo);
            $("#phone_mob").val(phone);
        },
        addAddresslist:function(){
            var name=$("#consignee").val();
            var phone=$("#phone_mob").val();
            var s1=$("#s1").val();
            var s2=$("#s2").val();
            var s3=$("#s3").val();
            var address=$("#address").val();
            var addressliHtml='<li>'+
                  '<p><em class="name">'+name+'</em>(<em class="phone">'+phone+'</em>)</p>'+
                   ' <p class="all-address">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+'&nbsp;'+address+'</p>'+
                    '<p class="new_line"><br></p>'+
                    '<p class="address_action">'+
                        '<span class="edit"><a href="#"><i class="edit_icon"></i>编辑</a></span>'+
                        '<span><a href="#" class="delete float_none"><i class="delete_icon"></i>删除</a></span>'+
                    '</p>'+
                '</li>';
            if($.trim(name)!="" && $.trim(phone)!="" && $.trim(s1)!="" && $.trim(address)!=""){   
                $("#addresslist").append(addressliHtml);
                commonObj.clearAddress(); //避免地址重复渲染
            }


        },
        clearAddress:function(){
            $("#consignee").val("");
            $("#phone_mob").val("");
            $("#s1").val("");
            $("#s2").val("");
            $("#s3").val("");
            $("#address").val("");
        },
        loginin:function(){
            var name=$('#login_userName').val();
            var password=$("#login_Password").val();
            var flag=true;
            if($.trim(name) != ""){ //trim()删除字符串开始和结尾的空格
                var reg=/^1[3|4|5|7|8]\d{9}$/; //电话号码的正则表达式
                if(reg.test(name)){ //检测登录名是否匹配电话号码
                    $("#login_userName").next("s").hide();
                }else{
                    $("#login_userName").next("s").css({"display":"inline-block"});
                    flag=false;
                    return false;
                }
            }else{
                $("#login_userName").next("s").css({"display":"inline-block"});
                    flag=false;
                    return false;
            }

            if($.trim(password)==""){
                $("#login_Password").next("s").css({"display":"inline-block"});
                    flag=false;
                    return false;
            }else{
                $("#login_Password").next("s").hide();
            }

            if(flag) {
                alert("提交登录");
            }
        }
	}
})