import { SHOW_ACTIVITIES_SUCCESS,
				 SHOW_ACTIVITIES_FAIL
				} from '../actions/types';

const INITIAL_STATE = {activities: [], error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_ACTIVITIES_SUCCESS:
			return { ...state, activities: action.payload }
		case SHOW_ACTIVITIES_FAIL:
			return { ...state, error: 'Something went wrong' }
		default:
			return state;
	}
};