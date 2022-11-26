var container = document.getElementById('map'),
	options = {
		center: new kakao.maps.LatLng(37.542009562414464, 126.74174537785197), //지도 중심좌표
		level: 6 //지도 확대
	};

var map = new kakao.maps.Map(container, options); //지도 생성

setMapType = (type) => {
	let roadmap = document.getElementById('btnRoadmap');
	let skyview = document.getElementById('btnSkyview');
	if('roadmap' === type){
		map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
		roadmap.className='selected_btn';
		skyview.className='btn';
	}
	if('skyview' === type){
		map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
		roadmap.className='btn';
		skyview.className='selected_btn';
	}
}
var mapTypes = {
    terrain : kakao.maps.MapTypeId.TERRAIN,    
    traffic :  kakao.maps.MapTypeId.TRAFFIC,
    bicycle : kakao.maps.MapTypeId.BICYCLE,
    useDistrict : kakao.maps.MapTypeId.USE_DISTRICT,
	roadview : kakao.maps.MapTypeId.ROADVIEW,
};
//싹다 갈아엎고 새로만드느 방식.
//특정 요소만 갈아 엎는 방식 x
setOverlayMapTypeId = () => {
	let traffic = document.getElementById('traffic');
	let roadview = document.getElementById('roadview');
	let terrain = document.getElementById('terrain');
	let district = document.getElementById('district');
	let bicycle = document.getElementById('bicycle');

	for (var type in mapTypes) {
		console.log(type);
        map.removeOverlayMapTypeId(mapTypes[type]);    
    }
	if(traffic.checked){
		map.addOverlayMapTypeId(mapTypes.traffic);
	}
	if(roadview.checked){
		map.addOverlayMapTypeId(mapTypes.roadview);
	}
	if(terrain.checked){
		map.addOverlayMapTypeId(mapTypes.terrain);
	}
	if(district.checked){
		map.addOverlayMapTypeId(mapTypes.useDistrict);
	}
	if(bicycle.checked){
		map.addOverlayMapTypeId(mapTypes.bicycle);
	}
}

//이전 마커를 가지는 배열
var preMarkers = [];
var preOverlay = [];

//좌표받는함수
function getLatLng(obj, key){
	console.log(obj[key]);
	//이전 마커 삭제
	for(let i = 0; i < preMarkers.length; i++){
		preMarkers[i].setMap(null);
		preOverlay[i].setMap(null);
	}
	//배열안에 있는 것들을 지도에서 없애고 배열을 비움. 빈 배열 할당하면 내용물은 자동으로 가비지 콜렉션에 의해 처리된다.
	preMarkers = [];
	preOverlay = [];
	//인자로 받아온 좌표로 마커 생성
	for(let i = 0; i < obj[key].length; i++){

		//마커 좌표 생성
		var markerPosition = new kakao.maps.LatLng(obj[key][i].gpslati, obj[key][i].gpslong)
		var marker = new kakao.maps.Marker({
			position: markerPosition
		});
		//이전 마커 배열에 넣음, 다음번에 조회할때 이 배열안에 들어있는 것들은 삭제 -> 새로 생성
		preMarkers.push(marker);
		marker.setMap(map);

		//info-window
		var content = `<div class='customMarker' onmouseenter='shit(this)' onmouseleave='fuckinghell(this)'>
							<span>${obj[key][i].nodenm}</span>
							<div class='triangleDown'></div>
							<div id='dropMenu'></div>
					   </div>`;
		var position = markerPosition;

		//인포윈도우를 생성하고 지도에 표시합니다.
		var customOverlay = new kakao.maps.CustomOverlay({
			position: position,
			content: content,
		})
		//마커와 동일.
		preOverlay.push(customOverlay);
		customOverlay.setMap(map);
	}
}

function shit(ele){
	ele.childNodes[5].style.display = 'block';
}
fuckinghell = (ele) => {
	ele.childNodes[5].style.display = 'none'
}