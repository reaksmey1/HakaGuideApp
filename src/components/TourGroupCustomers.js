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
					Icon
				} from 'native-base';
import { } from '../actions';


class TourGroupCustomers extends Component {

	renderCustomers() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }

		return (
			this.props.customers.map(customer => 
        <ListItem key={customer.id}>
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
	console.log(state);
	return {
		session: state.auth.session,
		day: state.activitySheet.selectedDay,
		customers: state.activitySheet.customers,
		loading: state.activitySheet.loading
	};
};

export default connect(mapStateToProps, {})(TourGroupCustomers);

