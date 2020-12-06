import React from "react";
import Dropzone from "react-dropzone";

const DragDrop = (props) => {
  return (
    <Dropzone
      onDrop={props.onDrop}
      noKeyboard
      accept={props.accept} //accept types of files
      multiple={props.multiple} // allow drag n drop of multiple files
      maxFiles={props.maxFiles} //maximum number of files selected
      onDropRejected={props.onDropRejected}
      onDropAccepted={props.onDropAccepted}
      noClick={props.noClick}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          {props.children}
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
};

export default DragDrop;
