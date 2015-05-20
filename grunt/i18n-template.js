moddule.exports = {
    simple: {
      resources: {
        files : ["test/data/resources/**.js"]
      },
      output: {
        files: ['test/fixtures/singleTarget/index.html'],
        dir: 'test/temp/simple',
      }
    },

    withTemplate: {
      resources: {
        files : ["test/data/resources/**.js"]
      },
      output: {
        files: ['test/fixtures/singleTarget/index.html'],
        dir: 'test/temp/',
        format: '{locale}.{filename}'
      }
    }

}