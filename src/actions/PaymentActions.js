import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from './config';
import { SHOW_CHECKOUT_PAGE, 
				 SHOW_CHECKOUT_PAGE_SUCCESS,
				 SHOW_CHECKOUT_PAGE_FAIL,
				 AMOUNT_CHANGED,
				 CASH_AMOUNT_CHANGED,
				 SHOW_BOOKED_ACTIVITIES_SUCCESS,
				 SURCHARGE_AMOUNT_CHANGED,
				 SET_PAYMENT_RESULT,
				 FETCH_PAYMENT_RESULT_SUCCESS,
				 FETCHING_PAYMENT_HISTORIES,
				 FETCH_PAYMENT_HISTORIES_SUCCESS,
				 PAYING_BY_CASH } from './types';


const showCheckoutSuccess = (dispatch, payment) => {
	dispatch({
		type: SHOW_CHECKOUT_PAGE_SUCCESS,
		payload: payment
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

export const backToCustomerDetail = (traveller, session, booking_id) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/getActivitiesByTraveller?traveller_id=${traveller.id}`, { headers: { email: session.email, token: session.token } })
			.then(response => backToCustomerDetailSuccess(dispatch, response.data))
	}
};

export const onSplitPaymentPress = () => {
	return (dispatch) => {
		Actions.splitPayment();
	}
};

export const onPaymentHistoryPress = () => {
	return (dispatch) => {
		Actions.paymentHistory();
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

export const onSurchargeAmountChange = (text) => {
	return {
		type: SURCHARGE_AMOUNT_CHANGED,
		payload: text
	}
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

const backToCustomerDetailSuccess = (dispatch, response) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: response
	});
	Actions.customerMain();
};

const showBookedActivitiesSuccess = (dispatch, response) => {
	dispatch({
		type: SHOW_BOOKED_ACTIVITIES_SUCCESS,
		payload: response
	});
	Actions.customerDetail();
};

const fetchPaymentResultSuccess = (dispatch, response) => {
	dispatch({
		type: FETCH_PAYMENT_RESULT_SUCCESS,
		payload: response
	});
	Actions.paymentResultMain({type: 'reset'});
};

const fetchPaymentHistorySuccess = (dispatch, response) => {
	dispatch({
		type: FETCH_PAYMENT_HISTORIES_SUCCESS,
		payload: response
	});
};

export const fetchPaymentResult = (result, payment_session_id, session) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/payment_sessions/${payment_session_id}/update_from_app?result=${result}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchPaymentResultSuccess(dispatch, response.data['payment_session']))
	}
};

export const fetchPaymentHistories = (booking, session) => {
	return (dispatch) => {
		dispatch({ type: FETCHING_PAYMENT_HISTORIES });
		axios.get(BASE_URL+`/api/bookings/bookings/${booking.id}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchPaymentHistorySuccess(dispatch, response.data['bookings/booking']))
	}
};

export const onPayByCashConfirmed = (details, amount, session, booking_id, traveller) => {
	return (dispatch) => {
		dispatch({ type: PAYING_BY_CASH });
		paid_by = 'Cash Payment - '+traveller.first_name;
		axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/payByCash?details=${paid_by}&amount=${amount}&user=${session.email}`, { headers: { email: session.email, token: session.token } })
			.then(
				axios.get(BASE_URL+`/api/bookings/bookings/${booking_id}/getActivitiesByTraveller?traveller_id=${traveller.id}`, { headers: { email: session.email, token: session.token } })
					.then(response => showBookedActivitiesSuccess(dispatch, response.data))
				)
	}
};

export const onSplitPaymentConfirmed = () => {
	return (dispatch) => {
		Actions.cardOptions();
	}
};

export const payByExistedCard = (session, traveller, amount, surchargeAmount, totalAmount, card_id) => {
	return (dispatch) => {
		dispatch({ type: SHOW_CHECKOUT_PAGE });
		axios({
		  method: 'post',
		  url: BASE_URL+'/api/payment_sessions',
		  headers: { email: session.email, token: session.token },
		  data: {
		  	"payment_session": {
		  											"amount": amount.toString(),
		  											"card_id": card_id,
		  											"amount_surcharge": surchargeAmount.toString(),
		  											"total_amount": totalAmount.toString(), 
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
}

export const payByNewCard = (session, traveller, amount, surchargeAmount, totalAmount) => {
	return (dispatch) => {
		dispatch({ type: SHOW_CHECKOUT_PAGE });
		axios({
		  method: 'post',
		  url: BASE_URL+'/api/payment_sessions',
		  headers: { email: session.email, token: session.token },
		  data: {
		  	"payment_session": {
		  											"amount": amount.toString(),
		  											"amount_surcharge": surchargeAmount.toString(),
		  											"total_amount": totalAmount.toString(), 
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
}

// export const onSplitPaymentConfirmed = (session, traveller, amount, surchargeAmount, totalAmount) => {
	// return (dispatch) => {
	// 	dispatch({ type: SHOW_CHECKOUT_PAGE });
	// 	axios({
	// 	  method: 'post',
	// 	  url: BASE_URL+'/api/payment_sessions',
	// 	  headers: { email: session.email, token: session.token },
	// 	  data: {
	// 	  	"payment_session": {
	// 	  											"amount": amount.toString(),
	// 	  											"amount_surcharge": surchargeAmount.toString(),
	// 	  											"total_amount": totalAmount.toString(), 
	// 													"payment_page_url": null, 
	// 													"created_at": null, 
	// 													"updated_at": null, 
	// 													"response_description": null, 
	// 													"booking_id": traveller.booking_id
	// 												}
	// 		}
	// 	})
	// 	.then(response => showCheckoutSuccess(dispatch, response.data["payment_session"]));
	// }
// };

export const showPaymentResult = (result, payment_session_id, session) => {
	return (dispatch) => {
		axios.get(BASE_URL+`/api/payment_sessions/${payment_session_id}/update_from_app?result=${result}`, { headers: { email: session.email, token: session.token } })
			.then(response => fetchPaymentResultSuccess(dispatch, response.data['payment_session']))
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