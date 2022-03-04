import { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onPopupClick, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    //Очистка формы
    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            button="Создать"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            onPopupClick={onPopupClick}>
            <input value={name} onChange={handleChangeName} id="placeName" type="text" name="name" placeholder="Название"
                className="popup__input popup__input_type_place" required minLength="2" maxLength="30" />
            <span id="placeName-error" className="popup__error"></span>
            <input value={link} onChange={handleChangeLink} id="link" type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_link" required />
            <span id="link-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;

