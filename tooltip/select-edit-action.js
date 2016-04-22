import React from 'react';
import { SUGGEST_CHANGE, COMMENT } from './tooltip-actions';

class SelectEditAction extends React.Component {
  render() {
    const { onSelectedAction } = this.props;
    return (
      <div>
        <p className="netto block-s">I want to...</p>
        <button className="edit-action-btn" onClick={onSelectedAction.bind(null, SUGGEST_CHANGE)}>Suggest change</button>
        <button className="edit-action-btn" onClick={onSelectedAction.bind(null, COMMENT)}>Comment</button>
      </div>
    );
  }
}

SelectEditAction.propTypes = {
  onSelectedAction: React.PropTypes.func.isRequired
}

export default SelectEditAction;
