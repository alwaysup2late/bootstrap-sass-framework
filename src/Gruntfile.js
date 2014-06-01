module.exports = function(grunt) {
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		watch: {
			css: {
				files: ["scss/*.scss", "scss/*/*.scss"],
				tasks: ["build:styles:dev"],
				options: {
					livereload: true
				}
			},

			js: {
				files: ["script/*.js", "script/*/*.js"],
				tasks: ["build:js:dev"],
				options: {
					livereload: true
				}
			}
		},

		compass: {
			dist: {
				options: {
					config: "config.rb"
				}
			}
		},

		concat: {
			options: {
				separator: ";",
			},
			
			dist: {
				src: [
					"script/jquery.min.js",
					// "script/bootstrap/affix.js",
					"script/bootstrap/alert.js",
					"script/bootstrap/button.js",
					// "script/bootstrap/carousel.js",
					"script/bootstrap/collapse.js",
					"script/bootstrap/dropdown.js",
					"script/bootstrap/tab.js",
					"script/bootstrap/transition.js",
					// "script/bootstrap/scrollspy.js",
					"script/bootstrap/modal.js",
					// "script/bootstrap/tooltip.js",
					// "script/bootstrap/popover.js"
				],

				dest: "js/base.js"
			},
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: "css/",
				src: ["base.css"],
				dest: "../dist/css/",
				ext: ".min.css"
			}
		},

		copy: {
			fonts: {
				src: "font/*/*",
				dest: "../dist/"
			},

			vendorJS: {
				src: "js/vendor/*.js",
				dest: "../dist/"
			},

			images: {
				src: "img/",
				dest: "../dist/"
			}
		},

		uglify: {
			buildJS: {
				files: {
					"../dist/js/base.min.js": [
						"js/base.js"
					]
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},

				files: [
					{
						expand: true,
						cwd: "",
						src: ["*.html"],
						dest: "../dist/",
					}
				]
			}
		},

		replace: {
			minBaseCssExt: {
				src: ["../dist/*.html"],
				overwrite: true,
				replacements: [{ 
					from: "base.css",
					to: "base.min.css"
				}]
			},

			minbaseJsExt: {
				src: ["../dist/*.html"],
				overwrite: true,
				replacements: [{ 
					from: "base.js",
					to: "base.min.js"
				}]
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-text-replace");

	grunt.registerTask("build:styles:dev", ["compass"]);
	grunt.registerTask("build:js:dev", ["concat"]);
	grunt.registerTask("build:dev", ["compass", "concat"]);
	grunt.registerTask("build:prod", ["cssmin", "copy", "uglify", "htmlmin", "replace"]);
	grunt.registerTask("build", ["compass", "concat", "cssmin", "copy", "uglify", "htmlmin", "replace"]);
};