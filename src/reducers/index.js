import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TourPartyReducer from './TourPartyReducer';
import ActivityReducer from './ActivityReducer';

export default combineReducers({
	auth: AuthReducer,
	tourParty: TourPartyReducer,
	activity: ActivityReducer
});