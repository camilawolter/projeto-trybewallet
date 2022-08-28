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
    const { total, currencies } = this.state;
    return (
      <div>
        <Header emailUser={ emailUser } total={ total } />
        <WalletForm currencies={ currencies } />
      </div>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Wallet);
