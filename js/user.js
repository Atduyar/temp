var apiUsers = new ApiAuth();
getUsers(1)

function getUsers(userId) {
    apiUsers.resultFunction = (t) => {
        console.log(t);
        apiUsers.resultFunction = (b) => {
            console.log(b);
            setUser(b);
        }
        apiUsers.resultErrFunction = apiUsers.resultErrFunction;
        apiUsers.GetAuth("users/getmyprofil", t.token);
    }
    apiUsers.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUsers.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUsers)
}