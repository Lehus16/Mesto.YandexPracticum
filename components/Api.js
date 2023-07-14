import { Card } from '../components/Card.js';

export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.autorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.autorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  putCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }
}
