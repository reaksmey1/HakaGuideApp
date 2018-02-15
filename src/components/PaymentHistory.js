import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Container, Body, Header, Content, List, ListItem, Text, Button, Footer, FooterTab, Icon, Right, Spinner } from 'native-base';
import { fetchPaymentHistories, showCustomerDetail } from '../actions';

class PaymentHistory extends Component {
	componentWillMount() {
		this.props.fetchPaymentHistories(this.props.booking, this.props.session);
	}

	onShowCustomerDetailPress() {
		this.props.showCustomerDetail();
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
	      		( ${ this.props.selectedTraveller.links.balance_remaining } Left ) 
      		</Text> 
    		</Text>
    	</Body>
  	);
	}

	// this.props.booking.links.payments_list.map(payment => 
	// 				<ListItem key={payment._id}>
	//           <Body>
	//             <Text>{Moment(payment.created_at).format('d MMM YY')}</Text>
	//             <Text note>{payment.details}</Text>
	//           </Body>
	//           <Right>
	//           	<Body>
	//             	<Text>{payment.amount}$</Text>
	//             	<Text note>Fee : {payment.amount_surcharge? payment.amount_surcharge : "n/a"}</Text>
	//             </Body>
	//           </Right>
	//         </ListItem>

	renderContent() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }

		return (
				this.props.paymentHistories.slice(0).reverse().map(payment => 
					<ListItem key={payment._id}>
	          <Body>
	            <Text>{Moment(payment.created_at).format('D MMM YY')}</Text>
	            <Text note>{payment.details}</Text>
	          </Body>
	          <Right>
	          	<Body>
	            	<Text>{payment.amount}$</Text>
	            	<Text note>Fee : {payment.amount_surcharge? payment.amount_surcharge : "n/a"}</Text>
	            </Body>
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
            <Button onPress={this.onShowCustomerDetailPress.bind(this)}>
            	<Icon name="ios-american-football" />
              <Text>Booked Activities</Text>
            </Button>
            <Button active>
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
		loading: state.payment.loading,
		paymentHistories: state.payment.paymentHistories
	};
};

export default connect(mapStateToProps, { fetchPaymentHistories, showCustomerDetail })(PaymentHistory);