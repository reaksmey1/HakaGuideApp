import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { ADHOC_AMOUNT_CHANGED,
				 ADHOC_NAME_CHANGED } from './types';


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

const addAdHocSuccess = (dispatch) => {
	Actions.customerDetail({type: 'reset'});
};

export const onAddAdhocSelected = (reference, price, session, booking_id) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/addAdhoc?reference=${reference}&price=${price}&user=${session.email}`, { headers: { email: session.email, token: session.token } })
			.then(response => addAdHocSuccess(dispatch))
	}
};