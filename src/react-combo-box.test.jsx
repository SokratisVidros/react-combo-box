import React from 'react';
import {shallow} from 'enzyme';
import ReactCombobox from './react-combo-box';
import renderer from 'react-test-renderer';

test('<ReactCombobox/> renders correctly the combobox UI with primary and alternate values', () => {
  const component = renderer.create(
    <ReactCombobox
      name='email'
      primary='john@example.com'
      alternates={['john.doe@example.com', 'john_doe@example.com']}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<ReactCombobox/> expands and collapses alternate values on toggle click', () => {
  const component = renderer.create(
    <ReactCombobox
      name='email'
      primary='john@example.com'
      alternates={['john.doe@example.com', 'john_doe@example.com']}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Expand
  tree.children[1].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Collapse
  tree.children[1].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<ReactCombobox/> updates primary value on "Make primary" click', () => {
  const cb = jest.fn();
  const component = shallow(
    <ReactCombobox
      name='email'
      primary='john@example.com'
      alternates={['john.doe@example.com', 'john_doe@example.com']}
      collapsed={false}
      onUpdate={cb}
    />
  );

  component.find('[data-ui="make-primary-btn"]').first().simulate('click', {
    preventDefault() {},
    target: {
      getAttribute() {
        return 'john.doe@example.com';
      }
    }
  });

  expect(cb.mock.calls[0][0]).toBe('john.doe@example.com');
});

test('<ReactCombobox/> updates primary value on blur', () => {
  const cb = jest.fn();
  const component = shallow(
    <ReactCombobox
      name='email'
      primary='john@example.com'
      alternates={['john.doe@example.com', 'john_doe@example.com']}
      onUpdate={cb}
    />
  );

  const primaryInput = component.find('input').first();

  primaryInput.simulate('blur', {
    target: {
      value: 'carla.coe@example.com'
    }
  });

  expect(cb.mock.calls[0][0]).toBe('carla.coe@example.com');
});

test('<ReactCombobox/> renders correctly the combobox UI without alternate values', () => {
  const component = renderer.create(
    <ReactCombobox
      name='email'
      primary='john@example.com'
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
