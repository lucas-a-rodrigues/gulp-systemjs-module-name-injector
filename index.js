'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');

var jsExtensionRegex = /\.js/;
var windowsBackwardSlashRegex = /\\/g;

module.exports = function (options) {
	
	if (options === null || options === undefined) {
		options = {
			rootDir: null, // Set a root directory to remove
			prefix: null // Concat a prefix 
		};
	}
	
    return new Transform({
        objectMode: true,
        transform: function (file, encoding, callback) {
            if (file.isNull() || file.isDirectory()) {
                return callback(null, file);
            }

            if (!file.isStream() && !file.isBuffer()) {
                return callback(Error('Only streams and buffers are supported.'), file);
            }

            var name = file.relative
                .replace(jsExtensionRegex, '')
                .replace(windowsBackwardSlashRegex, '/');
            
            if (options.rootDir !== null) {
            	name = name.replace(options.rootDir, '');
            }
            
            if (options.prefix != null) {
            	name = options.prefix + name;
            }

            var search = /^System\.register\(\[/;
            var replace = "System.register('" + name + "', [";

            if (file.isStream()) {
                file.contents = file.contents.pipe(rs(search, replace));
            } else {
                file.contents = new Buffer(String(file.contents).replace(search, replace));
            }
            return callback(null, file);
        }
    })
};
