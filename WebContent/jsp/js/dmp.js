var zoom = 5;
var bmap = new BMap.Map('dmp_map', {
	maxZoom: zoom
});
var obj = {};
var pt = new BMap.Point(116.395645, 39.929986);
obj.overlay = new BMapLib.TextIconOverlay(pt, "北京市");
bmap.addOverlay(obj.overlay);
bmap.centerAndZoom("北京市", zoom);

var pre_id = '';
var key = 'limei.com#';
//轮换时间
var timer = 3000;
//轮换
var auto;
//信息容器
var info = document.getElementById('dmp_map_info');
var info_text = document.getElementById('dmp_map_info_text');
var info_btn = document.getElementById('dmp_map_info_btn');
//请求地址
var url = 'http://data.limei.com/datavisual/port/ajax_get_realtime_demogram_tags.php';
//请求方法
function getInfo(res) {
	if (res.ID) {
		drawInfo(res);
	} else if (res.status) {
		//返回错误信息
		if (res.status == 'no_auth') {
			alert('没有权限');
		} else if (res.status == 'illegal_key') {
			alert('Key参数非法或错误');
		} else if (res.status == 'no_data') {
		//	alert('获取数据失败');
		};
	} else {
		//其他情况
		alert('未知错误，请刷新页面或与我司联系');
	};
};
function queryInfo() {
	var _url = url + '?pre_id=' + pre_id + '&key=' + hex_md5(key + pre_id) + '&callback=getInfo&t=' + Math.random();
	var s = document.createElement('script');
	if (document.body) {
		s.charset = 'utf-8';
		s.async = true;
		s.src = _url;
		document.body.insertBefore(s, document.body.firstChild);
	} else {
		this.addEvent(window, 'load', function () {
			s.charset = 'utf-8';
			s.async = true;
			s.src = _url;
			document.body.insertBefore(s, document.body.firstChild);
		});
	};
	
};
//绘制地图、信息
function drawInfo(res) {
	//绘制地图点
	var geo = new BMap.Geocoder();
	geo.getPoint(res.City, function(point) {
		if (point) {
			obj.overlay.setPosition(point);
			obj.overlay.setText(res.City);
			bmap.centerAndZoom(res.City, zoom);
		};
	});
	//性别
	if (res.性别 == '男') {
		info.className = 'dmp_map_info dmp_map_info_male';
	} else {
		info.className = 'dmp_map_info dmp_map_info_fmale';
	};
	//info 内容  可根据实际需求增减
	var _html = '';
	//省 市
	if (res.Province || res.City) {
		_html += '<div class="v_0"><p>' + res.Province + ' ' + res.City + '</p></div>'
	};
	//年龄
	if (res.年龄) {
		_html += '<div class="v_0"><p>年龄：' + res.年龄 + '</p></div>'
	};
	//收入
	if (res.收入) {
		_html += '<div class="v_0"><p>收入：' + res.收入 + '</p></div>'
	};
	//收入
	if (res.人生阶段) {
		_html += '<div class="v_0"><p>人生阶段：' + res.人生阶段 + '</p></div>'
	};
	//学历
	if (res.学历) {
		_html += '<div class="v_0"><p>学历：' + res.学历 + '</p></div>'
	};
	//兴趣点
	if (res.Interest) {
		_html += '<div class="v_0"><p>兴趣点：' + res.Interest + '</p></div>'
	};
	pre_id = res.max_id || '';
	//显示内容
	info_text.innerHTML = _html;
	info.style.display = 'block';
	//循环
	auto = setTimeout(queryInfo, timer);
};
//暂停，开始
info_btn.onclick = function () {
	if (this.innerHTML == '暂停') {
		this.innerHTML = '开始';
		clearTimeout(auto);
	} else {
		this.innerHTML = '暂停';
		auto = setTimeout(queryInfo, timer);
	};
};
queryInfo();
/*****模拟数据，正式发布可删除*****/
//drawInfo();
/*****模拟数据，正式发布可删除*****/
