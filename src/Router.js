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

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="auth">
				<Scene key="login" component={LoginForm} hideNavBar />
			</Scene>

			<Scene key="main">
				<Scene 
					key="tourParty"
					component={TourParty}
					title="Tour Party Info"
					initial
				/>
				<Scene 
					key="customerList"
					component={CustomerList}
					title="Customer List"
				/>
				<Scene
					key="customerDetail"
					onLeft={() => Actions.tourParty()}
					onRight={() => Actions.itineraries({title: 'Tour Itineraries'})} 
					rightTitle="Add"
					leftTitle="TPI"
					component={CustomerDetail}
					title="Booked Activities"
				/>
				<Scene
					key="itineraries"
					component={Itineraries}
					title={this.title}
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

			</Scene>
		</Router>
	);
};

export default RouterComponent;