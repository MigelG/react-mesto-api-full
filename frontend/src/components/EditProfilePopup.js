import React, { useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onPopupClick, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            button="Сохранить"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            onPopupClick={onPopupClick}>
            <input value={name || ''} onChange={handleChangeName} id="name" type="text" name="name" placeholder="Введите имя"
                className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
            <span id="name-error" className="popup__error"></span>
            <input value={description || ''} onChange={handleChangeDescription} id="about" type="text" name="about" placeholder="Род деятельности"
                className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
            <span id="about-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;

