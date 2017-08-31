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
					Spinner } from 'native-base';
import { bookedActivitiesFetch, onActivityRefund } from '../actions';

class CustomerDetail extends Component {

	componentWillMount() {
		this.props.bookedActivitiesFetch(this.props.customer, this.props.session);
	}

	renderHeader() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
    	<Body>
    		<Text style={styles.titleHeader}>{ this.props.selectedTraveller.title }: { this.props.selectedTraveller.first_name } { this.props.selectedTraveller.last_name }</Text>
	      <Text style={styles.titleSubHeader}> 
	      	Paid: ${ this.props.selectedTraveller.links.total_paid } of ${ this.props.selectedTraveller.links.total } 
	      	<Text style={{color: 'red'}}> 
	      		( ${ this.props.selectedTraveller.links.balance_remaining } Left ) 
      		</Text> 
    		</Text>
    	</Body>
  	);
	}

	renderContent() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
		return (
			this.props.bookedActivities.map(addon => 
        <ListItem key={addon.id} onPress={() => this.props.onActivityRefund(addon, this.props.session, this.props.customer)}>
        	<Body>
          	<Text style={styles.addonHeader}>{addon.name}</Text>
          	<Text style={styles.addonDetails}>{addon.links.option_name}</Text>
          	<Text style={styles.addonDetails}>Price: ${addon.price}</Text>
        	</Body>
        	<Right>
	          <Icon style={{color: 'red', fontSize: 30}} name="ios-trash" />
	        </Right>
        </ListItem>
      )
		);
	}

	render() {
		return(
			<Container>
				<Header>
					{this.renderHeader()}
				</Header>
				<Content>
					{this.renderContent()}
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
		bookedActivities: state.activity.bookedActivities,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		loading: state.activity.loading,
	};
};

export default connect(mapStateToProps, { bookedActivitiesFetch, onActivityRefund })(CustomerDetail);

