import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, Input, Button, Text, Content, Card, CardItem, Body, FooterTab, Footer, Icon, Spinner } from 'native-base';
import { tourGroupChanged, showCustomers, showTours} from '../actions';

class TourParty extends Component {
	onTourGroupChange(text) {
		this.props.tourGroupChanged(text);
	}

	onViewCustomerPress() {
		this.props.showCustomers();
	}

	onSearchButtonPress() {
		const { tourCode, session } = this.props;
		this.props.showTours({ tourCode, session });
	}

	renderTours() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}

		return this.props.tours.map(tour => 
			<Card key={tour.id}>
				<CardItem header>
	          <Text>Epic NZ Tour</Text>
	        </CardItem>
	        <CardItem>
	          <Body>
	            <Text> Departure Date: { tour.date } </Text>
	            <Text> Price: { tour.tour_price } </Text>
	            <Text> Direction: Auckland - Auckland </Text>
	            <Text> Tour Adviser: Maz </Text>
	          </Body>
	        </CardItem>
	        <CardItem footer>
	          <Button block style={styles.loginBtn} onPress={this.onViewCustomerPress.bind(this)}>
							<Text style={styles.loginTxt}>View Customers</Text>
						</Button>
	        </CardItem>
      </Card>
		);
	}

	render() {
		return (
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
        	<Text style={styles.errorText}> { this.props.error } </Text>
					{this.renderTours()}
	     </Content>
	     <Footer>
          <FooterTab>
            <Button active>
            	<Icon name="ios-subway" />
              <Text>Departures List</Text>
            </Button>
            <Button>
            	<Icon name="ios-american-football" />
              <Text>Activities List</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
		)
	}
}

const styles = {
	loginBtn: {
		marginTop: 40
	},

	loginTxt: {
		color: '#fff'
	},

	thumbnailStyles: {
		width: 200,
		height: 200,
		marginTop: 40
	},

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
		tours: state.tourParty.tours,
		loading: state.tourParty.loading,
		error: state.tourParty.error,
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { tourGroupChanged, showCustomers, showTours })(TourParty);
