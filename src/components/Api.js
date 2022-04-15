class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  getProfile() {
      fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
      }).then(res => res)
  }
  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '78099c83-b4f6-4327-beb7-a0fa8f52d200',
    'Content-Type': 'application/json'
  }
});