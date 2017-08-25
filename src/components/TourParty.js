import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, Input, Button, Text, Content, Card, CardItem, Body, FooterTab, Footer, Icon, Spinner } from 'native-base';
import { tourGroupChanged, showCustomers} from '../actions';
import Customer from './Customer';

class TourParty extends Component {
	onTourGroupChange(text) {
		this.props.tourGroupChanged(text);
	}

	onSearchButtonPress() {
		const { tourCode, session } = this.props;
		this.props.showCustomers({ tourCode, session });
	}

	viewDetail() {
		console.log("click");
	}

	renderTours() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}

		return this.props.customers.map(customer => 
			<Customer key={customer.id} customer={customer} />
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
		customers: state.tourParty.customers,
		loading: state.tourParty.loading,
		error: state.tourParty.error,
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { tourGroupChanged, showCustomers })(TourParty);
