function signin(data){
	alert('인증되었습니다!');
	var id;
	var pw;
	var inputID = document.getElementById("id").value;
	var inputPW = document.getElementById("password").value;
	
	data.forEach(function(v){
        id = v.id;
        pw = v.password;
    });
	
	if(id==inputID && pw==inputPW){
		window.location.href = "./lift_list.html";
	}
	
	
}


var invokeAPI = function() {
    var id = document.getElementById("id").value;

    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://zowqn67ywi.execute-api.ap-northeast-2.amazonaws.com/prod/manager?id='+id;               
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",

        success: function (data, status, xhr) {

            var result = JSON.parse(data.body);
            signin(result.Items);  // 성공시, 데이터 출력을 위한 함수 호출
        },
        error: function(xhr,status,e){
          //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};