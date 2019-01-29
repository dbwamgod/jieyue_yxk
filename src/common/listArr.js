class listArrs{
    static jbList = [
	    		{
	      			index:"1",
	      			title:'简报',
	      			// icon:require('../assets/images/setUpIcon.png'),
	      			list:[
	      				{
	      				 	index:"1-1",
	      				 	textc:'全国简报',
	      				 	routes:'/saas/briefing/nationwide'
	      				},
	      				{
	      					index:"1-2",
	      					textc:'大区简报',
	      					routes:'/saas/briefing/regionEcharts'
	      				}
	      			]
	      		}
	    	]
   	static msgList = [
	      		{
	      			index:"2",
	      			title:'模板设置',
	      			// icon:require('../assets/images/setUpIcon.png'),
	      			list:[
	      				{
	      					index:"2-1",
	      					textc:'消息模板',
	      					routes:'/saas/message/msgTemplate'
	      				},
	      				{
	      					index:"2-2",
	      					textc:'脱敏规则',
	      					routes:'/saas/message/desensitization'
	      				}
	      			]
	      		},
	      		{
	      			index:"3",
	      			title:'消息调度',
	      			// icon:require('../assets/images/schedulingIcon.png'),
	      			list:[
	      				{
	      					index:"3-1",
	      					textc:'预警消息调度',
	      					routes:'/saas/message/taskList'
	      				}
	      			]
	      		},
	      		{
	      			index:"1",
	      			title:'任务列表',
	      			// icon:require('../assets/images/messageListIcon.png'),
	      			list:[
	      				{
	      					index:"1-1",
	      					textc:'手动预警任务',
	      					routes:'/saas/message/taskHand'
	      				},
	      				{
	      					index:"1-2",
	      					textc:'自动预警任务',
	      					routes:'/saas/message/taskAuto'
	      				},
	      				{
	      					index:"1-3",
	      					textc:'普通消息任务',
	      					routes:'/saas/message/customTaskList'
	      				}
	      			]
	      		}
	    	]

  static paramList = [
    {
      index: "1",
      title: '阈值补录',
      // icon:require('../assets/images/thresholdIcon.png'),
      list: [
        {
          index: "1-1",
          textc: '数据指标',
          routes: '/saas/param/dataIndicators'
        },
      ]
    },
    {
      index: "2",
      title: '数据导入',
      list: [
        {
          index: "2-1",
          textc: '员工花名册',
          routes: '/saas/param/dataUpload1'
        },
        {
          index: "2-2",
          textc: '门店销售任务',
          routes: '/saas/param/dataUpload2'
        },
        {
          index: "2-3",
          textc: '全国目标及阈值',
          routes: '/saas/param/dataUpload3'
        },
        {
          index: "2-4",
          textc: '理财产品',
          routes: '/saas/param/dataUpload4'
        },
      ]
    },
    /*{
      index: "3",
      title: '公司日历',
      list: [
        {
          index: "3-1",
          textc: '休假设置',
          routes: '/saas/param/yjMsgTemplate'
        }
      ]
    }*/
  ]

}
export default{
    listArrs
};
