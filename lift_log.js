$(window).ready(setTimeout(function() {Start()}, 500));
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

function Start() {
    
    var img_src = id+".jpg";
    document.getElementById('lift_img').src = img_src;
	document.getElementById('lift_id').append(id);
	document.getElementById('profile_id').append(id);

    invokeAPI();
}


var updateLift = function(btn_id) {
    if(btn_id=="state_btn"){
        var state = $("#state option:selected").val();
        
        if(state=="") return;

        var data =  `{
            "tags" : [
                    {
                        "tagName": "emergency_state",
                        "tagValue": ${state}
                    }
            ]
        }`;
    }
    else if(btn_id=="floor_btn"){
        var floor = $("#floor option:selected").val();
        
        if(floor=="") return;

        var data =  `{
            "tags" : [
                    {
                        "tagName": "nowfloor",
                        "tagValue": ${floor}
                    }
            ]
        }`;
    }
    console.log(data);

    var API_URI = 'https://zowqn67ywi.execute-api.ap-northeast-2.amazonaws.com/prod/lifts/' + id;        
    $.ajax(API_URI, {
        method: 'PUT',
        contentType: "application/json",
        data:data,
        dataType: 'json',
        success: function (data, status, xhr) {
            alert("변경되었습니다.")
        },
        error: function(xhr,status,e){
            alert("error");
        }
    });
};


var invokeAPI = function() {

    var API_URI = 'https://zowqn67ywi.execute-api.ap-northeast-2.amazonaws.com/prod/lifts/' + id;        
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",

        success: function (data, status, xhr) {

            var result = JSON.parse(data.body);
            setDataList(result.Items);
        },
        error: function(xhr,status,e){
            alert("error");
        }
    });
};


var setDataList = function(data){
    var i = 1;
    for(i=0; i<100; i++){
        if(i==0){
            document.getElementById('profile_state').append(data[i].emergency_state);
            document.getElementById('profile_floor').append(data[i].nowFloor + "층");
            document.getElementById('profile_sound').append(data[i].sound);
            document.getElementById('profile_temperature').append(data[i].temperature);
        }
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");
		var td6 = document.createElement("td");
		
		
		td1.innerText = data[i].deviceId;
        td2.innerText = data[i].emergency_state;
		td3.innerText = data[i].nowFloor;
		td4.innerText = data[i].sound;
		td5.innerText = data[i].temperature;
		td6.innerText = data[i].timestamp;
        $("#result").append(tr);
        tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		tr.append(td5);
		tr.append(td6);
    }
}