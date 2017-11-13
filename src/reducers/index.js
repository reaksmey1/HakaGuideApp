import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TourPartyReducer from './TourPartyReducer';
import ActivityReducer from './ActivityReducer';
import ActivitySheetReducer from './ActivitySheetReducer';
import PaymentReducer from './PaymentReducer';
import AdHocReducer from './AdHocReducer';

export default combineReducers({
	auth: AuthReducer,
	tourParty: TourPartyReducer,
	activity: ActivityReducer,
	activitySheet: ActivitySheetReducer,
	payment: PaymentReducer,
	adhoc: AdHocReducer
});