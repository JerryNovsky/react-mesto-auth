import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupWithEditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUserData = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUserData.name);
    setDescription(currentUserData.about);
  }, [currentUserData, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Изменить данные профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        id="name-input"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Введите свое имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        type="text"
        id="job-input"
        value={description}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_description"
        name="job"
        placeholder="Чем вы занимаетесь?"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="job-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default PopupWithEditProfile;
