SPA application sample for ASP.NET 5
====================================
This repository contains the sources for the ASP.NET 5 SPA sample application.
Please refer to my weblog for more information about this sample and how to use it.

## Getting started
You need a couple of things to get started with this sample.
Please have DNVM RC1 and nodejs 5.x installed before attempting to use this sample.

Additionally execute the following commands to get the build tools:

``` bash
npm -g install gulp tsd
```

This will install The typescript definitely typed package manager (TSD)
and the Gulp build tool which you need to compile the typescript and SASS files.

After installing these tools, run the following commands to get the rest of these
dependencies for the project:

``` bash
npm install
tsd install
dnu restore
```

## Building and running the application
Execute the following commands to build and run the application.

``` bash
dnu build
dnx web
```

The first command ensures you have a working version of the web application.
It compiles the .NET sources and runs the Gulp build to get the client-side
files compiled and copied to the `wwwroot` folder.

You can now explore the app in your favorite browser!

## Building a production release
By default a debug build is produced by gulp. If you set the ASPNET_ENV enviroment variable 
to something other than `Development` for example `Production` then Gulp will not produce any
sourcemaps, thus reducing the size of the javascript files by about 2 megabytes.

## Development tips
Manually compiling the sass and typescript files can hold you back so I included
a watch task in the gulp build. Please use `gulp watch` to use this task.

The gulp watch task will monitor the source folders for changes and compile the
typescript or sass files when they change.
