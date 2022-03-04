function PopupWithForm(props) {
    return (
        <div onClick={props.onPopupClick} className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button onClick={props.onClose} type="button" className="button popup__close-button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={props.name} className="popup__form" noValidate>
                    {props.children}
                    <button type="submit" className="popup__submit-button">{props.button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;