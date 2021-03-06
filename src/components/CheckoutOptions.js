import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Item, 
					View, 
					Text, 
					Right, 
					Body, 
					Content, 
					List, 
					ListItem, 
					Icon,
					Spinner, Button } from 'native-base';
import { onPayFullAmountPress, onSplitPaymentPress, onPayByCashPress, onRefundPagePress, onPaymentHistoryPress } from '../actions';

class CheckoutOptions extends Component {
	render(){
		return(
			<Container>
				<Content>
					<Body>
						<Button primary style={styles.checkoutBtn} onPress={() => this.props.onSplitPaymentPress()}><Text> PAY BY CREDIT CARD </Text></Button>
						<Button warning style={styles.checkoutBtn} onPress={() => this.props.onPayByCashPress()}><Text> PAY BY CASH </Text></Button>
					</Body>
				</Content>
			</Container>
		);
	}
}

const styles = {
	checkoutBtn: {
		width: 300,
		marginBottom: 10
	}
}

const mapStateToProps = state => {
	return {
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { onPayFullAmountPress, onSplitPaymentPress, onPayByCashPress, onRefundPagePress, onPaymentHistoryPress })(CheckoutOptions);
