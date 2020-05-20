import { Component, OnInit } from "@angular/core";
import { User, Setting } from 'src/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { PopupService } from 'src/services/popup.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UserListComponent implements OnInit{
    
    public userList : User[] = [];

    constructor(private router : Router, public userService : UserService, private popupService : PopupService){
        this.userService.users$.subscribe((users) => {
            this.userList = users;
        })
        document.documentElement.style.setProperty('--bg',"#f2f2f2");
        document.documentElement.style.setProperty('--bri','100%');
    }
    
    selectedUser(user : User){
        console.log("User selected",user);
        sessionStorage.setItem("userId",user.id.toString());
        this.userService.setSelectedUser(user.id);
        this.router.navigate(['/accueil']);
    }

    createUser(){
        this.popupService.open('Création d\'un nouvel utilisateur' , 'Valider' , 'Annuler', true);
        this.popupService.name$.pipe(first()).subscribe((name) => {
            if(name){
                var user : User = {name} as User;
                this.userService.addUser(user); 
            }
        })
    }



    ngOnInit(){
        console.log("Clearing session user data...");
        sessionStorage.clear();
    }
}