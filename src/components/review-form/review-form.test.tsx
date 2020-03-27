import * as React from 'react';
import * as Enzyme from 'enzyme';
import {ReviewForm} from './review-form';
import { EMPTY_REVIEW } from '../../const/const';

const savedReview = EMPTY_REVIEW;

it(`<ReviewForm /> should be rendered correctly`, () => {
  const tree = Enzyme.mount(
      <ReviewForm
        offerID={`1`}
        savedReview={savedReview}
        isSending={false}
        onFormSubmit={()=>{}}
        onReviewChange={()=>{}}
      />
  );

  expect(tree.getDOMNode()).toMatchSnapshot();
});
