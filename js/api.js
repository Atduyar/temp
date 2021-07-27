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
        const myJson = await response.json();
        this.resultFunction(myJson);
    }
}