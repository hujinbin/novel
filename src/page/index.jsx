import { connect } from 'react-redux';
import { RoutesIndex } from '../router/index.jsx';
import './index.less';

export default connect(
    state => state,
    undefined,
    undefined,
    { pure: false }
)(RoutesIndex);
