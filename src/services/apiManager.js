let apiManagerInstance = null;

class ApiManager {
    instance = null;
    serverUrl = 'http://localhost:5000/api/'

    constructor(toBeNotified ) {
        if (!apiManagerInstance) {
            this.toNotify = toBeNotified;
            this.getUserId().then((value) => {
                console.log("Already logged in :) as id : " + value);
                this.loggedIn = true;
                this.userId = value;
                this.ready = true;
                this.notify(true);
            })
            .catch(() => {
                console.log("Not logged in");
                this.ready = true;
                this.loggedIn = false;
                this.notify(false);
            });
            apiManagerInstance = this;
        }
        return apiManagerInstance;
    }


    ready = false;
    loggedIn = false;
    userId= -1;
    userName = "";
    toNotify = null;
    toNotifyForUserId = null;

    askLoginNotifications(toBeNotified) {
        this.toNotify = toBeNotified;
    }

    askIdNotification(component) {
        this.toNotifyForUserId = component;
        if(this.userId != -1)
            this.notifyUserdId();
    }

    notify(loggedIn) {
        if(this.toNotify){
            console.log("Notifying");
            this.toNotify.setState({loggedIn: loggedIn});
            this.toNotify.setState({ready: true});
            this.toNotify.setState({username: this.userName});
        }
        else
            console.log("Not notifying")
    }

    notifyUserdId() {
        if(this.toNotifyForUserId) {
            console.log("!notifyUserdId");
            this.toNotifyForUserId.setState({currentUserId: this.userId});
        }
    }

    getUserId() {
        return new Promise((resolve, reject) => {
            fetch(this.serverUrl + 'user/id', {
                credentials: 'include',
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(response.info);
                    else{
                        this.userId = json.id;
                        this.userName = json.name;
                        this.loggedIn = true;
                        this.notifyUserdId();
                        resolve(json.id);
                    }
                }));
        });
    }

    getIACode() {
        return new Promise((resolve, reject) => {
            fetch(this.serverUrl + 'ia/get', {
                credentials: 'include',
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(response.info);
                    else
                        resolve(json.code);
                }));
        });
    }

    getPlayerList() {
        return new Promise((resolve, reject) => {
            fetch(this.serverUrl + 'users/list', {
                credentials: 'include',
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(response.info);
                    else
                        resolve(json.players);
                }));
        });
    }

    saveIACode(code){
        console.log("Saving "+ code);
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('code', code);

            fetch(this.serverUrl + 'ia/save', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(json.response.info);
                    else
                        resolve();
                }));
        });
    }

    launchFight(fightResultPage, enemyId){
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('enemyId', enemyId);

            fetch(this.serverUrl + 'fight/launch', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(json.response.info);
                    else
                        resolve(json.fightResult);
                }));
        });
    }

    login(username, password) {
        this.userName = username;
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('name', username);
            formData.append('password', password);

            fetch(this.serverUrl + 'signin', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(response.info);
                    else {
                        this.userId = json.id;
                        this.loggedIn = true;
                        this.notifyUserdId();
                        resolve(json.id);
                    }
                }));
        });
    }

    signUp(username, password) {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('name', username);
            formData.append('password', password);

            fetch(this.serverUrl + 'signup', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail') 
                        reject(json.info);
                    else
                        resolve(json.id);
                }));
        });
    }

    logOut(){
        return new Promise((resolve, reject) => {
            fetch(this.serverUrl + 'logout', {
                credentials: 'include',
            })
                .then((response) => response.json().then((json) => {
                    if (json.response === 'fail')
                        reject(response.info);
                    else{
                        resolve(json.id);
                        this.userId = -1;
                        this.loggedIn = false;
                    }
                }));
        });
    }
}

export default ApiManager