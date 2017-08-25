import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, View, Text, Card, CardItem, Body, Content, ListItem, CheckBox, Icon } from 'native-base';

class CustomerDetail extends Component {

	renderActivities() {
		const customer = this.props.customer;
		const addons = this.props.activities;
		return (
			addons.map(addon => 
				<ListItem key={addon.id}>
	        <Body style={{ flexDirection: 'row' }}>
	        	<Icon name="ios-arrow-down" />
	          <Text style={{ paddingLeft: 15, paddingTop: 5 }}>{ addon.name }</Text>
	        </Body>
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
					{this.renderActivities()}
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

