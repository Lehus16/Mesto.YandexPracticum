import { Card } from '../components/Card.js';

export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.autorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }

  _responseCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.autorization,
      },
    }).then((res) => this._responseCheck(res));
  }

  patchUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._responseCheck(res));
  }

  patchUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._responseCheck(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._responseCheck(res));
  }

  postNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._responseCheck(res));
  }

  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._responseCheck(res));
  }

  putCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._responseCheck(res));
  }

  deleteCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._responseCheck(res));
  }
}
