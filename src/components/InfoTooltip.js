import React from "react";
import doneIcon from "../images/Union.png";
import errorIcon from "../images/Error.png";

function InfoTooltip({ isOpen, onClose, isDone }) {
  const [isRegisterDone, setIsRegisterDone] = React.useState(false);

  React.useEffect(() => {
    setIsRegisterDone(isDone);
  }, [isDone, isOpen]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <div className="popup__form_type_infotooltip">
          <img
            className="popup__image popup__image_type_login"
            src={isRegisterDone ? doneIcon : errorIcon}
            alt={
              isRegisterDone
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так"
            }
          />
          <h2 className="popup__title_type_infotooltip">
            {isDone
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
        <button
          type="button"
          className={`popup__close-button popup__add-close-button button`}
          onClick={() => {
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
