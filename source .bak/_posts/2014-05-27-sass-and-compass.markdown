---
layout: post
title: "SASS and Compass"
date: 2014-05-27 16:01:19 +0800
comments: true
categories: [CSS, SASS, Web Development]
author: Patrick Matias
---

We know how CSS style sheets can get all long and unorganized during development specially when doing large projects but luckily this isn't a problem now. I've been using SASS and Compass in my training for quite a while now and I'm getting fond of it. 

**SASS (Synthetically Awesome Stylesheet)**
--------
**SASS** is an extension of CSS which allows the user to add **variables**, **nested rules**, **mixins**, **imports,** **partials**, **extended property sharing** and more. It uses a fully CSS-compatible syntax and helps keep style sheets well-organized.

SASS has two type of syntax for coding. The first version which is based on **Haml** is SASS, it doesn't use curly braces `{}` and semi-colon `;` and has a strict indentation syntax. The second version is the SCSS which syntax is a lot more similar to CSS, and this is the one I am using. 

<!--more-->

Here is an example of a normal CSS stylesheet:
```SASS
`Regular CSS stylesheet`

@font-face {
    font-family: 'Tisa Pro';
    src: url('/fonts/TisaPro.otf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Tisa Pro Italic';
    src: url('/fonts/TisaPro-Ita.otf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Tisa Pro Bold';
    src: url('/fonts/TisaPro-Bold.otf');
    font-weight: normal;
    font-style: normal;
}

	div{
	 color: #333;
	 background-color: #fff;
	 -webkit-box-shadow: 3px 3px 5px #000;
	     -moz-box-shadow: 3px 3px 5px #000;
	        -o-box-shadow: 3px 3px 5px #000;
	            box-shadow: 3px 3px 5px #000;
	}
	
	div:hover{
	 color: #fff;
	 background-color: #333;
	}
	
	div p{
	 text-align: justify;
	 color: #fff;
	 background-color: #333;
	}
	
	div h3{
	 text-align: center;
	 color: #fff;
	 background-color: #333;
	}
```


And this is a SASS stylesheet (SCSS syntax format):

```SASS
    `main.scss`
    
    @import "typography"; //imports declaration
    
	$light: #fff; //VARIABLES
	$dark: #333; //VARIABLES
	
	@mixin box-shadow($shadow) { //mixins declaration
     -webkit-box-shadow: $shadow;
		 -moz-box-shadow: $shadow;
			 -o-box-shadow: $shadow;
					box-shadow: $shadow;
    }
	
	div{  //ENHANCED NESTING
        color: $dark;
        background-color: $light;
        @include box-shadow(3px 3px 5px $dark); //mixins implementation
        &:hover{                       
        	color: $light;
        	background-color: $dark;  
        }
    	p{
    	    font-family: 'Tisa Pro'
        	text-align: justify;
        	color: $light; //extended property
        	background-color: $dark; //extended property
    	}
    	h3{
    	    @extend p;          //@extend (EXTENDED PROPERTY SHARING)
            text-align: center;
    	}
	}
```
```SASS
    `_typography.scss`//partials 

    @font-face {
        font-family: 'Tisa Pro';
        src: url('/fonts/TisaPro.otf');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Tisa Pro Italic';
        src: url('/fonts/TisaPro-Ita.otf');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Tisa Pro Bold';
        src: url('/fonts/TisaPro-Bold.otf');
        font-weight: normal;
        font-style: normal;
    }
```

**Variables**

With SASS a user will be capable of declaring variables. We all know that a variable is an essential part of most programming languages which is usually used to hold data.
	
Now how is this useful in a language used for styling? Sometimes during development there are situations were we have to use similar property attributes.
	
Notice how many times color attribute #fff and #333 was used. Let us say that we wanted to change these colors, that means we have to go back on all these attributes and edit it one by one. This is where SASS Variables will be valuable to users.

With variables the user only needs to edit the value contained in the variable and every property that uses it will have the style and it would be easier to re-use the attribute to other properties.

**Nested rules/Nesting**

SASS enables the user to use nesting similar to nesting that is used in application programming. In the previous example we have called the `p` and `h3` of the object `div`, and called it again for its hover state. If `div` contains more child then we would have to call it again to access the child. Nesting will make it easier for the user to style an object and its childs.

SASS Nested rules follow the same visual hierarchy of the HTML so it would be easier to see which objects belongs to what object.

**@extend (Extended property sharing)**

`@extend` is very useful when we come to situations where we use the same property and attributes on some objects. In the CSS example, `p` and `h3` contains the same `color` and `background-color` property. The code would look cleaner if the property of `p` would be extended to `h3` and override then just `text-align` attribute.

**@mixins**

Style sheets gets longer specially when we want the styles compatible to many browsers. On some properties like `box-shadow` and `border-radius`, we use vendor prefixes to make sure that the styles would be displayed correctly in a certain browser and it gets tedious to write. But mixins can shorten it like a function or method in a programming language. We create it by writing `@mixins` and giving it a name and use a variable to pass on the attribute of the properties, then use it by declaring in the CSS an '@include' followed by the name of the mixin.

SASS also uses **operators**, **control directives and expressions** like `if()`. I'll update this section once I learned how and when to use this three.


**@import and Partials**

Coding style sheets can be more organized with SASS' `@imports` and partials capability. Partials and `@import` allows the user to create parts of the style sheet and import it to your main style sheet. When it is generated those parts will be generated in a single CSS style sheet. 

To create a partial file its name must be prefixed with an underscore `_` like `_typography.scss`. The partial files are imported this way `@import "typography";`. The underscore prefix are removed to prevent SASS on generating an individual style sheet for the partial file, because we want SASS to import the styles to the main style sheet.


**Compass**
----------
While SASS enhances the coding experience for CSS,  **Compass** eases the creation of the projects folder that is SASS ready and the use of SASS terminal commands. Here is some example:

SASS terminal commands:
```
sass input.scss output.css //SASS command for producing a CSS style sheet from the SCSS file

sass --watch input.scss:output.css //Command for producing a CSS style sheet from the SCSS file and                                                    watch it for changes for reproduction

sass --watch app/sass:public/stylesheets //Command for watching an entire directory for changes in SCSS                                                         files and and automatic CSS file production
```

Compass terminal commands:
```
compass compile //to convert SCSS files to CSS style sheets

compass watch // to watch the entire directory of SASS and automatic CSS style sheet production

compass create projectname or /path/and/projectname/ // to create a project folder that is SASS ready

compass validate //Compass is also capable of validating the CSS style sheets
```

Compass made SCSS to CSS file conversion easier by making the command much simpler. Compass also has its core utilities that can help the user to layout and style his website. 

That's all for now! I'll be doing a post about Bootstrap next time so keep posted. Thanks for reading :)
