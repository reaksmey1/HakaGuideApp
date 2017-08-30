import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				ITINERARIES_FETCH_SUCCESS
			} from './types';

const fetchItinerariesSuccess = (dispatch, days) => {
	dispatch({
		type: ITINERARIES_FETCH_SUCCESS,
		payload: days
	});
};

export const itinerariesFetch = (session, tour_id) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/tour_info/days?tour_id=${tour_id}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchItinerariesSuccess(dispatch, response.data["tour_info/days"]))
	}
};