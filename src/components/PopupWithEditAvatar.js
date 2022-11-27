import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithEditAvatar(props) {
  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  React.useEffect(() => {
    avatarInput.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Изменить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Изменить"
    >
      <input
        ref={avatarInput}
        type="url"
        id="avatar-input"
        className="popup__input popup__input_type_avatar-link"
        name="avatar-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default PopupWithEditAvatar;
