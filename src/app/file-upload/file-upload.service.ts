import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Upload, Snapshot } from '../models/app-user';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  // tslint:disable-next-line:no-inferrable-types
  private basePath = `/products_img`;
  uploads: FirebaseListObservable<Upload[]>;
  upload: Upload[];

  pushUpload(upload: Upload, productTitle: string, emitter?: Function) {
    const append = `${productTitle}_${upload.file.name}`;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${append}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: Snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = append;
        // tslint:disable-next-line:curly
        if (emitter) emitter(upload);
        // this.saveFileData(upload);
      }
    );
  }

  deleteUpload(upload: Upload) {
    this.deleteFileStorage(upload.name);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
