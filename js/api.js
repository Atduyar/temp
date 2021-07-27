class ApiAuth {
    constructor(resultFunction = null) {
        this.resultFunction = resultFunction;
    }
    Login = async() => {
        const response = await fetch('https://api.atduyar.com/api/auth/login', {
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
        console.log(u);
        localStorage.setItem("Evrimolog-User", JSON.stringify(u));
    }
    static GetUser() {
        return JSON.parse(localStorage.getItem("Evrimolog-User"));
    }
    static GetToken(x) {
        var r = JSON.parse(sessionStorage.getItem("Evrimolog-Token"));
        var remainderTs = Date.parse(r.expiration) - new Date().getTime();
        console.log(remainderTs);
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