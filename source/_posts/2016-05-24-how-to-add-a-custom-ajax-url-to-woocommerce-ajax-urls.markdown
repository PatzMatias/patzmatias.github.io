---
layout: post
title: "How to add a Custom AJAX URL to WooCommerce AJAX URLs"
date: 2016-05-24 16:11:00 +0800
comments: true
categories: Wordpress, WooCommerce, AJAX, JS, PHP
---
I've been having an awesome time working with the WooCommerce plugin lately and found many things I liked and didn't like about it. I wrote this article to tackle one thing that I didn't like about it and how we could improve it. 

If you've used WooCommerce before you'll find parts of the system that uses AJAX and parts that do not, and which sometimes results into inconsistencies to it's UX. <!-- more -->For example, their mini-cart widget, when activated the users would see their cart contents in it. Upon pressing the **Add to cart** button in the shop page a product would be added in the mini-cart and it is processed via ajax. But when a user clicks the remove button from one of the items in the mini-cart the page refreshes just to update it's UI. Isn't that inconsistent with the UX of the carts process flow? And since I mentioned it, I'll tell you what I did to solve this dilemma.

________

###**Step 1. Extending WC_AJAX class**
 Initially, I searched through WooCommerce's plugin files for the function or class where I can attach my own ajax endpoints and I found this part of the WC_AJAX Class that could be seen in `woocommerce/includes/class-wc-ajax.php`.
    
Source: [https://github.com/woothemes/woocommerce/blob/master/includes/](https://github.com/woothemes/woocommerce/blob/master/includes/ "https://github.com/woothemes/woocommerce/blob/master/includes/")

``` 
<!-- Starts at line 87 -->
/**
 + Hook in methods - uses WordPress ajax handlers (admin-ajax).
 */
public static function add_ajax_events() {
    // woocommerce_EVENT => nopriv
    $ajax_events = array(
        'get_refreshed_fragments'                          => true,
        'apply_coupon'                                     => true,
        'remove_coupon'                                    => true,
        'update_shipping_method'                           => true,
        'get_cart_totals'                                  => true,
        'update_order_review'                              => true,
        'add_to_cart'                                      => true,
        'checkout'                                         => true,
        'get_variation'                                    => true,
        'feature_product'                                  => false,
        'mark_order_status'                                => false,
        'add_attribute'                                    => false,
        'add_new_attribute'                                => false,
        'remove_variation'                                 => false,
        'remove_variations'                                => false,
        'save_attributes'                                  => false,
        'add_variation'                                    => false,
        'link_all_variations'                              => false,
        'revoke_access_to_download'                        => false,
        'grant_access_to_download'                         => false,
        'get_customer_details'                             => false,
        'add_order_item'                                   => false,
        'add_order_fee'                                    => false,
        'add_order_shipping'                               => false,
        'add_order_tax'                                    => false,
        'remove_order_item'                                => false,
        'remove_order_tax'                                 => false,
        'reduce_order_item_stock'                          => false,
        'increase_order_item_stock'                        => false,
        'add_order_item_meta'                              => false,
        'remove_order_item_meta'                           => false,
        'calc_line_taxes'                                  => false,
        'save_order_items'                                 => false,
        'load_order_items'                                 => false,
        'add_order_note'                                   => false,
        'delete_order_note'                                => false,
        'json_search_products'                             => false,
        'json_search_products_and_variations'              => false,
        'json_search_grouped_products'                     => false,
        'json_search_downloadable_products_and_variations' => false,
        'json_search_customers'                            => false,
        'term_ordering'                                    => false,
        'product_ordering'                                 => false,
        'refund_line_items'                                => false,
        'delete_refund'                                    => false,
        'rated'                                            => false,
        'update_api_key'                                   => false,
        'get_customer_location'                            => true,
        'load_variations'                                  => false,
        'save_variations'                                  => false,
        'bulk_edit_variations'                             => false,
        'tax_rates_save_changes'                           => false,
        'shipping_zones_save_changes'                      => false,
        'shipping_zone_add_method'                         => false,
        'shipping_zone_methods_save_changes'               => false,
        'shipping_zone_methods_save_settings'              => false,
        'shipping_classes_save_changes'                    => false,
    );
    foreach ( $ajax_events as $ajax_event => $nopriv ) {
        add_action( 'wp_ajax_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
        if ( $nopriv ) {
            add_action( 'wp_ajax_nopriv_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
            // WC AJAX can be used for frontend ajax requests
            add_action( 'wc_ajax_' . $ajax_event, array( __CLASS__, $ajax_event ) );
        }
    }
}
```

We wouldn't want to edit the plugin itself to add the custom endpoint and functions to the class because our code would be erased when the plugin updates itself. To avoid losing our code, a better way to add our codes is to extend the class. We could add it as a plugin or put just include it in the themes `functions.php`.

In my case, I created a separate file just for this class then used `include_once()` to load it through my themes `functions.php`.


    class Custom_WC_AJAX extends WC_AJAX {
        
        /**
         - Hook in ajax handlers.
         */
        public static function init() {
            add_action( 'init', array( __CLASS__, 'define_ajax' ), 0 );
            add_action( 'template_redirect', array( __CLASS__, 'do_wc_ajax' ), 0 );
            self::add_ajax_events();
        }
        
        /**
         - Get WC Ajax Endpoint.
         - @param  string $request Optional
         - @return string
         */
        public static function get_endpoint( $request = '' ) {
            return esc_url_raw( add_query_arg( 'wc-ajax', $request, remove_query_arg( array( 'remove_item', 'add-to-cart', 'added-to-cart' ) ) ) );
        }
        
        /**
         - Set WC AJAX constant and headers.
         */
        public static function define_ajax() {
            if ( ! empty( $_GET['wc-ajax'] ) ) {
                if ( ! defined( 'DOING_AJAX' ) ) {
                    define( 'DOING_AJAX', true );
                }
                if ( ! defined( 'WC_DOING_AJAX' ) ) {
                    define( 'WC_DOING_AJAX', true );
                }
                // Turn off display_errors during AJAX events to prevent malformed JSON
                if ( ! WP_DEBUG || ( WP_DEBUG && ! WP_DEBUG_DISPLAY ) ) {
                    @ini_set( 'display_errors', 0 );
                }
                $GLOBALS['wpdb']->hide_errors();
            }
        }
        
        /**
         - Send headers for WC Ajax Requests
         - @since 2.5.0
         */
        private static function wc_ajax_headers() {
            send_origin_headers();
            @header( 'Content-Type: text/html; charset=' . get_option( 'blog_charset' ) );
            @header( 'X-Robots-Tag: noindex' );
            send_nosniff_header();
            nocache_headers();
            status_header( 200 );
        }
        
        /**
         - Check for WC Ajax request and fire action.
         */
        public static function do_wc_ajax() {
            global $wp_query;
            if ( ! empty( $_GET['wc-ajax'] ) ) {
                $wp_query->set( 'wc-ajax', sanitize_text_field( $_GET['wc-ajax'] ) );
            }
            if ( $action = $wp_query->get( 'wc-ajax' ) ) {
                self::wc_ajax_headers();
                do_action( 'wc_ajax_' . sanitize_text_field( $action ) );
                die();
            }
        }
        
        /**
         - Add custom ajax events here
         */
        public static function add_ajax_events() {
            // woocommerce_EVENT => nopriv
            $ajax_events = array(
                'minicart_remove_item' => true,
            );
            foreach ( $ajax_events as $ajax_event => $nopriv ) {
                add_action( 'wp_ajax_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
                if ( $nopriv ) {
                    add_action( 'wp_ajax_nopriv_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
                    // WC AJAX can be used for frontend ajax requests
                    add_action( 'wc_ajax_' . $ajax_event, array( __CLASS__, $ajax_event ) );
                }
            }
        }
        
        /**
         - Get a refreshed cart fragment. 
         - 
         - Copied from WC_AJAX but changed how data is returned. 
         - You can add fragments (DOM Objects loaded via AJAX) by adding them
         - through the 'add_to_cart_fragments'. 
         - It's better to do it this way so you don't have to create the DOM via
         - javascript because WooCommerce have a general javascript code that will
         - automatically change the DOM Object for all the fragments loaded
         - through here. I will give more info about this later.
         */
        public static function get_refreshed_fragments_raw() {
            // Get mini cart
            ob_start();
            woocommerce_mini_cart();
            $mini_cart = ob_get_clean();
            // Fragments and mini cart are returned
            $data = array(
                'fragments' => 
                    apply_filters( 
                    'woocommerce_add_to_cart_fragments', 
                    array(
                        'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>'
                    )
                ),
                'cart_hash' => 
                apply_filters( 
                    'woocommerce_add_to_cart_hash', 
                    WC()->cart->get_cart_for_session() ? md5( json_encode( WC()->cart->get_cart_for_session() ) ) : '', 
                    WC()->cart->get_cart_for_session() )
                 );
            /**
             - Used 'return' here instead of 'wp_send_json()';
             */
            return ( $data ); 
        }
        /**
         - Removes item from the cart then returns a new fragment
         */
        public static function minicart_remove_item() {
            $cart_key = $_POST['cart_key'];
            if(!empty($cart_key)) {
                if( WC()->cart->remove_cart_item( $cart_key ) ){
                    // Response
                    $new_fragments = self::get_refreshed_fragments_raw();
                    die(json_encode($new_fragments));
                }
            }
            die("error!!!!");
        }
    }

    $custom_wc_ajax = new Custom_WC_AJAX();
    $custom_wc_ajax->init();


In the code sample above, I copied ix(6) functions from the parent class WC_AJAX that is needed to make the extend work. Then at the last part I just added my functions for the 

- `init()`, 
- `get_endpoint`, 
- `define_ajax*()`, 
- `do_wc_ajax()`, 
- `add_ajax_events()`, 
- and `get_refreshed_fragments` -> which I renamed to `get_refreshed_fragments_raw()`

The first 4 functions are only needed to initiate the class and we only need to edit `add_ajax_events()` and `get_refreshed_fragments()`. I had to rename `get_refreshed_fragments()` to `get_refreshed_fragments_raw()` because I needed it to return the data to the functions, not the browser.

###**Step 2. Adding your custom AJAX events**

To add a custom event you just have to create a function within the class and and add the function name in `$ajax_events` array inside the `add_ajax_events()` function. 

```
    /**
     * Add custom ajax events here
     */
    public static function add_ajax_events() {
        // woocommerce_EVENT => nopriv
        $ajax_events = array(
            'minicart_remove_item' => true,
        );
        foreach ( $ajax_events as $ajax_event => $nopriv ) {
            add_action( 'wp_ajax_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
            if ( $nopriv ) {
                add_action( 'wp_ajax_nopriv_woocommerce_' . $ajax_event, array( __CLASS__, $ajax_event ) );
                // WC AJAX can be used for frontend ajax requests
                add_action( 'wc_ajax_' . $ajax_event, array( __CLASS__, $ajax_event ) );
            }
        }
    }  

    public static function minicart_remove_item() {
        
        if(isset($_POST['cart_item_key'])) die("error!!!!");

        $cart_item_key = $_POST['cart_item_key'];
        if(!empty($cart_item_key)) {
            if( WC()->cart->remove_cart_item( $cart_item_key ) ){
                // Response
                $new_fragments = self::get_refreshed_fragments_raw();
                die(json_encode($new_fragments));
            }
        }
        
    }
```

In the problem I'm trying to solve we need to remove a cart item from the minicart without reloading the page. When I inspected the code for their remove button, it has the endpoint url to cart argument `remove_item` with the value `cart_item_key`. I created a new endpoint for it and then pass the `cart_item_key` via post method and used `WC()->cart->remove_cart_item( $cart_item_key )` to remove the item from the cart and return the new fragments for the mini-cart. Fragments are bits of html code that woocommerce uses as a template to attach new information to the UI. Custom fragments can be attached to the `add_to_fragments` filter. In this case, we don't have to create custom fragments. But I'll discuss it on another topic.

###**Step 3. Editing the mini-cart.php**

In the default `mini-cart.php`, this is how the remove link is generated.

Source: [https://github.com/woothemes/woocommerce/blob/master/templates/cart/mini-cart.php](https://github.com/woothemes/woocommerce/blob/master/templates/cart/mini-cart.php, "https://github.com/woothemes/woocommerce/blob/master/templates/cart/mini-cart.php")

    <?php
    echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
        '<a href="%s" class="remove" title="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
        esc_url( WC()->cart->get_remove_url( $cart_item_key ) ),
        __( 'Remove this item', 'woocommerce' ),
        esc_attr( $product_id ),
        esc_attr( $_product->get_sku() )
    ), $cart_item_key );
    ?>

These are lines 45-53. I had to tweak this a bit to make it work with the behavior I want. In this sample code, you'll see that I changed `href` to a hash and added a `data-key` equal to the `$cart_item_key`. On line 48 instead of using `esc_url( WC()->cart->get_remove_url( $cart_item_key )`, I just used `esc_attr($cart_item_key)` to make it print just the `$cart_item_key`.

    <?php
    echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
        '<a href="#" data-key="%s" class="remove" title="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
        esc_attr( $cart_item_key ),
        __( 'Remove this item', 'woocommerce' ),
        esc_attr( $product_id ),
        esc_attr( $_product->get_sku() )
    ), $cart_item_key );
    ?>

###**Step 4. Write JS to send post data to our custom endpoint.**

Since the remove button has been modified, we'll now move on to writing the javascript code for it. I wanted to follow the standard of WooCommerce on their coding so I just copied the `add_to_cart.js` and modified it to my needs. Everything under the `$post()` refreshes the information from the fragments received in the `response` data, so it won't just remove the cart item but also attach the new data to the UI.


    jQuery( function( $ ) {

        /* global jQuery, wc_add_to_cart_params */
        if ( typeof wc_add_to_cart_params === 'undefined' ) {
            return false;
        }
        // Ajax remove cart item
        $( document ).on( 'click', 'a.remove', function(e) { // Remove button selector
            e.preventDefault();
            // AJAX add to cart request
            var $thisbutton = $( this );
            if ( $thisbutton.is( '.remove' ) ) {
                //Check if the button has a product ID
                if ( ! $thisbutton.attr( 'data-product_id' ) ) { 
                    return true;
                }

                // Get Cart Key
                var key = $thisbutton.data('key');

                // Create Post Data
                var data = {cart_key: key};
               
                // Ajax action
                //passed`minicart_remove_item` endpoint and post dta
                $.post( 
                    wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'minicart_remove_item' ), 
                    data, 
                    function( response ) {
                    if ( ! response ) {
                        return;
                    }
                        var this_page = window.location.toString();
                        $thisbutton.removeClass( 'loading' );
                        var fragments = response.fragments;
                        var cart_hash = response.cart_hash;
                        // Block fragments class
                        if ( fragments ) {
                            $.each( fragments, function( key ) {
                                $( key ).addClass( 'updating' );
                            });
                        }
                        // Block widgets and fragments
                        $( '.shop_table.cart, .updating, .cart_totals' ).fadeTo( '400', '0.6' ).block({
                            message: null,
                            overlayCSS: {
                                opacity: 0.6
                            }
                        });
                        // Replace fragments
                        if ( fragments ) {
                            $.each( fragments, function( key, value ) {
                                $( key ).replaceWith( value );
                            });
                        }
                        // Unblock
                        $( '.widget_shopping_cart, .updating' ).stop( true ).css( 'opacity', '1' ).unblock();
                        // Cart page elements
                        $( '.shop_table.cart' ).load( this_page + ' .shop_table.cart:eq(0) > *', function() {
                            $( '.shop_table.cart' ).stop( true ).css( 'opacity', '1' ).unblock();
                            $( document.body ).trigger( 'cart_page_refreshed' );
                        });
                        $( '.cart_totals' ).load( this_page + ' .cart_totals:eq(0) > *', function() {
                            $( '.cart_totals' ).stop( true ).css( 'opacity', '1' ).unblock();
                        });
                        // Trigger event so themes can refresh other areas
                        $( document.body ).trigger( 'added_to_cart', [ fragments, cart_hash, $thisbutton ] );
                },
                'json');
                e.preventDefault();
                return false;
            }
            return false;
            // return true;
        });
    });

---

Upon testing this modification, for me, the mini-cart behavior became better. You can also add a quantity input field there and modify the quantity of each cart item without refreshing the page.

So that's it for now. I'll do another post about `fragments` in my next post. Thanks!
