import React from 'react';
import ReactDOM from 'react-dom';

class ShareLinkMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this._onTextChange = this._onTextChange.bind(this);
  }

  _onTextChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="header-main">2. Share the link below with your proofreaders</h1>
        <p className="block-s share-link netto" onChange={this._onTextChange}>
          https://hindenes.co/proofreader/uuid
        </p>
        <button className="single-action-btn edit-action-btn btn-center-block" onClick={this.props.onClick}>Start proofreading and editing</button>
      </div>
    );
  }
}

export default ShareLinkMode;
