$(function() {

  $("form .button").attr('disabled',true)

  $(".recruit-toggle, .volunteer-toggle").click(function() {

    var volunteer = $(".volunteer-toggle").attr('checked');
    var recruit = $(".recruit-toggle").attr('checked');

    if(volunteer && recruit) {
      $(".show-recruit").addClass('u_hidden');
      $(".show-volunteer").removeClass('u_hidden');
      $("form .button").attr('disabled',false)
    } else if(volunteer) {
      $(".show-recruit").addClass('u_hidden');
      $(".show-volunteer").removeClass('u_hidden');
      $("form .button").attr('disabled',false)
    } else if(recruit){
      $(".show-volunteer").addClass('u_hidden');
      $(".show-recruit").removeClass('u_hidden');
      $("form .button").attr('disabled',false)
    } else {
      $(".show-volunteer").addClass('u_hidden');
      $(".show-recruit").addClass('u_hidden');
      $("form .button").attr('disabled',true)
    }

  })

  // PAGE NAV

  $(".menu-toggle").click(function() {

    var menuOpen = $(".sidebar--expanded");
    var newMenuOpenStatus = !menuOpen.length;

    $(".menu-toggle").attr("aria-expanded", newMenuOpenStatus);
    $(".menu").toggleClass("menu--active");
    $(".sidebar__logo").toggleClass("sidebar__logo--active");

  })

  // SMARTY STREETS

  var menu = $(".us-autocomplete-pro-menu");
  var input = $("#id_address1");

  function getSuggestions(search, selected) {
    var state = $("#id_state").val()
    $.ajax({
      url: "https://us-autocomplete-pro.api.smartystreets.com/lookup?",
      data: {
        "auth-id": {{ SMARTY_STREETS_KEY }},
        "search": search,
        "selected": (selected ? selected : ""),
        "include_only_states": (state ? state : "")
      },
      dataType: "jsonp",
      success: function(data) {
        if (data.suggestions) {
          buildMenu(data.suggestions);
        } else {
          noSuggestions();
        }
      },
      error: function(error) {
        return error;
      }
    });
  }

  function getSingleAddressData(address) {
    $.ajax({
      url: "https://us-street.api.smartystreets.com/street-address?",
      data: {
        "auth-id": {{ SMARTY_STREETS_KEY }},
        "street": address[0],
        "city": address[1],
        "state": address[2]
      },
      dataType: "jsonp",
      success: function(data) {
        $("#id_city").attr('value', data[0].components.city_name);
        $("#id_state").attr('value', data[0].components.state_abbreviation);
        $("#id_zip").attr('value', data[0].components.zipcode);
        $("#id_address2").attr('value', data[0].components.delivery_line_2);
        $("#id_action_county").attr('value', data[0].metadata.county_name);
      },
      error: function(error) {
        return error;
      }
    });
  }

  function clearAddressData() {
    $("#id_city").val("");
    $("#id_zip").val("");
    $("#id_address2").val("");
    $("#id_action_county").val("");
  }

  function noSuggestions() {
    var menu = $(".us-autocomplete-pro-menu");
    menu.empty();
    menu.append("<li class='ui-state-disabled'><div>Continue typing address</div></li>");
    menu.menu("refresh");
  }

  function buildAddress(suggestion) {
    var whiteSpace = "";
    if (suggestion.secondary || suggestion.entries > 1) {
      if (suggestion.entries > 1) {
        suggestion.secondary += " (" + suggestion.entries + " more entries)";
      }
      whiteSpace = " ";
    }
    var address = suggestion.street_line + whiteSpace + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode;
    var inputAddress = $("#id_address1").val();
    for (var i = 0; i < address.length; i++) {
      var theLettersMatch = typeof inputAddress[i] == "undefined" || address[i].toLowerCase() !== inputAddress[i].toLowerCase();
      if (theLettersMatch) {
        address = [address.slice(0, i), "<b>", address.slice(i)].join("");
        break;
      }
    }
    return address;
  }

  function buildMenu(suggestions) {
    var menu = $(".us-autocomplete-pro-menu");
    menu.empty();
    suggestions.map(function(suggestion) {
      var caret = (suggestion.entries > 1 ? "<span class=\"ui-menu-icon ui-icon ui-icon-caret-1-e\"></span>" : "");
      menu.append("<li><div data-address='" +
        suggestion.street_line + (suggestion.secondary ? " " + suggestion.secondary : "") + ";" +
        suggestion.city + ";" +
        suggestion.state + "'>" +
        caret +
        buildAddress(suggestion) + "</b></div></li>");
    });
    menu.menu("refresh");
  }

  $(".us-autocomplete-pro-menu").menu({
    select: function(event, ui) {
      var text = ui.item[0].innerText;
      var address = ui.item[0].childNodes[0].dataset.address.split(";");
      var searchForMoreEntriesText = new RegExp(/(?:\ more\ entries\))/);
      input.val(address[0]);
      $("#city").val(address[1]);
      $("#state").val(address[2]);

      if (text.search(searchForMoreEntriesText) == "-1") {
        $(".us-autocomplete-pro-menu").hide();
        getSingleAddressData(address);
      } else {
        $("#id_address1").val(address[0] + " ");
        var selected = text.replace(" more entries", "");
        selected = selected.replace(",", "");
        getSuggestions(address[0], selected);
      }
    }
  });

  $("#id_address1").keyup(function(event) {
    if (input.val().length > 0 || input.val() === "") clearAddressData();
    if (event.key === "ArrowDown") {
      menu.focus();
      menu.menu("focus", null, menu.menu().find(".ui-menu-item"));
    } else {
      var textInput = input.val();
      if (textInput) {
        menu.show();
        getSuggestions(textInput);
      } else {
        menu.hide();
      }
    }
  });

  $(".us-autocomplete-pro-menu").css("width", ($("#id_address1").width() + 24) + "px")

});

function copyText(el, toCopy) {

   var tempInput = document.createElement("input");

   $(el).html('copied')

   tempInput.type = "text";
   tempInput.value = toCopy;

   document.body.appendChild(tempInput);

   tempInput.select();
   document.execCommand("Copy");

   document.body.removeChild(tempInput);
}
