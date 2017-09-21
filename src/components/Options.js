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
import { onOptionSelected } from '../actions';


class Options extends Component {

	renderOptions() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    if (this.props.options.length == 0) {
    	return (
    		<ListItem>
    			<Text style={{color: 'red'}}> There is no activities for this season yet ! </Text>
    		</ListItem>
  		)
    }
		return (
			this.props.options.map(option => 
        <ListItem key={option.id} onPress={() => this.props.onOptionSelected(option, this.props.day, this.props.session, this.props.customer, this.props.booking_id)}>
        	<Body>
          	<Text style={styles.optionHeader}>{ option.name } </Text>
          	<Text style={styles.optionDetails}>Price: ${ option.price }</Text>
        	</Body>
        	<Right>
	          <Icon style={{color: 'blue', fontSize: 30}} name="ios-cart" />
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
					{this.renderOptions()}
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
		options: state.activity.options,
		session: state.auth.session,
		customer: state.tourParty.selectedCustomer,
		booking_id: state.tourParty.selectedBooking.id,
		day: state.activity.selectedDay
	};
};

export default connect(mapStateToProps, { onOptionSelected })(Options);

