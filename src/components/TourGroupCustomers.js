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
					Spinner
				} from 'native-base';
import { fetchTourGroupCustomers, onTourGroupCustomerSelected } from '../actions';


class TourGroupCustomers extends Component {

	componentWillMount() {
		const session = this.props.session;
		const option = this.props.option;
		const tourCode = this.props.tourCode;
		this.props.fetchTourGroupCustomers(tourCode, option, session);
	}

	renderCustomers() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    console.log(this.props.customers);
		return (
			this.props.customers.map(customer => 
        <ListItem key={customer.id} onPress={() => this.props.onTourGroupCustomerSelected(customer.booking_id, customer.id)}>
        	<Body>
          	<Text style={styles.optionHeader}>{ customer.title }: {customer.first_name} {customer.last_name} </Text>
          	<Text style={styles.optionDetails}>{ customer.links.tour_name }</Text>
        	</Body>
        	<Right>
	          <Icon name="arrow-forward" />
	        </Right>
        </ListItem>
      )
		);
	}

	render() {
		return(
			<Container>
				<Content>
					<List>
					{this.renderCustomers()}
					</List>
	     	</Content>
			</Container>
		)
	}
}

const styles = {
	optionHeader: {
		color: 'green',
		marginBottom: 5
	},

	optionDetails: {
		fontSize: 14
	}
};

const mapStateToProps = state => {
	return {
		session: state.auth.session,
		day: state.activitySheet.selectedDay,
		customers: state.activitySheet.customers,
		loading: state.activitySheet.loading,
		tourCode: state.tourParty.tourCode,
		option: state.activitySheet.selectedOption
	};
};

export default connect(mapStateToProps, { fetchTourGroupCustomers, onTourGroupCustomerSelected })(TourGroupCustomers);

