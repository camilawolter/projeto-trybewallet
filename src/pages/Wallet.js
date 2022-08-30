import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      currencies: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
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

  async fetchCurrencies() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const coins = Object.keys(data).filter((coin) => (
      coin !== 'USDT'));
    this.setState({
      currencies: coins,
    });
  }

  render() {
    const { emailUser } = this.props;
    const { currencies, total } = this.state;
    return (
      <div>
        <Header emailUser={ emailUser } total={ total } />
        <WalletForm currencies={ currencies } totalUpdate={ this.totalUpdate } />
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
