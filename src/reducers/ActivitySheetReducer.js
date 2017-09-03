import { SHOW_ITINERARIES,
				 SHOW_ITINERARIES_SUCCESS,
				 SHOW_ITINERARIES_FAIL,
				 TOUR_GROUP_ACTIVITIES_FETCH_SUCCESS,
				 TOUR_GROUP_ITINERARY_SELECTED,
				 TOUR_GROUP_OPTIONS_FETCH_SUCCESS,
				 TOUR_GROUP_ACTIVITY_SELECTED,
				 TOUR_GROUP_OPTION_SELECTED,
				 TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS
				} from '../actions/types';

const INITIAL_STATE = {itineraries: [],  
												loading: false,
												selectedDay: null,  
												activities: [],
												selectedActivity: null,
												options: [],
												selectedOption: null,
												customers: [],
												error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_ITINERARIES:
			return { ...state, loading: true }
		case SHOW_ITINERARIES_SUCCESS:
			return { ...state, loading: false, error: '', itineraries: action.payload }
		case SHOW_ITINERARIES_FAIL:
			return { ...state, loading: false, error: 'Something went wrong ! Please check tour Code and try again !' }
		case TOUR_GROUP_ITINERARY_SELECTED:
			return { ...state, selectedDay: action.payload }
		case TOUR_GROUP_ACTIVITIES_FETCH_SUCCESS:
			return { ...state, activities: action.payload}
		case TOUR_GROUP_ACTIVITY_SELECTED:
			return { ...state, selectedActivity: action.payload }
		case TOUR_GROUP_OPTIONS_FETCH_SUCCESS:
			return { ...state, loading: false, options: action.payload }
		case TOUR_GROUP_OPTION_SELECTED:
			return { ...state, loading: true}
		case TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS:
			return { ...state, loading: false, customers: action.payload }
		default:
			return state;
	}
};