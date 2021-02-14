import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from './index';

describe(PageNotFound, () => {
  const wrapper = shallow(<PageNotFound />);

  it('renders a 404 | Page not found text', () => {
    expect(wrapper.find('p').first().text()).toEqual('404 | Page not found');
  });
});
