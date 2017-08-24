import { TOUR_GROUP_CHANGED,
				 SHOW_CUSTOMERS,
				 SHOW_CUSTOMERS_SUCCESS,
				 SHOW_CUSTOMERS_FAIL
				} from '../actions/types';

const INITIAL_STATE = {tourCode: '', customers: [], loading: false, error: ''};

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
		default:
			return state;
	}
};