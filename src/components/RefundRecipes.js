import React, { Component } from 'react';
import { Container, 
					Header, 
					Item, 
					View, 
					Text, 
					Right, 
					Body, 
					Content, 
					List, 
					ListItem,
					Icon,
					Spinner
				} from 'native-base';

class RefundRecipes extends Component {
	render() {
		return (
			<Container>
				<Content>
					<List>
						<ListItem>
							<Body>
								<Text> 170914565908 - Paid ( NZD624 ) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text> 170914566065 - Paid (NZD 299) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text> 170914566104 - Paid (NZD 329) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text> 170914566133 - Paid (NZD 285) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text> 170914566198 - Paid (NZD 122) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text> 170914566217 - Paid (NZD 100) </Text>
							</Body>
							<Right>
			          <Icon name="arrow-forward" />
			        </Right>
						</ListItem>
					</List>
	     	</Content>
			</Container>
		)
	}
}

export default RefundRecipes;