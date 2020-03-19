import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`<ReviewForm />`, () => {
  it(`should call onSubmit callback when the form was submitted`, () => {
    const handleFormSubmit = jest.fn();

    const tree = Enzyme.mount(
        <ReviewForm
          offerID={`1`}
          savedReview={{}}
          onFormSubmit={handleFormSubmit}
        />
    );

    tree.simulate(`submit`);
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it(`should call onReviewChange callback when the form was changed`, () => {
    const handleReviewChange = jest.fn();

    const tree = Enzyme.mount(
        <ReviewForm
          offerID={`1`}
          savedReview={{}}
          onReviewChange={handleReviewChange}
        />
    );

    tree.find(`.form__rating`).at(0).simulate(`blur`);
    expect(handleReviewChange).toHaveBeenCalledTimes(1);
  });
});
