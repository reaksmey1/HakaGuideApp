import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { 
				SHOW_ITINERARIES,
				SHOW_ITINERARIES_SUCCESS,
				SHOW_ITINERARIES_FAIL,
				TOUR_GROUP_ACTIVITIES_FETCH_SUCCESS,
				TOUR_GROUP_ITINERARY_SELECTED,
				TOUR_GROUP_OPTIONS_FETCH_SUCCESS,
				TOUR_GROUP_ACTIVITY_SELECTED,
				TOUR_GROUP_OPTION_SELECTED,
				TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS
			} from './types';

const showItinerariesSuccess = (dispatch, days) => {
	dispatch({
		type: SHOW_ITINERARIES_SUCCESS,
		payload: days
	});
};

const showItinerariesFail = (dispatch) => {
	dispatch({
		type: SHOW_ITINERARIES_FAIL
	});
};

const fetchActivitiesSuccess = (dispatch, day, activities) => {
	dispatch({
		type: TOUR_GROUP_ACTIVITIES_FETCH_SUCCESS,
		payload: activities
	});

	Actions.tourGroupActivities({title: `Day ${day.ordinal_number}`})
};

const fetchTourGroupOptionsSuccess = (dispatch, activity, options) => {
	dispatch({
		type: TOUR_GROUP_OPTIONS_FETCH_SUCCESS,
		payload: options
	});

	Actions.tourGroupOptions({title: activity.name})
};

const fetchTourGroupCustomersSuccess = (dispatch, option, response) => {
	customers = []
	if (response.data["bookings/travellers"]) {
		customers = response.data["bookings/travellers"]
	} 
	dispatch({
		type: TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS,
		payload: customers
	});

	Actions.tourGroupCustomers({title: option.name})
};

export const showTourPartyInfo = () => {
	return (dispatch) => {
		Actions.main({type: 'reset'});
	}
};

export const showItineraries = ({ tourCode, session }) => {
	return (dispatch) => {
		dispatch({ type: SHOW_ITINERARIES });
		axios.get(BASE_URL+`/api/tour_info/tour_groups/getItineraryByTourCode?tour_code=${tourCode}`, { headers: { email: session.email, token: session.token } })
			.then(response => showItinerariesSuccess(dispatch, response.data["tour_info/days"]))
			.catch(error => showItinerariesFail(dispatch));
	}
};

export const onTourGroupActivitySelected = (activity, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_ACTIVITY_SELECTED, payload: activity });
		axios.get(BASE_URL+activity.links.options, { headers: { email: session.email, token: session.token } })
			.then(response => fetchTourGroupOptionsSuccess(dispatch, activity, response.data["addons/options"]))
	}
};

export const onTourGroupOptionSelected = (option, tourCode, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_OPTION_SELECTED, payload: option });
		axios.get(BASE_URL+`/api/tour_info/tour_groups/find_travellers_by_addon?tour_code=${tourCode}&option=${option}`, { headers: { email: session.email, token: session.token } })
			// .then(response => fetchTourGroupCustomersSuccess(dispatch, option, response.data["bookings/travellers"]))
			.then(response => fetchTourGroupCustomersSuccess(dispatch, option, response))
	}
};

export const onTourGroupItinerarySelected = (day, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_ITINERARY_SELECTED, payload: day });
		axios.get(BASE_URL+day.links.addons, { headers: { email: session.email, token: session.token } })
			.then(response => fetchActivitiesSuccess(dispatch, day, response.data["addons/addons"]))
	}
};