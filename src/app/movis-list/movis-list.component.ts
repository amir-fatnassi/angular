import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movi } from '../models/Movi.model';
import { Subscription } from 'rxjs';
import { MovisService } from '../services/movis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movis-list',
  templateUrl: './movis-list.component.html',
  styleUrls: ['./movis-list.component.scss']
})
export class MovisListComponent implements OnInit, OnDestroy {

  movis: Movi[];
  movisSubscrip: Subscription;

  constructor(private moviesService: MovisService, private router: Router) { }

  ngOnInit() {
    this.movisSubscrip = this.moviesService.movisSubject.subscribe(
      (movis: Movi[])=>{
        this.movis = movis;
      }
    );
    this.moviesService.getMovis();
    this.moviesService.emitMovis();
  }

  onNewMovie(){
    this.router.navigate(['/movis', 'new']);
  }

  onDeleteMovi(movi: Movi){
    this.moviesService.removeMovi(movi);
  }

  onViewMovie(id:number){
    this.router.navigate(['/movis', 'view', id]);
  }

  ngOnDestroy(){
    this.movisSubscrip.unsubscribe();
  }

}
