/*global module:false, require: false */
module.exports = function(grunt) {

	var DEFAULT_TASKS = ["jshint", "copy", "concat", "cssmin", "htmlcompressor", "uglify"],
		WATCH_FILES = ['public_html/js/**/*.js','public_html/**/*.html','public_html/**/*.css'];
		
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			dist: {
				files: [
					{expand: true, src: ['public_html/**'], dest: 'build/'}
				]
			}
		},
		concat: {
			options: {
				separator: ''
			},
			js: {
				src: [
					'public_html/js/observable.js',
					'public_html/js/todo-service.js',
					'public_html/js/application-controller.js',
					'public_html/js/main.js'
				],
				dest: 'build/public_html/js/main.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/public_html/js/main.js',
				dest: 'build/public_html/js/main.min.js'
			}
		},
		cssmin: {
		  combine: {
		    files: {
		      'build/public_html/css/<%= pkg.name %>-styles.css': ['public_html/css/layout.css', 'public_html/css/components.css', "public_html/css/animations.css"]
		    }
		  }
		},
		htmlcompressor: {
			compile: {
				files: {
					'build/public_html/index.html': 'public_html/index.html'
				},
				options: {
					type: 'html',
					preserveServerScript: true
				}
			}
		},
		clean: ["build"],
		jshint: {
			options: {
				/*** Enforcing options ***/
				// Set these to `true` to enforce, or `false` to relax.
				"bitwise":      true,
				"curly":        true,
				"eqeqeq":       false,
				"forin":        false,
				"immed":        true,
				"latedef":      false,
				"newcap":       true,
				"noarg":        true,
				"noempty":      true,
				"nonew":        true,
				"plusplus":     false,
				"regexp":       false,
				"undef":        true,
				"strict":       false,
				"trailing":     true,

				/*** Relaxing options ***/
				// Set these to `true` to relax, or `false` to enforce.
				"asi":          false,
				"boss":         true,
				"debug":        false,
				"eqnull":       true,
				"esnext":       true,
				"evil":         true,
				"expr":         true,
				"funcscope":    false,
				"globalstrict": false,
				"iterator":     false,
				"lastsemic":    false,
				"laxbreak":     false,
				"laxcomma":     false,
				"loopfunc":     true,
				"multistr":     false,
				"onecase":      false,
				"proto":        false,
				"regexdash":    false,
				"scripturl":    false,
				"shadow":       true,
				"smarttabs":    true,
				"sub":          false,
				"supernew":     false,
				"validthis":    true,

				/*** Environments ***/
				// Set each environment that you're using to `true`.
				"browser":      true,
				"couch":        false,
				"devel":        false,
				"dojo":         false,
				"jquery":       true,
				"mootools":     false,
				"node":         false,
				"nonstandard":  false,
				"prototypejs":  false,
				"rhino":        false,
				"wsh":          false,

				/*** Legacy from JSLint ***/
				// Set these to `true` to enforce, or `false` to relax.
				"nomen":        false,
				"onevar":       false,
				"passfail":     false,
				"white":        false
			},
			all: ['Gruntfile.js', 'public_html/js/*.js']
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		connect: {
			all: {
				options:{
					port: 9000,
					hostname: "0.0.0.0",
					base: "build/public_html",
				    middleware: function(connect, options) {
						return [
							// Load the middleware provided by the livereload plugin
							// that will take care of inserting the snippet
							require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
							// Serve the project folder
							connect.static(options.base)
						];
					}
				}
			}
		},
		open: {
			all: {
				// Gets the port from the connect configuration
				path: 'http://localhost:<%= connect.all.options.port%>/index.html'
			}
		},
		regarde: {
			all: {
				// This'll just watch the index.html file, you could add **/*.js or **/*.css
				// to watch Javascript and CSS files too.
				files: WATCH_FILES,
				// This configures the task that will run when the file change
				tasks: DEFAULT_TASKS.concat(['livereload'])
			}
		},
		watch: {
			files: WATCH_FILES,
			tasks: DEFAULT_TASKS
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-htmlcompressor');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-open');
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-regarde');

	// Default task(s).
	grunt.registerTask("default", DEFAULT_TASKS);
	grunt.registerTask("server", ["livereload-start", "connect", "open", "regarde"]);
};