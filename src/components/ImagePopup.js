import React from "react";

function ImagePopup({ card, onClose }) {

    return (

        <div className={`popup popup_type_cards ${card.name ? 'popup_opened' : ''}`}>
            <div className="popup__image">
                <button aria-label="Закрыть попап"
                    className="popup__close-button popup__cards-close-button button"
                    onClick={onClose}
                    type="button"></button>
                <img className="popup__cards-image"
                    src={card.link}
                    alt={card.name} />
                <h2 className="popup__cards-description">{card.name}</h2>
            </div>
        </div>

    )
}

export default ImagePopup;