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
            getUserReaded(userReadedPageId);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUserByName?name="+userName, t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);//ulasılamaz penceresi yap
    }
    ApiAuth.GetToken(apiUser)
}

var userPage = document.getElementById("user-body-page");
var userPageLine = document.getElementById("user-body-nav-line");
function changeUBPage(x){
    userPage.style = "transform: translateX(calc( (-100% / 3) * "+x+" ));";
    userPageLine.style = "padding-left: calc("+(x)+" * 20vw + var(--nav-line-fix    ));!important";
    // userPageLine.style = "padding: 0 calc("+(2-x)+" var(--nav-size)) 0 calc("+(x)+" * var(--nav-size));!important";
    // console.log("padding: 0 "+(4-x*2)+"0vw 0 "+x*2+"0vw;!important");
}

var xxTemp = new URLSearchParams(window.location.search).get('name');
if(xxTemp != null){
    getUser(xxTemp, (userNickname)=>{history.pushState({}, null, "/user.html?name=" + xxTemp)});
}
function setParam(param){
    var x = param.split("-");
    getUser(x[0], (userNickname)=>{history.pushState({}, null, "/user/" + x[0])});
    
}


function setUserReaded(b){
    console.log(b);
    var readedPage = document.getElementById("user-body-page").children[0];
    if(userReadedPageId == 1){
        readedPage.innerHTML = "";
    } 
    userReadedPageId++;
    readedPage.innerHTML += ``
}

var userReadedPageId = 1;
function getUserReaded(userId) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            setUserReaded(b);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUserReaded?id="+userId+"&pageId="+userReadedPageId+"&pageSize=42", t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}//https://api.atduyar.com/api/users/getUserReaded?id=1&pageId=1&pageSize=3