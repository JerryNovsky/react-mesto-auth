import React from "react";
import { AuthForm } from "./AuthForm";

export function Login({ handleLogin }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <AuthForm
      header="Вход"
      name="login"
      onSubmit={handleSubmit}
      buttonText="Войти"
      email={email}
      password={password}
      onChangePassword={handleChangePassword}
      onChangeEmail={handleChangeEmail}
    />
  );
}

export default Login;
