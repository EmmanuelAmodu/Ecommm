import { UploadService } from '../file-upload/file-upload.service';
import { Upload } from '../models/app-user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  @Input() productTitle: string;
  @Input() multiFile: boolean;
  @Input() singleFile: boolean;
  @Output() uploader = new EventEmitter<any>();

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    const uniqueTitle = `${this.productTitle}_${this.randomString()}`;
    const that = this;
    this.upSvc.pushUpload(this.currentUpload, uniqueTitle, function(upload){
      that.uploader.emit(upload);
    });
  }

  uploadMulti() {
    const that = this;
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      const uniqueTitle = `${this.productTitle}_${this.randomString()}`;
      this.upSvc.pushUpload(this.currentUpload, uniqueTitle, function(){
        that.uploader.emit(that.currentUpload);
      });
    });
  }

  private randomString() {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, 10))).toString(36).slice(1);
  }

}
