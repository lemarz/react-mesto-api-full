import React, {useRef, useState} from "react";
import auth from "../utils/Auth";
import {useHistory} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

export default function Login({setIsAuth, setUserEmail}) {

   const history = useHistory()
   const formRef = useRef()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)

   const onCloseTooltip = () => {
      setIsInfoTooltipOpen(false)
   }

   const handleChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   const handleChangePassword = (e) => {
      setPassword(e.target.value)
   }

   const onLogin = (e) => {
      e.preventDefault()
      auth.login(email, password)
         .then(res => {
            setIsAuth(true)
            setUserEmail(email)
            localStorage.setItem('JWT', res.token)
            history.push('/')
         })
         .catch(err => {
            console.error(err)
            setIsInfoTooltipOpen(true)
            formRef.current.reset()
         })

   }

   return (
      <div className="register">
         <form name="form-register" className="register__form" ref={formRef}>
            <h2 className="register__title">Вход</h2>
            <input
               className="register__input"
               name="email"
               type="email"
               id="email-input"
               placeholder="Email"
               required
               minLength="6"
               maxLength="30"
               onChange={handleChangeEmail}
            />
            <input
               className="register__input"
               name="password"
               type="password"
               id="password-input"
               placeholder="Пароль"
               required
               minLength="6"
               maxLength="30"
               onChange={handleChangePassword}
            />
            <button className="button register__button"
                    type="submit"
                    onClick={onLogin}>
               Войти
            </button>
         </form>

         <InfoTooltip
            isOpen={isInfoTooltipOpen}
            status={false}
            onClose={onCloseTooltip}/>

      </div>
   )
}