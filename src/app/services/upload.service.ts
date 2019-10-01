import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(data) {
    const uploadURL = `${URL}upload`;

    this.httpClient.post(uploadURL, data).subscribe((res) =>{
      console.log(res);
      // return res[`dir`];
    });
  }

}
