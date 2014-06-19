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

Grid System
---
The grid system is a powerful toot for creating a responsive-ready web design. Bootstrap uses these media queries to create the key breakpoints in their grid system:

    /* Extra small devices (phones, less than 768px) */
    /* No media query since this is the default in Bootstrap */
    
    /* Small devices (tablets, 768px and up) */
    @media (min-width: @screen-sm-min) { ... }
    
    /* Medium devices (desktops, 992px and up) */
    @media (min-width: @screen-md-min) { ... }
    
    /* Large devices (large desktops, 1200px and up) */
    @media (min-width: @screen-lg-min) { ... }
    
    (Media queries determine the viewport size of a device or a browser and loads the CSS properties contained in it.
    
To implement the grid system, the user must use Bootstrap's class prefixes for the containers. his is how would the HTML code for its implementation would look like:

```
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-sm-3"></div>
            <div class="col-lg-6 col-md-3"></div>
            <div class="col-lg-3 col-md-3"></div>
        </div>
    </div>
```

The class "container-fluid" is required by the "row" class for proper alignment and padding. The class "row" is used to group the columns which must be the immediate children of class "row". The maximum number of columns that each "row" can contain is **12**. The class prefix for columns are written this way `col-screensize-columnsize`. There are four available screen sizes:

- Screen Sizes:
    - Extra-small = 'xs'
    - Small = 's'
    - Medium = 'm'
    - Large = 'lg'

{% img center /images/gridsystem.png 'Bootstrap Grid System Sample' %}


The column size can be any number between 1 to 12. If the "row" meets the maximum number of columns, the next column will be appended to the next row.  That's mostly it for the grid system.

Navbar
---
Bootstrap provides an easy set-up for a navigation bar that is customizable and also responsive. Let's take a look on their example from the website:

{% img center /images/navbar.png 'Bootstrap Navbar Sample' %}

```

    <!--Sample's Code-->
    
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li class="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
```
You can see from our example that the user can add a lot of things in the Navbar. The site title is there `<a class="navbar-brand" href="#">Brand</a>`, a dropdown-menu, and a search-box form. In addition, the user can quickly assign your links to the left or right side of the bar just by adding the class `navbar-left` or `navbar-right`. Also, the bar can be a regular static sidebar by using the `navbar-default` class or fix it to top by adding the class `navbar-fixed-top`. The `navbar-header` contains the button with the class `navbar-toggle`, these button shows-up when the viewport reaches the size of a mobile-display presenting a mobile-friendly menu.

Carousel
---
Bootstrap's built-in carousel allows user to easily add a carousel without writing long-lines of JavaScript codes. Bootstrap uses jQuery on its JavaScript components to make it a plug-in. 

{% img center /images/carousel.png 'Bootstrap Carousel Sample' %}

```

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

```
Bootstrap's carousel plug-in allows the user to optionally add indicators and captions. The user also doesn't need to code on Javascript for the controls.

Buttons
---
Adding style to buttons is a lot easier with Bootstrap, just use their class-prefixes and it would automatically add a style preset.

```
<button type="button" class="btn btn-primary" data-toggle="button">Single toggle</button>
```
Bootstrap has a total of 6 preset styles. Just add the following class prefixes to use them:

*  `btn-default`
*  `btn-primary`
*  `btn-warning`
*  `btn-info`
*  `btn-success`
*  `btn-danger`

{% img center /images/buttonpresets.png 'Bootstrap Navbar Sample' %}


Responsive Image
---
Bootstrap's responsive image class can be used by adding the class prefix `img-responsive` to the `<img>` tag. These class adds the following properties to the object that makes it responsive.

```
    .img-responsive{
        width: 100%;
        height: auto;
    }
```

The image will always fit itself to the width of the container and still maintain its aspect ratio because its height is in auto.

These are just 6 of Bootstrap's components and you can see more at their website at [getbootstrap.com](http://getbootstrap.com "Bootstrap")

That's it. Thanks for reading! :)
Next, I'll be writing about the plug-ins I used in my previous project and will be followed by a blog about Wordpress. So stay tuned. :)