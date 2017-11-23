import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Item, 
					View, 
					Text,  
					Body, 
					Content, 
					Button, Form, Label, Input, CheckBox } from 'native-base';
import { onAmountChange, onSplitPaymentConfirmed, onSurchargeAmountChange } from '../actions';

class SplitPayment extends Component {

	onAmountChange(text) {
    this.props.onAmountChange(text);
  }

  onSurchargeAmountChange(text) {
  	this.props.onSurchargeAmountChange(text);
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
            <Label>Amount Settlement</Label>
            <Input 
              onChangeText={this.onAmountChange.bind(this)}
              value={this.props.amount}
            />

          </Item>

          <Item floatingLabel>
            <Label>Amount Surcharge</Label>
            <Input 
            	onChangeText={this.onSurchargeAmountChange.bind(this)}
              value={this.props.surchargeAmount}
            />

          </Item>

          <Item floatingLabel>
            <Label>Total Amount</Label>
            <Input 
              value={this.props.totalAmount}
            />

          </Item>

          <Button primary block style={{ marginTop: 10}} onPress={() => this.props.onSplitPaymentConfirmed()}><Text> Pay </Text></Button>

        </Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		amount: state.payment.amount,
		surchargeAmount: state.payment.surchargeAmount,
		totalAmount: state.payment.totalAmount,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		booking: state.tourParty.selectedBooking
	};
};

export default connect(mapStateToProps, { onAmountChange, onSplitPaymentConfirmed, onSurchargeAmountChange })(SplitPayment);
