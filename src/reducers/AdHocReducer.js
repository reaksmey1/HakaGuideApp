import { 
				 ADHOC_AMOUNT_CHANGED,
				 ADHOC_NAME_CHANGED
				} from '../actions/types';

const INITIAL_STATE = {loading: false, amount: "", name: ""};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADHOC_AMOUNT_CHANGED:
			return { ...state, amount: action.payload }
		case ADHOC_NAME_CHANGED:
			return { ...state, name: action.payload }
		default:
			return state;
	}
};