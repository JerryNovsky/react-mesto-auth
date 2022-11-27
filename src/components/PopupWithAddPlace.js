import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithAddPlace(props) {
  const nameInput = React.useRef();
  const urlInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateNewCard({
      name: nameInput.current.value,
      link: urlInput.current.value,
    });
  }

  React.useEffect(() => {
    nameInput.current.value = '';
    urlInput.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Добавить новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Добавить"
    >
      <input
        ref={nameInput}
        type="text"
        id="card-name-input"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="card-name-input-error popup__input-error"></span>
      <input
        ref={urlInput}
        type="url"
        id="url-input"
        className="popup__input popup__input_type_card-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="url-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default PopupWithAddPlace;
