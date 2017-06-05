import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router) { }

appDescripion: Array<string> = [
  "The app with people who changed the world.", 
  "PersonsBiography is an educational, motivational & historical application, takes you on a journey with world’s most influential people.", 
  "Biographies of philosophers, scientists, physicians, inventors, political leaders and artists are now available at your fingertips.", 
  "You will find the description of their early lives, accomplishments, major events and selected quotes of people who made valuable contributions to society."];

goToList(){
  window.scrollTo(0, 0);
  this.router.navigate(["/persons"]);
}
}
