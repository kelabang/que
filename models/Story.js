/*
* @Author: d4r
* @Date:   2018-01-23 01:22:29
* @Last Modified by:   Imam
* @Last Modified time: 2018-02-01 22:03:44
*/

const name = 'Story'
const debug = require('debug')('rumaji:'+name)
const rules = {
	"title": "required",
	"content": "required"
}
const Checkit = require('checkit')
const checkit = new Checkit(rules)
const moment = require('moment')
const bookshelf = require('./../bookshelf')



const Story = bookshelf.Model.extend({
	tableName: 'stories',
	constructor: function () {
		bookshelf.Model.apply(this, arguments)
		this.on('creating', function (model, attrs, options) {
			debug('on creating')
			return this.validateCreate(model.changed)
		})
		this.on('updating', function (model, attrs, options) {
			debug('on updating')
			model.set('updated', moment().format('YYYY-MM-DD HH:mm:ss'))
		})
	},
	validateCreate: function (attrs) {
		debug('validate creating')
		return checkit.run(attrs)
			.caught(Checkit.Error, function(err) {
				throw new Error(err)
			})
	}
})

module.exports = Story