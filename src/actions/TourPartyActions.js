import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				TOUR_GROUP_CHANGED,
				SHOW_CUSTOMERS,
				SHOW_CUSTOMERS_SUCCESS,
				SHOW_TOURS,
				SHOW_TOURS_SUCCESS,
				SHOW_TOURS_FAIL
			} from './types';

const showCustomersSuccess = (dispatch) => {
	dispatch({
		type: SHOW_CUSTOMERS_SUCCESS
	});

	Actions.customerList();
};

const showToursSuccess = (dispatch, tours) => {
	dispatch({
		type: SHOW_TOURS_SUCCESS,
		payload: tours
	});
};

const showToursFail = (dispatch) => {
	dispatch({
		type: SHOW_TOURS_FAIL
	});
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

export const showTours = ({ tourCode, session }) => {
	return (dispatch) => {
		dispatch({ type: SHOW_TOURS });
		//TODO: Find departures by tour code
		axios.get(BASE_URL+'/api/tour_info/departures?booked=true&include_past=true&tour_group_id=56b9543c1987b400b600001a', { headers: { email: session.email, token: session.token } })
			.then(response => showToursSuccess(dispatch, response.data['tour_info/departures']))
			.catch(error => showToursFail(dispatch));
	}
}
