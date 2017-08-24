import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, Card, CardItem, Body } from 'native-base';

class Customer extends Component {
	onRowPress() {
		// console.log(this.props.customer);
		Actions.customerDetail({ customer: this.props.customer });
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

export default Customer;