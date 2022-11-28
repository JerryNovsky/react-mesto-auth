import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ loggedIn, email, onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  return (
    <header className="header section">
      <div className="header__logo"></div>
      {isLoggedIn && (
        <div className="header__login-container">
          <p className="header__text">{email}</p>
          <Link
            to="/sign-in"
            className="header__text header__text_type_exit"
            onClick={onLogout}
          >
            Выйти
          </Link>
        </div>
      )}

      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__text">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__text">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
