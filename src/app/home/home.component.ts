import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trandingMovies:any[] = [];
  theatreMovies:any[] = [];
  isTrendingLoading = false;
  isTheatreLoading = false;

  constructor(private router:Router, private auth:AuthService, private authe: Auth) { }

  ngOnInit(): void {
    if(!localStorage.getItem("currentUser")){
      this.router.navigate([""]);
      return;
    }
    this.getTrendingMovies();
    this.getTheatreMovies();
  }

  getTrendingMovies = async() =>{
    let allTrendingMovies;
    const db = getFirestore();
    const colRef = collection(db, 'trending-movies');
    this.isTrendingLoading = true;
    allTrendingMovies = await getDocs(colRef);
    allTrendingMovies.docs.forEach(doc => {
      this.trandingMovies.push({ ...doc.data(), id: doc.id });
    });  
    this.isTrendingLoading = false;
  }
  
  getTheatreMovies = async() =>{
    let allTheatreMovies;
    const db = getFirestore();
    const colRef = collection(db, 'theatre-movies');
    this.isTheatreLoading = true;
    allTheatreMovies = await getDocs(colRef);
    allTheatreMovies.docs.forEach(doc => {
      this.theatreMovies.push({ ...doc.data(), id: doc.id });
    });
    this.isTheatreLoading = false;
  }

  goToMovieDetails = (type:string, id:string) =>{
    this.router.navigate(["movie", type, id])
  }

}
