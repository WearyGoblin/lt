

$(function(){

      var currentid;
      var isDelete;
     var currentpage = 1;
     var pageSize = 5;
     render();
    function render() {

   
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:currentpage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr = template("tpl",info);
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
                    currentpage = page;
                    render();
                }
            })
        }
    })
};


        // 事件委托
        $("tbody").on("click",".btn",function(){
            $("#usermodel").modal("show");
            currentid = $(this).parent().data("id");
            isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ;
            console.log(currentid);
            

        });
        $("#mo_confirm").click(function(){
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:currentid,
                    isDelete:isDelete
                },
                dataType:"json",
                success:function(info){
                    console.log(info);
                    
                        if(info.success){
                            $("#usermodel").modal("hide");
                            render();
                        }
                }
            })
        })
})