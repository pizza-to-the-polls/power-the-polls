(function () {
  var hash = document.location.hash.replace("#", "");
  var pieces = hash.split('?')[0].split("-").map(function(piece) {
    return unescape(piece)
  });
  var abrieve = pieces.shift();
  var state = window.statesData[abrieve];

  if (state) {
    var found = pieces.reduce(function (found, piece) {
      var county = state.jurisdictions[piece + " County"];
      var city = state.jurisdictions[piece + " (City)"];

      return (city ? [piece, city] : county ? [piece, county] : found);
    }, false);

    if( !found && pieces.length > 1 ) {
      var together = [pieces[1], "city,", pieces[0], "County"].join(' ')
      if( state.jurisdictions[together] ) {
          found = [
            together,
            state.jurisdictions[together]
          ]
      }
    }

    if( found ) {
      document.location = "https://www.workelections.com/j/" + [
        found[1],
        found[0].replace(/\s/g, '-')
      ].join('/')
    } else {
      document.location = "https://www.workelections.com/states/" + [
        state.id,
        state.name
      ].join('/')
    }
  } else {
    var fallbacks = {
      OR: 'Oregon',
      WA: 'Washington',
      HI: 'Hawaii',
    };
    var partner_states = {
      ME: 'Maine',
      MI: 'Michigan',
    }
    $(document).ready(function() {
      var state_name = false

      if( fallbacks[abrieve] ) {
        $('.state__fallback').show()
        state_name =  fallbacks[abrieve]
      } else {
        $('.state__partner').show()
        state_name =  partner_states[abrieve]
      }
      if( state_name ) $('.state__replace').text(state_name)

      $('.main').show()
    })
  }
})();
