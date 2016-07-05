import React from 'react';
import ReactDOM from 'react-dom';

class CreateMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this._onGetStarted = this._onGetStarted.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
  }

  _onTextChange(e) {
    this.setState({ text: e.target.value })
  }

  _onGetStarted() {
    this.props.textPastedAndSubmitted(this.state.text);
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="header-main">1. Paste text to get started:</h1>
        <textarea className="textarea block-s" onChange={this._onTextChange}/>
        <button className="single-action-btn edit-action-btn" onClick={this._onGetStarted}>Next</button>
      </div>
    );
  }
}

export default CreateMode;
