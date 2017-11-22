import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Container, 
					Header, 
					Item, 
					Input, 
					Button, 
					Text, 
					Content, 
					Body, 
					FooterTab, 
					Footer, 
					Icon, 
					Spinner, 
					List, 
					ListItem,
					Right } from 'native-base';
import { tourGroupChanged, showCustomers, onCustomerSelected, showActivitySheet, onBookingPress} from '../actions';

class TourParty extends Component {
	componentWillMount() {
    const { tourCode, session } = this.props;
    if (tourCode) {
			this.props.showCustomers({ tourCode, session });
		}
  }


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

	onShowActivitySheetPress() {
		this.props.showActivitySheet();
	}

	onTPIPress() {
		this.props.onBookingPress();
	}

	renderCustomerList(customer) {
		return(
			customer.links.travellers_list.map(traveller => 
				<ListItem key={traveller._id} onPress={() => this.props.onCustomerSelected(customer, traveller)}>
					<Body>
		      	<Text style={styles.customerHeader}>{ traveller.title }: { traveller.first_name } { traveller.last_name }</Text>
	          <Text style={styles.customerDetails}> Nationality: { traveller.nationality } </Text>
	          <Text style={styles.customerDetails}> Date Of Birth: { traveller.date_of_birth } </Text>
		  		</Body>
		  		<Right>
	          <Icon name="arrow-forward" />
	        </Right>
		  	</ListItem>
			)
		);
	}

	renderBookings() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}

		if (this.props.error) {
			return <Text style={styles.errorText}> { this.props.error } </Text>;
		}
		if (this.props.customers.length > 0) {
			return(
				this.props.customers.map(customer =>
				<List key={customer.id}>				
          <ListItem itemDivider>
          	<Body>
            	<Text>{customer.links.tour_name}</Text>
          	</Body>
          </ListItem>
          {this.renderCustomerList(customer)}                  
      	</List>
      	)
			);
		}
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
        	{this.renderBookings()}
	     </Content>
	     <Footer>
          <FooterTab>
            <Button active>
            	<Icon name="ios-subway" />
              <Text>Customers</Text>
            </Button>
            <Button onPress={this.onShowActivitySheetPress.bind(this)}>
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
	},

	customerDetails: {
		fontSize: 14
	},

	customerSubHeader: {
		fontSize: 14,
		marginBottom: 5
	},

	customerHeader: {
		color: 'green',
		marginBottom: 5
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

export default connect(mapStateToProps, { tourGroupChanged, showCustomers, onCustomerSelected, showActivitySheet, onBookingPress })(TourParty);
