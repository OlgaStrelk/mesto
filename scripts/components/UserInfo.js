export class UserInfo{
    constructor( { profileNameSelector, profileJobSelector } ) {
        this._nameElement = profileNameSelector;
        this._jobElement = profileJobSelector;
        console.log(profileNameSelector)
        console.log(profileJobSelector)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
    }

    setUserInfo(title, job) {
        this._nameElement.textContent = title
        this._jobElement.textContent = job
    }
}
