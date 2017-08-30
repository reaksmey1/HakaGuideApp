import { ITINERARIES_FETCH_SUCCESS
				} from '../actions/types';

const INITIAL_STATE = {days: [], error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ITINERARIES_FETCH_SUCCESS:
			return { ...state, days: action.payload }
		default:
			return state;
	}
};