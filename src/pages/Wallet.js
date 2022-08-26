import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
    };
  }

  render() {
    const { emailUser } = this.props;
    const { total } = this.state;
    return (
      <div>
        <Header emailUser={ emailUser } total={ total } />
        TrybeWallet
      </div>
    );
  }
}

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
