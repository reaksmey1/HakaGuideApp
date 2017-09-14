import React, { Component } from 'react';
import CheckboxGroup from 'react-native-checkbox-group'
import { connect } from 'react-redux';
import { Container, 
				 Header, 
				 Content, 
				 ListItem, 
				 Text, 
				 Body,
				 Button,
				 List,
				 Spinner } from 'native-base';
import { onRoadCustomerFetch, toggleCustomer, onAddMultipleCustomerPress } from '../actions';

class TourGroupAddCustomers extends Component {
	componentWillMount() {
		const session = this.props.session;
		const option = this.props.option;
		const tourCode = this.props.tourCode;
		this.props.onRoadCustomerFetch(option, tourCode, session);
	}

	renderCheckboxList() {
		var arr_customers = [];
		for (var i in this.props.customers) {
			var customer_name = this.props.customers[i].title+" : "+this.props.customers[i].first_name+" "+this.props.customers[i].last_name; 
			var tmp_customer = {label: customer_name, value: this.props.customers[i]};
			arr_customers.push(tmp_customer);
		}
		return arr_customers;
	}

	renderCustomers() {
		if (this.props.loading) {
      return <Spinner size='large' />;
    }
		return (
			<CheckboxGroup
              callback={(selected) => { this.props.toggleCustomer(selected) }}
              iconColor={"#00a2dd"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.renderCheckboxList()}
              labelStyle={{
                color: '#000',
                marginLeft: 10,
                marginTop: 5,
                fontSize: 16
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            />
		);
	}

	render() {
		return (
			<Container>
				<Header>
					<Button primary onPress={() => this.props.onAddMultipleCustomerPress(this.props.session, this.props.option, this.props.day, this.props.selectedCustomers)}><Text> Add Customers </Text></Button>
        </Header>
				<Content>
					{this.renderCustomers()}
	     	</Content>
			</Container>
    );
	}
}

const mapStateToProps = state => {
	return {
		option: state.activitySheet.selectedOption,
		session: state.auth.session,
		day: state.activitySheet.selectedDay,
		tourCode: state.tourParty.tourCode,
		customers: state.activitySheet.onRoadCustomers,
		loading: state.activitySheet.loading,
		selectedCustomers: state.activitySheet.selectedCustomers
	};
};

export default connect(mapStateToProps, { onRoadCustomerFetch, toggleCustomer, onAddMultipleCustomerPress })(TourGroupAddCustomers);