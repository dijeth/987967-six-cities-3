import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

it(`<ReviewForm /> should be rendered correctly`, () => {
  const tree = Enzyme.mount(
      <ReviewForm
        offerID={`1`}
        savedReview={{}}
      />
  );

  expect(tree.getDOMNode()).toMatchSnapshot();
});
