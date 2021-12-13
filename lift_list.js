$(window).ready(setTimeout(function() {Start()}, 500));

// API 시작
function Start() {
	
    invokeAPI();
}

var invokeAPI = function() {

    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://zowqn67ywi.execute-api.ap-northeast-2.amazonaws.com/prod/lifts';               
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",

        success: function (data, status, xhr) {

            var result = JSON.parse(data);
            setDataList(result.things);  // 성공시, 데이터 출력을 위한 함수 호출
            console.log(data);
        },
        error: function(xhr,status,e){
          //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};


// 데이터 출력을 위한 함수
var setDataList = function(data){
    // $( '#mytable > tbody').empty();
    data.forEach(function(v){
		var i = 1;
		var manager = "";
		if(v.thingName == "MyMKRWiFi1010"){
			manager = "박태호";
		}

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		
		var btn = document.createElement("button");
		btn.innerText = "상세정보"
		btn.className = 'btn btn-info btn-white';
        btn.addEventListener("click", ()=>{
            var url = "./lift_log.html?id=" + v.thingName;
            window.location.href = url;
        })
		
		var name = v.thingName + " ()"
		
		td1.innerText = v.thingName + "(" + i + "호기)";
        td2.innerText = v.thingArn;
		td3.innerText = manager;
		td4.append(btn);
        $("#result").append(tr);
        tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		i++;
    })

}