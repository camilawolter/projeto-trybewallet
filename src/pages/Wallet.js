import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      currencies: ['USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE'],
    };
  }

  totalUpdate = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const expenseValue = Number(value);
      const exchangeRate = Number(exchangeRates[currency].ask);

      return acc + (expenseValue * exchangeRate);
    }, 0);

    this.setState({
      total,
    });
  };

  render() {
    const { emailUser } = this.props;
    const { currencies, total } = this.state;
    return (
      <div>
        <Header emailUser={ emailUser } total={ total } />
        <WalletForm currencies={ currencies } totalUpdate={ this.totalUpdate } />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);
