---
layout: post
title: "Bootstrap"
date: 2014-06-04 15:14:34 +0800
comments: true
categories: [Web Development]
author: Patrick Matias
---

Previously, I've used Bootstrap on one of my previous exercises and it is a powerful tool. [Bootstrap](http://getbootstrap.com "Bootstrap's") is one of the world's most popular front-end framework for responsive web design. It is originally created by a designer and developer in [Twitter](http://www.twitter.com "Twitter"). This framework is packed with many CSS and JavaScript Components to ease the user's coding and to help the user create a responsive design that is compatible with most browsers. I'll discuss these components that I've used in my project:

	*  Grid System
	*  Navbar
	*  Carousel
	*  Buttons
	*  Responsive Image Class

<!--more-->
___
### **Grid System** ###

The grid system is a powerful toot for creating a responsive-ready web design. Bootstrap uses these media queries to create the key breakpoints in their grid system:

    /* Extra small devices (phones, less than 768px) */
    /* No media query since this is the default in Bootstrap */
    
    /* Small devices (tablets, 768px and up) */
    @media (min-width: @screen-sm-min) { ... }
    
    /* Medium devices (desktops, 992px and up) */
    @media (min-width: @screen-md-min) { ... }
    
    /* Large devices (large desktops, 1200px and up) */
    @media (min-width: @screen-lg-min) { ... }
    
    (Media queries determine the viewport size of a device or a browser and loads the CSS properties contained in it.)
    
To implement the grid system, the user must use Bootstrap's class prefixes for the containers. This is how would the HTML code for its implementation would look like and you can check the demo to see how it works:

{% jsfiddle g5PYn html,result %}

The class "container-fluid" is required by the "row" class for proper alignment and padding. The class "row" is used to group the columns which must be the immediate children of class "row". The maximum number of columns that each "row" can contain is **12**. The class prefix for columns are written this way `col-screensize-columnsize`. There are four available screen sizes:

    * Screen Sizes:
      ** Extra-small = 'xs'
      ** Small = 's'
      ** Medium = 'm'
      ** Large = 'lg'

The column size can be any number between 1 to 12. If the "row" meets the maximum number of columns, the next column will be appended to the next row.  That's mostly it for the grid system.
___
###**Navbar**###

Bootstrap provides an easy set-up for a navigation bar that is customizable and also responsive. Let's take a look on their example from the website:

{%jsfiddle 8pzKG result,html%}

You can see from our example that the user can add a lot of things in the Navbar. The site title is there `<a class="navbar-brand" href="#">Brand</a>`, a dropdown-menu, and a search-box form. In addition, the user can quickly assign your links to the left or right side of the bar just by adding the class `navbar-left` or `navbar-right`. Also, the bar can be a regular static sidebar by using the `navbar-default` class or fix it to top by adding the class `navbar-fixed-top`. The `navbar-header` contains the button with the class `navbar-toggle`, these button shows-up when the viewport reaches the size of a mobile-display presenting a mobile-friendly menu.
___
###**Carousel**###

Bootstrap's built-in carousel allows user to easily add a carousel without writing long-lines of JavaScript codes. Bootstrap uses jQuery on its JavaScript components to make it a plug-in. In our example below you can see all of the class prefixes that can be used for the caarousel.

  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>
    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div class="item active">
        <img src="..." alt="...">
        <div class="carousel-caption">
          ...
        </div>
      </div>
      ...
    </div>
    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>

After that code you should call the plug-in and use the id as selector, in this case the id is `carousel-example-generic`:

```js
  $('#carousel-example-generic').carousel({
  interval: 2000
  pause: hover
  });
```

See it in this demo:

{%jsfiddle jf3sU result,html,js,css default 400px %}

Bootstrap's carousel plug-in allows the user to optionally add indicators and captions. The user also doesn't need to code on Javascript for the controls.
___
###**Buttons**###

Adding style to buttons is a lot easier with Bootstrap, just use their class-prefixes and it would automatically add a style preset. Bootstrap has a total of 6 preset styles. Just add the following class prefixes to use them:

*  `btn-default`
*  `btn-primary`
*  `btn-warning`
*  `btn-info`
*  `btn-success`
*  `btn-danger`

Checkout this demo:

{% jsfiddle tZec7 result,html %}
___
###**Responsive Image Class**###

Bootstrap's responsive image class can be used by adding the class prefix `img-responsive` to the `<img>` tag. These class adds the following properties to the object that makes it responsive.

```
    .img-responsive{
        max-width: 100%;
        height: auto;
    }
```

{%jsfiddle xXsQ7 result,html %}

{%jsfiddle xXsQ7 result default 300px 50% %}

The image will always fit itself to the width of the container and still maintain its aspect ratio because its height is in auto. You can try it out at this jsfiddle [demo](http://jsfiddle.net/xXsQ7) and resize the result container.

These are just 6 of Bootstrap's components and you can see more at their website at [getbootstrap.com](http://getbootstrap.com "Bootstrap")

That's it. Thanks for reading! :)
Next, I'll be writing about the plug-ins I used in my previous project and will be followed by a blog about CSS3 Transitions/Animations. So stay tuned. :)