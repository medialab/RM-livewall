$(function(){

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XbBTpqc5lT8_jQ0GrlyVx_otGOdqNNF5z-AbLK2tgf4/pubhtml';
  Tabletop.init({ key: public_spreadsheet_url, callback: showInfo});

  function showInfo(sheet){

    var data = _(sheet.medias.elements)
    .sortBy('location')
    .map(function(d){

      return {

        location:getLocation(d.location),
        url:d.url,
        tags: d.hashtag.match(/#\S+/g)

      };

    })
    .groupBy(function(d){
      return d.location.p;
    })
    .value();

    console.log(data);

    $('#main').html(RM.list( {procedures:data} ) );

    $("a.embed").oembed(null,{
      embedMethod: 'fill',    // "auto", "append", "fill"
    });

  }

  function getLocation(hash){

      var re1='(#)';  // Any Single Character 1
      var re2='(.)';  // Any Single Character 2
      var re3='(\\d+)'; // Integer Number 1

      var p = new RegExp(re1+re2+re3,["i"]);
      var m = p.exec(hash);

  if (m != null)
    return {
      p:m[2],
      id:parseInt(m[3])
    }

    console.log(hash)
    return {p:undefined, id:0}

  }





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
