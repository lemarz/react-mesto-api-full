class Auth {
   constructor() {
      this._baseUrl = 'http://localhost:3000'
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


}

const auth = new Auth()

export default auth
