import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Item, 
					View, 
					Text,  
					Body, 
					Content, 
					Button, Form, Label, Input } from 'native-base';
import { onCashAmountChange, onPayByCashConfirmed } from '../actions';

class PayByCash extends Component {

	onCashAmountChange(text) {
    this.props.onCashAmountChange(text);
  }

	render() {
		return(
			<Container>
				<Header>
					<View>
						<Text> Please Enter Amount You Want To Pay </Text>
					</View>
				</Header>
				<Content>
					<Form style={{ height: 250, width: 350, alignSelf: 'center' }}>
          <Item floatingLabel>
            <Label>Amount</Label>
            <Input 
              onChangeText={this.onCashAmountChange.bind(this)}
              value={this.props.cashAmount}
            />
          </Item>

          <Button primary onPress={() => this.props.onPayByCashConfirmed('Cash Payment', this.props.cashAmount, this.props.session, this.props.booking_id, this.props.selectedTraveller)}><Text> Pay </Text></Button>

        </Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		cashAmount: state.payment.cashAmount,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		booking_id: state.tourParty.selectedBooking.id,
	};
};

export default connect(mapStateToProps, { onCashAmountChange, onPayByCashConfirmed })(PayByCash);
