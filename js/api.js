class ApiAuth {
    constructor() {
        this.loginBody = null;
    }
    static Login = async() => {
        const response = await fetch('https://api.atduyar.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(loginBody);
        console.log(myJson);
    }
}