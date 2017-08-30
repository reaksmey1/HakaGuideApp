import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, View, Text, Card, Right, CardItem, Body, Content, List, ListItem, CheckBox, Icon } from 'native-base';
import { itinerariesFetch } from '../actions';


class AddActivity extends Component {
	componentWillMount() {
		const session = this.props.session;
		const tour_id = this.props.tour_id;
		this.props.itinerariesFetch(session, tour_id);
	}

	onRowPress() {
		console.log("pressing");
	}

	renderActivities() {
		return (
			this.props.days.map(day => 
        <ListItem key={day.id} onPress={this.onRowPress.bind(this)}>
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
		const days = this.dataSource;
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
	console.log(state.tourParty.days);
	return {
		days: state.activity.days,
		session: state.auth.session,
		tour_id: state.tourParty.selectedCustomer.links.tour_id
	};
};

export default connect(mapStateToProps, { itinerariesFetch })(AddActivity);

