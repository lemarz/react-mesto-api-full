class Auth {
   constructor() {
      this._baseUrl = 'https://auth.nomoreparties.co'
      this._headers = {
         'Content-Type': 'application/json',
      };
   }

   _handleResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }

   register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            email, password
         })
      })
         .then(this._handleResponse)
   }

   login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            email,
            password
         })
      })
         .then(this._handleResponse)
   }

   checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'GET',
         headers: {
            ...this._headers,
            "Authorization": `Bearer ${token}`
         }
      })

         .then(this._handleResponse)
   }

}

const auth = new Auth()

export default auth