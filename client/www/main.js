window.onload = function () {

  var socket = io.connect('http://gorbit.org:443')

  socket.on('infrared', function (data) {
    $('.infrared').css({'background-image': 'url(' + data + ')'})
    $('.loading').toggleClass('visible')
  })

  socket.on('normal', function (data) {
    $('.normal').css({'background-image': 'url(' + data + ')'})
  })

  socket.emit('fetch')

  $('body').bind('touchstart click', function() {
    $('.normal').toggleClass('visible')
    $('.infrared').toggleClass('visible')
  })

}
