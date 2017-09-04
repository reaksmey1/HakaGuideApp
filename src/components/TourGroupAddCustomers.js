import React, { Component } from 'react';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';

class TourGroupAddCustomers extends Component {
	render() {
		return(
			<Container>
        <Header />
        <Content>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Ms. Lucy Wood</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Mr. Reaksmey CHEA</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
		)
	}
}

export default TourGroupAddCustomers;