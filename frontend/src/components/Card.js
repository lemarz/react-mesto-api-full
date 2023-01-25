import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDeleteConfirm}) {
   const {name, link, likes} = card
   const currentUser = useContext(CurrentUserContext)

   const isOwn = card.owner === currentUser._id;
   const isLiked = card.likes.some(i => i === currentUser._id);
   const cardLikeButtonClassName = `button element__like-button ${isLiked ? 'element__like-button_active' : ''}`

   const handleClick = () => {
      onCardClick(card)
   }

   const handleLikeClick = () => {
      onCardLike(card)
   }

   const handleDeleteClick = () => {
      onCardDeleteConfirm(card)
   }

   return (
      <article className="element">
         {isOwn && <button className="button element__delete-button"
                           type="button"
                           onClick={handleDeleteClick}
         ></button>}
         <img alt={name}
              className="element__image"
              src={link}
              onClick={handleClick}
         />
         <div className="element__description">
            <h2 className="element__title">{name}</h2>
            <div className="element__like-container">
               <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
               <p className="element__like-counter">{likes.length}</p>
            </div>
         </div>
      </article>
   )
}
