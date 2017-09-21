import { SHOW_ITINERARIES,
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
				 SHOW_TPI_FAILED
				} from '../actions/types';

const INITIAL_STATE = {itineraries: [],  
												loading: false,
												selectedDay: null,  
												activities: [],
												selectedActivity: null,
												options: [],
												selectedOption: null,
												customers: [],
												onRoadCustomers: [],
												error: '',
												selectedCustomers: [],
												tpi: null};

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
			return { ...state, selectedOption: action.payload, loading: true}
		case TOUR_GROUP_CUSTOMERS_FETCH_SUCCESS:
			return { ...state, loading: false, customers: action.payload }
		case FETCHING_ON_ROAD_CUSTOMERS:
			return { ...state, loading: true }
		case ADD_MULTIPLE_CUSTOMERS:
			return { ...state, loading: true }
		case ADD_MULTIPLE_CUSTOMERS_SUCCESS:
			return { ...state, loading: false }
		case SHOW_TPI:
			return { ...state, loading: true }
		case SHOW_TPI_SUCCESS:
			return { ...state, loading: false, tpi: action.payload}
		case SHOW_TPI_FAILED:
			return { ...state, loading: false, error: 'Sorry, there is not Tour Party Info yet'}
		case ON_ROAD_CUSTOMERS_FETCH_SUCCESS:
			var tmp_on_road_customer = [];
			for (var i in action.payload) {
				el = action.payload[i];
			  el["checked"] = false;
			  tmp_on_road_customer.push(el);
			}
			return { ...state, loading: false, onRoadCustomers: tmp_on_road_customer }
		case TOGGLE_CUSTOMER:
			return { ...state, selectedCustomers: action.payload }
		default:
			return state;
	}
};