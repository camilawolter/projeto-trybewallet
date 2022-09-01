import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;

    let num = 0;
    if (expenses.length > 0) {
      num = expenses.reduce((acc, { value, currency, exchangeRates }) => {
        const expenseValue = Number(value);
        const exchangeRate = Number(exchangeRates[currency].ask);

        return acc + (expenseValue * exchangeRate);
      }, 0);
      return num;
    }
    return num;
  };

  render() {
    const { emailUser } = this.props;
    return (
      <header>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">{this.total().toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()),
};

Header.defaultProps = { expenses: 0 };

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
