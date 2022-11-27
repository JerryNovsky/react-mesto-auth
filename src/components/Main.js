import React from "react";
import iconEditAvatar from '../images/edit.png';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUserData = React.useContext(CurrentUserContext);


    return (
        <main className="main">
            <section className="profile section">
                <div className="profile__container">
                    <img className="profile__avatar" alt="Аватар пользователя" src={currentUserData.avatar}  />
                    <div className="profile__cover">
                        <img className="profile__edit-avatar-icon" alt="Редактирование аватара" src={iconEditAvatar} onClick={onEditAvatar} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__button-container">
                            <h1 className="profile__name">{currentUserData.name}</h1>
                            <button onClick={onEditProfile} aria-label="Изменить данные профиля" className="profile__edit-button button"></button>
                        </div>
                        <p className="profile__description">{currentUserData.about}</p>
                    </div>
                </div>
                <button aria-label="Добавить карточку" className="profile__add-card-button button" onClick={onAddPlace}></button>
            </section>
            <section className="elements section">
                <ul className="elements__cards">
                    {cards.map((card) =>
                        <Card onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            key={card._id} {...card}
                            card={card} />
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;