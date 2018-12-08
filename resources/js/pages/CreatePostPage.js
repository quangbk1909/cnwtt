import React, {Component} from 'react'

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentState: {} // ContentState JSON
        };
    }

    // onContentStateChange = (contentState) => {
    //     this.setState({
    //         contentState,
    //     });
    // };

    render() {
        return (
            <div>
                <Editor
                    // initialContentState={this.state.contentState}
                    onContentStateChange={(contentState) => {
                        this.setState({contentState});
                        console.log('content state', contentState)
                    }}
                    // editorState={editorState}
                    // toolbarClassName="toolbarClassName"
                    // wrapperClassName="wrapperClassName"
                    // editorClassName="editorClassName"
                    // onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}
