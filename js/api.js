const mainUrl = "https://api.atduyar.com/api/";

class ApiAuth {
    constructor(resultFunction = null, resultErrFunction = null) {
        this.resultFunction = resultFunction;
        this.resultErrFunction = resultErrFunction;
    }
    Login = async() => {
        const response = await fetch(mainUrl + 'auth/login', {
            method: 'POST',
            body: JSON.stringify(ApiAuth.GetUser()),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const t = await response.json();
        if(t.success == true){
            ApiAuth.SaveToken(t);
            this.resultFunction(t);
        }else {
            this.resultErrFunction(t);
        }
    }
    Register = async() => {
        const response = await fetch(mainUrl + 'auth/register', {
            method: 'POST',
            body: JSON.stringify(ApiAuth.GetUser()),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const t = await response.json();
        ApiAuth.SaveToken(t);
        this.resultFunction(t);
    }

    static SaveToken(t) {
        sessionStorage.setItem("Evrimolog-Token", JSON.stringify(t));
    }
    static SaveUser(u) {
        localStorage.setItem("Evrimolog-User", JSON.stringify(u));
    }
    static GetUser() {
        return JSON.parse(localStorage.getItem("Evrimolog-User"));
    }
    static GetToken(x) {
        var r = JSON.parse(sessionStorage.getItem("Evrimolog-Token"));
        var remainderTs = Date.parse(r.expiration) - new Date().getTime();
        if (r != null) {
            if (remainderTs < 1000) {
                x.Login();// token alır sonra x.resultFunction(r); uygular. 
                return 1;//süre geçmis
            } else {
                x.resultFunction(r);
                return 0;//Ok
            }
        } else { 
            return -1;//giris yapılmamıs
        }
    }
}