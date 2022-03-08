import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import { useState, useEffect } from "react";
import * as api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  let navigate = useNavigate();

  const [token, setToken] = useState('');

  function handleQuit() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  //Переадресация пользователя
  useEffect(() => {
    loggedIn ? navigate('/') : navigate('/sign-in');
  }, [loggedIn]);

  //Запрос на регистрацию
  function onRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        handleInfoTooltipType(true);
        handleInfoTooltipOpen();
      })
      .catch(err => {
        handleInfoTooltipType(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  }

  //Запрос на авторизацию
  function onLogin(email, password, setEmail, setPassword) {
    auth.signin(email, password)
      .then(() => {
        getUserInfo();
        setEmail('');
        setPassword('');
        setLoggedIn(true);
      })
      .catch(err => {
        handleInfoTooltipType(false);
        handleInfoTooltipOpen();
        console.log(err)
      });
  }

  //Проверка токена и авторизация пользователя при монтировании
  useEffect(() => {
    getUserInfo();
  }, []);

  //Получение информации о пользователе по токену
  function getUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res.data);
            setCurrentEmail(res.data.email);
          }
        })
        .catch((res) => {
          console.log(`Что-то пошло не так: ${res.statusText}`);
        });
    }
  }

  //Получение карточек при монтировании
  useEffect(() => {
    if (loggedIn) {
      api.getCardList(token)
        .then(data => {
          setCards(data.data.reverse());
        })
        .catch((res) => {
          console.log(`Что-то пошло не так: ${res.statusText}`);
        });
    }
  }, [loggedIn, token]);

  //Функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.likeCard(card._id, isLiked ? 'DELETE' : 'PUT', token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card.id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.id));
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Функция закрытия попапа при нажатии на бэк
  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  //Состояния попапов и тултипа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipType, setIsInfoTooltipType] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsBigImagePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false);
    if (isInfoTooltipType) {
      navigate('/sign-in');
    }
  }

  function handleInfoTooltipType(type) {
    setIsInfoTooltipType(type);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsBigImagePopupOpen(false);
    setSelectedCard({});
  }

  //Обновление информации о пользователе
  function handleUpdateUser(user) {
    api.saveUserInfo(user, token)
      .then(data => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Обновление аватара
  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar, token)
      .then(data => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Добавление новой карточки
  function handleAddPlace(card) {
    api.addCard(card, token)
      .then(newCard => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Закрытие попапов на Esc
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isBigImagePopupOpen) {

      function handleEsc(event) {
        if (event.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc)

      return () => {
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isBigImagePopupOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__content'>
          <Header email={currentEmail} handleQuit={handleQuit} loggedIn={loggedIn} />

          <Routes>
            <Route path='/' element={
              <>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onImagePopup={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                />
                <Footer />
              </>
            } />

            <Route path='/sign-in'
              element={<Login onLogin={onLogin} />} />

            <Route path='/sign-up'
              element={<Register onRegister={onRegister} />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onAddPlace={handleAddPlace} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isBigImagePopupOpen}
            onPopupClick={handlePopupClick} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={handleInfoTooltipClose}
            type={isInfoTooltipType} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
