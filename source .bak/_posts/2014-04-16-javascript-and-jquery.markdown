---
layout: post
title: "JavaScript and jQuery"
date: 2014-04-16 11:40:06 +0800
comments: true
categories: [JavaScript, jQuery, Web Development]
author: Patrick Matias
---

My first exercise in the training was to reproduce a website and copy it as close as possible:

{% img /images/exercise1.png 800 530 'First Exercise' %}

It is a 960px wide website that is centered on the browser. It was a simple website so I had no problems doing the layout and design.
What made this exercise difficult for me was I needed to create the website's image slider script from scratch, and I'm not allowed to use third-party plugins. First, I tried it writing the script with *JavaScript*. I was at least able to make the images move by hitting the buttons and change every 3 seconds. If I really wanted to make the image slider from raw JavaScript it would be impossible for a beginner like me. 

<!--more-->
Given the circumstances, I decided to move on to **jQuery**. jQuery is a plugin made from JavaScript. jQuery made it easier for web developers to include effects to their websites and it is widely used today. Just by using `.fadeIn()`, `.fadeOut()`, and `.animate()` method you can have a simple animation effect. If you want more options for animation effects you'll have to add another plugin called **jQueryUI**.

What I liked about jQuery was it is simpler to call an object through **CSS** selectors. In JavaScript you have to use `getElementById()` or `getElementByClass()` to call the object. jQuery only requires you to use `$('')` and write the id and the class name in between the quotation just like how you call it in the CSS stylesheet, like `$('#idname')` or `$('.classname')` for example. Using `.animate()` method is uncomplicated, this line `$('.idname').animate({"width":"400px"},"slow");` would animate the object slowly by swinging before it gets the 400px width. I learned jQuery through the [jQuery API Documentation](http://api.jquery.com/ "jQuery API Documentation") and there is still more to learn for me. Here is my code for the simple slider.

```js jQuery Simple Image Slider
jQuery(document).ready(function($){
var slideWidth = $('.banner').width();
var contWidth = $('#slidecontent').width();
var counter=1;
var clicks=1;

startSlider(); //starts the animation of the slider

	// start move images to left and right
	$('#prev').click(function(){left();		});
	$('#next').click(function(){right();	});

	function left(){
		if(counter>0){
		$('#slidecontent').animate({"margin-left":"+=693px"},700, pre());
		$('#slidecount p').text(counter+" / 3");
		counter--;
		}
		else{
		counter=3;
		left();
		}
	}

	function right(){
		if(counter<=3){
		$('#slidecontent').animate({"margin-left":"-=693px"},700, app());
		$('#slidecount p').text(counter+" / 3");
		counter++;
		}
		else{
		counter=1;
		right();
		}
	}
	// end move images to left and right

	//prepend last child of ul before the first child 
	function pre(){
		 	$('.slides ul > li:last-child').prependTo($('.slides ul:first'));
		 	$('#slidecontent').css({"margin-left":"-693px"});
		 }

	//append first child of ul after the last child
	function app(){
			$('.slides ul > li:first').appendTo($('.slides ul:last'));
			$('#slidecontent').css({"margin-left":"0px"});
	}

	//start:code for automatic slide
	function startSlider(){
		$('#plause').css({"background-image":"url('resources/pause.png')"});
		loop=setInterval(function(){ 

			if(counter<3){
				$('#slidecontent').animate({"margin-left":"-=693px"},700, function(){
				$('.slides ul > li:first').appendTo($('.slides ul:last'));
				$('#slidecontent').css({"margin-left":"0px"});
				$('#slidecount p').text(counter+" / 3");
				});
				counter++;
			}
			else{
				counter=1;
				$('#slidecontent').animate({"margin-left":"-=693px"},700, function(){
				$('.slides ul > li:first').appendTo($('.slides ul:last'));
				$('#slidecontent').css({"margin-left":"0px"});
				$('#slidecount p').text(counter+" / 3");
				});
			}
		}, 3000);
	}
	//end:code for automatic slide

	//start: stops the animation of the slider
	function stopSlider(){
		$('#plause').css({"background-image":"url('resources/play.png')"});
		clicks=2;
		window.clearTimeout(loop);
	}
	//end: stops the animation of the slider

	//start: play/pause function
	$('#plause').click(function(){
		if(clicks==1){
			$('#plause').css({"background-image":"url('resources/play.png')"});
			clicks++;
			stopSlider();
		}
		else if(clicks==2){
			$('#plause').css({"background-image":"url('resources/pause.png')"});
			clicks--;
			stopSlider();
			startSlider();
		}
	});
	//end: play/pause function

	//start: hover function
	$('.slidenav').hover(
		function(){
			stopSlider();
		},
		function(){
			stopSlider();
			startSlider();	
		}
	);
	//stop: hover function
});
```

I was really happy when I finished this exercise. Now I can make my own customized sliders without depending on third-party plugins. To end this post here is a screenshot of my output.

{% img /images/myoutput.png 800 'My Output' %}