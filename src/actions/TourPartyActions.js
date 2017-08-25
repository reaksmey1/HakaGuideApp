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
				SHOW_TOURS_FAIL,
				SHOW_ACTIVITIES,
				SHOW_ACTIVITIES_SUCCESS,
				SHOW_ACTIVITIES_FAIL
			} from './types';

const showCustomersSuccess = (dispatch, customers) => {
	dispatch({
		type: SHOW_CUSTOMERS_SUCCESS,
		payload: customers
	});
};

const showActivitiesSuccess = (dispatch, activities) => {
	dispatch({
		type: SHOW_ACTIVITIES_SUCCESS,
		payload: activities
	});

	Actions.customerDetail();
};

const showActivitiesFail = (dispatch) => {
	dispatch({
		type: SHOW_ACTIVITIES_FAIL
	});
};

export const onCustomerSelected = (customer, session) => {
	return (dispatch) => {
		dispatch({ type:  SHOW_ACTIVITIES, payload: customer});
		axios.get(BASE_URL+`/api/bookings/bookings/${customer.booking_id}/getActivitiesByTraveller?traveller_id=${customer.id}`, { headers: { email: session.email, token: session.token } })
			.then(response => showActivitiesSuccess(dispatch, response.data["bookings/addons"]))
			.catch(error => showActivitiesFail(dispatch));
	}
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
			.catch(error => showCustomersFail(dispatch));
	}
}
