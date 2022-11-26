function Locate(obj) {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + ''; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /**/
    queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(obj.citycode); /**/
    queryParams += '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent(obj.routeid); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            parse(this.responseXML.getElementsByTagName('item'), obj.routeid);
        }
    };

    xhr.send('');
}
parse = (xml, rid) => {
    let busData = {};

    busData[rid] = [];
    for(let i = 0; i < xml.length; i++){
        let businfo = {}
        for(let j = 0; j < xml[i].childNodes.length; j++){
            businfo[xml[i].childNodes[j].tagName] = xml[i].childNodes[j].textContent;
        }
        //버스객체배열에 버스위치정보객체를 푸쉬함. 하나의 키에 8개의 벨류가 들어있음
        //벨류는 좌표, 노드번호, 정류장이름, 등등 들어있음.
        //이 객체를 이용해서 지도에 레이아웃으로서 띄우면 된다.
        busData[rid].push(businfo);
    }
    getLatLng(busData, rid);
}