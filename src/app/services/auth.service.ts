import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:any = null;

  constructor(private auth : Auth) { 
  }

  login = async(username:string, password:string):Promise<boolean> =>{  
    const db = getFirestore();
    const colRef = collection(db, 'users');
    let allUsers = await getDocs(colRef);
    allUsers.docs.forEach(doc => {
      if(doc.data()['username'] == username && doc.data()['password'] == password){
        localStorage.setItem("currentUser", doc.data()['username']);
      }
    });
    if(localStorage.getItem("currentUser")){
      return true;
    }
    else{
      return false;
    }
  }

  signUp = async(username:string, password:string) =>{

    let emailTaken = false;

    const db = getFirestore();

    const colRef = collection(db, 'users');
    let allUsers = await getDocs(colRef);
    allUsers.docs.forEach(doc => {
      if(doc.data()['username'] == username){
        emailTaken = true;
      }
    });

    if(!emailTaken){
      try{
        await setDoc(doc(db, "users", username), {
          username: username,
          password: password,
        });
        return [true, emailTaken] as const;
      } catch(error){
        return [true, emailTaken] as const;
      }
    }
    else{
      return [false, emailTaken] as const;
    }
  }

  logOut = () =>{
    localStorage.clear();
  }
  
}
