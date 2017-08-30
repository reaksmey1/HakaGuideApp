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
import { onActivitySelected } from '../actions';


class Activities extends Component {

	renderActivities() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    if (this.props.activities.length == 0) {
    	return (
    		<ListItem>
    			<Text style={{color: 'red'}}> There is no activities for this season yet ! </Text>
    		</ListItem>
  		)
    }
		return (
			this.props.activities.map(activity => 
        <ListItem key={activity.id} onPress={() => this.props.onActivitySelected(activity, this.props.booking_id, this.props.session)}>
        	<Body>
          	<Text>{ activity.name }</Text>
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
					{this.renderActivities()}
					</List>
	     	</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		activities: state.activity.activities,
		session: state.auth.session,
		booking_id: state.tourParty.selectedCustomer.booking_id
	};
};

export default connect(mapStateToProps, { onActivitySelected })(Activities);

