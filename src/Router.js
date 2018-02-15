import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TourParty from './components/TourParty';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import Itineraries from './components/Itineraries';
import Activities from './components/Activities';
import Options from './components/Options';
import ActivitySheet from './components/ActivitySheet';
import TourGroupActivities from './components/TourGroupActivities';
import TourGroupOptions from './components/TourGroupOptions';
import TourGroupCustomers from './components/TourGroupCustomers';
import TourGroupAddCustomers from './components/TourGroupAddCustomers';
import CheckoutPage from './components/CheckoutPage';
import CheckoutOptions from './components/CheckoutOptions';
import SplitPayment from './components/SplitPayment';
import RefundRecipes from './components/RefundRecipes';
import CustomerTourPartyInfo from './components/CustomerTourPartyInfo';
import AddOptions from './components/AddOptions';
import AdHoc from './components/AdHoc';
import PayByCash from './components/PayByCash';
import PaymentHistory from './components/PaymentHistory';
import FullPayment from './components/FullPayment';
import PaymentResult from './components/PaymentResult';
import CardOptions from './components/CardOptions';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>

			<Scene key="main">
				<Scene 
					key="tourParty"
					component={TourParty}
					title="Customers"
					onRight={() => Actions.auth({type: 'reset'})}
					rightTitle="Sign Out"
					initial
				/>
			</Scene>

			<Scene key="auth">
				<Scene key="login" component={LoginForm} hideNavBar />
			</Scene>

			<Scene key="paymentResultMain">
				<Scene 
					key="paymentResult"
					component={PaymentResult}
				/>
			</Scene>

			<Scene key="customerMain">
				<Scene
					key="customerDetail"
					onLeft={() => Actions.main({type: 'reset'})}
					onRight={() => Actions.addOptions()}
					rightTitle="Add"
					leftTitle="TPI"
					component={CustomerDetail}
					title="Booked Activities"
					initial
				/>
				<Scene 
					key="addOptions"
					component={AddOptions}
					title="Choose Add Options"
				/>
				<Scene
					key="itineraries"
					component={Itineraries}
					title={this.title}
				/>

				<Scene 
					key="adhoc"
					component={AdHoc}
					title="AdHoc"
				/>

				<Scene
					key="activities"
					component={Activities}
					title={this.title}
				/>

				<Scene
					key="options"
					component={Options}
					title={this.title}
				/>

				<Scene
					key="checkoutPage"
					component={CheckoutPage}
					title="Checkout"
				/>

				<Scene
					key="checkoutOptions"
					component={CheckoutOptions}
					title="Check Out"
				/>

				<Scene
					key="splitPayment"
					component={SplitPayment}
					title="Pay Partial Amount"
				/>

				<Scene
					key="cardOptions"
					component={CardOptions}
					title="Pick a Card"
				/>

				<Scene
					key="fullPayment"
					component={FullPayment}
					title="Pay Full Amount"
				/>

				<Scene
					key="payByCash"
					component={PayByCash}
					title="Pay By Cash"
				/>

				<Scene
					key="refundRecipes"
					component={RefundRecipes}
					title="Recipes"
				/>
			</Scene>

			<Scene key="paymentHistoryMain">
				<Scene
					key="paymentHistory"
					onLeft={() => Actions.main({type: 'reset'})}
					leftTitle="TPI"
					component={PaymentHistory}
					title="Payment History"
					initial
				/>
			</Scene>

			<Scene key="customerTourPartyInfoMain">
				<Scene 
					key="customerTourPartyInfo"
					component={CustomerTourPartyInfo}
					title="Tour Party Info"
					initial
				/>
			</Scene>

			<Scene key="activityMain">
				<Scene
					key="activitySheet"
					component={ActivitySheet}
					title="Activity Sheet"
					initial
				/>
				<Scene
					key="tourGroupActivities"
					component={TourGroupActivities}
					title={this.title}
				/>
				<Scene
					key="tourGroupOptions"
					component={TourGroupOptions}
					title={this.title}
				/>
				<Scene
					key="tourGroupCustomers"
					component={TourGroupCustomers}
					onRight={() => Actions.tourGroupAddCustomers({title: 'On Road Customers'})} 
					rightTitle="Add"
					title={this.title}
				/>
				<Scene
					key="tourGroupAddCustomers"
					component={TourGroupAddCustomers}
					title={this.title}
				/>

				<Scene
					key="tourGroupCustomerDetail"
					component={CustomerDetail}
					title="Booked Activities"
				/>

			</Scene>
		</Router>
	);
};

export default RouterComponent;