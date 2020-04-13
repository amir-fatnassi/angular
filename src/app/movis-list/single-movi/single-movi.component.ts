import { Component, OnInit } from '@angular/core';
import { Movi } from 'src/app/models/Movi.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovisService } from 'src/app/services/movis.service';

@Component({
  selector: 'app-single-movi',
  templateUrl: './single-movi.component.html',
  styleUrls: ['./single-movi.component.scss']
})
export class SingleMoviComponent implements OnInit {

  movi: Movi;

  constructor(private route: ActivatedRoute, 
              private moviService: MovisService, 
              private router: Router) { }

  ngOnInit() {
    this.movi = new Movi('', '');
    const id = this.route.snapshot.params['id'];
    this.moviService.getSingleMovi(+id).then(
      (movi: Movi)=>{
        this.movi = movi;
      }
    );
  }

  onBack(){
    this.router.navigate(['/movis']);
  }

}
