import React from 'react';
import PropTypes from 'prop-types';
import {SORT_LIST} from '../../const.js';
import {connect} from 'react-redux';
import ActionCreator from '../../action-creator.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const SortList = ({activeItem, onListClick, onViewChange, isOpen}) => {
  const sortList = SORT_LIST.map((it, i) => {
    const className = `places__option ${i === activeItem ? `places__option--active` : ``}`;
    return <li className={className} tabIndex="0" key={`${it}-${i}`}>{it}</li>;
  });

  const listClassName = `places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onViewChange}>
        {SORT_LIST[activeItem]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={listClassName} onClick={(evt) => {
        onListClick(evt);
        onViewChange();
      }}>
        {sortList}
      </ul>
    </form>
  );
};

SortList.propTypes = {
  activeItem: PropTypes.number,
  onActiveItemChange: PropTypes.func,
  onListClick: PropTypes.func,
  onViewChange: PropTypes.func,
  isOpen: PropTypes.bool
};

SortList.defaultProps = {
  isOpen: false
};

const mapDispatchToProps = (dispatch) => ({
  onActiveItemChange(activeItem) {
    dispatch(ActionCreator.changeSortType(activeItem));
  }
});

export {SortList};
export default connect(null, mapDispatchToProps)(withActiveItem(SortList));
