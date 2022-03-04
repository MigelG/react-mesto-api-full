function ImagePopup(props) {

    return (
        <div onClick={props.onPopupClick} className={`popup popup_type_big-image ${props.isOpen ? "popup_opened" : ""}`} >
            <div className="popup__container popup__container_type_big-image">
                <button onClick={props.onClose} type="button" className="button popup__close-button popup__close-button_type_big-image"></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;