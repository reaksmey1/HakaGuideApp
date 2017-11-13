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
				OPTION_SELECTED,
				SHOW_BOOKED_ACTIVITIES,
				SHOW_BOOKED_ACTIVITIES_SUCCESS,
				SHOW_BOOKED_ACTIVITIES_FAIL
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


const addActivitySuccess = (dispatch, activities) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: activities
	});

	Actions.customerDetail();
};

const addActivityFail = (dispatch) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_FAIL
	});
};

const showBookedActivitiesSuccess = (dispatch, response) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: response
	});
};

const showBookedActivitiesFail = (dispatch) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_FAIL
	});
};

const addOptionSuccess = (dispatch) => {
	Actions.customerDetail();
};

const activityRefundSuccess = (dispatch) => {
	Actions.customerDetail();
};

export const bookedActivitiesFetch = (booking, customer, session) => {
	return (dispatch) => {
		dispatch({ type:  SHOW_BOOKED_ACTIVITIES});
		if (customer._id) {
			axios.get(BASE_URL+`/api/bookings/bookings/${booking.id}/getActivitiesByTraveller?traveller_id=${customer._id}`, { headers: { email: session.email, token: session.token } })
			.then(response => showBookedActivitiesSuccess(dispatch, response.data))
			.catch(error => showBookedActivitiesFail(dispatch));
		} else {
			axios.get(BASE_URL+`/api/bookings/bookings/${booking}/getActivitiesByTraveller?traveller_id=${customer}`, { headers: { email: session.email, token: session.token } })
			.then(response => showBookedActivitiesSuccess(dispatch, response.data))
			.catch(error => showBookedActivitiesFail(dispatch));
		}
	}
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

export const onOptionSelected = (option, day, session, customer, booking_id) => {
	return (dispatch) => {
		dispatch({ type: OPTION_SELECTED, payload: option});
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/addAddon?traveller=${customer._id}&option=${option.id}&day=${day.id}&user=${session.email}`, { headers: { email: session.email, token: session.token } })
			.then(response => addOptionSuccess(dispatch))
	}
};

export const onActivityRefund = (addon, session, customer, booking) => {
	return (dispatch) => {
		dispatch({ type:  SHOW_BOOKED_ACTIVITIES});
		axios.get(BASE_URL+`/api/bookings/bookings/${booking.id}/refundAddon?traveller=${customer._id}&addon=${addon.id}&option=${addon.option_id}&day=${addon.day_id}&user=${session.email}`, { headers: { email: session.email, token: session.token } })
			.then(
				axios.get(BASE_URL+`/api/bookings/bookings/${booking.id}/getActivitiesByTraveller?traveller_id=${customer._id}`, { headers: { email: session.email, token: session.token } })
					.then(response => showBookedActivitiesSuccess(dispatch, response.data))
				)
	}
};

export const onAddActivities = () => {
	return (dispatch) => {
		Actions.itineraries({title: 'Tour Itineraries'});
	}
};

export const onAddAdhoc = () => {
	return (dispatch) => {
		Actions.adhoc();
	}
};
