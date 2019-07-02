import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/theme/monokai';
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import styles from './style.css';
import CustomSlider from './CustomSlider';

/**
 * class correspond to the ace editor in the realisationwindow
 */
class Code extends Component {

  /**
   * constructor
   */
  constructor() {
    super();
    this.state = {
      editorValue: "",
      infoText: "",
      fontSize: 14
    }
  }

  /**
   * new props from the code editor
   */
  componentWillReceiveProps(props) {
    if(props.code) {
      this.setState({editorValue: props.code});
    }
  }

  /**
   * action called by the customslider,
   * modify the size of the code
   */
  changeSizeValue(newSize) {
    this.setState({fontSize: newSize});
  }

  /**
   * action for the student changing the editor value
   */
  onChange(newValue, e) {
    this.setState({editorValue: newValue});
    this.props.changeCode(newValue);
  }

  /**
   * render method
   */
  render() {
    return (
        <div className={styles.code}>
            <div className={styles.code_content}>
              <AceEditor
              mode="javascript"
              theme="monokai"
              name="code-editor"
              onChange={this.onChange.bind(this)}
              fontSize={this.state.fontSize}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.editorValue}
              editorProps={{
                $blockScrolling: Infinity
              }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                tabSize: 2
              }}/>
            </div>
            <CustomSlider className="custom-slider-code" changeSize={this.changeSizeValue.bind(this)} min={5} max={30} default={this.state.fontSize}/>
        </div>
    );
  }
}

export default Code;
