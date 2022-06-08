import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage1 = "";
  errorMessage2 = "";
  showLoginForm = true;
  isLoading = false;

  constructor(private router:Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("currentUser")){
      this.router.navigate(["home"])
    }
  }

  login = async (username1:string, password1:string) =>{
    if(username1.trim().length === 0){
      this.errorMessage1 = "Username is required.";
      return;
    } else if(password1.trim().length === 0){
      this.errorMessage1 = "Password is required.";
      return;
    } else{
      this.errorMessage1 = "";
    }

    this.isLoading = true;
    let responce = await this.auth.login(username1, password1);
    if(!responce){
      this.errorMessage1 = "Invalid credentials.";
    }
    else{
      this.errorMessage1 = "";
      this.router.navigate(["home"]);
    }
    this.isLoading = false;
  }

  signUp = async (username2:string, password2:string) =>{
    if(username2.trim().length === 0){
      this.errorMessage2 = "Username is required.";
      return;
    } else if(password2.trim().length === 0){
      this.errorMessage2 = "Password is required.";
      return;
    } else{
      this.errorMessage2 = "";
    }

    this.isLoading = true;
    const [responce, emailTaken] = await this.auth.signUp(username2, password2);

    if(emailTaken){
      this.errorMessage2 = "This username is linked to an existing account."
    } else{
      if(!responce){
        alert("Account Creation Faild ! Please Try Again.");
      }
      else{
        alert('Account Created ! You will be redirected to login page.');
        this.errorMessage1 = "";
        this.showLoginForm = true;
      }
    }

    this.isLoading = false;
  }

}
