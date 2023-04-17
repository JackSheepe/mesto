export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userInfoEl = document.querySelector(userInfoSelector);
    this._userAvatarEl = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      bio: this._userInfoEl.textContent,
      avatar: this._userAvatarEl.src,
    };
  }

  setUserInfo({ name, bio }) {
    this._userNameEl.textContent = name;
    this._userInfoEl.textContent = bio;
  }
}
