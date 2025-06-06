import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { TituloDataService } from '../../data/titulo-data.service';
import { SessionService } from '../../services/session.service';
import { UrlService } from '../../services/url.service';

@Component({
    selector: 'app-titulo-uploader',
    templateUrl: './titulo-uploader.component.html' // ,
    // styleUrls: ['./app.component.scss']
    ,
    standalone: false
})
export class TituloUploaderComponent {

  public files: NgxFileDropEntry[] = [];
  WebApiPrefix: string;
  errorMessage= '';
  successMessage = '';
  @Input() gradYear: number;
  @Input() studentGUId: string;

  constructor(
    private http: HttpClient,
    private webApiPrefixService: UrlService,
    private session: SessionService,
    private tituloData: TituloDataService
  ) {
    console.log('titulo uploader constructor with studentGUId= ' + this.studentGUId);
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.errorMessage= '';
    this.successMessage = '';
    this.files = files;
    for (const currFile of files) {
      if (currFile.fileEntry.isFile) {
        const fileEntry = currFile.fileEntry as FileSystemFileEntry;

        // interface File extends Blob {
        fileEntry.file((file: File) => {
          const date = new Date(file.lastModified);
          console.log('fileEntry last modified: ' + date.toDateString());
          console.log('fileEntry relativePath: ' + currFile.relativePath);
          console.log('filEntry.name: ', file.name);
          const ext = file.name.substr(file.name.length - 4, 4);
          console.log('extension = ' + ext);
          console.log(ext.toLocaleLowerCase() !== '.jpg');
          console.log('filEntry.size: ', file.size);
          let localError = '';
          if (ext.toLocaleLowerCase() !== '.jpg') {
            localError = 'The file [' + file.name + '] is not in .JPG format.';
            this.errorMessage = localError;
          } else if (file.size > 1204800) {
            localError = 'The file [' + file.name + '] has more that 1 Mb in size.';
            this.errorMessage = localError;
          } else {
            const frmData = new FormData();
            frmData.append('file', file);
            frmData.append('studentGUID', this.studentGUId);
            this.tituloData.uploadTitulo(
              frmData,
              this.studentGUId.toUpperCase(),
              this.gradYear
              ).subscribe(
              () => {
                this.successMessage = 'The file [' + file.name + '] uploaded successfully.';
                // window.scrollTo(0, 0);
                // window.setTimeout(() => {
                //   this.successMessage = '';
                // }, 15000);
              },
              (error) => {
                this.errorMessage = error;
              }
            );
          }
        });
      }
    }
  }


  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
