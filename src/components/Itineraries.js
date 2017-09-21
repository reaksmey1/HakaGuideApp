import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, View, Text, Card, Right, CardItem, Body, Content, List, ListItem, CheckBox, Icon } from 'native-base';
import { itinerariesFetch, onItinerarySelected } from '../actions';


class Itineraries extends Component {
	componentWillMount() {
		const session = this.props.session;
		const tour_id = this.props.tour_id;
		this.props.itinerariesFetch(session, tour_id);
	}

	renderItineraries() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
		return (
			this.props.days.map(day => 
        <ListItem key={day.id} onPress={() => this.props.onItinerarySelected(day, this.props.session)}>
        	<Body>
          	<Text>Day {day.ordinal_number}: {day.location_start} to {day.location_end}</Text>
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
					{this.renderItineraries()}
					</List>
	     	</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		days: state.activity.days,
		session: state.auth.session,
		tour_id: state.tourParty.selectedBooking.tour_id
	};
};

export default connect(mapStateToProps, { itinerariesFetch, onItinerarySelected })(Itineraries);

