import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Row, Button, Text, Content } from 'native-base';
import { onAddActivities, onAddAdhoc } from '../actions';

class AddOptions extends Component {
	render() {
    return (
      <Content>
        <Grid>
          <Row style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Button block onPress={() => this.props.onAddActivities()}>
			        <Text>Add Activities</Text>
			      </Button>
          </Row>
        </Grid>
        <Grid>
          <Row style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Button style={{ marginTop: 15 }} block onPress={() => this.props.onAddAdhoc()}>
			        <Text>Add Adhoc</Text>
			      </Button>
          </Row>
        </Grid>
      </Content>
    );
  }
}

const mapStateToProps = state => {
	return {
		days: state.activity.days,
		session: state.auth.session,
		tour_id: state.tourParty.selectedBooking.tour_id
	};
};

export default connect(mapStateToProps, { onAddActivities, onAddAdhoc })(AddOptions);