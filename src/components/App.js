import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import PopupWithEditProfile from "./PopupWithEditProfile";
import { useEffect, useState } from "react";
import { reactApi } from "../utils/Api";
import {
  CurrentUserContext,
  startUserData,
} from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import PopupWithEditAvatar from "./PopupWithEditAvatar";
import PopupWithAddPlace from "./PopupWithAddPlace";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(startUserData);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [isDone, setIsDone] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [password, setPassword] = useState("");

  const history = useHistory();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (loggedIn) {
      reactApi
        .getUserData(token)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      reactApi
        .getAllCards(token)
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    reactApi
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    reactApi
      .deleteCard(card._id)
      .then((res) => {
        setCards((arr) => arr.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  function handleUpdateUser(data) {
    reactApi
      .setUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    reactApi
      .changeUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(input) {
    reactApi
      .addNewCard(input)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLogin(userEmail, userPassword) {
    Auth.authorize(userPassword, userEmail)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/");
          setEmail(userEmail);
        }
      })
      .catch((error) => {
        console.log(error);
        isDone(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function checkToken() {
    if (token) {
      Auth.validateToken(token)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.data.email);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleRegister() {
    if (password) {
      Auth.register(password, email)
        .then((res) => {
          if (res) {
            setIsDone(true);
            setIsInfoTooltipOpen(true);
            setEmail("");
            setPassword("");
            history.push("/sign-in");
          }
        })
        .catch((error) => {
          setIsDone(false);
          setIsInfoTooltipOpen(true);
          console.log(error);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          <Header loggedIn={loggedIn} email={email} onLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />

            <Route path={`/sign-up`}>
              <Register
                onRegister={handleRegister}
                onSetEmail={setEmail}
                onSetPassword={setPassword}
                email={email}
                password={password}
              />
            </Route>

            <Route path={`/sign-in`}>
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>

          <Footer />

          <InfoTooltip
            onClose={closeAllPopups}
            isDone={isDone}
            isOpen={isInfoTooltipOpen}
            doneText={"???? ?????????????? ????????????????????????????????????!"}
            errorText={"??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????."}
          />

          <PopupWithEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <PopupWithAddPlace
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateNewCard={handleAddPlaceSubmit}
          />

          <PopupWithEditAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm name="delete-card-confirmation" title="???? ???????????????" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
