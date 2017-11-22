import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,
					Header,
					Item,
					Icon,
					Input,
					Button,
					Content,
					Footer,
					FooterTab,
					Text,
					Right,
					List,
					ListItem,
					Body,
					Spinner } from 'native-base';
import { showTourPartyInfo, 
					tourGroupChanged, 
					showItineraries, 
					onTourGroupItinerarySelected, onBookingPress } from '../actions';

class ActivitySheet extends Component {

	componentWillMount() {
    const { tourCode, session } = this.props;
		this.props.showItineraries({ tourCode, session });
  }

	onTourPartyInfoPress() {
		this.props.showTourPartyInfo();
	}

	onTourGroupChange(text) {
		this.props.tourGroupChanged(text);
	}

	onTPIPress() {
		this.props.onBookingPress();
	}

	onSearchButtonPress() {
		const { tourCode, session } = this.props;
		this.props.showItineraries({ tourCode, session });
	}

	renderItineraries() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}

		if (this.props.error) {
			return <Text style={styles.errorText}> { this.props.error } </Text>;
		}

		return (
			<List dataArray={this.props.itineraries}
	      renderRow={(day) =>
	        <ListItem onPress={() => this.props.onTourGroupItinerarySelected(day, this.props.session)}>
	        	<Body>
          	<Text>Day {day.ordinal_number}: {day.location_start} to {day.location_end}</Text>
        	</Body>
        	<Right>
	          <Icon name="arrow-forward" />
	        </Right>
	        </ListItem>
	      }>
	    </List>
    );
	}

	render() {
		return(
			<Container>
        <Header searchBar rounded>
          <Item>
          	<Icon name="ios-search" />
            <Input 
            	placeholder="Tour Group" 
            	onChangeText={this.onTourGroupChange.bind(this)}
            	onSubmitEditing={this.onSearchButtonPress.bind(this)}
            	value={this.props.tourCode}
          	/>
          	<Icon name="ios-people" />
          </Item>
          <Button transparent onPress={this.onSearchButtonPress.bind(this)}>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content> 
					{this.renderItineraries()}
	     </Content>
	     <Footer>
          <FooterTab>
            <Button onPress={this.onTourPartyInfoPress.bind(this)}>
            	<Icon name="ios-subway" />
              <Text>Customers</Text>
            </Button>
            <Button active>
            	<Icon name="ios-american-football" />
              <Text>Activities</Text>
            </Button>
            <Button onPress={this.onTPIPress.bind(this)}>
            	<Icon name="ios-paper" />
              <Text>TPI</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
		)
	}
}

const styles = {
	errorText: {
		color: 'red',
		alignSelf: 'center',
		fontSize: 18,
		marginTop: 5
	}
};

const mapStateToProps = state => {
	return {
		tourCode: state.tourParty.tourCode,
		session: state.auth.session,
		itineraries: state.activitySheet.itineraries,
		loading: state.activitySheet.loading,
	};
};

export default connect(mapStateToProps, { showTourPartyInfo, tourGroupChanged, showItineraries, onTourGroupItinerarySelected, onBookingPress })(ActivitySheet);
