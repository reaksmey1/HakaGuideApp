import { TOUR_GROUP_CHANGED,
				 SHOW_CUSTOMERS,
				 SHOW_CUSTOMERS_SUCCESS,
				 SHOW_CUSTOMERS_FAIL,
				 SHOW_BOOKED_ACTIVITIES,
				 SHOW_BOOKED_ACTIVITIES_SUCCESS,
				 SHOW_BOOKED_ACTIVITIES_FAIL
				} from '../actions/types';

const INITIAL_STATE = {tourCode: '', 
												customers: [], 
												days: [], 
												loading: false, 
												error: '', 
												selectedCustomer: null,
												booked_activities: []};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOUR_GROUP_CHANGED:
			return { ...state, tourCode: action.payload }
		case SHOW_CUSTOMERS:
			return { ...state, loading: true }
		case SHOW_CUSTOMERS_SUCCESS:
			return { ...state, loading: false, error: '', customers: action.payload }
		case SHOW_CUSTOMERS_FAIL:
			return { ...state, loading: false, customers: [], error: 'Something went wrong ! Please check your internet connection and try again' }
		case SHOW_BOOKED_ACTIVITIES:
			return { ...state, selectedCustomer: action.payload }
		case SHOW_BOOKED_ACTIVITIES_SUCCESS:
			return { ...state, booked_activities: action.payload }
		case SHOW_BOOKED_ACTIVITIES_FAIL:
			return { ...state, error: 'Something went wrong' }
		default:
			return state;
	}
};