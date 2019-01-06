$(function(){

    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("lt_second",info);
                $("tbody").html(htmlStr);
    
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion:3,
                    // 当前页
                    currentPage:info.page,
    
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
                
            }
        })
    };

    $("#addBtn").click(function(){
        $("#sec-modal").modal("show");

        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                var htmlStr = template("btnadd",info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    });
    $(".dropdown-menu").on("click","a",function(){
        var txt = $(this).text();
        $("#dropdownText").text(txt);
    });

    $("#fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            var picurl = data.result.picAddr;
            $("#imgbox img").attr("src",picurl);
        }
    })
})