import React from 'react';

class SuggestChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: ''};

    this._onTextChange = this._onTextChange.bind(this);
    this._onFinishedEditing = this._onFinishedEditing.bind(this);
  }

  _onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  _onFinishedEditing() {
    const { onNewText } = this.props;
    console.log('onclick', this.state);
    onNewText(this.state.text);
  }

  render() {
    return (
      <div>
        <p className="netto block-s">I suggest the text to be replaced by...</p>
        <input type="text" className="input" value={this.state.text} onChange={this._onTextChange}/>
        <button className="edit-action-btn single-action-btn" onClick={this._onFinishedEditing}>Suggest this change</button>
      </div>
    );
  }
}

SuggestChange.propTypes = {
  onNewText: React.PropTypes.func.isRequired
}

export default SuggestChange;
