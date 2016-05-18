$(function(){

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XbBTpqc5lT8_jQ0GrlyVx_otGOdqNNF5z-AbLK2tgf4/pubhtml';
  Tabletop.init({ key: public_spreadsheet_url, callback: showInfo,simpleSheet: false});

  var lineTimer = 5000;

  function showInfo(sheet){

    console.log(sheet.voc.elements);

    var data = _(sheet.medias.elements)
    .sortBy('location')
    .map(function(d){
      return {
        location:getLocation(d.location),
        url:d.url,
        tags: d.hashtag.match(/#\S+/g)
      };
    })
    .groupBy(function(d){return d.location.p;})
    .value();

    $('#main').html(RM.list( {procedures:data} ) );
    $("a.embed").oembed(null,{ embedMethod: 'fill' });




    slideShowLoop();

  }


  function slideShowLoop(){
    $(".line").each(function(i){

      var that = this;
      setTimeout(function(d){
        $("body").scrollTo($(that), 800);
      }, i * lineTimer )

    })

    setTimeout(slideShowLoop, ($(".line").length + 1) * lineTimer );

  }

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
