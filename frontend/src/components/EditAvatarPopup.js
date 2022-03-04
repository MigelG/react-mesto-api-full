import React, { useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onPopupClick, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    //Очистка формы
    useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button="Сохранить"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            onPopupClick={onPopupClick}>
            <input ref={avatarRef} id="avatar" type="url" name="avatar" placeholder="Введите ссылку"
                className="popup__input popup__input_type_avatar" required />
            <span id="avatar-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;

