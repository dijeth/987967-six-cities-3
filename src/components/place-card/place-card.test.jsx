import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCard} from './place-card.jsx';
// import {Provider} from "react-redux";
// import configureStore from "redux-mock-store";

// const mockStore = configureStore([]);

const mock = {
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`,
  coord: [123, 456]
};

describe(`<PlaceCard /> should be render correctly`, () => {
  it(`with isNearPlaces === false`, () => {
    const card = renderer.create(
        <PlaceCard
          offer={mock}
          onCardClick = {() => {}}
          onCardHover = {() => {}}
          isNearPlaces = {false}
        />).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with isNearPlaces === true`, () => {
    const card = renderer.create(
        <PlaceCard
          offer={mock}
          onCardClick = {() => {}}
          onCardHover = {() => {}}
          isNearPlaces = {true}
        />).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with isPremium === true`, () => {
    mock.isPremium = true;
    const card = renderer.create(
        <PlaceCard
          offer={mock}
          onCardClick = {() => {}}
          onCardHover = {() => {}}
          isNearPlaces = {true}
        />).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with isFavorite === false`, () => {
    mock.isFavorite = false;
    const card = renderer.create(
        <PlaceCard
          offer={mock}
          onCardClick = {() => {}}
          onCardHover = {() => {}}
          isNearPlaces = {true}
        />).toJSON();

    expect(card).toMatchSnapshot();
  });
});
