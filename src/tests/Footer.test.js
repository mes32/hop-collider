import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';

import Footer from '../components/Footer/Footer';

Enzyme.configure({ adapter: new Adapter() })

describe('<Footer />', () => {
    const wrapper = shallow(<Footer />);

    test('Renders 1 <footer> component', () => {
        expect(wrapper.find('footer').length).toBe(1);
    });

    test('Renders copyright information', () => {
        const COPYRIGHT = '© Michael Stockman';
        expect(wrapper.find('footer').render().text()).toBe(COPYRIGHT);
    });
});