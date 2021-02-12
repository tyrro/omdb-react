import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// *********************************
// Enzyme Integration
// *********************************
enzymeConfigure({ adapter: new Adapter() });
