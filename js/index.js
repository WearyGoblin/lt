$(function(){

    // 左侧
    // 基于准备好的dom，初始化echarts实例
var echarts_left = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option1 = {
    // 标题
    title: {
        text: '2107年注册人数'
    },
    tooltip: {},
    // 图例
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);



    // 右侧
  var echarts_right = echarts.init(document.querySelector('.echarts_right'));

// 指定图表的配置项和数据
var option2 =  {
    title : {
        text: '热门品牌销售',
        // 副标题
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['尼阿克','阿迪','彪马','老北京','aj']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'尼阿克'},
                {value:310, name:'阿迪'},
                {value:234, name:'彪马'},
                {value:135, name:'老北京'},
                {value:1548, name:'aj'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2);
})