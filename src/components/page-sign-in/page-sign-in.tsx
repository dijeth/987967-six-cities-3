import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../header/header.jsx';
import { Operation as UserOperation } from '../../reducers/user/operation.js';
import { Operation as DataOperation } from '../../reducers/data/operation.js';
import withPageError from '../../hocs/with-page-error/with-page-error.jsx';

type User = {
  email: string;
  password: string;
}

class PageSignIn extends React.PureComponent<{ onSubmit: (userData: User) => void }> {
  private form = React.createRef<HTMLFormElement>();

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(this.form.current);

    const userData = {
      email: String(formData.get(`email`)),
      password: String(formData.get(`password`))
    };

    this.props.onSubmit(userData);
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header isActiveLogo={false} />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" ref={this.form} onSubmit={this._handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit(userData) {
    dispatch(UserOperation.authorizeUser(userData))
      .then(() => {
        dispatch(DataOperation.updateFavorites());
      });
  }
});

export { PageSignIn };
export default withPageError(connect(null, mapDispatchToProps)(PageSignIn));
