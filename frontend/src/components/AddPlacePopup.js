import PopupWithForm from "./PopupWithForm";
import React from "react"

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

   const titleRef = React.useRef()
   const linkRef = React.useRef()

   React.useEffect(() => {
      titleRef.current.value = '';
      linkRef.current.value = '';
   }, [isOpen])

   const handleSubmit = (e) => {
      e.preventDefault()
      onAddPlace({
         title: titleRef.current.value,
         link: linkRef.current.value
      })
   }

   return (
      <PopupWithForm name={'add-popup'}
                     title={'Новое место'}
                     isOpen={isOpen}
                     onClose={onClose}
      >

         <input className="popup__input popup__input_el_title"
                id="title-input" maxLength="30"
                minLength="2"
                name="title"
                placeholder="Название"
                required
                type="text"
                ref={titleRef}/>
         <span className="popup__input-error title-input-error"></span>

         <input className="popup__input popup__input_el_link"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                ref={linkRef}/>
         <span className="popup__input-error link-input-error"></span>

         <button className="button popup__save-button"
                 type="submit"
                 onClick={handleSubmit}>
            Создать
         </button>

      </PopupWithForm>
   )
}