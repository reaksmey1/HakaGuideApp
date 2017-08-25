import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, View, Text, Card, Right, CardItem, Body, Content, List, ListItem, CheckBox, Icon } from 'native-base';

class CustomerDetail extends Component {

	renderActivities() {
		const customer = this.props.customer;
		const addons = this.props.activities;
		return (
			addons.map(addon => 
				<ListItem key={addon.id} icon>
          <Body>
          	<Text>{ addon.name } - $ { addon.price }</Text>
        	</Body>
        	<Right>
        		<Icon name = "ios-close-circle-outline" style={{ color: 'red' }} />
        	</Right>
	      </ListItem>
    	)
		);
	}

	render() {
		// console.log(this.props);
		const customer = this.props.customer;
		return(
			<Container>
				<Header>
					<Body>
	          <Text>{ customer.title }: { customer.first_name } { customer.last_name }</Text>
            <Text> Paid: $ { customer.links.total_paid } of $ { customer.links.total } ( $ { customer.links.balance_remaining } Left ) </Text>
          </Body>
				</Header>
				<Content>
					<List>
						{this.renderActivities()}
					</List>
	     	</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		customer: state.tourParty.selectedCustomer,
		activities: state.activity.activities
	};
};

export default connect(mapStateToProps, {})(CustomerDetail);

