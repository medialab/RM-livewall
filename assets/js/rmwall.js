$(function(){

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XbBTpqc5lT8_jQ0GrlyVx_otGOdqNNF5z-AbLK2tgf4/pubhtml';
  Tabletop.init({ key: public_spreadsheet_url, callback: showInfo,simpleSheet: false});

  var lineTimer = 1000;
  var reloadIn = 10;
  var currentSlide = 0;
  var interval;
  function showInfo(sheet){

    console.log(sheet.voc.elements);

    var data = _(sheet.medias.elements)
    // .sortBy('location')
    // .map(function(d){
    //   return {
    //     location:d.location, //getLocation(d.location),
    //     url:d.url,
    //     tags: d.hashtag.match(/#\S+/g)
    //   };
    // })
    .groupBy('location')
    .value();

    $('#main').html(RM.list( {procedures:data} ) );
    $("a.embed").oembed(null,{ embedMethod: 'fill' });

    // great embed
    setTimeout(function(d){
      $("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
      $("iframe").addClass('embed-responsive-item');
    }, 5000)

    interval = setInterval(function(){
      nextSlide(1);
    }, lineTimer)
  }

  function nextSlide(way){
    // console.log('goto',way);

    currentSlide = (currentSlide+way)%$(".line").length;
    $("body").scrollTo($('.line:eq( '+currentSlide+' )'), 800);

    if(currentSlide == 0){
      if(reloadIn < 1) location.reload();
      else reloadIn++;
    }

  }

  $( "body" ).keydown(function( event ) {

    event.preventDefault();
    clearInterval(interval);

    if ( event.which == 40 ) nextSlide(1);
    if ( event.which == 38 ) nextSlide(-1);

  });

  $(window).scroll(fixTitle);

  function fixTitle() {
    $('.section').each(function () {
      var $this = $(this);
      var offset = $this.offset().top-40;
      var scrollTop = $(window).scrollTop();

      if (scrollTop > offset) {
        $this.addClass('fixed');
      } else {
        $this.removeClass('fixed');
      }
    });
  }

  function getLocation(hash){

    var re1='(#)';  // Any Single Character 1
    var re2='(.)';  // Any Single Character 2
    var re3='(\\d+)'; // Integer Number 1

    var p = new RegExp(re1+re2+re3,["i"]);
    var m = p.exec(hash);

    if (m != null) return { p:m[2], id:parseInt(m[3]) }
    return {p:undefined, id:0}
  }

  Handlebars.registerHelper("newLine", function(index_count,block) {

    if(parseInt(index_count)%3=== 0){
      return block.fn(this);}
  });

  Handlebars.registerHelper('debug', function(optionalValue) {
    console.log('Current Context');
    console.log('====================');
    console.log(this);

    if (optionalValue) {
      console.log('Value');
      console.log('====================');
      console.log(optionalValue);
    }
  });


});
