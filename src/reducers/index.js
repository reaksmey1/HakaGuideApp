import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TourPartyReducer from './TourPartyReducer';

export default combineReducers({
	auth: AuthReducer,
	tourParty: TourPartyReducer,
	// tourGroup: TourGroupReducer
});