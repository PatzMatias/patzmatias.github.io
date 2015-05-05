---
layout: post
title: "Wordpress Custom WYSIWYG Editor Buttons"
date: 2015-05-05 13:16:57 +0800
comments: true
categories: 
---

This is a continuation of the post about **[Wordpress Shortcodes](http://patzmatias.github.io/blog/2015/05/01/wordpress-shortcodes/)** and this time we're going to add a button for the shortcode and other purposes like a set of html tags, or a preformatted text.

1. First, we create a script file that contains the label, an optional custom icon and the button functionality that adds the content. Store this file in your theme folder.
	
	    (function() {
			tinymce.PluginManager.add('my_shortcode_button', function( editor, url ) {
				editor.addButton('my_shortcode_button', {
					text: 'My Label',//custom label
					icon: false, //use a custom icon or not
					onclick: function() { // the content to be inserted when the button is clicked.
						editor.insertContent('[custom_shortcode_name title=&quot;&quot; class=&quot;&quot;][/custom_shortcode');
					}
				});
			});
		})();

2. And the last step is adding the shortcode to Wordpress backend.

	    // Hook functions into the correct filters
		function my_shortcode_button() {
			// check user permissions
			if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
				return;
			}
			// check if WYSIWYG is enabled
			if ( 'true' == get_user_option( 'rich_editing' ) ) {
				add_filter( 'mce_external_plugins', 'my_shortcode_plugin' );
				add_filter( 'mce_buttons', 'register_shortcode_button' );
			}
		}
		add_action('admin_head', 'my_add_mce_button');
		
		// Add the script we created earlier for the new button
		function my_shortcode_plugin( $plugin_array ) {
			$plugin_array['my_shortcode_button'] = get_template_directory_uri() .'/js/my_shortcode_plugin.js';
			return $plugin_array;
		}
		
		// Register the button into the editor
		function register_shortcode_button( $buttons ) {
			array_push( $buttons, 'my_mce_button' );
			return $buttons;
		}

That is all we need to add a simple button for the shortcode. If the button gets click it will add the shortcode to the editor together with its attributes and the user can now just start adding the contents between the shortcode tags.

If you want to learn more about button you can checkout these resources:

 - [WordPress 3.9+ TinyMCE 4 Tweaks: Adding Styles, Buttons, Fonts, Drop-downs & Pop-Ups](http://www.wpexplorer.com/wordpress-tinymce-tweaks/)
 - [Twist That Code: How to Add Custom Buttons for WordPress TinyMCE Editor](http://www.1stwebdesigner.com/wordpress-tinymce-editor/)

Thanks for reading! :)

