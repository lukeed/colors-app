/* global: mojs */
import { h, Component } from 'preact';
import {addModules, tuneModules} from './mojs-copy-animation';

class CopyAnimation extends Component {
  shouldComponentUpdate(nextProps) {
    const {x, y} = nextProps;
    tuneModules(this._modules, x, y);

    return false;
  }

  componentDidMount() {
    this._modules = addModules(this.props.timeline, this._el);
  }

  render() {
    const style = {
      position:   'absolute',
      left:       0,
      top:        0,
      zIndex:     2,
      width:      '100%',
      height:     '100%',
      overflow:   'hidden',
      cursor:     'pointer'
    };

    return (
      <div ref={ el => this._el = el } style={style} />
    );
  }
}

export default CopyAnimation;
