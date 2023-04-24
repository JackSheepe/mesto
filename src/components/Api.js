export default class Api {
  constructor(options) {
    this._options = options;
    this._token = {
      authorization: "d64a3265-70b5-488d-a026-a7476e12b035",
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._token,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._token,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._token,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  likeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._token,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  unlikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._token,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  changeAvatar({ link }) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // другие методы работы с API
}
