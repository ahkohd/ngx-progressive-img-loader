import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit,
  OnChanges
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
export class NgxProgressiveImgLoaderComponent
  implements OnInit, AfterViewInit, OnChanges {
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
  ngOnInit() {}

  ngOnChanges(changes) {
    // Reload if @input changes happens.
    this.loadImage(
      this.el,
      this.rd,
      changes.placeholderImg.currentValue,
      changes.preserveAspectRatio.currentValue,
      changes.width.currentValue,
      changes.height.currentValue,
      changes.thumbnailLoaded.currentValue,
      changes.thumbnail.currentValue,
      changes.imageLoaded.currentValue,
      changes.fallbackImg.currentValue,
      changes.img.currentValue
    );
  }

  ngAfterViewInit() {
    this.loadImage(
      this.el,
      this.rd,
      this.placeholderImg,
      this.preserveAspectRatio,
      this.width,
      this.height,
      this.thumbnailLoaded,
      this.thumbnail,
      this.imageLoaded,
      this.fallbackImg,
      this.img
    );
  }

  loadImage(
    el,
    rd,
    placeholderImg,
    preserveAspectRatio,
    width,
    height,
    thumbnailLoaded,
    thumbnail,
    imageLoaded,
    fallbackImg,
    img
  ) {
    if (placeholderImg) {
      const $placeholder: any = el.nativeElement.querySelector(
        ".ngx-progressive-img-container-default-bg"
      );
      $placeholder.style.background = "url('" + this.placeholderImg + "')";
    }

    const thumbnailContainer: any = el.nativeElement.querySelector(
      ".ngx-progressive-img-container-low-res-container"
    );
    const originalImageContainer: any = el.nativeElement.querySelector(
      ".ngx-progressive-img-container-high-res-container"
    );

    // Create humbnail image.
    const thumb: any = rd.createElement("img");
    thumb.style.height = "100%";
    thumb.style.width = "100%";
    thumb.classList.add("ngx-preloader-img-preview");

    if (preserveAspectRatio) {
      thumbnailContainer.style.width = "100% !important";
      thumbnailContainer.style.height = "100% !important";
      thumb.style.objectFit = "cover";
      thumb.style.objectPosition = "50% 50% !important";
      thumb.style.height = height;
      thumb.style.width = width;
    } else {
      thumb.style.width = width;
      thumb.style.height = height;
    }

    thumb.onload = function(e) {
      // inject the loaded thumbnail into its container, wait for imge to finish
      // loading before doing so
      rd.appendChild(thumbnailContainer, thumb);
      thumbnailLoaded.emit({ loaded: true, event: e });
    }.bind(this);

    thumb.onerror = function(e) {
      thumbnailLoaded.emit({ loaded: false, event: e });
    }.bind(this);

    thumb.src = thumbnail;

    // create and initiate the origninal high res image
    const highRes = rd.createElement("img");

    if (preserveAspectRatio) {
      originalImageContainer.style.width = "100% !important";
      originalImageContainer.style.height = "100% !important";
      highRes.style.objectFit = "cover";
      highRes.style.objectPosition = "50% 50% !important";
      highRes.style.height = height;
      highRes.style.width = width;
    } else {
      highRes.style.width = width;
      highRes.style.height = height;
    }

    highRes.onload = function(e) {
      highRes.classList.add("ngx-preloader-img-reveal");
      // inject the loaded thumbnail into its container
      rd.appendChild(originalImageContainer, highRes);
      imageLoaded.emit({ loaded: true, event: e });
    }.bind(this);

    highRes.onerror = function(e) {
      imageLoaded.emit({ loaded: false, event: e });
      // if it failed loading, loading the fall back image...
      if (fallbackImg) {
        highRes.src = fallbackImg;
      }
    }.bind(this);
    highRes.src = img;
  }
}
