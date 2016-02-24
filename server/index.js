var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var request = require('request')
var moment = require('moment')

var PORT = 443
var TIME = 0.3 * 60 * 1000
var IMAGE_TYPES = ['INFRARED_FULL', 'D531106']
var BASE_URL = 'http://himawari8-dl.nict.go.jp/himawari8/img'

function fetchURI (base, type, callback) {
  request(
  {
    method: 'GET',
    uri: base + type + '/latest.json',
    timeout: 30000
  },

  function (err, res) {

    if (err) {
      if (err.code === 'ETIMEDOUT')
        return console.error('Request to Himawari 8 server timed out.')
      else
        return console.error(err)
    }

    var now

    try {
      now = new Date(JSON.parse(res.body).date)
    } catch (e) {
      now = new Date()
    }

    console.log(res.body)

    now.setMinutes(now.getMinutes() - (now.getMinutes() % 10))
    now.setSeconds(0)

    var width = 550
    var level = "1d"

    var time  = moment(now).format('HHmmss')
    var year  = moment(now).format('YYYY')
    var month = moment(now).format('MM')
    var day   = moment(now).format('DD')

    var url_base = [base, type, level, width, year, month, day, time].join('/')
    var uri = url_base + '_' + 0 + '_' + 0 + '.png'

    callback(uri)
  }
  )

}

io.on('connection', function (socket) {

  socket.on('fetch', function() {

    fetchURI(BASE_URL, IMAGE_TYPES[0], function (uri) {

      io.to(socket.id).emit('infrared', uri)

    })

    fetchURI(BASE_URL, IMAGE_TYPES[1], function (uri) {

      io.to(socket.id).emit('normal', uri)

    })

  })

})

server.listen(PORT)
