---
layout: post
title: "Another Slider Test"
date: 2014-05-13 16:18:44 +0800
comments: true
categories: [jQuery, Web Development]
author: Patrick Matias
---

{% img center /images/exercise2site.png 640 521 'CAROUSEL VCARD Website' %}

[Link to website](http://www.html-themes.com/themes/carousel_vcard/)

It is amazing to know how creative we can get in web development. My second project showed me how sliders can be utilized in a more functional way. The website Sir Efren gave us to study is a one-page portfolio website where it used a complex slider that expand and collapse to display the contents.

This project thought me how important it is to refactor our codes. Codes should be simple and short as long as possible so it can be easily maintained and to minimize the use of resources (storage and memory).

<!--more-->

```js
$('.contentWrap').click(function(){
	var currentBox = $(this).parents($(".contentWrap"));
	$('.itemBox').not(currentBox).css({"display":"none"});
	expand();
});
```

The code above is the refactored version of the first version of my code. I noticed while I'm writing the code that the lines I'm writing is already getting longer and its not normal anymore. If I didn't refactor I may have abused the `if-else` and class selectors just to arrive with the same function of the code above. Now I know that I should always think of a way to keep my codes short, clean, and simple.