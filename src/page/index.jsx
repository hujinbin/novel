import { connect } from 'react-redux';
import { RoutesIndex } from '../router/index.jsx.js';

export default connect(
    state => state,
    undefined,
    undefined,
    { pure: false }
)(RoutesIndex);
