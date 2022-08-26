import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailUser, total } = this.props;
    return (
      <header>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default Header;
