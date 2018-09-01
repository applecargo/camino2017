$(document).ready(function() {

  ////utilities

  //UI - btn
  //multiple binding is allowed in jquery : http://stackoverflow.com/a/4951426
  $('.ui-btn').click(function() {
    $(this).removeClass('bg-blue').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-blue');
    }.bind(this), 300);
  });
  // $('.ui-btn').click();

  //UI - btn-netstat
  //multiple binding is allowed in jquery : http://stackoverflow.com/a/4951426
  $('.ui-btn-netstat').click(function() {
    $(this).removeClass('bg-near-black').addClass('bg-white');
    setTimeout(function() {
      $(this).removeClass('bg-white').addClass('bg-near-black');
    }.bind(this), 300);
  });
  // $('.ui-btn').click();

  //pages set-list
  var pages = {
    'guide1': 0,
    'sess1': 1,
    'guide2': 2,
    'sess2': 3,
    'guide3': 4,
    'sess3': 5
  };

  //UI - page arbitrator
  var cur_page = 0;

  function changePage(page) {
    $('.ui-page:nth(' + cur_page + ')').hide();
    $('.ui-page:nth(' + page + ')').show();
    cur_page = page;
  }

  $('#pagechgto-guide1').click(function() {
    changePage(pages['guide1']);
  });
  $('#pagechgto-sess1').click(function() {
    changePage(pages['sess1']);
  });
  $('#pagechgto-guide2').click(function() {
    changePage(pages['guide2']);
  });
  $('#pagechgto-sess2').click(function() {
    changePage(pages['sess2']);
  });
  $('#pagechgto-guide3').click(function() {
    changePage(pages['guide3']);
  });
  $('#pagechgto-sess3').click(function() {
    changePage(pages['sess3']);
  });

  // connect server
  //var socket = io('http://52.78.239.112:5700'); // amazon aws ec2 node.js server
  var socket = io('http://choir.run:8700');

  socket.on('connect', function() {
    console.log('connected');
    socket.on('disconnect', function() {
      console.log('disconnected');
    });
  });

  //(on server) msg. routing..
  // socket.on('54321-all',        function() { ioInst.emit('54321'); });
  // socket.on('10meg-all',        function() { ioInst.emit('10meg'); });
  // socket.on('ansanintro-all',   function() { ioInst.emit('ansanintro'); });
  // socket.on('citizenintro-all', function() { ioInst.emit('citizenintro'); });
  // socket.on('clap-all',         function() { ioInst.emit('clap'); });
  // socket.on('enablespk-all',    function() { ioInst.emit('enablespk'); });
  // socket.on('enablespk-w-all',  function() { ioInst.emit('enablespk-w'); });
  // socket.on('maxvol-d-all',     function() { ioInst.emit('maxvol-d'); });
  // socket.on('maxvol-w-all',     function() { ioInst.emit('maxvol-w'); });
  // socket.on('playhelp-all',     function() { ioInst.emit('playhelp'); });
  // socket.on('spkon-all',        function() { ioInst.emit('spkon'); });
  // socket.on('spkon-slow-all',   function() { ioInst.emit('spkon-slow'); });
  // socket.on('spkon-w-all',      function() { ioInst.emit('spkon-w'); });
  // socket.on('trybutton-w-all',  function() { ioInst.emit('trybutton-w'); });
  // socket.on('webpage2-w-all',   function() { ioInst.emit('webpage2-w'); });
  // socket.on('webpage-w-all',    function() { ioInst.emit('webpage-w'); });

  //instant clap all! (announcements)
  $('.54321-all').click(function() {
    socket.emit('54321-all');
  });
  $('.10meg-all').click(function() {
    socket.emit('10meg-all');
  });
  $('.ansanintro-all').click(function() {
    socket.emit('ansanintro-all');
  });
  $('.citizenintro-all').click(function() {
    socket.emit('citizenintro-all');
  });
  var citizenonoff = 0;
  var citizen;
  $('.citizenintro-all-start').click(function() {
    if (citizenonoff == 0) {
      citizenonoff = 1;
      socket.emit('citizenintro-all');
      citizen = setInterval(function() {
        socket.emit('citizenintro-all');
      }, 10000);
    }
  });
  $('.citizenintro-all-stop').click(function() {
    if (citizenonoff == 1) {
      citizenonoff = 0;
      clearInterval(citizen);
    }
  });
  var clapping = 0;
  var clapper;
  $('.clap-all-start').click(function() {
    if (clapping == 0) {
      clapping = 1;
      socket.emit('clap-all');
      clapper = setInterval(function() {
        socket.emit('clap-all');
      }, 2000);
    }
  });
  $('.clap-all-stop').click(function() {
    if (clapping == 1) {
      clapping = 0;
      clearInterval(clapper);
    }
  });
  $('.enablespk-all').click(function() {
    socket.emit('enablespk-all');
  });
  $('.enablespk-w-all').click(function() {
    socket.emit('enablespk-w-all');
  });
  $('.maxvol-d-all').click(function() {
    socket.emit('maxvol-d-all');
  });
  $('.maxvol-w-all').click(function() {
    socket.emit('maxvol-w-all');
  });
  $('.playhelp-all').click(function() {
    socket.emit('playhelp-all');
  });
  $('.spkon-all').click(function() {
    socket.emit('spkon-all');
  });
  $('.spkon-slow-all').click(function() {
    socket.emit('spkon-slow-all');
  });
  $('.spkon-w-all').click(function() {
    socket.emit('spkon-w-all');
  });
  $('.trybutton-w-all').click(function() {
    socket.emit('trybutton-w-all');
  });
  $('.webpage2-w-all').click(function() {
    socket.emit('webpage2-w-all');
  });
  $('.webpage-w-all').click(function() {
    socket.emit('webpage-w-all');
  });

  //emergency stop! - when you want to cancel immediately.
  $('.stop-all').click(function() {
    socket.emit('schedule', {
      'prog': 'wait'
    });
    if (clapping == 1) {
      clapping = 0;
      clearInterval(clapper);
    }
    if (citizenonoff == 1) {
      citizenonoff = 0;
      clearInterval(citizen);
    }
  });

  //scheduling
  scheduler = function(prog_name) {
    socket.emit('schedule', {
      'prog': prog_name
    });
  }

  $('.carhorn').click(function() {
    scheduler('carhorn');
  });
  $('.phone').click(function() {
    scheduler('phone');
  });
  $('.cricket').click(function() {
    scheduler('cricket');
  });
  $('.train').click(function() {
    scheduler('train');
  });
  $('.brassball').click(function() {
    scheduler('brassball');
  });
  $('.sea').click(function() {
    scheduler('sea');
  });
  $('.trk01').click(function() {
    scheduler('trk01');
  });
  $('.watcher').click(function() {
    scheduler('watcher');
  });
  $('.machine').click(function() {
    scheduler('machine');
  });
  $('.bee').click(function() {
    scheduler('bee');
  });
  $('.tuba').click(function() {
    scheduler('tuba');
  });
  $('.bell').click(function() {
    scheduler('bell');
  });
  $('.edelweiss-band').click(function() {
    scheduler('edelweiss-band');
  });
  $('.edelweiss-indi').click(function() {
    scheduler('edelweiss-indi');
  });

  $('.phone-mix').click(function() {
    scheduler('phone-mix');
  });
  $('.carhorn-mix').click(function() {
    scheduler('carhorn-mix');
  });

});
