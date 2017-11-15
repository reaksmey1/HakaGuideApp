import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { SHOW_CHECKOUT_PAGE, 
				 SHOW_CHECKOUT_PAGE_SUCCESS,
				 SHOW_CHECKOUT_PAGE_FAIL,
				 AMOUNT_CHANGED,
				 CASH_AMOUNT_CHANGED,
				 SHOW_BOOKED_ACTIVITIES_SUCCESS } from './types';


const showCheckoutSuccess = (dispatch, payment) => {
	dispatch({
		type: SHOW_CHECKOUT_PAGE_SUCCESS,
		payload: payment.app_payment_page_url
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
		Actions.customerDetail({refresh: true});
	}
};

export const onSplitPaymentPress = () => {
	return (dispatch) => {
		Actions.splitPayment();
	}
};

export const onPayByCashPress = () => {
	return (dispatch) => {
		Actions.payByCash();
	}
};

export const onAmountChange = (text) => {
	return {
		type: AMOUNT_CHANGED,
		payload: text
	};
};

export const onCashAmountChange = (text) => {
	return {
		type: CASH_AMOUNT_CHANGED,
		payload: text
	};
};

export const onRefundPagePress = () => {
	return (dispatch) => {
		Actions.refundRecipes();
	}
};

// export const onPayByCashConfirmed = (session, traveller, amount) => {
// 	return (dispatch) => {
// 		axios({
// 			method: 'post'
// 		})
// 	}
// };

const showBookedActivitiesSuccess = (dispatch, response) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: response
	});
	Actions.customerDetail();
};

export const onPayByCashConfirmed = (details, amount, session, booking_id, traveller) => {
	return (dispatch) => {
		paid_by = 'Cash Payment - '+traveller.first_name;
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/payByCash?details=${paid_by}&amount=${amount}&user=${session.email}`, { headers: { email: session.email, token: session.token } })
			.then(
				axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/getActivitiesByTraveller?traveller_id=${traveller.id}`, { headers: { email: session.email, token: session.token } })
					.then(response => showBookedActivitiesSuccess(dispatch, response.data))
				)
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