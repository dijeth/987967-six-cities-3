import * as React from 'react';
import {SORT_LIST, SortType} from '../../const/const';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

type Props = {
  items: Array<SortType>;
  activeItem: SortType;
  onListClick: (evt: React.MouseEvent<HTMLElement>) => void;
  onViewChange: () => void;
  isOpen: boolean;
};

const SortList: React.FC<Props> = ({activeItem, onListClick, onViewChange, isOpen, items}) => {
  const sortList = items.map((it, i) => {
    const className = `places__option ${it === activeItem ? `places__option--active` : ``}`;
    return <li className={className} tabIndex={0} key={`${it}-${i}`}>{it}</li>;
  });

  const listClassName = `places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onViewChange}>
        {activeItem}
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
