import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

   const currentUser = useContext(CurrentUserContext)
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')

   React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, isOpen]);


   const handleChangeName = e => setName(e.target.value)

   const handleChangeDescription = e => setDescription(e.target.value)

   function handleSubmit(e) {
      e.preventDefault()
      onUpdateUser({
         name: name,
         about: description,
      });
   }

   return (
      <PopupWithForm name={'edit-popup'}
                     title={'Редактировать профиль'}
                     isOpen={isOpen}
                     onClose={onClose}
                     onSubmit={handleSubmit}
                     children=
                        {<>
                           <input className="popup__input popup__input_el_name"
                                  id="name-input"
                                  maxLength="40"
                                  minLength="2"
                                  name="name"
                                  placeholder="Имя"
                                  type="text"
                                  required
                                  value={name || ''}
                                  onChange={handleChangeName}/>
                           <span className="popup__input-error name-input-error"></span>

                           <input className="popup__input popup__input_el_description"
                                  id="description-input"
                                  maxLength="200"
                                  minLength="2"
                                  name="description" placeholder="Описание профиля"
                                  type="text"
                                  required
                                  value={description || ''}
                                  onChange={handleChangeDescription}/>
                           <span className="popup__input-error description-input-error"></span>

                           <button className="button popup__save-button" type="submit">Сохранить</button>
                        </>}
      />
   )
}