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
					Icon } from 'native-base';

class CustomerDetail extends Component {

	renderActivities() {
		return (
			<List dataArray={this.props.booked_activities}
	      renderRow={(addon) =>
	        <ListItem>
	          <Body>
	          	<Text style={styles.addonHeader}>{ addon.name } </Text>
	          	<Text style={styles.addonDetails}>Price: ${ addon.price }</Text>
	        	</Body>
	        	<Right>
		          <Icon name="arrow-forward" />
		        </Right>
		      </ListItem>} 
      />
		);
	}

	render() {
		const customer = this.props.customer;
		return(
			<Container>
				<Header>
					<Body>
	          <Text style={styles.titleHeader}>{ customer.title }: { customer.first_name } { customer.last_name }</Text>
            <Text style={styles.titleSubHeader}> Paid: ${ customer.links.total_paid } of ${ customer.links.total } <Text style={{color: 'red'}}> ( ${ customer.links.balance_remaining } Left ) </Text> </Text>
          </Body>
				</Header>
				<Content>
					{this.renderActivities()}
	     	</Content>
			</Container>
		)
	}
}

const styles = {
	titleHeader: {
		marginBottom: 5
	},

	titleSubHeader: {
		fontSize: 14,
		marginBottom: 15
	},

	addonHeader: {
		color: 'green',
		marginBottom: 5
	},

	addonDetails: {
		fontSize: 14
	}
};

const mapStateToProps = state => {
	return {
		customer: state.tourParty.selectedCustomer,
		booked_activities: state.tourParty.booked_activities
	};
};

export default connect(mapStateToProps, {})(CustomerDetail);

