import {
				ITINERARIES_FETCH, 
				ITINERARIES_FETCH_SUCCESS,
				ITINERARY_SELECTED,
				ACTIVITIES_FETCH_SUCCESS,
				ACTIVITY_SELECTED,
				OPTIONS_FETCH_SUCCESS,
				OPTION_SELECTED,
				ADD_ACTIVITY_SUCCESS,
				SHOW_BOOKED_ACTIVITIES,
				SHOW_BOOKED_ACTIVITIES_SUCCESS,
				SHOW_BOOKED_ACTIVITIES_FAIL
				} from '../actions/types';

const INITIAL_STATE = {days: [], 
											 bookedActivities: [],
											 onRoadActivities: [], 
											 refundedActivities: [],
											 customAddons: [],
											 selectedDay: null, 
											 activities: [], 
											 selectedActivity: null, 
											 options: [], 
											 selectedOption: null,
											 selectedTraveller: null, 
											 loading: true, 
											 error: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_BOOKED_ACTIVITIES:
			return { ...state, loading: true }
		case SHOW_BOOKED_ACTIVITIES_SUCCESS:
			var tmp_booked_activities = [];
			var tmp_refunded_activities = [];
			var tmp_onroad_activities = [];
			for (var i in action.payload["bookings/addons"]) {
				var el = action.payload["bookings/addons"][i]
			  if (el["refunded"] == false) {
			  	if (el["pre_booked"] == true) {
			  		tmp_booked_activities.push(el);
			  	} else {
			  		tmp_onroad_activities.push(el);
			  	}
		  	} else {
		  		tmp_refunded_activities.push(el);
		  	}
			}

			return { ...state, loading: false, selectedTraveller: action.payload["bookings/traveller"], customAddons: action.payload["bookings/customAddons"], bookedActivities: tmp_booked_activities, refundedActivities: tmp_refunded_activities, onRoadActivities: tmp_onroad_activities }
		case SHOW_BOOKED_ACTIVITIES_FAIL:
			return { ...state, error: 'Something went wrong' }
		case ITINERARIES_FETCH:
			return { ...state, loading: true }
		case ITINERARIES_FETCH_SUCCESS:
			return { ...state, loading: false, days: action.payload }
		case ITINERARY_SELECTED:
			return { ...state, selectedDay: action.payload }
		case ACTIVITIES_FETCH_SUCCESS:
			return { ...state, loading: false, activities: action.payload }
		case ACTIVITY_SELECTED:
			return { ...state, selectedActivity: action.payload }
		case OPTIONS_FETCH_SUCCESS:
			return { ...state, loading: false, options: action.payload }	
		case OPTION_SELECTED:
			return { ...state, selectedOption: action.payload }
		case ADD_ACTIVITY_SUCCESS:
			return { ...state}
		default:
			return state;
	}
};