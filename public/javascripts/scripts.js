//const { response } = require("express");
//const { NotExtended } = require("http-errors")
//const { ObjectID } = require("mongodb")

function c() {
  var i = document.getElementById('insti').value

  if (i == 'yes' || i == 'no' || i == 'YES' || i == 'NO' || i == 'Yes' || i == 'No') {
    document.getElementById('ss').className = 'visible btn btn-success rounded'
  }
  else {
    document.getElementById('insti').value = 'Please enter yes/no only.'
    if (document.getElementById('username').value && document.getElementById('Email1').value && document.getElementById('password').value) {
      document.getElementById('ss').className = 'visible btn btn-success rounded'
    }
    else {
      alert("You did not complete the form")
    }
  }
}
function key(id, i) {
  var n = document.getElementById(id).value
  var s = document.getElementById(i).innerHTML
  console.log(s);
  if (n == 'sup') {
    n = ' x'
    document.getElementById(i).innerHTML = s + n.sup() + '.'

  }
  else if (n == 'sub') {
    n = ' x'
    document.getElementById(i).innerHTML = s + n.sub() + '.'
  }
  else {
    document.getElementById(i).innerHTML = s + n
  }
}
function table(id) {
  var e = document.getElementById(id).innerHTML
  var r = document.getElementById('rows').value
  var c = document.getElementById('cols').value
  r = parseInt(r)
  c = parseInt(c)
  var k = '<table class="table table-boundary">'
  for (var i = 0; i < r; i++) {
    var m = ''
    if (i == 0) {
      m = '<thead thead-dark> <tr>'
    }
    else if (i == 1) {
      m = '<tbody> <tr>'
    }
    for (var j = 0; j < c; j++) {
      if (i == 0) {
        m = m + '<th contenteditable="true">heading</th>'
      }
      else {
        m = m + ' <td contenteditable="true">content</td>'
      }
    }
    if (i == 0) {
      m = m + '</tr></thead>'
      k = k + m
    }
    else {
      k = k + m + '</tr>'
    }
  }
  k = k + '</tbody> </table> <br>'
  document.getElementById(id).innerHTML = e + k

  console.log("table added");
}

function sbmt() {
  var i = confirm("Do you want to submit")
  console.log('submitted')
  document.getElementById('tt').value = document.getElementById('text').innerHTML
  if (i) {
    alert("submited")
  }
  else {
    alert("Editing completed")
  }
}
function convert() {
  console.log('converting');
  document.getElementById('text').innerHTML = document.getElementById('tt').value
  document.getElementById('yea').value = document.getElementById('year').value
  document.getElementById('mo').value = document.getElementById('mon').value
  document.getElementById('da').value = document.getElementById('day').value
  document.getElementById('hou').value = document.getElementById('ho').value
  document.getElementById('mi').value = document.getElementById('m').value
  document.getElementById('se').value = document.getElementById('sec').value
  document.getElementById('username').value = document.getElementById('user').value
  document.getElementById('password').value = document.getElementById('subject').value
  document.getElementById('yeaaa').value = document.getElementById('yee').value
  document.getElementById('mooo').value = document.getElementById('mmm').value
  document.getElementById('daaa').value = document.getElementById('dyy').value
  document.getElementById('houuu').value = document.getElementById('hhh').value
  document.getElementById('miiii').value = document.getElementById('miii').value
}

function addt() {
  alert('added')
  var e = document.getElementById('text').innerHTML
  document.getElementById('text').innerHTML = e + ' <div class="col-12" contenteditable="true" style="overflow-y: scroll;background-color:white;height:8rem" id="y" onclick="co(id)">Ans:<br><br></div> &nbsp;'
}
function co(id) {
  console.log('1');
  console.log(id);
  var v = Math.random()
  v = String(v)
  if (document.getElementById('tex') != null) {
    console.log('not null');
    document.getElementById('tex').setAttribute('id', v)
  }
  document.getElementById(id).setAttribute('id', 'tex')
  console.log(document.getElementById('tex').innerHTML);

}
function sube() {
  console.log('ans');
  document.getElementById('ttt').value = document.getElementById('quiz').innerHTML
  return confirm("Click ok to confirm submition ")
}

function getdata() {
  var e = document.getElementById('t1').value
  console.log('questions loaded')
  //var n = document.getElementById('quiz').innerHTML
  document.getElementById('quiz').innerHTML = e
  document.getElementById('t1').value = ' '
  console.log(document.getElementById('t1').value);
  document.addEventListener('visibilitychange', function (event) {
    if (document.hidden) {
      setTimeout(function () {
        document.getElementById('copyi').value = 'true'
        alert('you are trying to copy..your activity will be saved..')
        document.getElementById('copyi').value = 'true'


      }, 2000);

    }
    else {
      console.log('good to go');
    }
  })
  var lis = {
    32: 'space', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 58: ':', 60: '<', 64: '@',
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm/', 78: 'n', 79: 'o', 80: 'p',
    81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y/', 90: 'z', 106: '+', 109: '-', 111: '/',
    188: ","
  }

}

function getans() {
  var e = document.getElementById('t4').value
  console.log('ans loaded');
  var n = document.getElementById('sheet').innerHTML
  document.getElementById('sheet').innerHTML = n + e
  document.getElementById('t4').value = ' '
}

function pm() {
  document.getElementById('pm').className = 'btn btn-success rounded'
  var r = document.getElementById('hou').value
  r = parseInt(r)
  document.getElementById('hou').value = "" + (r + 12)
}

function pm1() {
  document.getElementById('pm1').className = 'btn btn-success rounded'
  var r = document.getElementById('houuu').value
  r = parseInt(r)
  document.getElementById('houuu').value = "" + (r + 12)
}
function conv() {
  var e = document.getElementById('username').value
  var r = document.getElementById('password').value
  document.getElementById('subject').value = e
  document.getElementById('code').value = r
  document.getElementById('user').value = document.getElementById('du').value
  document.getElementById('year').value = document.getElementById('yea').value
  document.getElementById('mon').value = document.getElementById('mo').value
  document.getElementById('day').value = document.getElementById('da').value
  document.getElementById('ho').value = document.getElementById('hou').value
  document.getElementById('m').value = document.getElementById('mi').value
  document.getElementById('sec').value = document.getElementById('se').value
  document.getElementById('yee').value = document.getElementById('yeaaa').value
  document.getElementById('mmm').value = document.getElementById('mooo').value
  document.getElementById('dyy').value = document.getElementById('daaa').value
  document.getElementById('hhh').value = document.getElementById('houuu').value
  document.getElementById('miii').value = document.getElementById('miiii').value
  console.log(document.getElementById('ho').value);
  alert("submitted")
}

function con() {
  document.getElementById('rol').value = document.getElementById('roll').value
  document.getElementById('stname').value = document.getElementById('sname').value
  alert('submitted')
}

function st() {
  console.log('st');
  var iframe = document.getElementById('sk');
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  var img = innerDoc.getElementById('sketchpad').toDataURL()
  var e = document.getElementById('tex').innerHTML
  document.getElementById('tex').innerHTML = e + '<img src=' + img + ' alt="no" style="height:3rem;width:3rem;">'
  console.log(img);
}
function langu(lan) {
  var list = {
    hindi: {
      q: 'ौ', w: 'ै', 'e': 'ा', 'r': 'ी', 't': 'ू', 'y/': 'ब', 'u': 'ह', 'i': 'ग', 'o': 'द', 'p': 'ज',
      a: 'ो', s: 'े', d: '्', f: 'ि', 'g': 'ु', 'h': 'प', 'j': 'र', 'k': 'क', 'l': 'त',
      z: 'ं', x: 'म', c: 'न', 'v': 'व', 'b': 'ल', 'n': 'स', 'm/': 'य', '[': 'ड', ']': '़', ';': 'च', "'": 'ट', 'more': 'More'
    }, malayalam: {
      q: 'ൌ', w: 'ൈ', e: 'ാ', r: 'ീ', t: 'ൂ', 'y/': 'ബ', u: 'ഹ', i: 'ഗ', o: 'ദ', p: 'ജ', '[': 'ഡ', ']': 'ൃ',
      a: 'ോ', s: 'േ', d: '്', f: 'ി', g: 'ു', h: 'പ', j: 'ര', k: 'ക', l: 'ത', ";": 'ച', "'": 'ട',
      z: 'െ', x: 'ം', c: 'മ', v: 'ന', b: 'വ', n: 'ല', 'm/': 'സ', '/': 'യ', '_': 'ൊ', 'more': 'more_'
    }, default: {
      q: 'q', w: 'w', e: 'e', r: 'r', t: 't', 'y/': 'y', u: 'u', i: "i", o: 'o', p: 'p', "[": '[', "]": ']',
      a: 'a', s: 's', d: 'd', f: 'f', g: 'g', h: 'h', j: 'j', k: 'k', l: 'l', ";": ';', "'": "'",
      z: 'z', x: 'x', c: 'c', v: 'v', b: 'b', n: 'n', 'm/': 'm', ',': ',', '.': '.', '/': '/', '_': '_', 'more': ''

    }
  }

  var li = list[lan]
  console.log(Object.keys(list).length);
  console.log(l);
  for (x in li) {
    document.getElementById(x).innerHTML = li[x]
     document.getElementById(x).value = li[x]
  }
}

function more(id) {
  var v = document.getElementById(id).value
  var list ={
    More: {
      q: 'औ', w: 'ऐ', 'e': 'आ', 'r': 'ई', 't': 'ऊ', 'y/': 'भ', 'u': 'ङ', 'i': 'घ', 'o': 'ध', 'p': 'झ',
      a: 'ओ', s: 'ए', d: 'अ', f: 'इ', 'g': 'उ', 'h': 'फ', 'j': 'ख', 'k': 'थ', 'l': 'छ',
      z: 'ँ', x: 'ण', c: 'श्र', 'v': 'श', 'b': 'ष', 'n': 'ज्ञ', 'm/': 'ऋ', '[': 'ढ', ']': 'त्र', ';': 'ठ', "'": 'क्ष', 'more': ''
    }, more_: {
      q: 'ഔ', w: 'ഐ', e: 'ആ', r: 'ഈ', t: 'ഊ', 'y/': 'ഭ', u: 'ങ', i: 'ഘ', o: 'ധ', p: 'ഝ', '[': 'ഢ', ']': 'ഞ',
      a: 'ഓ', s: 'ഏ', d: 'അ', f: 'ഇ', g: 'ഉ', h: 'ഫ', j: 'റ', k: 'ഖ', l: 'ഥ', ";": 'ഛ', "'": 'ഠ',
      z: 'എ', x: 'ണ', c: 'ഴ', v: 'ള', b: 'ശ', n: 'ഷ', 'm/': 'ഒ', '/': '്ര', '_': 'ക്ഷ', 'more': ''
    }
  }
  if(v==""){
    console.log('v');
  }
  else{
  var li = list[v]
  console.log(Object.keys(list).length);
  console.log(l);
  for (x in li) {
    document.getElementById(x).innerHTML = li[x]
    document.getElementById(x).value = li[x]
  }
}
}
/*!
    * Start Bootstrap - Creative v6.0.3 (https://startbootstrap.com/themes/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
function modal() {
  alert("So you also typed!!!!")
}


(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict


