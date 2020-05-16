import { Injectable } from '@angular/core';

@Injectable()
export class T2sService{
    public t2s(txt:string){

        //Suppresion de la queue precedente
        if(speechSynthesis.speaking){
          speechSynthesis.cancel();
        }
    
        //Pause le text-to-speech si l'user ne le veut pas
        if(sessionStorage.getItem("t2sOn")=="false"){
          if(!speechSynthesis.paused){
          speechSynthesis.pause();
          }
        }
    
        //Lecture du text
        var msg = new SpeechSynthesisUtterance();
        msg.text=txt;
        msg.lang="fr-FR";
        window.speechSynthesis.speak(msg);
      }
}