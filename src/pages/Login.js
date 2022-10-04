import React from 'react';
import PropTypes from 'prop-types';
import './login.css';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    userName: '',
    isButtonDisabled: true,
    loading: false,
  };

  saveUser = async () => {
    const { history } = this.props; // prop do router para mudar de rota depois
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false });
    history.push('/search');
  };

  handleInputOnChange = (event) => {
    const { value } = event.target;
    this.setState({ userName: value }, this.inputValidation);
  };

  inputValidation = () => {
    const { userName } = this.state;
    const minLength = 3;
    if (userName.length < minLength) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  render() {
    const { isButtonDisabled, userName, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <Loading />
            : (
              <form>
                <h1>Login</h1>
                <div id="form-main-content">
                  <label htmlFor="login-name">
                    <input
                      name="userName"
                      id="login-name"
                      value={ userName }
                      data-testid="login-name-input"
                      placeholder="Digite seu nome:"
                      type="text"
                      onChange={ this.handleInputOnChange }
                    />
                  </label>

                  <button
                    data-testid="login-submit-button"
                    id="login-button"
                    type="button"
                    disabled={ isButtonDisabled }
                    onClick={ this.saveUser }
                  >
                    Entrar
                  </button>
                </div>
              </form>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
