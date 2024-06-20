// 项目域名
// export const BASE_URL = 'http://tangyishijia.huizukeji.cn:81/zhihui'   
// export const BASE_URL = 'http://192.168.0.100:8080/api'
export const BASE_URL = 'https://mytapi.zsyflive.com/api'
//----------项目接口请求路径-----------
// 授权注册接口  registerUserInfo    
// 192.168.0.22:9006/api/basic/imageCarousel/list

// 获取首页轮播图
const imageCarouselList =BASE_URL + '/basic/imageCarousel/list' 
// 获取新闻接口
const newslist =BASE_URL + '/news/news/list' 
// 获取行业列表  192.168.0.22:9006/api/basic/industry/list
const industrylist =BASE_URL + '/basic/industry/list' 
// 最新新闻列表  192.168.0.22:9006/api/news/news/list/new
const newslistnew =BASE_URL + '/news/news/list/new' 
// 协会新闻列表  
const associationNewslist =BASE_URL + '/association/associationNews/list' 
// 获取市场分布 192.168.0.22:9006/api
const marketInfolist =BASE_URL + '/market/marketInfo/list'; 
// 全国展会排名  192.168.0.22:9006/api
const exhibitionInfolist =BASE_URL + '/exh/exhibitionInfo/list'; 
// 上传OSS 
const uploaduploadOSS =BASE_URL + '/upload/uploadOSS'; 
// 获取手机号
const wxUserlogin =BASE_URL + '/user/wxUser/login'; 
// 通过手机号虎丘用户信息  
const wxUserselect =BASE_URL + '/user/wxUser/select'; 
// 修改个人信息
const updateWxUser =BASE_URL + '/user/wxUser/update/wxUser'; 
// 修改企业信息  
const updatecompany=BASE_URL + '/user/company/update/company'; 
// 获取企业列表  
const companylist=BASE_URL + '/company/company/list'; 
// 获取行业的企业数量  192.168.0.22:9006/api/basic/industry/list/companyNum
const listCompanyNum=BASE_URL + '/basic/industry/list/companyNum';
// 企业入驻接口  
const publishcompany=BASE_URL + '/user/company/publish/company';
// 发布视频 
const videopublish=BASE_URL + '/video/video/publish';
// 获取自己的视频列表
const videolist=BASE_URL + '/user/company/video/list';
// 获取视频列表  192.168.0.22:9006/api
const videolistvideo=BASE_URL + '/video/video/list';
// 发布招聘 192.168.0.22:9006/api/job/jobRecruit/publish
const jobRecruitpublish=BASE_URL + '/job/jobRecruit/publish';
// 修改招聘信息  192.168.0.22:9006/api/user/company/update/recruit
const updaterecruit=BASE_URL + '/user/company/update/recruit';
// 获取企业信息 192.168.0.22:9006/api/company/company/{id}
const companycompanyId=BASE_URL + '/company/company/';
// 获取简历列表  192.168.0.22:9006/api/job/jobHunt/list
const jobHuntlist=BASE_URL + '/job/jobHunt/list';
// 上传简历信息192.168.0.22:9006/api/job/jobHunt/publish
const jobHuntpublish=BASE_URL + '/job/jobHunt/publish';
// 修改用户的简历信息  192.168.0.22:9006/api/user/wxUser/update/hunt
const updatehunt=BASE_URL + '/user/wxUser/update/hunt';
// 发布代跑  192.168.0.22:9006/api/market/marketTask/publish
const marketTaskpublish=BASE_URL + '/market/marketTask/publish';
// 获取字典  192.168.0.22:9006/api/dict/type/{dictType}
const dicttype=BASE_URL + '/dict/type/';
// 获取市场代跑任务列表
const marketTasklist=BASE_URL + '/market/marketTask/list';
// 获取新闻  
const marketnewsget=BASE_URL + '/market/marketnews/get';
// 发布供求  
const supplyNeedPublish=BASE_URL + '/need/supplyNeed/publish';
// 供求列表  192.168.0.22:9006/api/need/supplyNeed/list
const supplyNeedlist=BASE_URL + '/need/supplyNeed/list';
// 获取广告  192.168.0.22:9006/api/basic/adImage/list
const adImagelist=BASE_URL + '/basic/adImage/list';
// 删除型号 192.168.0.22:9006/api/video/video/delete/{id}
const videodelete=BASE_URL + '/video/video/delete/';
// 删除市场任务 192.168.0.22:9006/api/market/marketTask/delete/{id}
const marketTaskDelete=BASE_URL + '/market/marketTask/delete/';
// 发布的任务   192.168.0.22:9006/api/user/wxUser/task/list
const wxUsertasklist=BASE_URL + '/user/wxUser/task/list';
// 获取的客服
const customerServiceget=BASE_URL + '/basic/customerService/get';


 export default {
	 customerServiceget,
	 wxUsertasklist,
	 marketTaskDelete,
	 videodelete,
	 adImagelist,
	 supplyNeedlist,
	 supplyNeedPublish,
	 marketnewsget,
	 marketTasklist,
	 dicttype,
	 marketTaskpublish,
	 updatehunt,
	 jobHuntpublish,
	 jobHuntlist,
	 companycompanyId,
	 updaterecruit,
	 jobRecruitpublish,
	 videolistvideo,
	 videolist,
	 videopublish,
	 publishcompany,
	 listCompanyNum,
	 companylist,
	 updatecompany,
	 updateWxUser,
	 wxUserselect,
	 wxUserlogin,
	 uploaduploadOSS,
	 exhibitionInfolist,
	 marketInfolist,
 	imageCarouselList,
	newslist,industrylist,
	newslistnew,
	associationNewslist,
 }
 