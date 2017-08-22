import { EMAIL_CHANGED, 
				 PASSWORD_CHANGED,
				 LOGIN_USER_SUCCESS,
				 LOGIN_USER_FAIL,
				 LOGIN_USER 
				} from '../actions/types';

const INITIAL_STATE = {email: '', password: '', session: null, token: '', error: '', loading: false};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload, error: '' };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, session: action.payload, token: action.payload.token, error: '', loading: false, email: '', password: '' };
		case LOGIN_USER_FAIL:
			return { ...state, error: action.payload, password: '', loading: false};
		case LOGIN_USER:
			return { ...state, loading: true, error: '' }
		default:
			return state;
	}
};