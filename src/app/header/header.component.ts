import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username:any;

  constructor(private router:Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
  }

  logOut = () =>{
    this.auth.logOut();
    this.router.navigate([""]);
  }

}
