import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({
                                onEditProfile,
                                onAddPlace,
                                onEditAvatar,
                                onCardClick,
                                initialCards,
                                onCardLike,
                                onCardDeleteConfirm
                             }) {

   const currentUser = React.useContext(CurrentUserContext)


   return (
      <main className="content">
         <section className="profile">
            <div className="profile__avatar-container">
               <img alt="Аватар" className="profile__avatar" src={currentUser.avatar}
                    onClick={onEditAvatar}/>
            </div>

            <div className="profile__info">
               <h1 className="profile__name">{currentUser.name}</h1>
               <button className="button profile__edit-button" type="button" onClick={onEditProfile}/>
               <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
         </section>
         <section className="elements">

            {initialCards.map(card =>
               < Card
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDeleteConfirm={onCardDeleteConfirm}
                  key={card._id}
                  card={card}
               />
            )}

         </section>
      </main>
   )
}