import { TOUR_GROUP_CHANGED
				} from '../actions/types';

const INITIAL_STATE = {tourCode: ''};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case TOUR_GROUP_CHANGED:
			return { ...state, tourCode: action.payload }
		default:
			return state;
	}
};