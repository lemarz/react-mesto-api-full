import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({isOpen, onClose, onConfirmDelete}) {


   return (
      <PopupWithForm name={'popup_confirm'}
                     title={'Вы уверены?'}
                     isOpen={isOpen}
                     onClose={onClose}
      >

         <button className="button popup__confirm-button"
                 type="submit"
                 style={{marginTop: '50px'}}
                 onClick={onConfirmDelete}
         >
            Да
         </button>

      </PopupWithForm>
   )
}