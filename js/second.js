$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("lt_second", info);
                $("tbody").html(htmlStr);

                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,

                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })

            }
        })
    };

    $("#addBtn").click(function () {
        $("#sec-modal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                var htmlStr = template("btnadd", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    });
    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        $("#dropdownText").text(txt);

        // 获取id
        var id = $(this).data("id");
        // 设置给隐藏域
        $('[name = "categoryId"]').val(id);
        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });


    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            var picurl = data.result.picAddr;
            $("#imgbox img").attr("src", picurl);

            // 将图片地址设置给隐藏域
            $('[name = "brandLogo"]').val(picurl);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    //    表单校验
    $("#form").bootstrapValidator({

        // 指定不校验字段
        excluded: [],

        // 图标校验
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //   校验字段
        fields: {
            
            categoryId: {
                validators: {

                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })

    // 注册表单验证成功事件
    $("#form").on('success.form.bv',function(e){
        // 阻止默认提交
          e.preventDefault();

          $.ajax({
              type:"post",
              url:"/category/addSecondCategory",
              data:$("#form").serialize(),
              dataType:"json",
              success:function(info){
                  
                  if(info.success){
                    //   关闭模态框
                    $("#sec-modal").modal("hide");
                    currentPage = 1;
                    render();

                    // 重置
                    $("#form").data("bootstrapValidator").resetForm(true);
                    // 下拉菜单 和 文件 要手动设置
                    $("#dropdown").text("请选择一级分类");
                    $("#imgbox img").attr("src","./images/none.png");
                 }
              }
          })
    })
})