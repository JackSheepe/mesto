export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userInfoEl = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      bio: this._userInfoEl.textContent,
    };
  }

  setUserInfo({ name, bio }) {
    this._userNameEl.textContent = name;
    this._userInfoEl.textContent = bio;
  }
}
