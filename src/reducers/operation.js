import ActionCreator from './action-creator.js';
import Adapter from '../adapter/adapter.js';

export const Operation = {
	loadOffers: () => (dispatch, getState, api) => {
		api.get(`/hotels`)
			.then((response) => {
				const data = Adapter.rawToData(response.data);

				dispatch(ActionCreator.loadOffers(data.data));
				dispatch(ActionCreator.loadCities(data.cities));
				dispatch(ActionCreator.changeCity(data.cities[0]));

				console.log(data.data[0])
			})
	}
}