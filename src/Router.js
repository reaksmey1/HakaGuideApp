import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TourParty from './components/TourParty';
import CustomerList from './components/CustomerList';

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
			</Scene>
		</Router>
	);
};

export default RouterComponent;