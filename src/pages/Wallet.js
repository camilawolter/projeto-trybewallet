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

  render() {
    const { emailUser } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <Header emailUser={ emailUser } />
        <WalletForm currencies={ currencies } />
        <Table />
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
