---
layout: post
title: "Wordpress Shortcodes"
date: 2015-05-01 10:49:11 +0800
comments: true
categories: [Wordpress, Web Development]
---

**Shortcodes**
============

This feature has been integrated to WordPress in version 2.5.  **WordPress Shortcodes** are like customized html tags recognized by WordPress' system. Shortcode means shortcut, it can create objects, or embed files which would normally require a lot of code in just one line or tag. WordPress has built-in shortcode tags for its internal functions for gallery, embedded videos and audios, and more. 

(*For a list of built-in shortcodes just visit this link: https://en.support.wordpress.com/shortcodes/)*

### **Custom Shortcodes**

WordPress allow users to create a custom shortcode which opens of new options for entering content like controlling the layout of the content in the site, and pulling other custom contents or objects from the WYSIWYG Editor. 

#### ***Creating and Adding Shortcode to the WordPress System***

1. First, the `function(){}` for the shortcode must be created. This is where all the codes for the shortcode will be created. Here are some examples of how it can be created and used:

	##### **Simple text:**

		
		// A simple shortcode that returns a text.
			function shortcode_function( ) {
				return '<h1>I am a shortcode.</h1>';
			}
		

   ##### **Using `$atts` and `$content`**
	`$atts` will allow the shortcode to have attributes similar to an html tag and `$content` contains the text between the shortcode tags.

		 // A shortcode that utilizes $atts and $content, to display text add a custom class for the tag and add a background-color
			function shortcode_function( $atts, $content ) {
				extract(shortcode_atts(array(
						'background_color'=>'#000',
						'custom_class'=>'',
						'title'=>'',
				));
				return '<div class="'. $custom_class. '" style="background-color: ' . $background_color . ';"><h1>'.$title.'</h1><p>'.do_shortcode($content).'</p></div>';
			}
			

    ##### **Using `$tags`**
    `$tags` allows one shortcode function to be called in different tag names.
			
	// A shortcode that utilizes $tag and other parameters,
	function shortcode_function( $atts, $content,$tag ) {
		switch ($tag) {
			case 'simple_text':
				return '<h1>I am a shortcode.</h1>';
				break;
			case 'custom_text_tags':
				extract(shortcode_atts(array(
						'background_color'=>'#000',
						'custom_class'=>'',
						'title'=>'',
				));
			$display = '<div class="'. $custom_class. '" style="background-color: ' . $background_color . ';"><h1>'.$title.'</h1><p>'.do_shortcode($content).'</p></div>';
			return display;
				break;
			default:
				return '<h1>I am a shortcode.</h1>';
		}
	}

		

    ##### **Pulling posts or a custom post type**
    This is an actual code that I used for a project to pull posts from a custom post type and add it to a carousel.
    
	    function($atts, $content=null){
			 ob_start();
			   $args = array(
			    'posts_per_page' => -1,
			   'post_type' =>'carousel_post_type',
			   'order'=>'ASC'
			  );
			  
			$items = get_posts($args);
			$count = count($items);
		      echo '<div id="carousel" class="carousel slide" data-ride="carousel">';
				echo '<ol class="carousel-indicators">';
		        for($i = 0; $i<$count; $i++) : 
	              $index = ($i==0)? 'active' : '';
	              echo '<li data-target="#resources-carousel" data-slide-to="' . $i . '" class="'. $index .'"></li>';
		        endfor;
		        echo '<div class="carousel-inner" role="listbox">';
				foreach($resources as $key => $resource) :
				      $heading = get_field('heading',$resource->ID);
				      $link = get_field('resource_link',$resource->ID);
				      $content = $resource->post_content;
				      $key_index = ($key==0) ? 'active' : '';
				      
				      echo '<div class="item '.$key_index.'">';
				      echo '<div class="resources">';
					      echo '<a href="'.$link.'">';
						      echo '<div class="res-heading">';
							      echo '<span class="fa fa-book fa-2x pull-left"></span>';
							      echo '<h4 class="pull-left">'. $heading .'</h4>';
							      echo '</div>'				            
						      echo '<div class="res-body">'.$content.'</div>';
					      echo '</a>';
				       echo '</div>';
				      echo '</div>';
				echo '</div>';	
		      echo '</ol>';
			  echo '</div>';				
			return ob_get_clean();
		}


2. The next step is to add the function to the WordPress.

	    add_shortcode('custom_shortcode_name','shortcode_function');


#### **Using the Shortcode**

In the WYSIWYG Editor, we just need to enter the tag:

    [custom_shortcode_name]
or if we utilized the `$tag` parameter we also just use it like the first example.

    [simple_text]
	//or
	[custom_text_tags class="myclass" background_color="#000" title="My Shortcode"]My Shortcode content[/custom_text_tags]

That's all for shortcodes. Maybe you noticed that the shortcode gets longer if `$atts` is used. It can be solved by adding a custom button on the WYSIWYG editor and we will be exploring that on my next post. Keep on reading!