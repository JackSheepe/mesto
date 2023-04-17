export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: { authorization: "d64a3265-70b5-488d-a026-a7476e12b035" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: { authorization: "d64a3265-70b5-488d-a026-a7476e12b035" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserInfo({ name, bio }) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: bio,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // другие методы работы с API
}
