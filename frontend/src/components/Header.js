import {Route, Switch, Link} from "react-router-dom";

export default function Header({userEmail, onSignOut}) {

   const onClick = () => {
      onSignOut()
   }

   return (
      <header className="header">
         <Link to="/">
            <div className="header__logo"></div>
         </Link>
         <Switch>

            <Route exact path='/'>
               <div className='header__bar'>
                  <p className='header__bar_email'>{userEmail}</p>
                  <button className='button header__bar_button' onClick={onClick}>Выйти</button>
               </div>
            </Route>

            <Route path="/sign-up">
               <Link to="/sign-in">
                  <button className='button header__bar_button'>Войти</button>
               </Link>
            </Route>

            <Route>
               <Link to="/sign-up">
                  <button className='button header__bar_button'>Регистрация</button>
               </Link>
            </Route>

         </Switch>
      </header>
   )
}
