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
import { onAdHocAmountChange, onAdHocNameChange, onAddAdhocSelected } from '../actions';

class AdHoc extends Component {

  onAdHocAmountChange(text) {
    this.props.onAdHocAmountChange(text);
  }

  onAdHocNameChange(text) {
    this.props.onAdHocNameChange(text);
  }

  render() {
    return(
      <Container>
        <Content>
          <Form style={{ height: 250, width: 350, alignSelf: 'center' }}>
          <Item floatingLabel>
            <Label>Reference</Label>
            <Input 
              onChangeText={this.onAdHocNameChange.bind(this)}
              value={this.props.name}
            />
          </Item>

          <Item floatingLabel>
            <Label>Price</Label>
            <Input 
              onChangeText={this.onAdHocAmountChange.bind(this)}
              value={this.props.amount}
            />
          </Item>

          <Button primary onPress={() => this.props.onAddAdhocSelected(this.props.name, this.props.amount, this.props.session, this.props.booking_id)}><Text> Add </Text></Button>

        </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    amount: state.adhoc.amount,
    name: state.adhoc.name,
    session: state.auth.session,
    booking_id: state.tourParty.selectedBooking.id,
  };
};

export default connect(mapStateToProps, { onAdHocAmountChange, onAdHocNameChange, onAddAdhocSelected })(AdHoc);
