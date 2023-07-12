import {Card} from '../components/Card.js';

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
      .then((res) => res.json())
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
    }).then((res) => res.json());
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
    }).then((res) => res.json());
  }


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => res.json());
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
      .then((res) => res.json())
  }

  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}`, {
      method: 'GET',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
  }
}

// console.log(api)

// console.log(api.postNewCard())
