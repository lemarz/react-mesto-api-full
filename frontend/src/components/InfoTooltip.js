import success from '../images/success.svg'
import fail from '../images/fail.svg'

export default function InfoTooltip({isOpen, status, onClose}) {

   return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id='tooltip-popup'>
         <div className="popup__container">
            <img className='tooltip__image'
                 src={status ? success : fail}
                 alt={status ? 'Успех' : 'Неудача'}
            />
            <p className="tooltip__text">
               {status
                  ? 'Вы успешно зарегистрировались!'
                  : 'Что-то пошло не так! Попробуйте ещё раз.'
               }
            </p>
            <button className="button popup__close-button" type="button" onClick={onClose}></button>
         </div>
      </div>
   )
}