import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

export default function Register() {

   const history = useHistory()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
   const [infoTooltipStatus, setInfoTooltipStatus] = useState(false)

   const onCloseTooltip = () => {
      setIsInfoTooltipOpen(false)
   }

   const handleChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   const handleChangePassword = (e) => {
      setPassword(e.target.value)
   }

   const onRegister = (e) => {
      e.preventDefault()
      auth.register(email, password)
         .then(() => {
            setInfoTooltipStatus(true)
            setIsInfoTooltipOpen(true)
            history.push('/sign-in')
         })
         .catch(err => {
            console.error(err)
            setInfoTooltipStatus(false)
            setIsInfoTooltipOpen(true)
         })
   }


   return (
      <div className='register'>
         <form name="form-register" className="register__form">
            <h2 className="register__title">Регистрация</h2>
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
                    onClick={onRegister}
            >
               Зарегистрироваться
            </button>
            <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
         </form>

         <InfoTooltip
            isOpen={isInfoTooltipOpen}
            status={infoTooltipStatus}
            onClose={onCloseTooltip}/>
      </div>
   )
}