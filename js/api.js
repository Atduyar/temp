const mainUrl = "https://api.atduyar.com/api/";

class ApiAuth {
    constructor(resultFunction = () => {}, resultErrFunction = () => {}, resultUnAuthFunction = () => {}) {
        this.resultFunction = resultFunction;
        this.resultErrFunction = resultErrFunction;
        this.resultUnAuthFunction = resultUnAuthFunction;
    }
    Login = async(user = undefined) => {
        const response = await fetch(mainUrl + 'auth/login', {
            method: 'POST',
            body: JSON.stringify((user == undefined) ? ApiAuth.GetUser() : user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const t = await response.json();
        if (t.success == undefined || t.success) {
            ApiAuth.SaveToken(t);
            this.resultFunction(t);
        } else {
            this.resultErrFunction(t);
        }
    }
    Register = async(user) => {
        const response = await fetch(mainUrl + 'auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const t = await response.json();
        if (t.success == undefined) {
            ApiAuth.SaveToken(t);
            this.resultFunction(t);
        } else {
            this.resultErrFunction(t);
        }
    }
    GetMyProfil = async(t) => {
        try {
            const response = await fetch(mainUrl + 'users/getmyprofil', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + t
                }
            });
            const r = await response.json();
            this.resultFunction(r);
        } catch (err) {
            this.resultErrFunction(err);
        }
    }
    Post = async(url, b) => {
        try {
            const response = await fetch(mainUrl + url, {
                method: 'POST',
                body: JSON.stringify(b),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const r = await response.json();
            const rh = await response.headers();
            if (r.success != undefined && t.success == false) {
                this.resultErrFunction(r, rh);
            } else {
                this.resultFunction(r, rh);
            }
        } catch (err) {
            this.resultErrFunction(err);
        }
    }
    PostAuth = async(url, t, b) => {
        try {
            const response = await fetch(mainUrl + url, {
                method: 'POST',
                body: JSON.stringify(b),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + t
                }
            });
            const r = await response.json();
            const rh = await response.headers();
            if (r.success != undefined && t.success == false) {
                this.resultErrFunction(r, rh);
            } else {
                this.resultFunction(r, rh);
            }
        } catch (err) {
            this.resultErrFunction(err);
        }
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
        if (r != null) {
            var remainderTs = Date.parse(r.expiration) - new Date().getTime();
            if (remainderTs < 1000) {
                x.Login(); // token alır sonra x.resultFunction(r); uygular. 
                return 1; // süre geçmis
            } else {
                x.resultFunction(r);
                return 0; // Ok
            }
        } else {
            if (localStorage.getItem("Evrimolog-User") != undefined) {
                x.Login(); // token alır sonra x.resultFunction(r); uygular. 
                return 0; // yeniden giris yapılmıs
            } else {
                x.resultUnAuthFunction(r);
                return -1; // giris yapılmamıs
            }
        }
    }
}