var createManager = function() {
    var id = $("#id").val();
    var pw = $("#password").val();
    var pw2 = $("#password2").val();
    var name = $("#name").val();

    if(pw != pw2) alert("비밀번호가 맞지 않습니다!");
    
    var data =  `{
        "id": ${id},
        "name": ${name},
        "password": ${pw}
    }`;

    var API_URI = 'https://zowqn67ywi.execute-api.ap-northeast-2.amazonaws.com/prod/manager';
    $.ajax(API_URI, {
        method: 'POST',
        contentType: "application/json",
        data:data,
        dataType: 'json',
        success: function (data, status, xhr) {
            alert("가입되었습니다.");
            window.location.href = "./login.html";
        },
        error: function(xhr,status,e){
            alert("error");
        }
    });
};