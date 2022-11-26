var xhr = new XMLHttpRequest();//전역변수 리퀘스트 생성자 생성

let obj = {
	citycode: '',
	routeid: '',
}
function getDataFromUser() {
	let citycode = document.getElementsByClassName('city')[0].value;
	obj.citycode = citycode;
	let buscode = document.getElementsByClassName('bus')[0].value;

	let url = 'http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList'; /*URL*/

	let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + ''/*Service Key*/
	queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
	queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
	queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /**/
	queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(citycode); /**/
	queryParams += '&' + encodeURIComponent('routeNo') + '=' + encodeURIComponent(buscode); /**/

	xhr.open('GET', url + queryParams);
	xhr.send('');

	getRouteId();
}

function getRouteId() {
	let getBusInfo = new Promise((resolve, reject) => {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				return resolve(this.responseXML);//성공하면 resolve에 담아서 보내준다.
			}
		};
	})
	getBusInfo.then(
		function (result) {
			let routeid = result.getElementsByTagName('item')[0].childNodes
			for(let i = 0; i < routeid.length; i++){
				if(routeid[i].tagName == 'routeid'){
					obj.routeid = routeid[i].textContent;
					Locate(obj);
				}
			}
		}
	)
}