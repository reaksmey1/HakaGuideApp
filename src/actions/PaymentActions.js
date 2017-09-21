import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { SHOW_CHECKOUT_PAGE, 
				 SHOW_CHECKOUT_PAGE_SUCCESS,
				 SHOW_CHECKOUT_PAGE_FAIL,
				 AMOUNT_CHANGED } from './types';


const showCheckoutSuccess = (dispatch, payment) => {
	dispatch({
		type: SHOW_CHECKOUT_PAGE_SUCCESS,
		payload: payment.payment_page_url
	});
	Actions.checkoutPage();
};

const showCheckoutFail = (dispatch) => {
	dispatch({
		type: SHOW_CHECKOUT_PAGE_FAIL
	});
};

export const onCheckoutPress = (session, traveller) => {
	return (dispatch) => {
		Actions.checkoutOptions();
	}
};

export const backToCustomerDetail = () => {
	return (dispatch) => {
		Actions.customerDetail({type: 'reset'});
	}
};

export const onSplitPaymentPress = () => {
	return (dispatch) => {
		Actions.splitPayment();
	}
};

export const onAmountChange = (text) => {
	return {
		type: AMOUNT_CHANGED,
		payload: text
	};
};

export const onRefundPagePress = () => {
	return (dispatch) => {
		Actions.refundRecipes();
	}
};

export const onSplitPaymentConfirmed = (session, traveller, amount) => {
	return (dispatch) => {
		axios({
		  method: 'post',
		  url: BASE_URL+'/api/payment_sessions',
		  headers: { email: session.email, token: session.token },
		  data: {
		  	"payment_session": {
		  											"amount": amount.toString(), 
														"payment_page_url": null, 
														"created_at": null, 
														"updated_at": null, 
														"response_description": null, 
														"booking_id": traveller.booking_id
													}
			}
		})
		.then(response => showCheckoutSuccess(dispatch, response.data["payment_session"]));
	}
};

export const onPayFullAmountPress = (session, traveller) => {
	return (dispatch) => {
		axios({
		  method: 'post',
		  url: BASE_URL+'/api/payment_sessions',
		  headers: { email: session.email, token: session.token },
		  data: {
		  	"payment_session": {
		  											"amount": traveller.links.balance_remaining, 
														"payment_page_url": null, 
														"created_at": null, 
														"updated_at": null, 
														"response_description": null, 
														"booking_id": traveller.booking_id
													}
			}
		})
		.then(response => showCheckoutSuccess(dispatch, response.data["payment_session"]));
	}
};