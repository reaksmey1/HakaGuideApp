import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { 
				TOUR_GROUP_CHANGED,
				SHOW_CUSTOMERS,
				SHOW_CUSTOMERS_SUCCESS
			} from './types';

const showCustomersSuccess = (dispatch) => {
	dispatch({
		type: SHOW_CUSTOMERS_SUCCESS
	});

	Actions.customerList();
};

export const tourGroupChanged = (text) => {
	return {
		type: TOUR_GROUP_CHANGED,
		payload: text
	};
};

export const showCustomers = () => {
	return (dispatch) => {
		dispatch({ type: SHOW_CUSTOMERS });

		showCustomersSuccess(dispatch);
	};
};