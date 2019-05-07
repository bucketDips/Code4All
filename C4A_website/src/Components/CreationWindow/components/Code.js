import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/theme/monokai';

import "brace/ext/language_tools";
import "brace/ext/searchbox";

import styles from '../css/Code.css'

class Code extends Component {

  onChange(newValue) {
    console.log('change', newValue);
  }

  render() {
    return (
        <div className={styles.code}>
            <h3 className="title">Ici le code</h3>
            <div className="content">
            <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="code-editor"
            onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={`function onLoad(editor) {
            console.log("i've loaded");
            }`}
            setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            }}/>
            </div>
        </div>
    );
  }
}

export default Code;
