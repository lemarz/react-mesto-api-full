export default function PopupWithForm({name, title, children, isOpen, onClose, onSubmit}) {

   return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={name}>
         <div className="popup__container">

            <h3 className="popup__title">{title}</h3>
            <form className="popup__form" name={`${name}_form`} onSubmit={onSubmit}>
               {children}
            </form>
            <button className="button popup__close-button" type="button" onClick={onClose}></button>

         </div>
      </div>
   )
}