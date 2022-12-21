import React from "react";
import {useState, useEffect} from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import api from "../utils/Api";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Login from "./Login";

import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

import Footer from "./Footer";
import Register from "./Register";
import auth from "../utils/Auth";


function App() {

   const [isAuth, setIsAuth] = useState(false)
   const [userEmail, setUserEmail] = useState('')

   const [initialCards, setInitialCards] = useState([])

   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
   const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
   const [currentCard, setCurrentCard] = useState(null)
   const [selectedCard, setSelectedCard] = useState(null)

   const [currentUser, setCurrentUser] = useState({})

   const history = useHistory()


   useEffect(() => {
      if (!isAuth) {
         const token = localStorage.getItem("JWT")
         token &&
         auth.checkToken(token)
            .then(res => {
               setIsAuth(true)
               setUserEmail(res.data.email)
               history.push('/')
            })
            .catch(console.error)
      }
   }, [])

   useEffect(() => {
      if (isAuth) {
         api.getInitialCards()
            .then(initialCardsData => setInitialCards(initialCardsData))
            .catch(err => console.error(err))

         api.getUserInfo()
            .then(userData => setCurrentUser(userData))
            .catch(console.error)
      }
   }, [isAuth])

   const handleCardClick = (card) => setSelectedCard(card)
   const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)
   const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)
   const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)

   const handleDeleteButtonClick = (card) => {
      setCurrentCard(card)
      setIsConfirmDeletePopupOpen(true)
   }

   const handleUpdateUser = (userInfo) => {
      api.setUserInfo(userInfo)
         .then(newUserInfo => {
            setCurrentUser(newUserInfo)
            closeAllPopups()
         })
         .catch(console.error)
   }

   const handleUpdateAvatar = (avatarUrl) => {
      api.setAvatar(avatarUrl)
         .then(newUserInfo => {
            setCurrentUser(newUserInfo)
            closeAllPopups()
         })
         .catch(console.error)
   }

   const handleAddPlaceSubmit = ({title, link}) => {
      api.addCard(title, link)
         .then(newCard => {
            setInitialCards([newCard, ...initialCards])
            closeAllPopups()
         })
         .catch(console.error)
   }


   const closeAllPopups = () => {
      setIsAddPlacePopupOpen(false)
      setIsEditAvatarPopupOpen(false)
      setIsEditProfilePopupOpen(false)
      setIsConfirmDeletePopupOpen(false)
      setSelectedCard(null)
   }


   const handleCardLike = card => {
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      isLiked
         ? api.dislikeCard(card._id)
            .then(newCard =>
               setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(console.error)

         : api.likeCard(card._id)
            .then(newCard =>
               setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(console.error)
   }

   const handleCardDelete = (e) => {
      e.preventDefault()
      api.deleteCard(currentCard)
         .then(() => {
            setInitialCards(state => state.filter(c => c._id !== currentCard._id))
            setCurrentCard(null)
            closeAllPopups()
         })
         .catch(console.error)
   }

   const handleSignOut = () => {
      localStorage.removeItem('JWT')
      setIsAuth(false)
   }


   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="page">
            <Header setIsAuth={setIsAuth}
                    userEmail={userEmail}
                    onSignOut={handleSignOut}
            />

            <Switch>

               <ProtectedRoute path={'/'}
                               exact
                               isAuth={isAuth}
                               component={Main}
                               onAddPlace={handleAddPlaceClick}
                               onEditAvatar={handleEditAvatarClick}
                               onEditProfile={handleEditProfileClick}
                               onCardClick={handleCardClick}
                               initialCards={initialCards}
                               onCardLike={handleCardLike}
                               onCardDeleteConfirm={handleDeleteButtonClick}

               />

               <Route path='/sign-in'>
                  <Login setIsAuth={setIsAuth}
                         setUserEmail={setUserEmail}/>
               </Route>

               <Route path='/sign-up'>
                  <Register/>
               </Route>


               <Route path="*">
                  {isAuth ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
               </Route>

            </Switch>

            {isAuth && <Footer/>}
         </div>


         <EditProfilePopup isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}
                           onUpdateUser={handleUpdateUser}

         />


         <AddPlacePopup isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
         />


         <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                          onClose={closeAllPopups}
                          onUpdateAvatar={handleUpdateAvatar}

         />


         <ImagePopup card={selectedCard}
                     onClose={closeAllPopups}
         />

         <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen}
                             onClose={closeAllPopups}
                             onConfirmDelete={handleCardDelete}
         />

      </CurrentUserContext.Provider>
   );
}

export default App;
