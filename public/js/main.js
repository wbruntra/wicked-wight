var wordlists = {
  // "potter": potterlist,
  "got" : wordlist
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomChoice = function(myArray) {
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand
}

var getPassphrase = function(length, special, wordlist) {
  var pp = [];
  if (special) {
    var capsPosition = getRandomInt(0,length-1);

    // for now I don't really want to add randomness
    var capsPosition = 0;
  }
  for (var i=0;i<length;i++) {
    word = randomChoice(wordlist);
    if (special && capsPosition == i) {
      word = capitalizeFirstLetter(word);
    }
    if (special && i == length-1) {
      word = word + " " + (capsPosition + 1);
    }
    pp.push(word);
  }
  return pp.join(" ");
}

var fillList = function(phrases) {
  $('#passphrases').html('')
  for (var i=0; i < phrases.length; i++) {
    var li = $('<li>');
    li.html(phrases[i]);
    $('#passphrases').append(li);
  }
}

var makePhrases = function(n, length, special, wordlist) {
  var result = [];
  for (var i=0; i < n; i++) {
    var phrase = getPassphrase(length, special, wordlist);
    result.push(phrase);
  }
  return result;
}

var refreshPhrases = function() {
  // var wordlistName = $('input[name="wordlist"]:checked').val();
  var wordlistName = "got";
  var wordlist = wordlists[wordlistName];
  var length = $('#phrase-length').val();
  var n = $('#phrase-number').val();
  var special = $('#special-requirements').is(':checked');
  var phrases = makePhrases(n, length, special, wordlist);
  fillList(phrases);
}

$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'click',
    placement: 'bottom'
  });

  refreshPhrases();

  $('#refresh-button').click(function() {
      refreshPhrases()
  });

  $('#copy-button').on('mouseleave', function() {
    $(this).tooltip('hide');
  });

  $('#remove-spaces').click(function(e) {
    e.preventDefault();
    var newText = $('#pw-text').val().split(' ').join('');
    $('#pw-text').val(newText);
  });

  $('#cap-num').click(function(e) {
    e.preventDefault();
    var newText = capitalizeFirstLetter($('#pw-text').val()) + '1';
    $('#pw-text').val(newText);
  });

  $(document).on('click','li',function() {
    var text = $(this).html();
    $('#pw-text').val(text);
    $('#modal-button').click();
    clipboard = new Clipboard('#copy-button');

    clipboard.on('success', function(e) {
        window.getSelection().removeAllRanges()
    });

    clipboard.on('error', function(e) {
    });
  });
  $('body').on('hidden.bs.tooltip', function (e) {
      $(e.target).data("bs.tooltip").inState.click = false;
  });

  $('#options-modal').on('hide.bs.modal', function() {
    $('#refresh-button').click();
  });

});
