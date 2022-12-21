export default function ImagePopup({card, onClose}) {

   return (
      <div className={`popup popup_viewer ${card ? 'popup_opened' : ''}`} id="viewer-popup">
         <div className="popup__container popup__container_viewer">

            <figure className='popup__viewer-figure'>
               <img alt={card?.name} className="popup__viewer-image" src={card?.link}/>
               <figcaption className='popup__viewer-title'>{card?.name}</figcaption>
            </figure>

            <button className="button popup__close-button" type="button" onClick={onClose}></button>

         </div>
      </div>
   )
}