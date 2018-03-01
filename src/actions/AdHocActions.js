import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { ADHOC_AMOUNT_CHANGED,
				 ADHOC_NAME_CHANGED,
				 ADDING_ADHOC,
				 ADDING_ADHOC_SUCCESS,
				 SHOW_BOOKED_ACTIVITIES_SUCCESS } from './types';


export const onAdHocAmountChange = (text) => {
	return {
		type: ADHOC_AMOUNT_CHANGED,
		payload: text
	};
};

export const onAdHocNameChange = (text) => {
	return {
		type: ADHOC_NAME_CHANGED,
		payload: text
	};
};

const showBookedActivitiesSuccess = (dispatch, response) => {
	dispatch({ type: ADDING_ADHOC_SUCCESS });
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: response
	});
	Actions.customerDetail({type: 'reset'});
};

export const onAddAdhocSelected = (reference, price, session, booking_id, traveller) => {
	return (dispatch) => {
		dispatch({ type:  ADDING_ADHOC });
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/addAdhoc?reference=${reference}&price=${price}&user=${session.email}&traveller=${traveller.id}`, { headers: { email: session.email, token: session.token } })
			.then(
				axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/getActivitiesByTraveller?traveller_id=${traveller.id}`, { headers: { email: session.email, token: session.token } })
					.then(response => showBookedActivitiesSuccess(dispatch, response.data))
				)
	}
};