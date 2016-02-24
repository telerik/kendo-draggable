import * as React from 'react';
import { shallow } from 'enzyme';
import Component from '../src/Component';

describe('Component', () => {
    let result;

    beforeEach(() => { /* test setup */ });

    it('should render a div', () => {
        result = shallow(<Component />);
        expect(result.type()).toEqual('div');
    });
});
