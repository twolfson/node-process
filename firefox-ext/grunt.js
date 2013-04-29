module.exports = function (grunt) {
  // Configure the project
  grunt.initConfig({
    zip: {
      ff: {
        src: ['install.rdf', 'chrome.manifest', 'chrome/content/*'],
        dest: 'process-test.xpi'
      }
    }
  });

  // Load in grunt-zip
  grunt.loadNpmTasks('grunt-zip');

  // Zip the files together
  grunt.registerTask('build', 'zip');

  // Set up default action
  grunt.registerTask('default', 'build');
};