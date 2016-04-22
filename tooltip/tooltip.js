import React from 'react';
import SelectEditAction from './select-edit-action';
import SuggestChange from './suggest-change';
import { SUGGEST_CHANGE, COMMENT } from './tooltip-actions';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'SELECT_ACTION',
      newText: null
    };

    this._onSelectedAction = this._onSelectedAction.bind(this);
  }

  _onSelectedAction(action) {
    console.log(action);
    this.setState({ mode: action });
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    const { range, offsetTop, onNewText, highlightedText } = this.props;
    const { top, left, width} = range.getBoundingClientRect();
    const position = {
      top: (top - 300 + offsetTop) + 'px',
      left: (left - 150 + width/2) + 'px'
    };

    let compoent = {
      SELECT_ACTION: <SelectEditAction onSelectedAction={this._onSelectedAction}/>,
      SUGGEST_CHANGE: <SuggestChange onNewText={onNewText} highlightedText={highlightedText}/>,
      COMMENT: <p>Comment</p>
    }

    return (
      <div style={position} className="tooltip">
        { compoent[this.state.mode] }
      </div>
    );
  }
}

Tooltip.propTypes = {
  onNewText: React.PropTypes.func.isRequired,
  highlightedText: React.PropTypes.string.isRequired
}

export default Tooltip;
