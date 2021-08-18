var apiUser = new ApiAuth();
getUser(1)

function setUser(u){
    document.getElementById("user-name").children[0].innerHTML = u.nickname;
    document.getElementById("user-des").children[0].innerHTML = u.description || "";
}

function getUser(userId) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            setUser(b);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getmyprofil", t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}