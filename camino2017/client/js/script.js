$( document ).ready(function() {

    $('.ui-btn').click(function() {
        $(this).removeClass('bg-blue').addClass('bg-yellow');
        setTimeout(function() {
            $(this).removeClass('bg-yellow').addClass('bg-blue');
        }.bind(this), 300);
    });

    $('.ui-tgl').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });

    var pages = {
        'page-welcome': 0,
        'page-loading': 1,
        'page-sndcheck': 2,
        'page-netcheck': 3,
        'page-sounder': 4
    };

    var cur_page = 0;
    function changePage(page) {
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }

    $('#go-sndcheck').click(function() {
        changePage(pages['page-sndcheck']);
        $('#pagestat').text('사운드 체크');
    });
    $('#go-netcheck').click(function() {
        changePage(pages['page-netcheck']);
        $('#pagestat').text('네트워크 체크');
    });
    $('#go-sounder').click(function() {
        changePage(pages['page-sounder']);
        $('#pagestat').text('사운드 캠페인');
    });
    var pagechanger = setTimeout(function() {
	$('#go-loading').click();
    }, 5000);
    $('#go-loading').click(function() {
        changePage(pages['page-loading']);
	audioloader();
	clearTimeout(pagechanger);
        $('#pagestat').text('다운로드 중');
    });

    //var socket = io('http://52.78.239.112:5500');
    var socket = io('http://choir.run:8500');

    socket.on('connect', function() {

    	$('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

        socket.on('disconnect', function() {
    	    $('#netstat').prop('checked', false).change();
        });
    });

    //time sync
    var clock_offset = 0; //milli-sec
    function resyncClock(ctime) { clock_offset = ctime - Date.now(); }
    function getTimeNow() { return (Date.now()+clock_offset); }

    //// audio data loading

    //announcements
    var clap;
    var count;
    var meg10;
    var ansanintro;
    var citizenintro;
    var enablespk;
    var enablespk_w;
    var maxvol_d;
    var maxvol_w;
    var playhelp;
    var spkon;
    var spkon_slow;
    var spkon_w;
    var trybutton_w;
    var webpage2_w;
    var webpage_w;
    // sounds
    var bee;
    var brassball;
    var carhorn;
    var carhornmix;
    var cricket;
    var machine;
    var phone;
    var phonemix;
    var sea;
    var train;
    var trk01;
    var watcher;
    var tuba;
    var bell;
    //people play
    var indi;
    //edelweiss band/voice proportion
    // var edelweiss_mode = 'singer'; if (Math.random() < 0.4) { edelweiss_mode = 'band'; } // band is 40%
    var edelweiss_mode = 'singer';
    var edelweiss_band;
    var edelweiss_singer;
    function audioloader() {
	var url;

	if (edelweiss_mode == 'band') {
	    url = "audio/edelweiss/band@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	    edelweiss_band = new Tone.Player({ "url" : url }).toMaster();
	}
	else if (edelweiss_mode == 'singer') {
	    url = "audio/edelweiss/voice@10/" + Math.floor(Math.random()*10+1) + "/";
	    edelweiss_singer = new Tone.MultiPlayer(
		[
		    url.concat("do.mp3"),
		    url.concat("re.mp3"),
		    url.concat("mi.mp3"),
		    url.concat("fa.mp3"),
		    url.concat("sol.mp3"),
		    url.concat("la.mp3"),
		    url.concat("si.mp3"),
		    url.concat("highdo.mp3"),
		    url.concat("highre.mp3"),
		    url.concat("highmi.mp3")
		]
	    ).toMaster();
	}
	//
	url = "audio/edelweiss/individual@12/" + ("0" + Math.floor(Math.random()*12+1)).slice(-2) + ".mp3";
	indi = new Tone.Player({ "url" : url }).toMaster();

	//
	url = "audio/bee@8/" + ("0" + Math.floor(Math.random()*8+1)).slice(-2) + ".mp3";
	bee = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/brassball@9/" + ("0" + Math.floor(Math.random()*9+1)).slice(-2) + ".mp3";
	brassball = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/carhorn@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
	carhorn = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/carhorn-mix@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
	carhornmix = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/cricket@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
	cricket = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/machine@13/" + ("0" + Math.floor(Math.random()*13+1)).slice(-2) + ".mp3";
	machine = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/phone@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
	phone = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/phone-mix@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	phonemix = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/sea@14/" + ("0" + Math.floor(Math.random()*14+1)).slice(-2) + ".mp3";
	sea = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/train@1/" + ("0" + Math.floor(Math.random()*1+1)).slice(-2) + ".mp3";
	train = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/trk01@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
	trk01 = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/watcher@2/" + ("0" + Math.floor(Math.random()*2+1)).slice(-2) + ".mp3";
	watcher = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/tuba@7/" + ("0" + Math.floor(Math.random()*7+1)).slice(-2) + ".mp3";
	tuba = new Tone.Player({ "url" : url }).toMaster();
	//
	url = "audio/bell@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	bell = new Tone.Player({ "url" : url }).toMaster();

	//announcements
	url = "audio/clap.wav";         clap         = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/54321.mp3";        count        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/10meg.mp3";        meg10        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/ansanintro.mp3";   ansanintro   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/citizenintro.mp3"; citizenintro = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/enablespk.mp3";    enablespk    = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/enablespk-w.mp3";  enablespk_w  = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/maxvol-d.mp3";     maxvol_d     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/maxvol-w.mp3";     maxvol_w     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/playhelp.mp3";     playhelp     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon.mp3";        spkon        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon-slow.mp3";   spkon_slow   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon-w.mp3";      spkon_w      = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/trybutton-w.mp3";  trybutton_w  = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/webpage2-w.mp3";   webpage2_w   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/webpage-w.mp3";    webpage_w    = new Tone.Player({ "url" : url }).toMaster();

	console.log('start');
	//wait......
	Tone.Buffer.on("load", function(){
	    console.log('done');
            changePage(pages['page-sndcheck']);
            $('#pagestat').text('사운드 체크');
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    if (edelweiss_mode == 'singer') {
	//sing-note (only for 'notes' people.
	socket.on('sing-note', function(note) {
	    console.log(note);
	    switch(note) {
	    case '/C4':
		edelweiss_singer.start(0);
		break;
	    case '/D4':
		edelweiss_singer.start(1);
		break;
	    case '/E4':
		edelweiss_singer.start(2);
		break;
	    case '/F4':
		edelweiss_singer.start(3);
		break;
	    case '/G4':
		edelweiss_singer.start(4);
		break;
	    case '/A4':
		edelweiss_singer.start(5);
		break;
	    case '/B4':
		edelweiss_singer.start(6);
		break;
	    case '/C5':
		edelweiss_singer.start(7);
		break;
	    case '/D5':
		edelweiss_singer.start(8);
		break;
	    case '/E5':
		edelweiss_singer.start(9);
		break;
	    default:
		;
	    }
	});
    }

    //sndcheck audio
    $('.ui-clap').click(function() {
        clap.start();
    });

    //net msg.
    socket.on('54321',        function() { count.start(); });
    socket.on('10meg',        function() { meg10.start(); });
    socket.on('ansanintro',   function() { ansanintro.start(); });
    socket.on('citizenintro', function() { citizenintro.start(); });
    socket.on('clap',         function() { clap.start(); });
    socket.on('enablespk',    function() { enablespk.start(); });
    socket.on('enablespk-w',  function() { enablespk_w.start(); });
    socket.on('maxvol-d',     function() { maxvol_d.start(); });
    socket.on('maxvol-w',     function() { maxvol_w.start(); });
    socket.on('playhelp',     function() { playhelp.start(); });
    socket.on('spkon',        function() { spkon.start(); });
    socket.on('spkon-slow',   function() { spkon_slow.start(); });
    socket.on('spkon-w',      function() { spkon_w.start(); });
    socket.on('trybutton-w',  function() { trybutton_w.start(); });
    socket.on('webpage2-w',   function() { webpage2_w.start(); });
    socket.on('webpage-w',    function() { webpage_w.start(); });

    //update system status
    socket.on('schedule', function(stat) {
        console.log(stat.prog);
	// resyncClock(stat.ctime); //re-syncronize clock
	// var now = getTimeNow(); //get server time

	//
	scheduler = function(prog) { prog.start(); };

	//// manage programs

	//
        if (stat.prog == 'carhorn')     { scheduler(carhorn);    $('#program').text('경적'); }
        if (stat.prog == 'carhorn-mix') { scheduler(carhornmix); $('#program').text('경적Mix'); }
        if (stat.prog == 'phone')       { scheduler(phone);      $('#program').text('전화'); }
        if (stat.prog == 'phone-mix')   { scheduler(phonemix);   $('#program').text('전화Mix'); }
        if (stat.prog == 'cricket')     { scheduler(cricket);    $('#program').text('귀뚜라미'); }
        if (stat.prog == 'train')       { scheduler(train);      $('#program').text('기차'); }
        if (stat.prog == 'brassball')   { scheduler(brassball);  $('#program').text('브라스와 공'); }
        if (stat.prog == 'sea')         { scheduler(sea);        $('#program').text('바다'); }
        if (stat.prog == 'trk01')       { scheduler(trk01);      $('#program').text('track-01'); }
        if (stat.prog == 'watcher')     { scheduler(watcher);    $('#program').text('관객'); }
        if (stat.prog == 'machine')     { scheduler(machine);    $('#program').text('기계'); }
        if (stat.prog == 'bee')         { scheduler(bee);        $('#program').text('벌떼'); }
        if (stat.prog == 'tuba')        { scheduler(tuba);       $('#program').text('투바'); }
        if (stat.prog == 'bell')        { scheduler(bell);       $('#program').text('종'); }
	//
        if (stat.prog == 'edelweiss-band') {
	    if (edelweiss_mode == 'band') {
		scheduler(edelweiss_band);
		// $('#program').text('에델바이스-밴드');
	    }
	    else if (edelweiss_mode == 'singer') {
		//singers are always active!
		// $('#program').text('에델바이스-싱어');
	    }
	}
        if (stat.prog == 'edelweiss-indi') {
	    $('#playsound').show();
	    $('#program').text('에델바이스');
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
            carhorn.stop();
            carhornmix.stop();
            phone.stop();
            phonemix.stop();
            cricket.stop();
            train.stop();
            brassball.stop();
            sea.stop();
            trk01.stop();
            watcher.stop();
	    machine.stop();
	    bee.stop();
	    tuba.stop();
	    bell.stop();
	    if (edelweiss_mode == 'band') {
		edelweiss_band.stop();
	    }
	    //
	    $('#playsound').hide();
	    //
	    $('#program').text('-');
	}
    });

    var indi_timeout;
    $('#playbtn').click(function() {
        if (indi.state == "started") {
            indi.stop();
            clearInterval(indi_timeout);
        }
        indi.start();
        $(this).find('.play').hide();
        $(this).find('.stop').show();
        indi_timeout = setInterval(function() {
            if (indi.state == "stopped") {
                $(this).find('.stop').hide();
                $(this).find('.play').show();
                clearInterval(indi_timeout);
                console.log(2);
            }
        }.bind(this), 500);
    });
    $('#playbtn .play').show();
    $('#playbtn .stop').hide();

});
