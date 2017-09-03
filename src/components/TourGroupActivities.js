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
import { onActivitySelected, onTourGroupActivitySelected } from '../actions';


class TourGroupActivities extends Component {

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
        <ListItem key={activity.id} onPress={() => this.props.onTourGroupActivitySelected(activity, this.props.session)}>
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
		activities: state.activitySheet.activities,
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { onTourGroupActivitySelected })(TourGroupActivities);

