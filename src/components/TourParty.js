import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, Input, Button, Text, Content, Card, CardItem, Body, FooterTab, Footer, Icon } from 'native-base';
import { tourGroupChanged, showCustomers } from '../actions';

class TourParty extends Component {
	onTourGroupChange(text) {
		this.props.tourGroupChanged(text);
	}

	onViewCustomerPress() {
		this.props.showCustomers();
	}

	renderTours() {
		return (
			<Card>
				<CardItem header>
	          <Text>Epic NZ Tour</Text>
	        </CardItem>
	        <CardItem>
	          <Body>
	            <Text> Departure Date:  </Text>
	            <Text> Price:  </Text>
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
            <Input 
            	placeholder="Tour Group" 
            	onChangeText={this.onTourGroupChange.bind(this)}
            	value={this.props.tourCode}
          	/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content> 
					{this.renderTours()}
	     </Content>
	     <Footer>
          <FooterTab>
            <Button active>
            	<Icon name="apps" />
              <Text>Departures List</Text>
            </Button>
            <Button>
            	<Icon name="person" />
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
		tourCode: state.tourParty.tourCode
	};
};

export default connect(mapStateToProps, { tourGroupChanged, showCustomers })(TourParty);
