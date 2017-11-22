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
				TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS,
				FETCHING_ON_ROAD_CUSTOMERS,
				ON_ROAD_CUSTOMERS_FETCH_SUCCESS,
				TOGGLE_CUSTOMER,
				ADD_MULTIPLE_CUSTOMERS,
				ADD_MULTIPLE_CUSTOMERS_SUCCESS,
				SHOW_TPI,
				SHOW_TPI_SUCCESS,
				SHOW_TPI_FAILED,
				CUSTOMER_SELECTED,
				BOOKING_SELECTED,
				GET_BOOKING_SUCCESS
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
};

const fetchOnRoadCustomersSuccess = (dispatch, option, response) => {
	customers = []
	if (response.data["bookings/travellers"]) {
		customers = response.data["bookings/travellers"]
	} 
	dispatch({
		type: ON_ROAD_CUSTOMERS_FETCH_SUCCESS,
		payload: customers
	});
};

const addMultipleCustomerSuccess = (dispatch) => {
	dispatch({
		type: ADD_MULTIPLE_CUSTOMERS_SUCCESS
	});
	Actions.tourGroupCustomers();
};

const showTPISuccess = (dispatch, tpi) => {
	dispatch({
		type: SHOW_TPI_SUCCESS,
		payload: tpi
	});
};

const showTPIFailed = (dispatch) => {
	dispatch({
		type: SHOW_TPI_FAILED
	});
};

const generateAddMultipleCustomerHash = (session, option, day, selectedCustomers) => {
	hash = [];
	for (var i in selectedCustomers) {
		tmp = {
			"customer_id": selectedCustomers[i].id,
			"option_id": option,
			"day_id": day.id,
			"booking_id": selectedCustomers[i].booking_id
		}
		hash.push(tmp)
	}
	return hash;
};

const getBookingSuccess = (dispatch, response, customer) => {
	selected_traveller = ""
	travellers_list = response.links.travellers_list

	for (var i in travellers_list) {
		if (travellers_list[i]._id == customer) {
			selected_traveller = travellers_list[i]
		}
	}

	dispatch({ type: BOOKING_SELECTED, payload: response});
	dispatch({ type: CUSTOMER_SELECTED, payload: selected_traveller });

	Actions.customerMain();
};

export const showTourPartyInfo = () => {
	return (dispatch) => {
		Actions.main({type: 'reset'});
	}
};

export const onTourGroupCustomerSelected = (session, booking, customer) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/bookings/bookings/${booking}`, { headers: { email: session.email, token: session.token } })
			.then(response => getBookingSuccess(dispatch, response.data['bookings/booking'], customer))
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

export const showTPI = ({ tourCode, session }) => {
	return (dispatch) => {
		dispatch({ type: SHOW_TPI });
		axios.get(BASE_URL+`/api/tour_info/tour_groups?code=${tourCode}`, { headers: { email: session.email, token: session.token } })
			.then(response => showTPISuccess(dispatch, response.data["tour_info/tour_group"]))
			.catch(error => showTPIFailed(dispatch));
	}
};

export const onTourGroupActivitySelected = (activity, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_ACTIVITY_SELECTED, payload: activity });
		axios.get(BASE_URL+activity.links.options, { headers: { email: session.email, token: session.token } })
			.then(response => fetchTourGroupOptionsSuccess(dispatch, activity, response.data["addons/options"]))
	}
};

export const fetchTourGroupCustomers = (tourCode, option, session) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/tour_info/tour_groups/find_travellers_by_addon?tour_code=${tourCode}&option=${option}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchTourGroupCustomersSuccess(dispatch, option, response))
	}
};

export const onTourGroupOptionSelected = (option, tourCode, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_OPTION_SELECTED, payload: option });
		Actions.tourGroupCustomers();
	}
};

export const onRoadCustomerFetch = (option, tourCode, session) => {
	return (dispatch) => {
		dispatch({ type: FETCHING_ON_ROAD_CUSTOMERS });
		axios.get(BASE_URL+`/api/tour_info/tour_groups/find_unbooked_travellers_by_addon?tour_code=${tourCode}&option=${option}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchOnRoadCustomersSuccess(dispatch, option, response))
	}
};

export const onTourGroupItinerarySelected = (day, session) => {
	return (dispatch) => {
		dispatch({ type: TOUR_GROUP_ITINERARY_SELECTED, payload: day });
		axios.get(BASE_URL+day.links.addons, { headers: { email: session.email, token: session.token } })
			.then(response => fetchActivitiesSuccess(dispatch, day, response.data["addons/addons"]))
	}
};

export const toggleCustomer = (selectedCustomers) => {
	return (dispatch) => {
		dispatch({ type: TOGGLE_CUSTOMER, payload: selectedCustomers });
	}
};

export const onAddMultipleCustomerPress = (session, option, day, selectedCustomers) => {
	return (dispatch) => {
		dispatch({ type: ADD_MULTIPLE_CUSTOMERS });
		var hash = generateAddMultipleCustomerHash(session, option, day, selectedCustomers);
		axios.post(BASE_URL+`/api/bookings/bookings/addMultipleAddons?user=${session.email}`, {addons: hash}, { headers: { email: session.email, token: session.token, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN' } })
			.then(response => addMultipleCustomerSuccess(dispatch))
	}
};

