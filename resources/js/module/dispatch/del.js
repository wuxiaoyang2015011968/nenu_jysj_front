$(function() {
            // 点击删除按钮弹出框出现
            $(".material a").click(function() {
                    $(".delete-box").show();
                    $(".scene").show();
                var $that = $(this);
                // 点击确认按钮触发ajax删除
                $(".confirm").on('click', function(ev) {
                    var $li = $that.parents('li');
                    var id = $that.parents('li').find('img').attr('data-id');
                    $.ajax({
                        url: "/general/material/ajax/del",
                        data: {
                            id: id
                        },
                        datatype: "json",
                        type: "POST",
                        success: function(data, textStatus) {
                            $li.remove();
                            $(".delete-box").hide();
                            $(".scene").hide();
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest);
                        }
                    });
                });
            });
             // 点击取消按钮弹出框隐藏
            $(".close").on('click', function(ev) {
                $(".delete-box").hide();
                $(".scene").hide();
                $(".material a").removeClass("color");
            }); 

            // 图片名称动态生成
            $(".material img").each(function(){
                 var title =  $(this).attr("alt");
                 $(this).after("<span>"+title+"</span>");
            });
            // 点击图片名称输入框出现
            $(".material span").click(function(){
                $(this).siblings("input").show();
                $(this).siblings("input").focus();
                $(this).hide();
            })
            // 输入框触发ajax修改名称
            $(".material input").blur(function(){
                var $that = $(this);
                var text = $that.val();
                var id = $that.siblings('img').attr('data-id');
                if(text == ""){
                    alert("输入内容不能空！")
                }else{
                    $.ajax({
                        url: "/general/material/ajax/rename",
                        data: {
                            id: id,
                            picName: text
                        },
                        datatype: "json",
                        type: "POST",
                        success: function(data, textStatus) {
                            $that.siblings("img").attr("alt",text);
                            $that.siblings("span").text(text);
                            $that.siblings("span").show();
                            $that.hide();
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert("修改名称失败！");
                            $(this).siblings("img").attr("alt", alt);
                        }
                    });
                }

            })

        });
