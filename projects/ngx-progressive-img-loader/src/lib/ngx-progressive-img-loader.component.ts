import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Renderer2
} from "@angular/core";

@Component({
  selector: "ngx-progressive-img-loader",
  template: `
    <div
      class="ngx-progressive-img-container"
      [ngStyle]="{
        'background-color': placeholderBgColor,
        height: height,
        width: width
      }"
    >
      <div class="ngx-progressive-img-container-default-bg">
        <div class="ngx-progressive-img-container-high-res-container"></div>
        <div class="ngx-progressive-img-container-low-res-container"></div>
      </div>
      <div
        class="ngx-progressive-img-container-overlay"
        [ngStyle]="{
          height: height,
          width: width,
          'background-color': overlayTint
        }"
      ></div>

      <div class="ngx-progressive-img-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .ngx-progressive-img-container {
        padding: 0;
        background: #eee;
        margin: 0;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }

      .ngx-progressive-img-content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 25;
      }

      .ngx-progressive-img-container-overlay {
        position: absolute;
        z-index: 22;
        top: 0;
        left: 0;
      }

      .ngx-progressive-img-container-default-bg {
        height: 100%;
        width: 100%;
        background: no-repeat center center;
        background-size: cover;
      }

      .ngx-preloader-img-preview {
        filter: blur(2vw);
        transform: scale(1.05);
        will-change: transform, opacity;
        animation: ngx-preloader-img-preview-animation 1s ease-out;
        -webkit-animation: ngx-preloader-img-preview-animation 1s ease-out;
      }

      .ngx-blur-placeholder {
        filter: blur(2vw);
      }

      .ngx-preloader-img-reveal {
        z-index: 20;
        position: absolute;
        left: 0;
        top: 0;
        will-change: transform, opacity;
        animation: ngx-preloader-img-reveal-animation 1s ease-out;
        -webkit-animation: ngx-preloader-img-reveal-animation 1s ease-out;
      }

      @keyframes ngx-preloader-img-reveal-animation {
        0% {
          transform: scale(1.05);
          opacity: 0;
          -webkit-transform: scale(1.05);
          -moz-transform: scale(1.05);
          -ms-transform: scale(1.05);
          -o-transform: scale(1.05);
        }
        100% {
          transform: scale(1);
          opacity: 1;
          -webkit-transform: scale(1);
          -moz-transform: scale(1);
          -ms-transform: scale(1);
          -o-transform: scale(1);
        }
      }

      @keyframes ngx-preloader-img-preview-animation {
        0% {
          opacity: 0.7;
        }
        100% {
          opacity: 1;
        }
      }
    `
  ]
})
export class NgxProgressiveImgLoaderComponent implements OnInit {
  // high resolution image url (required)
  @Input() img: string;

  // lowest resolution image url (required)
  @Input() thumbnail: string;

  // fallbck image if an error occured inloading high res image (optional)
  @Input() fallbackImg: string;

  // the height image height (required)
  @Input() height: string;

  // the image width (required)
  @Input() width: string;

  // overlay tint to cover the high res image (optional)
  @Input() overlayTint: string;

  // placeholder bg color, (optional) default, #eee
  @Input() placeholderBgColor: string;

  // placeholder default image, (optional) default, base 64 image.
  @Input() placeholderImg: string;

  // to emit image load event for thubmnail image
  @Output() thumbnailLoaded: any = new EventEmitter();

  // to emit image load event for thubmnail image
  @Output() imageLoaded: any = new EventEmitter();

  // preserve aspect ratio
  @Input() preserveAspectRatio: boolean;

  constructor(public el: ElementRef, private rd: Renderer2) {}
  ngOnInit() {
    // if custom placeholder image isset, use it as placeholder bg
    if (this.placeholderImg) {
      const placeholder: any = this.el.nativeElement.querySelector(
        ".ngx-progressive-img-container-default-bg"
      );
      placeholder.style.background = "url('" + this.placeholderImg + "')";
    }
  }

  ngAfterViewInit() {
    this.loadImage();
  }

  loadImage() {
    const thumbnailContainer: any = this.el.nativeElement.querySelector(
      ".ngx-progressive-img-container-low-res-container"
    );
    const originalImageContainer: any = this.el.nativeElement.querySelector(
      ".ngx-progressive-img-container-high-res-container"
    );
    const placeholder: any = this.el.nativeElement.querySelector(
      ".ngx-progressive-img-container-default-bg"
    );

    // create and initiate the thumbnail image.
    const thumb: any = this.rd.createElement("img");
    thumb.style.height = "100%";
    thumb.style.width = "100%";

    thumb.classList.add("ngx-preloader-img-preview");

    if (this.preserveAspectRatio) {
      thumbnailContainer.style.width = "100% !important";
      thumbnailContainer.style.height = "100% !important";
      thumb.style.objectFit = "cover";
      thumb.style.objectPosition = "50% 50% !important";
      thumb.style.height = this.height;
      thumb.style.width = this.width;
    } else {
      thumb.style.width = this.width;
      thumb.style.height = this.height;
    }

    thumb.onload = function(e) {
      // inject the loaded thumbnail into its container, wait for imge to finish
      // loading before doing so
      this.rd.appendChild(thumbnailContainer, thumb);
      this.thumbnailLoaded.emit({ loaded: true, event: e });
    }.bind(this);

    thumb.onerror = function(e) {
      this.thumbnailLoaded.emit({ loaded: false, event: e });
    }.bind(this);

    thumb.src = this.thumbnail;

    // create and initiate the origninal high res image
    const highRes = this.rd.createElement("img");

    if (this.preserveAspectRatio) {
      originalImageContainer.style.width = "100% !important";
      originalImageContainer.style.height = "100% !important";
      highRes.style.objectFit = "cover";
      highRes.style.objectPosition = "50% 50% !important";
      highRes.style.height = this.height;
      highRes.style.width = this.width;
    } else {
      highRes.style.width = this.width;
      highRes.style.height = this.height;
    }

    highRes.onload = function(e) {
      highRes.classList.add("ngx-preloader-img-reveal");
      // inject the loaded thumbnail into its container
      this.rd.appendChild(originalImageContainer, highRes);
      this.imageLoaded.emit({ loaded: true, event: e });
    }.bind(this);

    highRes.onerror = function(e) {
      this.imageLoaded.emit({ loaded: false, event: e });
      // if it failed loading, loading the fall back image...
      if (this.fallbackImg) {
        highRes.src = this.fallbackImg;
      }
    }.bind(this);
    highRes.src = this.img;
  }
}
