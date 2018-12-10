# ProgressiveImgLoader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Ngx-progressive-img-loader
``Ngx-progressive-img-loader`` is a simple progressive image loader for **Angular4+**. It's easy to use and yet flexible. It uses the blur low resolution transition to high resolution technique to achieve a sleek progressive loading. 
## Demo
![ngx-progressive-img-loader demo](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1485348439progressive-image-example.gif)

See full [demo on stackblitz.com](https://ngx-progressive-img-loader.stackblitz.io)
## Features

 - No use of external dependencies, implemented with Angular APIs.
 - Responsive progressive placeholder and images.
 - Provides API to maintain aspect ratio of the pre-loaded image.
 - Very fast and a light-weight library.
 - Provides API for easy reuse and out-of-box styling in your project.
 - Applies nice blur and transitioning to achieve a sleek pre-loading feel.
 - Ngx-progressive-img-loader can serve as a parent for other components.

## Install
``npm i ngx-progressive-img-loader --save``

Open your module file e.g `app.module.ts` and update **imports** array
```
import  {  NgxProgressiveImgLoaderModule  }  from  'ngx-progressive-img-loader';
...
imports: [
...
NgxProgressiveImgLoaderModule
...
]
```

And that's all.
## Usage
### All APIs
```
<ngx-progressive-img-loader
	[height]="'320px'"
	[width]="'100%'"
	(imageLoaded)="onImgLoad($event)"
	(thumbnailLoaded)="onThumbLoad($event)"
	[overlayTint]="'rgba(0,0,0,0)'"
	[preserveAspectRatio]="true"
	[placeholderBgColor]="'grey'"
	[placeholderImg]="'url-to-placeholder-image'"
	[img]="'url-to-high-res-image'"
	[thumbnail]="'url-to-very-low-res-image'"
	[fallbackImg]="'url-to-fall-back-image'">
	<!-- content goes here (optional) -->
</ngx-progressive-img-loader>
```

##
 - **[height]** :  The height of the pre-loaded image. _(required!)_
 - **[width]**:    The width of the pre-loaded image. _(required!)_
 - **(imageLoaded)**: Event fired on success or error in loading of the high resolution image. _(required!)_
 - **(thumbnailLoaded)**:  Event fired on success or error in loading of the low res/thumbnail image. _(required!)_
- **[overlayTint]**:  Adds overlay tint/color/shade to your preloaded image. _(optional)_
- **[preserveAspectRatio]**: If **true**, the pre-loaded image will fit into the pre-loader container without losing it's aspect ratio. If **false**, then it won't fit to aspect ratio.  *default: false; (optional)*
- **[placeholderBgColor]**: The background color of the image pre-loader container element. *(optional)*
- **[placeholderImg]**: The background image of the image pre-loader container element. *(optional)*
- **[img]**: The URL to the high resolution image you want to load. *(required)*
- **[thumbnail]**: The URL to the very low quality, thumbnail sized version of the high resolution image you want to load. *(required)*
- **[fallbackImg]**: The URL to the image to load if the high resolution image you want to load failed loading. *(optional)*

**Note:** You can place components or html elements inside the `<ngx-progressive-img-loader> // your content goes here </ngx-progressive-img-loader>` so as the component can serve as a parent element or background for the contents you want to place in it.

## Events
`<ngx-progressive-img-loader>` component emits two events to it's parent component.

 - **(imageLoaded)**:  This output can be used to handle events emitted, when the high resolution image you want to load encounter an **error** or **successfully loaded**.
 - **(thumbnailLoaded)**: This output can be used to handle events emitted, when the low resolution image you want to load encounter an **error** or **successfully loaded**.

The object emitted
```
	// loaded: true if the image is successfully loaded, otherwise false
	{loaded:  <true|false>, event:  e}
```

## Example
A simple example:
```
<ngx-progressive-img-loader
	[height]="'450px'"
	[width]="'100%'"
	(imageLoaded)="onImgLoad($event)"
	(thumbnailLoaded)="onThumbLoad($event)"
	[img]="'https://res.cloudinary.com/lasudev/image/upload/c_fill,g_center,h_1610,q_auto:best/v1530475355/meetup_pictures/IMG-20180407-WA0011.png'"
	[thumbnail]="'https://res.cloudinary.com/lasudev/image/upload/c_fill,g_center,h_100,q_auto:best/v1530475355/meetup_pictures/IMG-20180407-WA0011.png'">
</ngx-progressive-img-loader>
```

Then in  **example.component.ts**:


    ....
    onImgLoad(e)
    {
	    console.log("High quality image loaded?", e.loaded);
    }
    onThumbLoad(e)
    {
	    console.log("Low qaulity thumbnail loaded?", e.loaded);
    }
    ....

## Todo

 - Implement content place holder gradient background animation.
 - Implement progress bar/ circle to indicate image load level.
 - Target for **Webcomponent** for other front-end frameworks to use it.

## Contributing

 - Your commits conform to the conventions established [here
](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
