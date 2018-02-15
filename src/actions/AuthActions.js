import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { EMAIL_CHANGED, 
				 PASSWORD_CHANGED,
				 LOGIN_USER,
				 LOGIN_USER_SUCCESS,
				 LOGIN_USER_FAIL,
				 STORE_TO_SESSION 
				} from './types';
import { BASE_URL } from './config';

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
	AsyncStorage.multiSet([
				['token', session.token],
				['email', session.email]
			]);
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: session
	});
	Actions.main();
};

const loginUserFail = (dispatch, text) => {
	dispatch({
		type: LOGIN_USER_FAIL,
		payload: text
	});
};

export const showTourParty = () => {
	return (dispatch) => {
		Actions.main({type: 'reset'});
	}
};

export const showLogin = () => {
	return (dispatch) => {
		Actions.auth({type: 'reset'});
	}
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		axios.post(BASE_URL+'/api/sessions', {
			"session": {
				"email": email,
				"password": password
			}
		})
		.then((response) => {
			if (response.data.session.is_admin) {
				loginUserSuccess(dispatch, response.data.session)
			} else {
				loginUserFail(dispatch, "Access Denied !")
			}
		})
		// .then(response => loginUserSuccess(dispatch, response.data.session))
		.catch(error => loginUserFail(dispatch, "Authentication Failed"));
	}
};