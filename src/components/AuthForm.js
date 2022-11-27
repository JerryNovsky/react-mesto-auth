import React from "react";

export function AuthForm({
  header,
  name,
  onSubmit,
  onChangeEmail,
  onChangePassword,
  buttonText,
  password,
  email,
}) {
  return (
    <form className="authorization" name={name} onSubmit={onSubmit}>
      <h2 className="popup__title authorization__title">{header}</h2>
      <input
        className="popup__input authorization__input"
        placeholder="Email"
        id="email-field"
        name="email"
        type="email"
        onChange={onChangeEmail}
        value={email}
        required
      />
      <input
        className="popup__input authorization__input"
        placeholder="Пароль"
        id="password-field"
        name="password"
        type="password"
        minLength="8"
        maxLength="30"
        onChange={onChangePassword}
        value={password}
        required
      />
      <button
        className="popup__save-button authorization__button"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
