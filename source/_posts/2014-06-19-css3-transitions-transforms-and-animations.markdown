---
layout: post
title: "CSS3 Transitions, Transforms, and Animations"
date: 2014-06-19 13:16:03 +0800
comments: true
categories: 
---

This post is about the simple CSS3 animation and effects on some of the objects inside my previous exercise called [MyWay Light](http://patzmatias.github.io/myway-light). We are going to try to understand how this CSS3 properties work. With CSS3, a user can now do more than just adding colors, styling, and layouts. It now allows us to add movement or other special effects without using FLASH or GIFs. It may require us to write more lines depending on what we want to achieve but it is all worth it, because it can reduce the resources that are being loaded in your website.
<!-- more -->

___
###**Loading Screen**###

I'll begin with MyWay Light's loading screen. Checkout this demo:

{%jsfiddle 2B5bD result,html,css %}

The object's above are using CSS3's `animation` property, `@keyframes` rule, and `transform` property. 


    transform: translate(X,Y); /*positions an object in the container depending on the values of the X-axis and Y-axis. This was used on the container of the circles. (See .preloader .spinner selector on the CSS tab of the demo above)*/
    
    animation: bouncedelay 1.4s infinite ease-in-out; 
    /* This is the overall effect used in the circles. Here it is the description of the attributes as followed: 
    (animation: animation-name duration iteration easing;)
    - bouncedelay is a keyframe animation-name/property declared by the user. It works pretty much like a method from a programming language. It contains the properties for the animation.*/

    @keyframes animation-name {
    /* You can use 'from' and 'to' for a simple task*/
    from{... } //properties at the beginning of the animation's duration
    to{...} //properties in-between and to the end animation's duration

    /* If you don't want to use 'from' and 'to' and you want more control over the animation use the one below*/
    
    0%{...} //properties at 0% of the animation's duration
    50%{...} //properties at 50% of the animation's durationduration
    100%{...} //properties at 100% of the animation's duration

    /*You can specify properties for any amount between 0% and 100% depending on what part of the animation you would like for it to take effect.*/
	}

The part that gave the circles the bouncing effect was the `transform: scale(XY)` property. It begins the scale at 0 and at 40% it will reach its full scale or 1 and go back to 0 before going to 80% and 100%. 
___

###**Flowing Dot**###

Next up is the flowing dot. Look at this demo:

{%jsfiddle Uv9Re result,html,css %}

This one also used the `animation` property and `@keyframes` rule. If you look at the code the flowing dot effect was achieved by changing its top position continuously and changing the opacity between 0 and 1 when it reaches the end of the animation's duration. If you will maintain the dot's opacity at 1 you'll see a dot going back and forth on the top positions specified in the `@keyframes`.

___
###**Disappearing Outline**##

Compared to the first two examples this one is simpler. Go hover on the buttons that we have in the demo:

{%jsfiddle ED4e5 result,html,css %}

The effects here are executed by `transition` property. Unlike `animation` property which can start without triggers, `transition` needs a trigger for it to begin. In our example it is triggered by hovering. The properties that gives it the effect of a dissappearing outline is the `outline` property which has an initial value of `1px` and a color `#2d2d2d`. When the button is hovered it will change the value of the outline to `10px` and the color to an rgba color with 0 alpha attribute. The easing gives it the animated effect in between the transition from `1px` to `10px`, without the easing it will just move from `1px` to `10px` with no transition effect. Here is the structure of the transition property used here:


    transition: property duration easing;
    - property: it can be anything that you want to animate it can be the width, height or any css property. You can also specify `all` to put transition effect on everything.
    - duration: the time to complete the transition
    - easing: the easing can be the following: 'ease','ease-in', 'ease-out', 'ease-in-out', and `linear`;

___

###**Playing with SVG Icons**###
This one also uses `transition` property on SVG icons which is applied to its `fill` and `stroke` properties. An SVG has its own shape depending on the file, unlike block objects which is usually just square. Transition property works out really well with SVGs. You can see the demo below, hover on the objects and see what it does. 

{%jsfiddle 4DKax result,html,css %}

___
That's it. If you are looking for other creative ways of using CSS3 transitions, transforms, and animations, you can check this [tutorial](http://css3.bradshawenterprises.com/transitions/ 'BradShaw Tutorials'). 

Let's just keep practicing and get creative there is still more we can do with this. :)