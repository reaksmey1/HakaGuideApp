import { SHOW_CHECKOUT_PAGE,
				 SHOW_CHECKOUT_PAGE_SUCCESS,
				 SHOW_CHECKOUT_PAGE_FAIL,
				 AMOUNT_CHANGED,
				 CASH_AMOUNT_CHANGED,
				 SURCHARGE_AMOUNT_CHANGED,
				 SET_PAYMENT_RESULT,
				 FETCH_PAYMENT_RESULT_SUCCESS,
				 FETCHING_PAYMENT_HISTORIES,
				 FETCH_PAYMENT_HISTORIES_SUCCESS,
				 PAYING_BY_CASH
				} from '../actions/types';

const INITIAL_STATE = {loading: false, payment_page_url: null, error: null, amount: "", surchargeAmount: "", totalAmount: "", cashAmount: "", paymentResult: "", payment_session: "", response_status: "", paymentHistories: []};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_CHECKOUT_PAGE:
			return { ...state, loading: true, response_status: ""}
		case PAYING_BY_CASH:
			return { ...state, loading: true }
		case SHOW_CHECKOUT_PAGE_SUCCESS:
			return { ...state, loading: false, payment_page_url: action.payload.app_payment_page_url, payment_session: action.payload.id}
		case SHOW_CHECKOUT_PAGE_FAIL:
			return { ...state, error: "Something went wrong !" }
		case AMOUNT_CHANGED:
			netAmount = action.payload == "" ? 0 : parseFloat(action.payload);
			surchargeAmountFloat = (netAmount * 0.02);
			totalAmountFloat = netAmount + surchargeAmountFloat; 
			return { ...state, amount: action.payload, surchargeAmount: surchargeAmountFloat.toFixed(2).toString(), totalAmount: totalAmountFloat.toString() }
		case CASH_AMOUNT_CHANGED:
			return { ...state, cashAmount: action.payload }
		case FETCH_PAYMENT_RESULT_SUCCESS:
			return { ...state, loading: false, response_status: action.payload.response_description  }
		case SURCHARGE_AMOUNT_CHANGED:
			surchargeAmountFloat = action.payload == "" ? 0 : parseFloat(action.payload);
			totalAmountFloat = parseFloat(state.amount) + surchargeAmountFloat; 
			return { ...state, surchargeAmount: action.payload, totalAmount: totalAmountFloat.toString()}
		case SET_PAYMENT_RESULT:
			return { ...state, loading: true, paymentResult: action.payload};
		case FETCHING_PAYMENT_HISTORIES:
			return { ...state, loading: true }
		case FETCH_PAYMENT_HISTORIES_SUCCESS:
			return { ...state, loading: false, paymentHistories: action.payload.links.payments_list}
		default:
			return state;
	}
};