import { TOUR_GROUP_CHANGED,
				 SHOW_TOURS,
				 SHOW_TOURS_SUCCESS,
				 SHOW_TOURS_FAIL
				} from '../actions/types';

const INITIAL_STATE = {tourCode: '', tours: [], loading: false, error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOUR_GROUP_CHANGED:
			return { ...state, tourCode: action.payload }
		case SHOW_TOURS:
			return { ...state, loading: true }
		case SHOW_TOURS_SUCCESS:
			return { ...state, loading: false, error: '', tours: action.payload }
		case SHOW_TOURS_FAIL:
		return { ...state, loading: false, error: 'Something went wrong ! Please check your internet connection and try again' }
		default:
			return state;
	}
};