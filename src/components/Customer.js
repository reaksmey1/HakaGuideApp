import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, Card, CardItem, Body } from 'native-base';
import { onCustomerSelected } from '../actions';

class Customer extends Component {
	onRowPress() {
		const customer = this.props.customer;
		const session = this.props.session;
		this.props.onCustomerSelected(customer, session);
	}

	render() {
		const customer = this.props.customer;

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<Card>
						<CardItem header>
			          <Text>{ customer.title }: { customer.first_name } { customer.last_name }</Text>
			        </CardItem>
			        <CardItem>
			          <Body>
			            <Text> Nationality: { customer.nationality } </Text>
			            <Text> Date Of Birth: { customer.date_of_birth } </Text>
			          </Body>
			        </CardItem>
		      </Card>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

const mapStateToProps = state => {
	return {
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { onCustomerSelected })(Customer);