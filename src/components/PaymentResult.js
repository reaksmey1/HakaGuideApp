import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Container, Content, Spinner, Body, Button } from 'native-base';
import { backToCustomerDetail } from '../actions';

class PaymentResult extends Component {

	// componentWillMount() {
	// 	this.props.fetchPaymentResult(this.props.result, this.props.payment_session, this.props.session);
	// }

	onBackButtonPress() {
		this.props.backToCustomerDetail(this.props.selectedTraveller, this.props.session, this.props.booking_id);
	}

	renderResult() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}
		return (
			<Body>
				<Text>{this.props.response_status}</Text>
				<Button onPress={this.onBackButtonPress.bind(this)}><Text>Back</Text></Button>
			</Body>
		);
	}	

	render() {
		return (
			<Container>
				<Content>
					{this.renderResult()}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		result: state.payment.paymentResult,
		loading: state.payment.loading,
		session: state.auth.session,
		payment_session: state.payment.payment_session,
		response_status: state.payment.response_status,
		selectedTraveller: state.activity.selectedTraveller,
		booking_id: state.tourParty.selectedBooking.id,
	};
};

export default connect(mapStateToProps, { backToCustomerDetail })(PaymentResult);