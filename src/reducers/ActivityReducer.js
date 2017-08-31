import {
				ITINERARIES_FETCH, 
				ITINERARIES_FETCH_SUCCESS,
				ITINERARY_SELECTED,
				ACTIVITIES_FETCH_SUCCESS,
				ACTIVITY_SELECTED,
				OPTIONS_FETCH_SUCCESS,
				OPTION_SELECTED,
				ADD_ACTIVITY_SUCCESS,
				SHOW_BOOKED_ACTIVITIES,
				SHOW_BOOKED_ACTIVITIES_SUCCESS,
				SHOW_BOOKED_ACTIVITIES_FAIL
				} from '../actions/types';

const INITIAL_STATE = {days: [], 
											 bookedActivities: [], 
											 selectedDay: null, 
											 activities: [], 
											 selectedActivity: null, 
											 options: [], 
											 selectedOption: null,
											 selectedTraveller: null, 
											 loading: true, 
											 error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_BOOKED_ACTIVITIES:
			return { ...state, loading: true }
		case SHOW_BOOKED_ACTIVITIES_SUCCESS:
			return { ...state, loading: false, selectedTraveller: action.payload["bookings/traveller"], bookedActivities: action.payload["bookings/addons"] }
		case SHOW_BOOKED_ACTIVITIES_FAIL:
			return { ...state, error: 'Something went wrong' }
		case ITINERARIES_FETCH:
			return { ...state, loading: true }
		case ITINERARIES_FETCH_SUCCESS:
			return { ...state, loading: false, days: action.payload }
		case ITINERARY_SELECTED:
			return { ...state, selectedDay: action.payload }
		case ACTIVITIES_FETCH_SUCCESS:
			return { ...state, loading: false, activities: action.payload }
		case ACTIVITY_SELECTED:
			return { ...state, selectedActivity: action.payload }
		case OPTIONS_FETCH_SUCCESS:
			return { ...state, loading: false, options: action.payload }	
		case OPTION_SELECTED:
			return { ...state, selectedOption: action.payload }
		case ADD_ACTIVITY_SUCCESS:
			return { ...state}
		default:
			return state;
	}
};