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

  _onFinishedEditing(e) {
    e.preventDefault();
    const { onNewText } = this.props;
    onNewText(this.state.text);
  }

  componentDidMount() {

  }

  render() {
    const old = (
      <div>
        <p className="netto block-s">I suggest the text:</p>
        <p className="netto block-s"><span className="text-highlighted">{this.props.highlightedText}</span></p>
        <p className="netto block-s">To be replaced by:</p>
      </div>
    );
    return (
      <form>
        <input type="text" autoFocus className="input" value={this.state.text} onChange={this._onTextChange}/>
        <input type="submit" className="edit-action-btn single-action-btn" onClick={this._onFinishedEditing} value="Suggest this change"></input>
      </form>
    );
  }
}

SuggestChange.propTypes = {
  onNewText: React.PropTypes.func.isRequired,
  highlightedText: React.PropTypes.string.isRequired
}

export default SuggestChange;
