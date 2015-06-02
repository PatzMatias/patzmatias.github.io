---
layout: post
title: "Learning Ruby and Rails"
date: 2015-06-02 18:01:23 +0800
comments: true
categories: Web Development, Programming, MVC
---

It has been a few weeks since my last project, so I decided to dive-in to Ruby and Ruby and Rails during my downtime and learn simple coding. Here is what I've learned so far.

## **Ruby**

### Facts

Before digging into Ruby code I've read some facts about it first. Ruby was designed and developed in the mid-1990s by Yukihiro "Matz" atsumoto in Japan. It is a dynamic, reflective, object-oriented, general-purpose programming language. Ruby's syntax is influenced by Perl and Python. Ruby has a library of plug-ins that can improve development workflow and experience called RubyGems (https://rubygems.org/). Ruby is one of the most popular programming languages of today.

<!--more-->

### Coding

To learn Ruby code, I went to codecademy and used their free learning course for Ruby. This is the first time I've encountered a programming language that doesn't use terminator symbols `;` and not much of curly braces '{}' to define the scope of a method or a loop. Compared to other languages I've worked with before like PHP, Java, and Javascript, Ruby has a cleaner syntax and a higher readability.

 Here is what I've learned.

Printing a string.

    puts "Hello World!"

Some built-in methods of Ruby

    -199.abs                                # => 199 / Absolute Values
    "Hello World".length                    # => 11 / Getting string length
    "Hello World.".index("r")               # => 9 / Finding index of a character
    "Hello World".downcase                  # => "hello world" / Lowercasing string
    "Hello World".upcase                    # => "HELLO WORLD" / Uppercasing string
    "Hello World!".uniq                     # => "Helo Wrd" / Transforming repeating characters into one 
    "Hello World!".split("")                # => ["Hello","World"] / Splits the string from the given character
    ["Hello","World"].join                  # => "HelloWorld" / Combines the string of arrays

Control Structure

    Like other programming languages Ruby has the if, else, elsif, case, and, short-if expression but Ruby has a control structure called `unless`, which works like an if statement but will only execute if the expression is false. Ruby also has a reverse `if` and `unless` syntax.


    # Unless
    x = 5
    
    unless x > 10
        x = 10
    end
    
    puts x
    
    # Output: 10 
    
    # reverse if/unless syntax
    
    puts "Hey!" if a < 5
    
    puts "Oi!" unless a > 5

Looping

Ruby also uses `while` to loop but it also has an inverted `while` called 'until' which executes until the expression evaluates to false. `while` and `until` can also be written in reverse syntax. Ruby also has a simple loop method called `times` which repeats itself based on the number defined on call.

    # Until
    x = 8

    until x < 10
        puts "+1"
        x=x+1
    end

    # Output: 
    # +1 
    # +1


    #reverse while/until

    puts "Hey!" while a < 5

    puts "Oi!" until a > 5


    # Times sample
    10.times do
        puts 'Will do this 10 times'
    end


Iterators

Ruby iterates arrays by using the `each` iterator. `each` simple loops to all of the data in an array and execute the block of statements inside it.

    # each sample
    array = [1,2,3,4,5]
    array.each do |i|
       puts i
    end

Another iterator is called `collect`. This iterator returns all the elements of a collection. A collection is usually an array or a hash.

    # collect sample 1

    x = [1,2,3,4,5]
    y = Array.new
    y = a.collect # collects all data in x and store it to y
    puts y

    # Output:
    # 1
    # 2
    # 3
    # 4
    # 5

    # collect sample 2
    g = [1,2,3,4,5]
    h = g.collect{|x| x*5} # collects all data in g multiply it by 5 and store it to h
    puts h

    # Output:
    # 5
    # 10
    # 15
    # 20
    # 25


Hash
    
A hash or an associative array is a dictionary-like collection of unique keys and their value.

    #hash

    hash = Hash.new # equivalent to hash = {}
    hash = { :cotton => 'soft', :stone => 'hard' }

    puts hash[:stone] # prints 'hard'

    #iterating over a hash

    hash.each do |key, value|
        puts "A #{key} is #{value}"
    end

    #deleting an key pair in hash

    hash.delete :stone                            # deletes the pair :stone => 'hard' and returns "hard"
    hash.delete_if {|key,value| value == 'soft'}   # deletes the pair :cotton => 'soft' and returns {}

Block, Procs and Lambda

Blocks, Procs, and Lambda works similarly but have different behaviors. Look at the samples below.

Blocks pertains to a block of codes inside or outside a method. Lets just use `collect` iterator as a simple example for blocks.

    # Blocks
    array = [1, 2, 3, 4]

    array.collect! do |n| # everything inside this method is block
        num = n ** 2
        puts num
    end

    #if these code gets wrapped inside a method then everything written above will be a block.

Procs are also known as procedures which means this blocks of codes are reusable.

    # Procs
    # This procs simply rounds off the array of floats
    floats = [1.2, 3.45, 0.91, 7.727, 11.42, 482.911]

    round_down = Proc.new {|x| x.floor}

    ints = floats.collect(&round_down)

Lambdas are identical to procs with some exception in a bit of syntax and behavior.

    # Lamda example
    def lambda_demo(a_lambda)
      puts "I'm the method!"
      a_lambda.call
    end

    my_lambda = lambda { puts "I'm the lambda!" }

    lambda_demo(my_lambda)

One difference between Lambdas and Procs behavior is that when Procs ends execution it returns outside the method and because of this Procs can overtake methods execution. Lambdas however return to the method instead. Here is an example of what I mean.

    # Procs and Lambda behavior difference
    def proc_sample
      Proc.new { return "I'm a proc."}.call
      return "proc_sample method finished"
    end

    def lambda_sample
      lambda { return "I'm a Lambda" }.call
      return "lambda_sample method finished"
    end

    puts proc_sample # returns "I'm a proc."
    puts lambda_sample # returns "lambda_sample method finished."

Classes

  Creating a class in Ruby always starts with the keyword class followed by the class name and terminate it with the keyword `end`. Ruby classes has four types of variables, a global variable, class variable, instance variable, and a local variable. Here is a snippet for an example.

  $global_var = "I'm a global variable. I always start with a ($) sign" # available all across classes and the program

  class MyClass

   @@class_var = "I'm a class variable. I always start with two (@) symbols" # only available to the objects inside the class.


    def initialize
      @foo = 28 # Instance variable (Always starts with an @ symbol. Available across methods for any particular instance or object.
      puts local_var
    end

    def print_num
        local_var = 56 # A local variable defined in a method. A local variable is not available outside the method.
        puts local_var
    end

    def foo
      return @foo
    end

    def foo=(value)
      @foo = value.round
    end
  end
 
  # calling the methods in the classes
  instance = MyClass.new #calling new instance of a class
  puts instance.foo
  instance.foo = 496.2
  instance.print_num
  puts instance.foo #=> 496

####Conclusion

That sums up all of what I've learned about Ruby. I've enjoyed coding with it when I did the Ruby course in codecademy. Although Ruby is not that easy to learn for beginners like me, I like how clean and simple Ruby's syntax look. Next time, I'll be studying how to create my own gems with Ruby.


### **Rails**

**Ruby on Rails** or just **Rails** is a web application framework gem. Rails was created in 2003 by David Heinemeier Hansson. Rails has an MVC (Model-View-Controller) architecture. Here are some of parts of the Rails that programmers loved.

- **Generators/Scaffolding** – Rails will generate the general template and code needed to start coding in application. After this the developer will only need to include the code that his app needs instead of working on it from top to bottom.

- **Gems/Plugins** – it uses RubyGems that can improve the development experience of the programmer.

- **Active Record ORM** – Active Record is the M in MVC - the model - which is the layer of the system responsible for representing business data and logic. Active Record facilitates the creation and use of business objects whose data requires persistent storage to a database. It is an implementation of the Active Record pattern which itself is a description of an Object Relational Mapping system. 

- **Integrated testing tools** – Ruby has built-in transformable testers to test their application's code is working correctly. 

Rails looked great for me but I'm having a kind of difficult time understanding the framework maybe because I got used to developing in vanilla PHP. But I'm sure I just need to use it more to grasp Rails more. What I liked about Rails is how easy it is to call on the data from the database and feed them on the html template although I do not completely understand how to form the controllers and model by myself yet. The thing about Rails that I didn't like is how much dependency it has on multiple gems which is coded by different developers. In the mini-project I was doing, for a tutorial I'm following, I've encountered a lot of gem dependencies and some incompatibility issues. There was this part that I was not able to create an apache passenger because I wanted to make mock a production server in my local computer. The latest rails depended on a none official version of Apache2. I need to do some more research about this and hopefully continue working with the mini-project and adding my own ideas on that mini-project.

And that finishes this post. Thanks for reading :)