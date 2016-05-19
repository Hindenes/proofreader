require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./main.css');
import React from 'react';
import ReactDOM from 'react-dom';
import ProofreadMode from './proofread-mode';
import CreateMode from './create-mode';
import ShareLinkMode from './share-link-mode';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textToBeEdited: null, mode: 'CREATE' };
    this._getModeFromUrl = this._getModeFromUrl.bind(this);
    this._textPastedAndSubmitted = this._textPastedAndSubmitted.bind(this);
    this._goToProofreadMode = this._goToProofreadMode.bind(this);
  }

  componentWillUnmount() {
    this.setState({ mode: this._getModeFromUrl() });
  }

  _getModeFromUrl() {
    return window.location.href.indexOf('create') !== -1 ? 'CREATE' : 'EDIT';
  }

  _textPastedAndSubmitted(text) {
    this.setState({ textToBeEdited: text, mode: 'SHARE_LINK' });
  }

  _goToProofreadMode() {
    this.setState({ mode: 'EDIT' });
  }

  render() {
    const mode = {
      'CREATE': <CreateMode textPastedAndSubmitted={this._textPastedAndSubmitted}/>,
      'SHARE_LINK': <ShareLinkMode onClick={this._goToProofreadMode} />,
      'EDIT': <ProofreadMode textToBeEdited={this.state.textToBeEdited}/>
    };
    return (
      <div>
        { mode[this.state.mode] }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
