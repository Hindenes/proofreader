require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./main.css');
import React from 'react';
import ReactDOM from 'react-dom';
import ProofreadMode from './proofread-mode';
import CreateMode from './create-mode';

const getModeFromUrl = () => window.location.href.indexOf('create') !== -1 ? <CreateMode/> : <ProofreadMode/>;

class App extends React.Component {
  render() {
    const mode = getModeFromUrl();
    return (
      <div>
        { mode }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
