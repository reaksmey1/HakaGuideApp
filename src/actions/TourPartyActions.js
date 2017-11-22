import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				TOUR_GROUP_CHANGED,
				SHOW_CUSTOMERS,
				SHOW_CUSTOMERS_SUCCESS,
				SHOW_CUSTOMERS_FAIL,
				CUSTOMER_SELECTED,
				BOOKING_SELECTED
			} from './types';

const showCustomersSuccess = (dispatch, bookings) => {
	dispatch({
		type: SHOW_CUSTOMERS_SUCCESS,
		payload: bookings
	});
};


const showCustomersFail = (dispatch) => {
	dispatch({
		type: SHOW_CUSTOMERS_FAIL
	});
};

export const onCustomerSelected = (booking, customer) => {
	return (dispatch) => {
		dispatch({ type: BOOKING_SELECTED, payload: booking});
		dispatch({ type: CUSTOMER_SELECTED, payload: customer });
		Actions.customerMain();
	}
};

export const onBookingPress = () => {
	return (dispatch) => {
		Actions.customerTourPartyInfoMain({type: 'reset'});
	}
};


export const tourGroupChanged = (text) => {
	return {
		type: TOUR_GROUP_CHANGED,
		payload: text
	};
};

export const showActivitySheet = () => {
	return (dispatch) => {
		Actions.activityMain({type: 'reset'});
	}
};

export const showPaymentHistories = () => {
	return (dispatch) => {
		Actions.paymentHistoryMain({type: 'reset'});
	}
};

export const showCustomerDetail = () => {
	return (dispatch) => {
		Actions.customerMain({type: 'reset'});
	}
};

export const showCustomers = ({ tourCode, session }) => {
	return (dispatch) => {
		dispatch({ type: SHOW_CUSTOMERS });
		axios.get(BASE_URL+`/api/bookings/bookings?agency_bookings=false&archived=false&booked=true&tour_code=${tourCode}`, { headers: { email: session.email, token: session.token } })
			.then(response => showCustomersSuccess(dispatch, response.data["bookings/bookings"]))
			.catch(error => showCustomersFail(dispatch));
	}
};
