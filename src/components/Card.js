import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
   
    const cardDeleteButtonClassName = (
    `${isOwn ? 'button card__delete-button' : 'button card__delete-button_inactive'}`
    ); 

    const cardLikeButtonClassName = `${!isLiked ? 'button card__like-button' : 'button card__like-button_active'}`; 
    
    function handleClick() {
        onCardClick(card)
    }

    function handleDelete() {
        onCardDelete(card);
    }

    function handleLike() {
        onCardLike(card);
    }

    return (
        <li className="card">
            <img className="card__image" src={card.link} alt={card.alt} onClick={() => handleClick()} />
            <button aria-label="Удалить карточку" className={cardDeleteButtonClassName} onClick={() => handleDelete()}></button>
            <div className="card__description">
                <h3 className="card__name">{card.name}</h3>
                <div className="card__like-container">
                    <button aria-label="Мне нравится" className={cardLikeButtonClassName} onClick={() => handleLike()}></button>
                    <h3 className="card__like-quantity">{card.likes.length}</h3>
                </div>
            </div>
        </li>
    )
}

export default Card