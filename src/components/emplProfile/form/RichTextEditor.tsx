import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';

import classes from './RichTextEditor.module.css';
import Button from '../../../UI/Button';

const RichTextEditor = () => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);
  const editorRef = useRef<any>(null);
  const addDescription = () => {
    if (editorRef.current) {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            description: editorRef.current.getContent(),
            appliers: []
          })
        )
      );
    }
  };
  return (
    <div className={classes.main}>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          resize: false,
          height: 350,
          menu: {
            file: { title: 'File', items: 'newdocument' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
            insert: { title: 'Insert', items: 'hr' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript ' }
          },
          placeholder: 'Write your offer description here...',
          plugins: 'lists advlist',
          toolbar:
            'undo redo | casechange blocks | bold italic underline strikethrough' +
            'bullist numlist'
        }}
      />
      <Button styles={classes.main_saveButton} onClick={addDescription}>SAVE</Button>
    </div>
  );
};

export default RichTextEditor;
