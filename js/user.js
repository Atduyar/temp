var apiUser = new ApiAuth();
var user;
// getUser(1)

function setUser(u){
    document.getElementById("user-name").children[0].innerHTML = u.nickname;
    document.getElementById("user-des").children[0].innerHTML = u.description || "";
    document.getElementById("user-pp").children[0].src = "https://api.atduyar.com/Images/" + u.avatarUrl;
}

function getUser(userName, fixUrl=()=>{}) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            user = b;
            fixUrl(b.nickname);
            setUser(b);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUserByName?name="+userName, t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}

var userPage = document.getElementById("user-body-page");

function changeUBPage(x){
    userPage.style = "transform: translateX(calc( (-100% / 3) * "+x+" ));";
}

var xxTemp = new URLSearchParams(window.location.search).get('name');
if(xxTemp != null){
    getUser(xxTemp, (userNickname)=>{history.pushState({}, null, "/user.html?name=" + xxTemp)});
}
function setParam(param){
    var x = param.split("-");
    getUser(x[0], (userNickname)=>{history.pushState({}, null, "/user/" + x[0])});
    
}