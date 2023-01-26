class Api {

   constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
   }

   _handleResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }

   _getHeaders() {
      const jwt = localStorage.getItem('JWT')
      return {
         'Authorization': `Bearer ${jwt}`,
         ...this._headers,
      };
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {headers: this._getHeaders()})
         .then(this._handleResponse);
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {headers: this._getHeaders()})
         .then(this._handleResponse)
   }

   setUserInfo(userInfo) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._getHeaders(),
         body: JSON.stringify({...userInfo}),
      }).then(this._handleResponse)
   }

   addCard(title, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: "POST",
         headers: this._getHeaders(),
         body: JSON.stringify({
            name: title,
            link: link
         }),
      }).then(this._handleResponse);
   }

   deleteCard(data) {
      return fetch(`${this._baseUrl}/cards/${data._id}`, {
         method: "DELETE",
         headers: this._getHeaders(),
      }).then(this._handleResponse)
   }

   setAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar `, {
         method: "PATCH",
         headers: this._getHeaders(),
         body: JSON.stringify({
            avatar: avatarUrl,
         }),
      }).then(this._handleResponse)
   }

   likeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "PUT",
         headers: this._getHeaders(),
      }).then(this._handleResponse);
   }

   dislikeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "DELETE",
         headers: this._getHeaders(),
      }).then(this._handleResponse);
   }


}

// * Экземпляр Api
const api = new Api({
   baseUrl: 'https://api.lastone.nomoredomains.club',
   headers: {'Content-Type': 'application/json'}
})

export default api
