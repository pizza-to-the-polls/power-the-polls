(function () {
  var hash = document.location.hash.replace("#", "");
  var pieces = hash.split('?')[0].split("-").map(function(piece) {
    return unescape(piece)
  });
  var abrieve = pieces.shift();
  var state = window.statesData[abrieve];

  if (state) {
    var found = pieces.reduce(function (found, piece, idx) {
      var county = idx < 1 && state.jurisdictions[piece + " County"];
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
      var path = "/j/" + [
        found[1],
        found[0].replace(/\s/g, '-')
      ].join('/')

    } else {
      var path = "/states/" + [
        state.id,
        state.name
      ].join('/')
    }

    document.location = "https://www.workelections.com" + path

    gtag('event', 'signup_link',
         { event_category: 'signup_link_clicked', event_label: 'redirect', value: path });
    fbq('track', 'SignUpLinkClicked');
  } else {
    var fallbacks = {
      OR: 'Oregon',
      HI: 'Hawaii',
    };
    var partner_states = {
      ME: 'Maine',
      MI: 'Michigan',
      WA: 'Washington',
    }


    $(document).ready(function() {
      var state_name = false
      var fallback_type = null;

      if( fallbacks[abrieve] ) {
        $('.state__fallback').show()
        fallback_type = 'fallback_state'
        state_name =  fallbacks[abrieve]
      } else {
        $('.state__partner').show()
        fallback_type = 'partner_state'
        state_name =  partner_states[abrieve]
      }
      if( state_name ) {
        $('.state__replace').text(state_name)

        gtag('event', 'signup_link',
             { event_category: 'signup_link_clicked', event_label: fallback_type, value: state_name });
        fbq('track', 'SignUpLinkClicked');
      }

      $('.main').show()
    })
  }
})();
