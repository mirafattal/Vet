import { Component } from '@angular/core';
import { NgpFileUpload } from 'ng-primitives/file-upload';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  hostDirectives: [
    {
      directive: NgpFileUpload,
      inputs: ['ngpFileUploadMultiple:multiple'],
      outputs: ['ngpFileUploadDragOver:dragOver', 'ngpFileUploadSelected:selected'],
    },
  ],
  template: `<ng-content />`,
  styles: `
    :host {
    }

    :host[data-dragover] {
    }
  `,
})
export class FileUploadComponent {}
