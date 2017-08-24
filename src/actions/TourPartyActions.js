import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				TOUR_GROUP_CHANGED,
				SHOW_CUSTOMERS,
				SHOW_CUSTOMERS_SUCCESS,
				SHOW_CUSTOMERS_FAIL,
				SHOW_TOURS,
				SHOW_TOURS_SUCCESS,
				SHOW_TOURS_FAIL
			} from './types';

const showCustomersSuccess = (dispatch, customers) => {
	dispatch({
		type: SHOW_CUSTOMERS_SUCCESS,
		payload: customers
	});

	// Actions.customerList();
};

const showCustomersFail = (dispatch) => {
	dispatch({
		type: SHOW_CUSTOMERS_FAIL
	});
};


export const tourGroupChanged = (text) => {
	return {
		type: TOUR_GROUP_CHANGED,
		payload: text
	};
};


export const showCustomers = ({ tourCode, session }) => {
	return (dispatch) => {
		dispatch({ type: SHOW_CUSTOMERS });
		axios.get(BASE_URL+`/api/bookings/bookings?agency_bookings=false&archived=false&booked=true&tour_code=${tourCode}`, { headers: { email: session.email, token: session.token } })
			.then(response => showCustomersSuccess(dispatch, response.data["bookings/travellers"]))
			// .then(response => showCustomersSuccess(dispatch, response))
			// .then((response) => {
			// 	console.log(response);
			// })
			.catch(error => showCustomersFail(dispatch));
	}
}
