import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        $("body").addClass("skin-blue sidebar-mini");
        this.loadAllUsers();
    }

    ngOnDestroy() {
      console.log("ngOnDestroy");

      $("body").removeClass("skin-blue sidebar-mini");
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
