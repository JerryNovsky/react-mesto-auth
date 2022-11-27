import React from "react";

function PopupWithForm(props) {

    return (

        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_type_add-card">
                <button aria-label="Закрыть попап" className="popup__close-button popup__add-close-button button"
                    type="button" onClick={props.onClose}></button>
                <form className="popup__form" onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__save-button button">{props.buttonText}</button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm;