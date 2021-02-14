import React from 'react';
import { mount as enzymeMount, configure as enzymeConfigure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// *********************************
// Enzyme Integration
// *********************************
enzymeConfigure({ adapter: new Adapter() });
// *********************************
// mockStore
// *********************************
export const mockStore = configureMockStore([thunk]);

export const mount = element => {
  const { type: Component, props: properties } = element;
  return enzymeMount(
    React.createElement(
      props => (
        <MemoryRouter>
          <Component {...props} />
        </MemoryRouter>
      ),
      properties,
    ),
  );
};
