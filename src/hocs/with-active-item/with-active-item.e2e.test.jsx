import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.jsx';

Enzyme.configure({
	adapter: new Adapter()
});

const ListComponent = ({onListClick, onActiveItemChange, activeItem}) => (
	<ul onClick={onListClick}>
		<li className={`${activeItem === 0 ? `active` : ``}`}><header>Header-0</header><p>Text-0</p></li>
		<li className={`${activeItem === 1 ? `active` : ``}`}><header>Header-1</header><p>Text-1</p></li>
		<li className={`${activeItem === 2 ? `active` : ``}`}><header>Header-2</header><p>Text-2</p></li>
		<li className={`${activeItem === 3 ? `active` : ``}`}><header>Header-3</header><p>Text-3</p></li>
		<li className={`${activeItem === 4 ? `active` : ``}`}><header>Header-4</header><p>Text-4</p></li>
	</ul>);

const div = global.document.createElement(`div`);
global.document.body.appendChild(div);

const ListComponentWithActiveItem = withActiveItem(ListComponent, `header`);
const handleActiveItenChange = jest.fn()

const tree = Enzyme.mount(<ListComponentWithActiveItem onActiveItemChange={handleActiveItenChange} activeItem={1} />, {attachTo: div});
const secondLi = tree.find(`li`).at(1);
const secondHeader = secondLi.find(`header`);

it(`should not call onActiveItemChange when click on <ul>`, () => {
	tree.simulate(`click`);
	expect(handleActiveItenChange).toHaveBeenCalledTimes(0)
	expect(secondLi.hasClass(`active`)).toBe(false)
});

it(`should not call onActiveItemChange when click on <li>`, () => {
	secondLi.simulate(`click`);
	expect(handleActiveItenChange).toHaveBeenCalledTimes(0)
	expect(secondLi.hasClass(`active`)).toBe(false)
});

it(`should call onActiveItemChange when click on second <header> with 1`, () => {
	secondHeader.simulate(`click`);
	expect(handleActiveItenChange).toHaveBeenCalledTimes(1);
	expect(handleActiveItenChange).toHaveBeenCalledWith(1);
	expect(secondLi.hasClass(`active`)).toBe(true)
});

