import React from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const.js';
import {connect} from 'react-redux';
import ActionCreator from '../../action-creator.js';

const SORT_LIST = [
  SortType.POPULAR,
  SortType.PRICE_LOW_TO_HIGH,
  SortType.PRICE_HIGH_TO_LOW,
  SortType.TOP_RATED_FIRST
];

const SortList = ({activeType, onSortTypeChange, isOpen, onViewChange}) => {
  const sortList = SORT_LIST.map((it, i) => {
    const className = `places__option ${it === activeType ? `places__option--active` : ``}`;
    const handler = () => {
      onSortTypeChange(it);
      onViewChange();
    };

    return <li className={className} tabIndex="0" onClick={handler} key={`${it}-${i}`}>{it}</li>;
  });

  const listClassName = `places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onViewChange}>
        {activeType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={listClassName}>
        {sortList}
      </ul>
    </form>
  );
};

SortList.propTypes = {
  activeType: PropTypes.oneOf([
    SortType.POPULAR,
    SortType.PRICE_LOW_TO_HIGH,
    SortType.PRICE_HIGH_TO_LOW,
    SortType.TOP_RATED_FIRST
  ]).isRequired,
  onSortTypeChange: PropTypes.func,
  onViewChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

SortList.defaultProps = {
  activeType: SortType.POPULAR
};

const mapStateToProps = (state) => ({
  activeType: state.sortType
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(activeType) {
    dispatch(ActionCreator.changeSortType(activeType));
    dispatch(ActionCreator.sortOffers());
  }
});

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
