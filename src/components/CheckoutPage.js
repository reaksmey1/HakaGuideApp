import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Spinner } from 'native-base';
import { backToCustomerDetail } from '../actions';

class CheckoutPage extends Component {
	whenNavigationStateChanges(navState){
		console.log(navState);
		if (navState.title == "New Zealand Tours - Small Group Adventures and Holidays") {
			this.props.backToCustomerDetail();
		}
    // var navigator = this.props.navigator;
    // var parsed = Url.parse(navState.url, true);
    // console.log(parsed.hostname);
    // if (parsed.hostname == 'YOUR_HOSTNAME'){
    //   console.log("Event is: " + parsed.query.event);
    //   navigator.pop();
    // }
  }

	renderPage() {
		console.log(this.props);
		if (this.props.loading) {
      return <Content><Spinner size='large' /></Content>;
    }
    return (
    	<WebView
        source={{uri: this.props.payment_page_url}}
        style={{marginTop: 10}}
        onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
      />
  	);
	}

	render() {
		return (
			<Container>
			{this.renderPage()}
			</Container>
		)
	}
}

// render() {
//     var recipientViewURL = this.props.route.data.url;
//     console.log('Recipient URL is: ' + recipientViewURL);
//     return (
//       <View style={styles.container}>
//         <WebView
//           source={{uri: recipientViewURL, method: 'GET'}}
//           scalesPageToFit={true}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
//         >
//       </WebView>
//       </View>
//     );
//   }

  // whenNavigationStateChanges(navState){
  //   var navigator = this.props.navigator;
  //   var parsed = Url.parse(navState.url, true);
  //   if (parsed.hostname == 'YOUR_HOSTNAME'){
  //     console.log("Event is: " + parsed.query.event);
  //     navigator.pop();
  //   }
  // }

const mapStateToProps = state => {
	return {
		error: state.payment.error,
		payment_page_url: state.payment.payment_page_url,
		loading: state.payment.loading,
	};
};

export default connect(mapStateToProps, { backToCustomerDetail })(CheckoutPage);
