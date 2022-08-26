import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';

const MIN_PASSWORD = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  isEmailValidate = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  handleClick = () => {
    const { history, loginUser } = this.props;
    const { email } = this.state;
    loginUser(email);
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const isEnabled = password.length >= MIN_PASSWORD && this.isEmailValidate(email);
    return (
      <div>
        <input
          type="text"
          value={ email }
          onChange={ (event) => this.setState({ email: event.target.value }) }
          placeholder="Email"
          data-testid="email-input"
        />
        <input
          type="password"
          value={ password }
          onChange={ (event) => this.setState({ password: event.target.value }) }
          placeholder="Senha"
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ !isEnabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
