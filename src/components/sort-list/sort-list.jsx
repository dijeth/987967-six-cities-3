import React from 'react';
import PropTypes from 'prop-types';
import { SortType } from '../../const.js';
import { indexOf } from '../../util.js';
import { connect } from 'react-redux';
import ActionCreator from '../../action-creator.js';

const SORT_LIST = [
  SortType.POPULAR,
  SortType.PRICE_LOW_TO_HIGH,
  SortType.PRICE_HIGH_TO_LOW,
  SortType.TOP_RATED_FIRST
];

class SortList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleSortListClick = this._handleSortListClick.bind(this);
  }

  _handleSortTypeClick() {
    this.setState((state) => ({ isOpen: !state.isOpen }))
  }

  _handleSortListClick(evt) {
    const index = indexOf(evt.target);

    this.setState({
      isOpen: false
    });

    if (index !== undefined) {
      this.props.onSortTypeChange(SORT_LIST[index]);
    };
  }

  render() {
    const { activeType, onSortTypeChange } = this.props;

    const sortList = SORT_LIST.map((it, i) => {
      const className = `places__option ${it === activeType ? `places__option--active` : ``}`;
      return <li className={className} tabIndex="0" key={`${it}-${i}`}>{it}</li>
    });

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0" onClick={this._handleSortTypeClick}>
          {activeType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${this.state.isOpen ? `places__options--opened` : ``}`} onClick={this._handleSortListClick}>
          {sortList}
        </ul>
      </form>
    )
  }
};

SortList.propTypes = {
  activeType: PropTypes.oneOf([
    SortType.POPULAR,
    SortType.PRICE_LOW_TO_HIGH,
    SortType.PRICE_HIGH_TO_LOW,
    SortType.TOP_RATED_FIRST
  ]).isRequired,
  onSortTypeChange: PropTypes.func
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
    dispatch(ActionCreator.SortOffers());
  }
})

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
