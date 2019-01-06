$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dateType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("ltfirst", info);
                $("tbody").html(htmlStr);

                // 分页初始化
                $(".paginator").bootstrapPaginator({

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
    //    点击按钮添加分类
    $("#btnadd").click(function () {
        // 模态框显示
        $("#addmodal").modal("show");

    });
    $("form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });
    // $("#addbtn").click(function(){

    // })
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dateType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $("#addmodal").modal("hide");
                        currentPage = 1;
                        render();
                        $("#form").data("bootstrapValidator").resetForm(true);
                      

                }
            }

        })
    })

})