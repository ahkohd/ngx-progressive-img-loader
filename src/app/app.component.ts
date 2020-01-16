import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  imageLoaded = false;

  pictures: Array<any> = [
    {
      highres:
        "https://res.cloudinary.com/lasudev/image/upload/c_fill,g_center,h_1610,q_auto:best/v1530475355/meetup_pictures/IMG-20180407-WA0011.png",
      thumbnail:
        "https://res.cloudinary.com/lasudev/image/upload/c_fill,g_center,h_100,q_auto:best/v1530475355/meetup_pictures/IMG-20180407-WA0011.png"
    },
    {
      highres: "https://devx.blog/uploads/programming/vr-image.jpg",
      thumbnail:
        "https://res.cloudinary.com/lasudev/image/upload/c_fill,g_center,h_100,q_auto:best/v1530475355/meetup_pictures/IMG-20180407-WA0011.png"
    }
  ];
  currentIndex: number = 0;
  currentPicture: any;

  onImgLoad($event) {}
  onThumbLoad($event) {}

  ngOnInit() {
    this.getPicture();
  }

  getPicture() {
    this.currentIndex =
      this.currentIndex === this.pictures.length - 1
        ? 0
        : this.currentIndex + 1;
    console.log(this.pictures[this.currentIndex]);
    this.currentPicture = this.pictures[this.currentIndex];
  }
}
