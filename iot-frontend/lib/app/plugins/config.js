
var development = require('../../../config/development')
  , production = require('../../../config/production')

var me = module.exports = process.env.NODE_END === 'production' ?
                          production :
                          development

me.isDevelopment = function () {
  if (process.env.NODE_ENV === 'production')
    return false
  return true
}

