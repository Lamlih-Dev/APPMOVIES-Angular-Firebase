import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { updateDoc, doc, getFirestore, collection, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie:any[] = [];
  isEmpty = false;
  errorMessage = "";
  id = "";
  type = "";
  showReview = false;
  isLoading = false;

  constructor(private router:Router, private route:ActivatedRoute, private auth:AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    if(!localStorage.getItem("currentUser")){
      this.router.navigate([""]);
      return;
    }
    this.type = this.route.snapshot.params["type"];
    this.id = this.route.snapshot.params["id"];
    this.getMovie(this.type, this.id);
  }

  getMovie = async(type:string, id:string) =>{
    let allMovies;
    const db = getFirestore();
    const colRef = collection(db, type);
    this.isLoading = true;
    allMovies = await getDocs(colRef);
    allMovies.docs.forEach(doc => {
      if(doc.id == id){
        this.movie.push({ ...doc.data(), id: doc.id });
      }
    });
    if(this.movie.length === 0){
      this.isEmpty = true
    } else {
      this.isEmpty = false;
    }
    this.isLoading = false;
  }

  showReviewComponent = () =>{
    this.showReview = true;
  }
}
