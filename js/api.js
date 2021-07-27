const mainUrl = "https://api.atduyar.com/api/";

class ApiAuth {
    constructor(resultFunction = () => {}, resultErrFunction = () => {}) {
        this.resultFunction = resultFunction;
        this.resultErrFunction = resultErrFunction;
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
    GetMyProfil = async(rf = () => {}, ref = () => {}) => {
        try{
            const response = await fetch(mainUrl + 'users/getmyprofil', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ApiAuth.GetToken(rf, ref)
                }
            });
            const r = await response.json();
            this.resultFunction(r);
        }
        catch(err){
            this.resultErrFunction(r);
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
        var remainderTs = Date.parse(r.expiration) - new Date().getTime();
        if (r != null) {
            if (remainderTs < 1000) {
                x.Login(); // token alır sonra x.resultFunction(r); uygular. 
                return 1; //süre geçmis
            } else {
                x.resultFunction(r);
                return 0; //Ok
            }
        } else {
            return -1; //giris yapılmamıs
        }
    }
}