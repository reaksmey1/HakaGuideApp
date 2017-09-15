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
import { onAmountChange, onSplitPaymentConfirmed } from '../actions';

class SplitPayment extends Component {

	onAmountChange(text) {
    this.props.onAmountChange(text);
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
              onChangeText={this.onAmountChange.bind(this)}
              value={this.props.amount}
            />
          </Item>

          <Button primary onPress={() => this.props.onSplitPaymentConfirmed(this.props.session, this.props.selectedTraveller, this.props.amount)}><Text> Pay </Text></Button>

        </Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		amount: state.payment.amount,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session
	};
};

export default connect(mapStateToProps, { onAmountChange, onSplitPaymentConfirmed })(SplitPayment);
