import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const PLACES_COUNT = 100;
const mocks = [{
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  picture: `picture-1`,
  cost: 123,
  rating: 80,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`
},
{
  id: `id-2`,
  title: `title-2`,
  type: `Apartment`,
  picture: `picture-2`,
  cost: 456,
  rating: 100,
  isPremium: true,
  isFavorite: false,
  city: `Brussels`
}];

Enzyme.configure({
  adapter: new Adapter()
});

it(`PlaceCardName should be pressed`, () => {
  const handleCardClick = jest.fn();
  const main = mount(
      <Main
        placesCount={PLACES_COUNT}
        offerList={mocks}
        handleCardClick={handleCardClick}
      />);
  const cardNames = main.find(`.place-card__name a`);

  cardNames.forEach((it) => {
    it.props().onClick();
  });

  expect(handleCardClick).toHaveBeenCalledTimes(mocks.length);
});
