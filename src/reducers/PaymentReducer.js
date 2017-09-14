import { SHOW_CHECKOUT_PAGE,
				 SHOW_CHECKOUT_PAGE_SUCCESS,
				 SHOW_CHECKOUT_PAGE_FAIL
				} from '../actions/types';

const INITIAL_STATE = {loading: false, payment_page_url: null, error: null};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_CHECKOUT_PAGE:
			return { ...state, loading: true }
		case SHOW_CHECKOUT_PAGE_SUCCESS:
			return { ...state, loading: false, payment_page_url: action.payload }
		case SHOW_CHECKOUT_PAGE_FAIL:
			return { ...state, error: "Something went wrong !" }
		default:
			return state;
	}
};