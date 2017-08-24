import React, { Component } from 'react';
import { Container, Header, Item, View, Text, Card, CardItem, Body, Content, ListItem, CheckBox } from 'native-base';

class CustomerDetail extends Component {
	render() {
		// console.log(this.props);
		const customer = this.props.customer;
		return(
			<Container>
				<Header>
					<Body>
	          <Text>{ customer.title }: { customer.first_name } { customer.last_name }</Text>
            <Text> Paid: $ 722.55 of $ 2913 ( $ 2190.45 Left ) </Text>
          </Body>
				</Header>
				<Content>
		      <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Sky Diving</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Milford Sound Trip</Text>
            </Body>
          </ListItem>
	     	</Content>
			</Container>
		)
	}
}

export default CustomerDetail;

