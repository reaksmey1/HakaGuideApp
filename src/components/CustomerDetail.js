import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Text, 
					Right, 
					Body, 
					Content, 
					List, 
					ListItem, 
					Icon,
					Spinner, Button, Footer, FooterTab } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { bookedActivitiesFetch, onActivityRefund, onCheckoutPress, showPaymentHistories } from '../actions';

class CustomerDetail extends Component {

	componentWillMount() {
		this.props.bookedActivitiesFetch(this.props.booking, this.props.customer, this.props.session);
	}

	renderPayButton(){
		if (this.props.selectedTraveller.links.balance_remaining > 0) {
			return <Button primary style={styles.checkoutButton} onPress={() => this.props.onCheckoutPress(this.props.session, this.props.selectedTraveller)}><Text> PAY </Text></Button>;
		}
	}

	onShowPaymentHistoriesPress() {
		this.props.showPaymentHistories();
	}

	onRefundButtonPress(addon) {
		Alert.alert(
		  'Refund Activites',
		  'Are you sure, you want to refund this activity ?',
		  [
		    {text: 'Yes', onPress: () => this.props.onActivityRefund(addon, this.props.session, this.props.customer, this.props.booking)},
		    {text: 'No'},
		  ],
		  { cancelable: false }
		)
	}

	renderHeader() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
    	<Body>
    		<Text style={styles.titleHeader}>{ this.props.selectedTraveller.title }: { this.props.selectedTraveller.first_name } { this.props.selectedTraveller.last_name }</Text>
	      <Text style={styles.titleSubHeader}> 
	      	Paid: ${ this.props.selectedTraveller.links.total_paid } of ${ this.props.selectedTraveller.links.total } 
	      	<Text style={{color: 'red'}}> 
	      		( ${ this.props.selectedTraveller.links.balance_remaining.toFixed(2) } Left ) 
      		</Text> 
    		</Text>
    		{this.renderPayButton()}
    	</Body>
  	);
	}

	renderContent() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
		return (
			this.props.bookedActivities.map(addon => 
        <ListItem key={addon.id}>
        	<Body>
          	<Text style={styles.addonHeader}>{addon.name}</Text>
          	<Text style={styles.addonDetails}>{addon.links.option_name}</Text>
          	<Text style={styles.addonDetails}>Price: ${addon.price}</Text>
        	</Body>
        	<Right>
        		<Button danger onPress={() => this.onRefundButtonPress(addon)}>
              <Icon active name="trash" />
            </Button>
	        </Right>
        </ListItem>
      )
		);
	}

	render() {
		return(
			<Container>
				<Header style={{height: 105}}>
					{this.renderHeader()}
				</Header>
				<Content>
					{this.renderContent()}
				</Content>
				<Footer>
          <FooterTab>
            <Button active>
            	<Icon name="ios-american-football" />
              <Text>Booked Activities</Text>
            </Button>
            <Button onPress={this.onShowPaymentHistoriesPress.bind(this)}>
            	<Icon name="ios-cash" />
              <Text>Payment Histories</Text>
            </Button>
          </FooterTab>
        </Footer>
			</Container>
		)
	}
}

const styles = {
	titleHeader: {
		marginBottom: 5
	},

	titleSubHeader: {
		fontSize: 14,
		marginBottom: 5
	},

	addonHeader: {
		color: 'green',
		marginBottom: 5
	},

	addonDetails: {
		fontSize: 14
	},

	checkoutButton: {
		height: 30,
		marginBottom: 5
	}
};

const mapStateToProps = state => {
	return {
		customer: state.tourParty.selectedCustomer,
		booking: state.tourParty.selectedBooking,
		bookedActivities: state.activity.bookedActivities,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		loading: state.activity.loading,
		dialogVisible: true
	};
};

export default connect(mapStateToProps, { bookedActivitiesFetch, onActivityRefund, onCheckoutPress, showPaymentHistories })(CustomerDetail);

