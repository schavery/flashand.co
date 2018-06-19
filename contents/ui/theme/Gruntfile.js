module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			main_scss: {
				src: [
					'assets/scss/*.scss',
					'!assets/scss/_*.scss', // ignore include files
					'!assets/scss/combined.scss', // ignore already combined file
				],
				dest: 'assets/scss/combined.scss', // must render in the same file as _includes.scss for @import use
			},

		},

		sass: {
			main: {
				options: {
					style: 'expanded'
				},
				files: {
					'assets/css/flashandco.css': 'assets/scss/combined.scss', // 'destination': 'source'
				},
			},
		},

		cssmin: {
			compress: {
				files: {
					'assets/css/flashandco.min.css': ['assets/css/flashandco.css'],
				},
			},
		},

		watch: {

			// combine changed files
			combine_scss: {
				files: [
					'assets/scss/*.scss',
					'!assets/scss/combined.scss',
				],
				tasks: ['concat:main_scss'],
			},

			// convert to css
			parse_scss: {
				//options: { livereload: true },
				files: 'assets/scss/combined.scss',
				tasks: ['sass:main'],
			},

			// minify the css
			cssmin: {
				files: 'assets/css/flashandco.css',
				tasks: ['cssmin'],
			},

		},
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch','sass']);

};
