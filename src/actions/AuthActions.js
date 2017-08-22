import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { EMAIL_CHANGED, 
				 PASSWORD_CHANGED,
				 LOGIN_USER,
				 LOGIN_USER_SUCCESS,
				 LOGIN_USER_FAIL 
				} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

const loginUserSuccess = (dispatch, session) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: session
	});
	// Actions.main1();
};

const loginUserFail = (dispatch) => {
	dispatch({type: LOGIN_USER_FAIL});
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		axios.post('https://hakatours.com/api/sessions', {
			"session": {
				"email": email,
				"password": password
			}
		})
		.then(response => loginUserSuccess(dispatch, response.data.session))
			// response => {console.log(response.data);}
			// console.log(response.data.session.token);)
		.catch(error => loginUserFail(dispatch));
		// console.log(error.response.data.errors);
	}
};