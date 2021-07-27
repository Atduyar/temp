class ApiAuth {
    constructor(loginBody = null, resultFunction = null) {
        this.loginBody = loginBody;
        this.resultFunction = resultFunction;
    }
    Login = async() => {
        console.log(this.loginBody);
        const response = await fetch('https://api.atduyar.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(this.loginBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const t = await response.json();
        ApiAuth.SaveToken(t);
        this.resultFunction(t);
    }

    static SaveToken(t) {
        sessionStorage.setItem("Evrimolog-Token", t);
    }
    static SaveUser(u) {
        localStorage.setItem("Evrimolog-User", u);
    }
    static GetUser() {
        return localStorage.getItem("Evrimolog-User");
    }
    static GetToken() {
        var r = sessionStorage.getItem("Evrimolog-Token");
        var remainderTs = Date.parse(r.expiration) - new Date().getTime();
        console.log(remainderTs);
        if (r != null) {
            if (remainderTs < 100) {
                this.resultFunction = () => { console.log("a"); return GetToken() };
                this.loginBody = GetUser();
                Login();
            } else {
                return r;
            }
        } else { //giris yapılmamıs
            return null;
        }
    }
}