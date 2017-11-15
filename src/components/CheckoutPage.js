import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Spinner } from 'native-base';
import { backToCustomerDetail } from '../actions';

class CheckoutPage extends Component {
	whenNavigationStateChanges(navState){
		if (navState.title == "" && navState.url.indexOf("update_from_app") > 0) {
			this.props.backToCustomerDetail();
		}
  }

	renderPage() {
		if (this.props.loading) {
      return <Content><Spinner size='large' /></Content>;
    }
    return (
    	<WebView
        source={{uri: this.props.payment_page_url}}
        style={{marginTop: 10}}
        onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
      />
  	);
	}

	render() {
		return (
			<Container>
			{this.renderPage()}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		error: state.payment.error,
		payment_page_url: state.payment.payment_page_url,
		loading: state.payment.loading,
	};
};

export default connect(mapStateToProps, { backToCustomerDetail })(CheckoutPage);
