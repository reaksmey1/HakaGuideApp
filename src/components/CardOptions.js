import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Content, 
					Card, 
					CardItem, 
					Text, 
					Body,
					Button } from 'native-base';
import { payByExistedCard, payByNewCard } from '../actions';

class CardOptions extends Component {
	
	renderContent() {
		return (
			this.props.booking.links.payment_cards_list.map(payment_card => 
				<Card key={payment_card._id}>
          <CardItem header>
            <Text>{payment_card.card_type}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {payment_card.masked_number}
              </Text>
              <Text>
                Card Holder: {payment_card.holder_name}
              </Text>
              <Text>
                Expiry: {payment_card.expired_date}
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
          	<Body>
            	<Button warning block style={{ marginTop: 10}} onPress={() => this.props.payByExistedCard(this.props.session, this.props.selectedTraveller, this.props.amount, this.props.surchargeAmount, this.props.totalAmount, payment_card._id)}><Text> PAY WITH THIS CARD </Text></Button>
          	</Body>
          </CardItem>
         </Card>
			)
		);
	}

	render(){
		return(
			<Container>
        <Content>
        	{this.renderContent()}
        	<Body>
        	<Button primary block style={{ marginTop: 10}} onPress={() => this.props.payByNewCard(this.props.session, this.props.selectedTraveller, this.props.amount, this.props.surchargeAmount, this.props.totalAmount)}><Text> ADD NEW CARD </Text></Button>
        	</Body>
        </Content>
      </Container>
		);
	}
}

const styles = {
	checkoutBtn: {
		width: 300,
		marginBottom: 10
	}
}

const mapStateToProps = state => {
	return {
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		booking: state.tourParty.selectedBooking,
		amount: state.payment.amount,
		surchargeAmount: state.payment.surchargeAmount,
		totalAmount: state.payment.totalAmount
	};
};

export default connect(mapStateToProps, { payByExistedCard, payByNewCard })(CardOptions);