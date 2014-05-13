var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-bom-remover';
const BOM_REGEX = /\uFEFF/;

exports = module.exports = gulpBomRemover;

function gulpBomRemover() {

    // Creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, callback) {

        if (file.isNull()) {
            // Do nothing if no contents
        }
        if (file.isBuffer()) {
            file.contents = new Buffer(file.contents.replace(BOM_REGEX, ''));
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(file.contents.replace(BOM_REGEX, ''));
        }

        //TODO: Writing file with UTF8 encoding

        this.push(file);
        return callback();

    });

    // returning the file stream
    return stream;
}