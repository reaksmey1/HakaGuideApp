import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, 
					Header, 
					Text, 
					Right, 
					Body, 
					Content, 
					List, 
					ListItem, 
					Icon,
					Spinner, Button, Footer, FooterTab } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { bookedActivitiesFetch, onActivityRefund, onCheckoutPress, showPaymentHistories, onDeleteAdhoc } from '../actions';

class CustomerDetail extends Component {

	componentWillMount() {
		this.props.bookedActivitiesFetch(this.props.booking, this.props.customer, this.props.session);
	}

	renderPayButton(){
		if (this.props.selectedTraveller.links.balance_remaining > 0) {
			return <Button primary style={styles.checkoutButton} onPress={() => this.props.onCheckoutPress(this.props.session, this.props.selectedTraveller)}><Text> PAY </Text></Button>;
		}
	}

	onShowPaymentHistoriesPress() {
		this.props.showPaymentHistories();
	}

	onDeleteAdhocButtonPress(ad_hoc) {
		Alert.alert(
		  'Delete Adhoc',
		  'Are you sure, you want to remove this adhoc ?',
		  [
		    {text: 'Yes', onPress: () => this.props.onDeleteAdhoc(ad_hoc, this.props.session, this.props.customer, this.props.booking)},
		    {text: 'No'},
		  ],
		  { cancelable: false }
		)
	}

	onRefundButtonPress(addon) {
		Alert.alert(
		  'Refund Activites',
		  'Are you sure, you want to refund this activity ?',
		  [
		    {text: 'Yes', onPress: () => this.props.onActivityRefund(addon, this.props.session, this.props.customer, this.props.booking)},
		    {text: 'No'},
		  ],
		  { cancelable: false }
		)
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
	      		( ${ this.props.selectedTraveller.links.balance_remaining.toFixed(2) } Left ) 
      		</Text> 
    		</Text>
    		{this.renderPayButton()}
    	</Body>
  	);
	}

	renderPostAccommodations() {
		if (this.props.selectedTraveller) {
			if (this.props.selectedTraveller.links.post_accommodations.length == 0) {
				return (
					<ListItem>
						<Text style={{color: 'red'}}> There is no Post Accommodation </Text>
					</ListItem>
				)
			}
			return (
				this.props.selectedTraveller.links.post_accommodations.map(post_accomm => 
					<ListItem key={post_accomm.id}>
						<Body>
							<Text style={styles.addonHeader}>{post_accomm.nights} nights after tour at {post_accomm.location}</Text>
	          	<Text style={styles.addonDetails}>{post_accomm.option}: ${post_accomm.price}</Text>
	          	<Text style={styles.addonDetails}>Start Date: {post_accomm.startDate}</Text>
	          	<Text style={styles.addonDetails}>End Date: {post_accomm.endDate}</Text>
						</Body>
					</ListItem>
				)
			);
		}
	}

	renderPreAccommodations() {
		if (this.props.selectedTraveller) {
			if (this.props.selectedTraveller.links.pre_accommodations.length == 0) {
				return (
					<ListItem>
						<Text style={{color: 'red'}}> There is no Pre Accommodation </Text>
					</ListItem>
				)
			}
			return (
				this.props.selectedTraveller.links.pre_accommodations.map(pre_accomm => 
					<ListItem key={pre_accomm.id}>
						<Body>
							<Text style={styles.addonHeader}>{pre_accomm.nights} nights before tour at {pre_accomm.location}</Text>
	          	<Text style={styles.addonDetails}>{pre_accomm.option}: ${pre_accomm.price}</Text>
	          	<Text style={styles.addonDetails}>Start Date: {pre_accomm.startDate}</Text>
	          	<Text style={styles.addonDetails}>End Date: {pre_accomm.endDate}</Text>
						</Body>
					</ListItem>
				)
			);
		}
	}

	renderUpgradeAccommodations() {
		if (this.props.selectedTraveller) {
			if (this.props.selectedTraveller.links.upgrade_accommodations.length == 0) {
				return (
					<ListItem>
						<Text style={{color: 'red'}}> There is no Accommodation Upgrade </Text>
					</ListItem>
				)
			}
			return (
				this.props.selectedTraveller.links.upgrade_accommodations.map(upgrade_accomm =>
					<ListItem key={upgrade_accomm.id}>
						<Body>
							<Text style={styles.addonHeader}>{upgrade_accomm.name}</Text>
	          	<Text style={styles.addonDetails}>{upgrade_accomm.option}: ${upgrade_accomm.price}</Text>
						</Body>
					</ListItem>
				)
			);
		}
	}

	renderAdhocs() {
		if (this.props.selectedTraveller) {
			if (this.props.selectedTraveller.links.ad_hocs.length == 0) {
				return (
					<ListItem>
	    			<Text style={{color: 'red'}}> There is no Adhocs </Text>
	    		</ListItem>
				)
			}
			return (
				this.props.selectedTraveller.links.ad_hocs.map(ad_hoc => 
	        <ListItem key={ad_hoc.id}>
	        	<Body>
	          	<Text style={styles.addonHeader}>{ad_hoc.reference}</Text>
	          	<Text style={styles.addonDetails}>Price: ${ad_hoc.price}</Text>
	        	</Body>
	        	<Right>
	        		<Button danger onPress={() => this.onDeleteAdhocButtonPress(ad_hoc)}>
	              <Icon active name="trash" />
	            </Button>
		        </Right>
	        </ListItem>
	      )
			);
		}
	}

	renderCustomAddons() {
		if (this.props.customAddons.length == 0) {
			return (
				<ListItem>
    			<Text style={{color: 'red'}}> There is no Custom Addons </Text>
    		</ListItem>
			)
		}
		return (  
			this.props.customAddons.map(addon => 
        <ListItem key={addon.id}>
        	<Body>
          	<Text style={styles.addonHeader}>{addon.name}</Text>
          	<Text style={styles.addonDetails}>{addon.location}</Text>
          	<Text style={styles.addonDetails}>Price: ${addon.price}</Text>
        	</Body>
        </ListItem>
      )
		);
	}

	renderContent() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
    if (this.props.bookedActivities.length == 0) {
			return (
				<ListItem>
    			<Text style={{color: 'red'}}> There is no booked activities </Text>
    		</ListItem>
			)
		}
		return (  
			this.props.bookedActivities.map(addon => 
        <ListItem key={addon.id}>
        	<Body>
          	<Text style={styles.addonHeader}>{addon.name}</Text>
          	<Text style={styles.addonDetails}>{addon.links.option_name}</Text>
          	<Text style={styles.addonDetails}>Price: ${addon.price}</Text>
        	</Body>
        	<Right>
        		<Button danger onPress={() => this.onRefundButtonPress(addon)}>
              <Icon active name="trash" />
            </Button>
	        </Right>
        </ListItem>
      )
		);
	}

	renderRefundedActivities() {
		if (this.props.refundedActivities.length == 0) {
			return (
				<ListItem>
    			<Text style={{color: 'red'}}> There is no refunded activities </Text>
    		</ListItem>
			)
		}
		return (  
			this.props.refundedActivities.map(addon => 
        <ListItem key={addon.id}>
        	<Body>
          	<Text style={styles.addonHeader}>{addon.name}</Text>
          	<Text style={styles.addonDetails}>{addon.links.option_name}</Text>
          	<Text style={styles.addonDetails}>Price: ${addon.price}</Text>
        	</Body>
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
					<ListItem itemDivider>
		        <Text>Pre-booked Activities</Text>
		      </ListItem> 
					{this.renderContent()}
					<ListItem itemDivider>
		        <Text>Custom Addons</Text>
		      </ListItem>
		      {this.renderCustomAddons()}
					<ListItem itemDivider>
		        <Text>Ad-hocs</Text>
		      </ListItem>
					{this.renderAdhocs()}
					<ListItem itemDivider>
		        <Text>Pre Accommodations</Text>
		      </ListItem>
					{this.renderPreAccommodations()}
					<ListItem itemDivider>
		        <Text>Post Accommodations</Text>
		      </ListItem>
					{this.renderPostAccommodations()}
					<ListItem itemDivider>
		        <Text>Upgrade Accommodations</Text>
		      </ListItem>
					{this.renderUpgradeAccommodations()}
					<ListItem itemDivider>
		        <Text>Refunded Activities</Text>
		      </ListItem>
					{this.renderRefundedActivities()}
				</Content>
				<Footer>
          <FooterTab>
            <Button active>
            	<Icon name="ios-american-football" />
              <Text>Booked Activities</Text>
            </Button>
            <Button onPress={this.onShowPaymentHistoriesPress.bind(this)}>
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
		customAddons: state.activity.customAddons,
		refundedActivities: state.activity.refundedActivities,
		selectedTraveller: state.activity.selectedTraveller,
		session: state.auth.session,
		loading: state.activity.loading,
		dialogVisible: true
	};
};

export default connect(mapStateToProps, { bookedActivitiesFetch, onActivityRefund, onCheckoutPress, showPaymentHistories, onDeleteAdhoc })(CustomerDetail);

