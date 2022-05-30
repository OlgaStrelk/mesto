export class UserInfo {
    private _nameElement: HTMLElement;
    private _jobElement: HTMLElement;
    private _userPic: HTMLElement;
    private _editUserPicButton: HTMLElement;
    constructor({
        profileNameSelector,
        profileJobSelector,
        userPicSelector,
        editUserPicButtonSelector,
    }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._userPic = document.querySelector(userPicSelector);
        this._editUserPicButton = document.querySelector(
            editUserPicButtonSelector
        );
    }

    _showEditButton() {
        this._editUserPicButton.style.display = "block";
    }

    _hideEditButton() {
        this._editUserPicButton.style.display = "none";
    }
    getUserInfo(): { name: string; job: string; } {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };
    }

    setUserInfo(title, job, avatar) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
        this._userPic.style.backgroundImage = `url(${avatar})`;
    }

    setEventListeners() {
        this._userPic.addEventListener("mouseover", () => {
            this._showEditButton();
        });
        this._userPic.addEventListener("mouseout", () => {
            this._hideEditButton();
        });
    }
}
