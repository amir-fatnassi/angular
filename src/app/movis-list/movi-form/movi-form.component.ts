import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovisService } from 'src/app/services/movis.service';
import { Router } from '@angular/router';
import { Movi } from 'src/app/models/Movi.model';

@Component({
  selector: 'app-movi-form',
  templateUrl: './movi-form.component.html',
  styleUrls: ['./movi-form.component.scss']
})
export class MoviFormComponent implements OnInit {

  movieForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, 
              private moviService: MovisService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.movieForm = this.formBuilder.group({
      name: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSaveMovie(){
    const name = this.movieForm.get('name').value;
    const body = this.movieForm.get('body').value;
    const newMovie = new Movi(name, body);
    if(this.fileUrl && this.fileUrl !== ''){
      newMovie.photo = this.fileUrl;
    }
    this.moviService.createNewMovi(newMovie);
    this.router.navigate(['/movis']);  
  }  

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.moviService.uploadFile(file).then(
      (url: string)=>{
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
