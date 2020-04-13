import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Movi } from '../models/Movi.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class MovisService {

  movis: Movi[] = [];
  movisSubject = new Subject<Movi[]>();

  constructor() { }

  emitMovis(){
    this.movisSubject.next(this.movis);
  }

  saveMovis(){
    firebase.database().ref('/movis').set(this.movis);
  }

  getMovis(){
    firebase.database().ref('/movis').on(
      'value', (data)=>{
        this.movis = data.val() ? data.val(): [];
        this.emitMovis();
      }
    );
  }

  getSingleMovi(id: number){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/movis/' + id).once('value').then(
          (data)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  createNewMovi(movi: Movi){
    this.movis.push(movi);
    this.saveMovis();
    this.emitMovis();
  }

  removeMovi(movi: Movi){
    if(movi.photo){
      const storageRef = firebase.storage().refFromURL(movi.photo);
      storageRef.delete().then(
        ()=>{
          console.log('photo deleted');
        }
      ).catch(
        (error)=>{
          console.log('error: ' + error);
        }
      );
    }
    const moviIndexToRemove = this.movis.findIndex(
      (moviEl)=>{
        if(moviEl === movi){
          return true;
        }
      }
    );
    this.movis.splice(moviIndexToRemove, 1);
    this.saveMovis();
    this.emitMovis();  
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject)=>{
        const fileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/' + fileName + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log('loading...');
          },
          (error)=>{
            console.log('error: ', + error);
            reject();
          },
          ()=>{
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
  }
}
