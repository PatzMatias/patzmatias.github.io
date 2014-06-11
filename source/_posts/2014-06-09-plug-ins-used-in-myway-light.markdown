---
layout: post
title: "Plug-ins used in MyWay Light"
date: 2014-06-09 15:07:36 +0800
comments: true
categories: [Web Development]
author: Patrick Matias
---

MyWay Light is one of the exercises I've done recently, it is a one-page website theme for Wordpress that I've tried to recreate as close as possible and to discover how its design and effects were executed. <!-- more --> If you want to see it go here > [MyWay Light Demo](http://patzmatias.github.io/myway-light 'MyWay Light Theme by Awerest'). On the process of reading its code I learned that it used these plug-ins:

* [SmoothScroll](https://gist.github.com/galambalazs/6477177/ 'gist.github.com/galambalazs/6477177/')
* [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ 'fortawesome.github.io/Font-Awesome/')
* [Skrollr](https://github.com/Prinzhorn/skrollr 'github.com/Prinzhorn/skrollr')
* [Bootstrap 3 Lightbox (Ekko-lightbox)](https://github.com/ashleydw/lightbox 'github.com/ashleydw/lightbox')
* [jQuery gMap Plug-in](https://github.com/marioestrada/jQuery-gMap 'github.com/marioestrada/jQuery-gMap')
* [FlowUpLabels](https://github.com/ENFOS/FlowupLabels.js 'github.com/ENFOS/FlowupLabels.js')
* [jQuery Form Plug-in](http://malsup.com/jquery/form/ 'malsup.com/jquery/form/')

Reading unto each documentation of the plug-ins here is what I've learned.
___

###**SmoothScroll**###

Looking into MyWay Light Demo you'll notice how smooth it moves when you use the mousewheel to scroll up and down the website. This plug-in's event is binded into the mousewheel, it also supports the keyboard's arrow keys, navigation keys `PageUp` and `PageDown` and touchpad. What it does is it adds an animation and friction into the mouse scroll. SmoothScroll's settings is customizable, so you can set how smooth you would want it to scroll, in MyWay Light's case this is the settings.

```javascript
(function(){
  
// Scroll Variables (tweakable)
var defaultOptions = {

    // Scrolling Core
    frameRate        : 150, // [Hz]
    animationTime    : 700, // [px]
    stepSize         : 40, // [px]

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 8,
    pulseNormalize   : 1,

    // Acceleration
    accelerationDelta : 20,  // 20
    accelerationMax   : 1,   // 1

    // Keyboard Settings
    keyboardSupport   : true,  // option
    arrowScroll       : 50,     // [px]

    // Other
    touchpadSupport   : true,
    fixedBackground   : true, 
    excluded          : ""    
};
```
___

### **FontAwesome** ###

FontAwesome is not necessarily a plug-in but a CSS Framework that has a library of SVG Icon Fonts. Checkout my JSfiddle sample.

{% jsfiddle d4qCS result,html,css,js light %}

The user only needs to include the class prefixes of the icon of their choice on HTML inline elements like `<i></i>` and `<span></span>`. They can have it spinning or customize it with CSS.
___

### **Skrollr** ###
I used two features of Skrollr which is the **Parallax** and **Color Transforms** but Skrollr has more uses. Skrollr is an independent JavaScript plug-in it is not made with jQuery. Skrollr automatically injects its class prefixes to HTML tags that contain `data-` attribute. Skrollr will read the values contained in `data-` and animate or transform that object based on the values.

{% jsfiddle bXT2y result,html,css,js light %}

I used Color Transforms on the Navigation Bar, and Parallax on the intro background and the section headers.
---
##Bootstrap 3 Lightbox (Ekko-lightbox)##

Bootstrap 3 Lightbox is a lightbox module built around Bootstrap's modal plug-in for viewing images, YouTube videos and galleries. For me, the best thing about this plug-in is that it's style is CSS and fully customizable. This plug is used in this part of the website, [MyWay Light Gallery](http://patzmatias.github.io/myway-light/#gallery-top 'MyWay Light Gallery').

### **jQuery gMap Plug-in** ###

**gMap** A lightweight, flexible, highly customizable jQuery plug-in for embedding **Google Maps** that works with the **Google Map API v3**. With gMap the user has the option to remove or include, the Google Map UI, set custom markers, zoom level, and the maptype. [MyWay Light Contact](http://patzmatias.github.io/myway-light/#contact-top 'MyWay Light Contact Section')

### **FlowUp Labels** ###

This is the plug-in that gives MyWay Light's contact form labels floating effect when you click it. The plug-in's style is fully customizable in CSS. Check out their demo here [ENFO's FlowUpLabels Demo]( http://enfos.com/FlowupLabels.js/demo/ 'FlowUpLabels Demo').
___
### **jQuery Form Plugin** ###

{% img img-responsive /images/form.png %}

Form is a plug-in that allows the user to upgrades HTML to use AJAX. It provides several methods to easily manage the form data and form submission. This plug-in was used in the theme to make the success and the failure notifications be thrown at the HTML page instead of a dialog box. Implementing the plug-in is easy, just bind the form through IDs or classes in the script.

```js
<script> 
    // wait for the DOM to be loaded 
    $(document).ready(function() { 
        // bind 'myForm' and provide a simple callback function 
        $('#myForm').ajaxForm(function() { 
            alert("Thank you for your comment!"); 
        }); 
    }); 
</script>
```
______
I also used Bootstrap in MyWay Light but I made a different post for it, see it  [here](http://patzmatias.github.io/blog/2014/06/04/bootstrap/ 'http://patzmatias.github.io/blog/2014/06/04/bootstrap/').

Thanks for reading! :) I'll be posting about CSS3 Transitions/Animation next time, please keep on reading! :)