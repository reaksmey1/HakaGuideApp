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
import { onPayFullAmountPress, onSplitPaymentPress, onRefundPagePress } from '../actions';

class CheckoutOptions extends Component {
	render(){
		return(
			<Container>
				<Content>
					<Body>
						<Button primary style={styles.checkoutBtn} onPress={() => this.props.onPayFullAmountPress(this.props.session, this.props.selectedTraveller)}><Text> Pay Full Amount ( NZD{ this.props.selectedTraveller.links.balance_remaining } ) </Text></Button>
						<Button warning style={styles.checkoutBtn} onPress={() => this.props.onSplitPaymentPress()}><Text> Split Payment </Text></Button>
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

export default connect(mapStateToProps, { onPayFullAmountPress, onSplitPaymentPress, onRefundPagePress })(CheckoutOptions);
