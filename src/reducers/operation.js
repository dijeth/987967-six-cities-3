import DataActionCreator from './data/action-creator.js';
import AppActionCreator from './app/action-creator.js';
import Adapter from '../adapter/adapter.js';

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
  	dispatch(AppActionCreator.changeLoadingStatus(true));

    return api.get(`/hotels`)
      .then((response) => {
        const data = Adapter.rawToData(response.data);

        dispatch(DataActionCreator.loadOffers(data.data));
        dispatch(DataActionCreator.loadCities(data.cities));
        dispatch(AppActionCreator.changeCity(data.cities[0]));
        
  			dispatch(AppActionCreator.changeLoadingStatus(false));
      });
  }
};
