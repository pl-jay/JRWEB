import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent  {
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }

}
