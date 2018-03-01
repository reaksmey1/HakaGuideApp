import { 
				 ADHOC_AMOUNT_CHANGED,
				 ADHOC_NAME_CHANGED,
				 ADDING_ADHOC,
				 ADDING_ADHOC_SUCCESS
				} from '../actions/types';

const INITIAL_STATE = {loading: false, amount: "", name: ""};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADHOC_AMOUNT_CHANGED:
			return { ...state, amount: action.payload }
		case ADHOC_NAME_CHANGED:
			return { ...state, name: action.payload }
		case ADDING_ADHOC:
			return { ...state, loading: true}
		case ADDING_ADHOC_SUCCESS:
			return { ...state, loading: false }
		default:
			return state;
	}
};