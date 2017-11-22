import { TOUR_GROUP_CHANGED,
				 SHOW_CUSTOMERS,
				 SHOW_CUSTOMERS_SUCCESS,
				 SHOW_CUSTOMERS_FAIL,
				 CUSTOMER_SELECTED,
				 BOOKING_SELECTED,
				 GET_BOOKING_SUCCESS
				} from '../actions/types';

const INITIAL_STATE = {tourCode: '', 
												customers: [],
												days: [], 
												loading: false, 
												error: '', 
												selectedCustomer: null,
												selectedBooking: null};

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
		case CUSTOMER_SELECTED:
			return { ...state, selectedCustomer: action.payload }
		case BOOKING_SELECTED:
			return { ...state, selectedBooking: action.payload }
		case GET_BOOKING_SUCCESS:
			return { ...state }
		default:
			return state;
	}
};