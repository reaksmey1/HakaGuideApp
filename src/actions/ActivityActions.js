import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				ITINERARIES_FETCH,
				ITINERARIES_FETCH_SUCCESS,
				ITINERARY_SELECTED,
				ACTIVITIES_FETCH_SUCCESS,
				ACTIVITY_SELECTED,
				OPTIONS_FETCH_SUCCESS,
				OPTION_SELECTED
			} from './types';

const fetchItinerariesSuccess = (dispatch, days) => {
	dispatch({
		type: ITINERARIES_FETCH_SUCCESS,
		payload: days
	});
};

const fetchActivitiesSuccess = (dispatch, day, activities) => {
	dispatch({
		type: ACTIVITIES_FETCH_SUCCESS,
		payload: activities
	});

	Actions.activities({title: `Day ${day.ordinal_number}`})
};

const fetchOptionsSuccess = (dispatch, activity, options) => {
	dispatch({
		type: OPTIONS_FETCH_SUCCESS,
		payload: options
	});

	Actions.options({title: activity.name})
};

export const itinerariesFetch = (session, tour_id) => {
	return (dispatch) => {
		dispatch({ type: ITINERARIES_FETCH });
		axios.get(BASE_URL+`/api/tour_info/days?tour_id=${tour_id}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchItinerariesSuccess(dispatch, response.data["tour_info/days"]))
	}
};

export const onItinerarySelected = (day, session) => {
	return (dispatch) => {
		dispatch({ type: ITINERARY_SELECTED, payload: day });
		axios.get(BASE_URL+day.links.addons, { headers: { email: session.email, token: session.token } })
			.then(response => fetchActivitiesSuccess(dispatch, day, response.data["addons/addons"]))
	}
};

export const onActivitySelected = (activity, booking_id, session) => {
	return (dispatch) => {
		dispatch({ type: ACTIVITY_SELECTED, payload: activity });
		axios.get(BASE_URL+activity.links.options+`&booking=${booking_id}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchOptionsSuccess(dispatch, activity, response.data["addons/options"]))
	}
};

export const onOptionSelected = (option, session) => {
	return (dispatch) => {
		dispatch({ type: OPTION_SELECTED, payload: option});
		Actions.customerDetail({ type: 'reset' })
	}
}