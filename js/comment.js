$(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 结束进度条
      NProgress.done();
    }, 500)
  })

$(function(){
    // 1.左侧二级菜单切换功能
    $(".lt_aside .categroy").click(function(){
        $(this).next().stop().slideToggle();
    })
    // 2.左侧侧边栏切换功能
    $(".lt_topbar .icon_menu").click(function(){
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_right").toggleClass("hidemenu");
    })
    // 3.退出功能
    $(".icon_logout").click(function(){
        $("#myModal").modal("show");
    });
    $("#logoutBtn").click(function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
})