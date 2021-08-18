var apiUser = new ApiAuth();
// getUser(1)
var user;
function setUser(u){
    user = u;
    document.getElementById("user-name").children[0].innerHTML = u.nickname;
    document.getElementById("user-des").children[0].innerHTML = u.description || "";
    document.getElementById("user-pp").children[0].src = "https://api.atduyar.com/Images/" + u.avatarUrl;
}

function getUser(userId) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            setUser(b);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUser?id="+userId, t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}


var xxidTemp = new URLSearchParams(window.location.search).get('id');
console.log(xxidTemp);
if(xxidTemp != null){
    getUser(xxidTemp);
    history.pushState({}, null, "/user.html?name=" + user.nickname + "&id=" + xxidTemp);
}
function setParam(param){
    var x = param.split("-");
    history.pushState({}, null, "/user/" + user.nickname + "-" + xxidTemp);
    getUser(x[x.length - 1]);
}