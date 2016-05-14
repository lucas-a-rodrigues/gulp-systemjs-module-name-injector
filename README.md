# Gulp systemjs module name injector

This plugin was created to aid with the TypeScript module system.
When TypeScript files are compiled using the `--module system` flag, the compiler does not output module names.

An example:

    System.register(["./other/module/dependency"], function($_export) {
      // ... module
    });

The output is totally unusable, since the module doesn't have a name. This plugin converts the output to this:

    System.register("module/path", ["./other/module/dependency"], function($_export) {
      // ... module
    });

## Basic Usage

Install the plugin:

    npm install gulp-systemjs-module-name-injector --save-dev
    
In your gulpfile:

    var systemjsModuleName = require('gulp-systemjs-module-name-injector');
    
    function buildTypescript() {
        return gulp.src(/* ... */)
            .pipe(typescript(tsProject))
            .pipe(systemjsModuleName())
            .pipe(/* ... */);
    }

### Options

    This fork brings a feature to modify the generated name.

rootDir: The root path is removed
    
    rootDir: 'src/app'
    // replace 'src/app/file' to '/file'
    // this option accept regular expressions.
    // Ex: rootDir: new RegExp('src\/app'), provide the same result '/file'

prefix: Concatenate a new prefix
    
    prefix: './'
    // replace 'src/app/file' to './src/app/file'

### Usage

    function buildTypescript() {
        
        var options = {
            rootDir: 'src/app',
            prefix: './' 
        }
    
        return gulp.src(/* ... */)
            .pipe(typescript(tsProject))
            .pipe(systemjsModuleName(options))
            .pipe(/* ... */);
    }
