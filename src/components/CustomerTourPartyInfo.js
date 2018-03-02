import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,
					Header,
					Item,
					Icon,
					Input,
					Button,
					Content,
					Footer,
					FooterTab,
					Text,
					Right,
					List,
					ListItem,
					Body,
					Spinner,
					Card,
					CardItem } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view'
import { showActivitySheet, showTourPartyInfo, tourGroupChanged, showTPI} from '../actions';

class CustomerTourPartyInfo extends Component {

  componentWillMount() {
    const { tourCode, session } = this.props;
    this.props.showTPI({ tourCode, session });
  }

	onTourPartyInfoPress() {
		this.props.showTourPartyInfo();
	}

	onTourGroupChange(text) {
		this.props.tourGroupChanged(text);
	}

	onSearchButtonPress() {
		const { tourCode, session } = this.props;
		this.props.showTPI({ tourCode, session });
	}

	onShowActivitySheetPress() {
		this.props.showActivitySheet();
	}

	renderTPI() {
		if (this.props.loading) {
			return <Spinner size='large' />;
		}

		if (this.props.error) {
			return <Text style={styles.errorText}> { this.props.error } </Text>;
		}

		if (this.props.tpi) {
			return (
				<Card>
				<Card>
          <CardItem>                        
              <MarkdownView>
                  **Guide Flight**{'\n'}
                  {this.props.tpi.guide_flight}
              </MarkdownView>
          </CardItem>
     		</Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                **Bus Info**{'\n'}
                {this.props.tpi.bus_info}
              </MarkdownView>
          </CardItem>
     		</Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                  **Maori Hangi**{'\n'}
                  {this.props.tpi.maori_hangi}
              </MarkdownView>
          </CardItem>
     		</Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                  **Bone Carving**{'\n'}
                  {this.props.tpi.bone_carving}
              </MarkdownView>
          </CardItem>
     		</Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                  **Ferry**{'\n'}
                  {this.props.tpi.ferry}
              </MarkdownView>
          </CardItem>
     		</Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                  **Train**{'\n'}
                  {this.props.tpi.train}
              </MarkdownView>
          </CardItem>
     		</Card>
        <Card>
          <CardItem>                        
              <MarkdownView>
                  **Accommodation Note**{'\n'}
                  {this.props.tpi.accommodation_note}
              </MarkdownView>
          </CardItem>
        </Card>
        <Card>
          <CardItem>                        
              <MarkdownView>
                  **Medical Note**{'\n'}
                  {this.props.tpi.medical_note}
              </MarkdownView>
          </CardItem>
        </Card>
        <Card>
          <CardItem>                        
              <MarkdownView>
                  **TourTab Payment/Refunds**{'\n'}
                  {this.props.tpi.tour_tab_payment}
              </MarkdownView>
          </CardItem>
        </Card>
        <Card>
          <CardItem>                        
              <MarkdownView>
                  **Agent Booking Info**{'\n'}
                  {this.props.tpi.agent_booking_info}
              </MarkdownView>
          </CardItem>
        </Card>
     		<Card>
          <CardItem>                        
              <MarkdownView>
                  **Other**{'\n'}
                  {this.props.tpi.other}
             	</MarkdownView>
          </CardItem>
     		</Card>
   		</Card>
			)
		}
	}

	render() {
		return(
			<Container>
        <Header searchBar rounded>
          <Item>
          	<Icon name="ios-search" />
            <Input 
            	placeholder="Tour Group" 
            	onChangeText={this.onTourGroupChange.bind(this)}
            	onSubmitEditing={this.onSearchButtonPress.bind(this)}
            	value={this.props.tourCode}
          	/>
          	<Icon name="ios-people" />
          </Item>
          <Button transparent onPress={this.onSearchButtonPress.bind(this)}>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content> 
					{this.renderTPI()}
	     </Content>
	     <Footer>
          <FooterTab>
            <Button onPress={this.onTourPartyInfoPress.bind(this)}>
            	<Icon name="ios-subway" />
              <Text>Customers</Text>
            </Button>
            <Button onPress={this.onShowActivitySheetPress.bind(this)}>
            	<Icon name="ios-american-football" />
              <Text>Activities</Text>
            </Button>
            <Button active>
            	<Icon name="ios-paper" />
              <Text>TPI</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
		)
	}
}

const styles = {
	errorText: {
		color: 'red',
		alignSelf: 'center',
		fontSize: 18,
		marginTop: 5
	},

	heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: '#555555',
  }
};

const mapStateToProps = state => {
	return {
		tourCode: state.tourParty.tourCode,
		session: state.auth.session,
		itineraries: state.activitySheet.itineraries,
		loading: state.activitySheet.loading,
		tpi: state.activitySheet.tpi
	};
};

export default connect(mapStateToProps, { showActivitySheet, showTourPartyInfo, showTPI, tourGroupChanged })(CustomerTourPartyInfo);
