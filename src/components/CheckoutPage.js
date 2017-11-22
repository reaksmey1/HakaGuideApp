import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Spinner } from 'native-base';
import { showPaymentResult } from '../actions';

class CheckoutPage extends Component {

	getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	whenNavigationStateChanges(navState){
		result = this.getParameterByName('result', navState.url);
		if (result && this.props.response_status == "") {
			this.props.showPaymentResult(result, this.props.payment_session, this.props.session);
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
		response_status: state.payment.response_status,
		session: state.auth.session,
		payment_session: state.payment.payment_session,
	};
};

export default connect(mapStateToProps, { showPaymentResult })(CheckoutPage);
