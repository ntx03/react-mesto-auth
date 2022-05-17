import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from '../components/EditProfilePopup';
import AddPlasePopup from './AddPlacePopup';
import EditAvararPopup from './EditAvatarPopup';
import Login from './Login';
import Register from "./Register";
import api from "../utils/api";
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/currentUserContext';
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from '../utils/auth';
import InfoTooltip from "./InfoToolTip";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [registration, setRegistration] = useState('');

  const history = useHistory();

  // проверяем токен при открытии приложения 
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setEmail(res.email);
              history.push('/');
            }
          })
          .catch((e) => console.log(e.message))
      }
    }
  }, [history])

  // получаем данные от сервера информацию о себе и карточки
  useEffect(
    () => {
      if (loggedIn) {
        api.getUserInfo()
          .then((item) => {
            setCurrentUser(item)
          })
          .catch(e => console.log(e))
        api.getInitialCards()
          .then((data) => {
            setCards(data)
          })
          .catch(err => console.log(err))
      }
    }, [loggedIn])

  // закрытие попапа по экскепу
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen ||
      isEditAvatarPopupOpen || isInfoTooltipOpen || selectedCard) {
      const closePopupEsc = (evt) => {
        if (evt.key === 'Escape') {
          document.removeEventListener('keydown', closePopupEsc);
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', closePopupEsc);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen,
    isInfoTooltipOpen, selectedCard])

  // функция установки лайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  // удаление карточки
  const handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(err));
  }

  //добавление карточки
  const handleAddPlace = (data) => {
    api.patchCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  // обработчик информации о пользователе
  const handleUpdateUser = (userData) => {
    api.patchProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }
  // обработчик информации об аватаре
  const handleUpdateAvatar = (avatar) => {
    api.newAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }
  // функция открытия попапа с аватаром
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  // функция открытия попапа с профилем
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  // функция открытия попапа с изображением
  const handleCardClick = ({ link, name, isOpen }) => {
    setSelectedCard({ link, name, isOpen: !isOpen })
  }
  // функция открытия попапа с аватаром
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  // функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({ isOpen: false })
  }

  // функция входа на страничку
  function onLogin(password, email) {
    authorize(password, email)
      .then(() => {
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setRegistration(false);
      });
  }

  // функция регистрация
  function onRegister(password, email) {
    register(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if (res) {
          setRegistration(true);
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setRegistration(false);
        setIsInfoTooltipOpen(true);
      });
  }
  // функция выход из профиля
  const exitProfile = () => {
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
    localStorage.removeItem('token');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page">
          <Header loggedIn={loggedIn} exitProfile={exitProfile} email={email} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
              onEditPopupImage={handleCardClick}></ProtectedRoute>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlasePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlase={handleAddPlace} />
        <EditAvararPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegistration={registration} textOk={"Вы успешно зарегистрировались!"} textError={"Что-то пошло не так! Попробуйте еще раз."} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
