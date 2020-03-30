import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import classes from './DropZone.module.css';
import { storage, sendMessage } from '../../../fire';

const Dropzone = (props) => {
    const { upload, details, uploadProgress, toggleStatus, setDropUnactive, fetchFileName } = props;

    const onDrop = useCallback(files => {
        const file = files[0];
        fetchFileName(file.name);
        toggleStatus();     // turn on the progressbar
        setDropUnactive();      // hide the drag and drop again

        const uploadTask = storage.ref(file.type + '/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadProgress(progress);
            if (upload.failed) uploadTask.cancel();      // if failed true canacel the upload
        },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized': console.log(`User doesn't have permission to access the object`);
                        break;
                    case 'storage/canceled': console.log('User canceled the upload');
                        break;
                    default: console.log(`Unknown error occurred`);
                        break;
                }
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                    // store it in the msges as a msg
                    await sendMessage(details.user, details.cid, url, 'link', file.name);
                });
                toggleStatus();     // turn failed to true again to hide progressbar
                uploadProgress(0);      // update progress to 0
            })
    }, [upload, details, uploadProgress, toggleStatus, setDropUnactive, fetchFileName]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <div {...getRootProps()} className={classes.DropZone}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here...</p>
            }
        </div>
    );
};

export default Dropzone;