import * as React from "react";
import * as Enzyme from "enzyme";
import {ReviewForm} from "./review-form";
import { EMPTY_REVIEW } from "../../const/const.js";

describe(`<ReviewForm />`, () => {
  it(`should call onSubmit callback when the form was submitted`, () => {
    const handleFormSubmit = jest.fn();

    const tree = Enzyme.mount(
        <ReviewForm
          offerID={`1`}
          savedReview={EMPTY_REVIEW}
          onFormSubmit={handleFormSubmit}
          isSending={false}
          onReviewChange={()=>{}}
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
          savedReview={EMPTY_REVIEW}
          onReviewChange={handleReviewChange}
          isSending={false}
          onFormSubmit={()=>{}}
          />
    );

    tree
      .find(`.form__rating`)
      .at(0)
      .simulate(`blur`);

    expect(handleReviewChange).toHaveBeenCalledTimes(1);
  });

  it(`should fill the form elements correctly when the form was mounted & offerID === savedOfferID`, () => {
    const handleReviewChange = jest.fn();

    const tree = Enzyme.mount(
        <ReviewForm
          offerID={`1`}
          savedReview={{
            offerID: `1`,
            rating: 4,
            text: `test-text`,
          }}
          onReviewChange={handleReviewChange}
          isSending={false}
          onFormSubmit={()=>{}}
          />
    );

    tree
      .find(`.form__rating`)
      .at(0)
      .simulate(`blur`);

    expect(handleReviewChange).toHaveBeenCalledTimes(1);
    expect(handleReviewChange).toHaveBeenNthCalledWith(1, {
      text: `test-text`,
      rating: 4,
      offerID: `1`
    });
  });
});

it(`should fill the form elements correctly when the form was mounted & offerID !== savedOfferID`, () => {
  const handleReviewChange = jest.fn();

  const tree = Enzyme.mount(
      <ReviewForm
        offerID={`1`}
        savedReview={{
          offerID: `2`,
          rating: 4,
          text: `test-text`
        }}
        onReviewChange={handleReviewChange}
        isSending={false}
        onFormSubmit={()=>{}}
      />
  );

  tree
    .find(`.form__rating`)
    .at(0)
    .simulate(`blur`);

  expect(handleReviewChange).toHaveBeenCalledTimes(1);
  expect(handleReviewChange).toHaveBeenNthCalledWith(1, {
    text: ``,
    rating: 0,
    offerID: `1`
  });
});
