import React from 'react';
import PropTypes from 'prop-types';
import { SortType } from '../../const.js';
import {indexOf} from '../../util.js';

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
      isOpen: false,
      activeType: SortType.POPULAR
    };

    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleSortListClick = this._handleSortListClick.bind(this);
  }

  _handleSortTypeClick() {
    this.setState((state) => ({ isOpen: !state.isOpen }))
  }

  _handleSortListClick(evt) {
    const index = indexOf(evt.target);

    if (index !== undefined) {
      this.setState({
        activeType: SORT_LIST[index],
        isOpen: false
      })
    };
  }

  render() {
    const sortList = SORT_LIST.map((it, i) => {
      const className = `places__option ${it === this.state.activeType ? `places__option--active` : ``}`;
      return <li className={className} tabIndex="0" key={`${it}-${i}`}>{it}</li>
    });

    return (
      <form className="places__sorting" action="#" method="get">
			  <span className="places__sorting-caption">Sort by</span>
			  <span className="places__sorting-type" tabIndex="0" onClick={this._handleSortTypeClick}>
			    {this.state.activeType}
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

export default SortList;
