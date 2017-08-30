import {
				ITINERARIES_FETCH, 
				ITINERARIES_FETCH_SUCCESS,
				ITINERARY_SELECTED,
				ACTIVITIES_FETCH_SUCCESS,
				ACTIVITY_SELECTED,
				OPTIONS_FETCH_SUCCESS,
				OPTION_SELECTED
				} from '../actions/types';

const INITIAL_STATE = {days: [], selectedDay: null, activities: [], selectedActivity: null, options: [], selectedOption: null, loading: false, error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};