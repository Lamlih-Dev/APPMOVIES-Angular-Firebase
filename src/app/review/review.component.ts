import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { updateDoc, doc, getFirestore, collection, getDocs } from '@angular/fire/firestore';
import { arrayUnion } from '@firebase/firestore';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() id = "";
  @Input() type = "";
  @ViewChild("review", {static:true}) textArea:any;
  errorMessage = "";
  isLoading = false;


  constructor(private auth:AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addReview = async (review:string) =>{
    if(review !== ""){
      let date = new Date();
      let dateFormated = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const db = getFirestore();
      const editRef = doc(db, this.type, this.id);
      this.isLoading = true;
      await updateDoc(editRef, {
        reviews: arrayUnion({
          author:localStorage.getItem("currentUser"),
          published_on: dateFormated,
          review: review
        })
      });
      this.isLoading = false;
      alert("Review Added Successfully !");
      this.textArea.nativeElement.value = "";
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'],{
        relativeTo: this.route
      });
    } else {
      this.errorMessage = "Review field required."
    }
  } 
}
