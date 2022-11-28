import React from "react";
import { AuthForm } from "./AuthForm";
import { Link } from "react-router-dom";

export function Register({
  onRegister,
  onSetEmail,
  onSetPassword,
  email,
  password,
}) {
  function handleChangeEmail(e) {
    onSetEmail(e.target.value);
  }

  function handleChangePassword(e) {
    onSetPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister();
  }

  return (
    <div className="authorization section">
      <AuthForm
        header="Регистрация"
        name="register"
        onSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
        email={email}
        password={password}
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
      />
      <Link to="/sign-in" className="authorization__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
