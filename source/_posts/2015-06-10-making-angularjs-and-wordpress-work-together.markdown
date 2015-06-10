---
layout: post
title: "Making AngularJS and Wordpress Work Together"
date: 2015-06-10 22:17:56 +0800
comments: true
categories: 
---

There has been articles around the web about **AngularJS** and **Wordpress** working together that made me want to try this combination. In a short description, it's AngularJS utilizing the **Wordpress AJAX** service as an API. <!-- more -->

There are two ways to execute this combination. One, **create the AngularJS app as a theme of Wordpress** or two, **work with AngularJS outside the Wordpress directory**. 

The only difference between them is that the first method can cause routing problems because the app is riding the Wordpress' permalink structure; but it can be solved with creating some rewrite rules.

I've created an AngularJS for a simple Style Guide app that fetches the objects from the wordpress json api but my app is far from perfect 'cause I'm still at a beginner's level at Angular. I'll tell some of the steps I've did to create the simple app. By the way, I used the first method to do this.

First, we'll need to setup Wordpress first then go to Wordpress' themes folder and create a new folder for our app there. The newly created folder should contain all the required files for it to be recognized as theme by Wordpress, the `index.php` file and the `style.css` file which contains the template info. After those steps, we should add AngularJS and other resources we need to the theme folder. In my case, I added `angular-route`,`angular-sanitize`, and `angular-bootstrap`. The file tree can look like the image below:

{% img img-responsive /images/themes.png 'File tree' %}

After setting up the initial files, we can now start building the app. To begin, I started creating the custom fields and the custom post types I needed for the app which I've done programmatically so the theme can be reused without depending on third-party plugins. Next to this step is writing the endpoint for the JSON API. 

{% img img-responsive /images/php.png 'Sample Code Block' %}

From these point on we'll just build the controllers, services, template, or directives and the views we need.

    var app = angular.module(app,[]);

    //Service
    app.factory('Posts', ['$http', function($http){
        return{
            getPosts: function(){
                var response = $http({
                    url: ajax_url,
                    method: 'GET',
                    params: {action: 'allposts'}
                }).success( function( response ){
                        return response.data;
                });
                return response;
            }
        }
    }]);

    //Controller
    app.controller('MainCtrl', ['$scope','Posts', function($scope, Posts){

        Posts.getPosts.then(function(data){
            $scope.posts = data.data;
        });

    }]);

    //Template
    <div ng-repeat="post in posts">
        <h1>{{post.post_title}}</h1>
        <p>{{[post.excerpt}}</p>
    </div>

That's most of what you'll be doing with a AngularJS + Wordpress app. Right now my app is only able to fetch data but I'll be trying to add more features in this app in the future and continue learning the AngularJS framework.

###**Summary**

AngularJS + Wordpress really works great together and creating the app is almost similar to working with an AngularJS app with a regular API. There may be a better solution for an API but Wordpress is good if you need a free API that you can modify yourself and it starting point for beginners on understanding how APIs work if you are used to being a Wordpress Developer.