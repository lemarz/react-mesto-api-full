class Api {

   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _handleResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {headers: this._headers}).then(this._handleResponse);
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {headers: this._headers}).then(this._handleResponse)
   }

   setUserInfo(userInfo) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({...userInfo}),
      }).then(this._handleResponse)
   }

   addCard(title, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            name: title,
            link: link
         }),
      }).then(this._handleResponse);
   }

   deleteCard(data) {
      return fetch(`${this._baseUrl}/cards/${data._id}`, {
         method: "DELETE",
         headers: this._headers,
      }).then(this._handleResponse)
   }

   setAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar `, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            avatar: avatarUrl,
         }),
      }).then(this._handleResponse)
   }

   likeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "PUT",
         headers: this._headers,
      }).then(this._handleResponse);
   }

   dislikeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "DELETE",
         headers: this._headers,
      }).then(this._handleResponse);
   }
}

// * Экземпляр Api
const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
   headers: {
      authorization: '163484ca-6b36-4c0d-b70e-87e23e1f729b',
      'Content-Type': 'application/json'
   }
})

export default api