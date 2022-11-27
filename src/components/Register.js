import React from "react";
import { AuthForm } from "./AuthForm";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

export function Register() {
  const history = useHistory();

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [isDone, setIsDone] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const onClose = () => {
    setIsInfoTooltipOpen(false);
    if (isDone) {
      history.push("/sign-in");
    }
  };

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (password) {
      auth
        .register(password, email)
        .then((res) => {
          if (res) {
            setIsDone(true);
            setIsInfoTooltipOpen(true);
            setEmail("");
            setPassword("");
          } else {
            setIsDone(false);
            setIsInfoTooltipOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={onClose}
        isDone={isDone}
      />
    </div>
  );
}

export default Register;
