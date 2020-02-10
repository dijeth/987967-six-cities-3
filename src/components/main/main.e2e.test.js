import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const PLACES_COUNT = 100;
const PLACE_CARD_NAMES = [`placeCardName4`, `placeCardName5`];

Enzyme.configure({
  adapter: new Adapter()
});

it(`PlaceCardName should be pressed`, () => {
  const placeCardNameClickHandler = jest.fn();
  const main = shallow(
      <Main
        placesCount={PLACES_COUNT}
        placeCardNames={PLACE_CARD_NAMES}
        placeCardNameClickHandler={placeCardNameClickHandler}
      />);
  const cardNames = main.find(`.place-card__name a`);

  cardNames.forEach((it) => {
    it.props().onClick();
  });

  expect(placeCardNameClickHandler).toHaveBeenCalledTimes(PLACE_CARD_NAMES.length);
});
