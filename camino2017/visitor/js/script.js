$( document ).ready(function() {

    $('.ui-tgl').change(function() {
        if ($(this).prop('checked') == true) {
            $(this).removeClass('bg-near-black').addClass('bg-white');
        }
        else {
            $(this).removeClass('bg-white').addClass('bg-near-black');
        }
    });

    //var socket = io('http://52.78.239.112:5500');
    var socket = io('http://choir.run:8500');

    socket.on('connect', function() {

        $('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

        socket.on('disconnect', function() {
            $('#netstat').prop('checked', false).change();
        });
    });

    //audio data loading
    var url;
    //edelweiss band/voice proportion
    var edelweiss_mode = 'singer';
    if (Math.random() < 0.4) { edelweiss_mode = 'band'; } // band is 40%

    if (edelweiss_mode == 'band') {
        url = "audio/edelweiss/band@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
        var edelweiss_band = new Howl({ src: url, html5: false });
    }
    else if (edelweiss_mode == 'singer') {
        url = "audio/edelweiss/voice@10/" + Math.floor(Math.random()*10+1) + "/";
        var edelweiss_singer = [
            new Howl({ src: url + "do.mp3", html5: false }),
            new Howl({ src: url + "re.mp3", html5: false }),
            new Howl({ src: url + "mi.mp3", html5: false }),
            new Howl({ src: url + "fa.mp3", html5: false }),
            new Howl({ src: url + "sol.mp3", html5: false }),
            new Howl({ src: url + "la.mp3", html5: false }),
            new Howl({ src: url + "si.mp3", html5: false }),
            new Howl({ src: url + "highdo.mp3", html5: false }),
            new Howl({ src: url + "highre.mp3", html5: false }),
            new Howl({ src: url + "highmi.mp3", html5: false })
        ];

        //sing-note (only for 'notes' people.
        socket.on('sing-note', function(note) {
            console.log(note);
            switch(note) {
            case '/C4':
                edelweiss_singer[0].play();
                break;
            case '/D4':
                edelweiss_singer[1].play();
                break;
            case '/E4':
                edelweiss_singer[2].play();
                break;
            case '/F4':
                edelweiss_singer[3].play();
                break;
            case '/G4':
                edelweiss_singer[4].play();
                break;
            case '/A4':
                edelweiss_singer[5].play();
                break;
            case '/B4':
                edelweiss_singer[6].play();
                break;
            case '/C5':
                edelweiss_singer[7].play();
                break;
            case '/D5':
                edelweiss_singer[8].play();
                break;
            case '/E5':
                edelweiss_singer[9].play();
                break;
            default:
                ;
            }
        });
    }

    url = "audio/edelweiss/individual@12/" + ("0" + Math.floor(Math.random()*12+1)).slice(-2) + ".mp3";
    var indi = new Howl({ src: url, html5: false });

    //announcements
    url = "audio/clap.wav";         var clap         = new Howl({ src: url, html5: false });
    url = "audio/54321.mp3";        var count        = new Howl({ src: url, html5: false });
    url = "audio/10meg.mp3";        var meg10        = new Howl({ src: url, html5: false });
    url = "audio/ansanintro.mp3";   var ansanintro   = new Howl({ src: url, html5: false });
    url = "audio/citizenintro.mp3"; var citizenintro = new Howl({ src: url, html5: false });
    url = "audio/clap.wav";         var clap         = new Howl({ src: url, html5: false });
    url = "audio/enablespk.mp3";    var enablespk    = new Howl({ src: url, html5: false });
    url = "audio/enablespk-w.mp3";  var enablespk_w  = new Howl({ src: url, html5: false });
    url = "audio/maxvol-d.mp3";     var maxvol_d     = new Howl({ src: url, html5: false });
    url = "audio/maxvol-w.mp3";     var maxvol_w     = new Howl({ src: url, html5: false });
    url = "audio/playhelp.mp3";     var playhelp     = new Howl({ src: url, html5: false });
    url = "audio/spkon.mp3";        var spkon        = new Howl({ src: url, html5: false });
    url = "audio/spkon-slow.mp3";   var spkon_slow   = new Howl({ src: url, html5: false });
    url = "audio/spkon-w.mp3";      var spkon_w      = new Howl({ src: url, html5: false });
    url = "audio/trybutton-w.mp3";  var trybutton_w  = new Howl({ src: url, html5: false });
    url = "audio/webpage2-w.mp3";   var webpage2_w   = new Howl({ src: url, html5: false });
    url = "audio/webpage-w.mp3";    var webpage_w    = new Howl({ src: url, html5: false });

    //individual players
    var indi_timeout;
    $('#playbtn').click(function() {
        if (indi.playing()) {
            indi.stop();
            clearInterval(indi_timeout);
        }
        indi.play();
        $(this).find('.play').hide();
        $(this).find('.stop').show();
        indi_timeout = setInterval(function() {
            if (indi.playing()==false) {
                $(this).find('.stop').hide();
                $(this).find('.play').show();
                clearInterval(indi_timeout);
                console.log(2);
            }
        }.bind(this), 500);
    });
    $('#playbtn .play').show();
    $('#playbtn .stop').hide();

    //net msg.
    socket.on('54321',        function() { count.play(); });
    socket.on('10meg',        function() { meg10.play(); });
    socket.on('ansanintro',   function() { ansanintro.play(); });
    socket.on('citizenintro', function() { citizenintro.play(); });
    socket.on('clap',         function() { clap.play(); });
    socket.on('enablespk',    function() { enablespk.play(); });
    socket.on('enablespk-w',  function() { enablespk_w.play(); });
    socket.on('maxvol-d',     function() { maxvol_d.play(); });
    socket.on('maxvol-w',     function() { maxvol_w.play(); });
    socket.on('playhelp',     function() { playhelp.play(); });
    socket.on('spkon',        function() { spkon.play(); });
    socket.on('spkon-slow',   function() { spkon_slow.play(); });
    socket.on('spkon-w',      function() { spkon_w.play(); });
    socket.on('trybutton-w',  function() { trybutton_w.play(); });
    socket.on('webpage2-w',   function() { webpage2_w.play(); });
    socket.on('webpage-w',    function() { webpage_w.play(); });

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

    //get Q signals..
    socket.on('schedule', function(stat) {
        //
        scheduler = function(prog) { prog.play(); };

        //// manage programs

        //
        if (stat.prog == 'edelweiss-band') {
            if (edelweiss_mode == 'band') {
                scheduler(edelweiss_band);
                $('#program').text('에델바이스-밴드');
            }
            else if (edelweiss_mode == 'singer') {
                //singers are always active!
                $('#program').text('에델바이스-싱어');
            }
        }

        // stop all!!
        else if (stat.prog == 'wait') {
            //announcements
            count.stop();
            meg10.stop();
            ansanintro.stop();
            citizenintro.stop();
            clap.stop();
            enablespk.stop();
            enablespk_w.stop();
            maxvol_d.stop();
            maxvol_w.stop();
            playhelp.stop();
            spkon.stop();
            spkon_slow.stop();
            spkon_w.stop();
            trybutton_w.stop();
            webpage2_w.stop();
            webpage_w.stop();

            //
            if (edelweiss_mode == 'band') {
                edelweiss_band.stop();
            }
            $('#program').text('-');
        }

    });
});
