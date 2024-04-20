$(document).ready(function(){

    $("#keyboard-upper-container").hide();
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let sentenceIndex = 0;
    let letterIndex = 0;
    let sentence = sentences[sentenceIndex];
    let letter = sentence[letterIndex];
    let wrongLetters = 0;
    let startTime, endTime;
    let firstKeyPress = false;

    let button = $('<button>').text('End Game').attr('id', 'myButton');
    $('body').append(button);
    $('#myButton').click(endGame);

    $('#target-letter').text(letter);

    $(document).on('keydown', function(event) {

        if (!firstKeyPress) {
            startTime = new Date();
            firstKeyPress = true;
        }

        let asciiValue = event.key.charCodeAt(0);
        $('#' + asciiValue).css('background-color', 'yellow'); 
        
        if (event.shiftKey) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
         }
        
    });

    $(document).on('keyup', function(event){

        if(sentenceIndex == 4 && letterIndex == sentence.length){ // I hard coded the 4 because sentenceIndex.length is 5 but because its index starts at 0 the length ends at 4
            endGame();
        }

        if(event.key !== 'Shift'){
            
            let currentLetter = sentence[letterIndex];
            let nextLetter = sentence[letterIndex + 1];

            $('#target-letter').text(nextLetter);

            let span = $('<span>')
            span.innerHTML = nextLetter;
            span.css('background-color', 'yellow');
            $('#sentence').append(span);
            
            console.log(span);

            letterIndex++;
            
            if(event.key.charCodeAt() == currentLetter.charCodeAt()){
                $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
             }
            else{
                $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
                wrongLetters++;
            }
        }

        $('.well').css('background-color', 'rgb(245, 245, 245)');
        if(event.code == 'ShiftLeft' || 'ShiftRight'){
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }

        //console.log(sentenceIndex, sentences.length, letterIndex, sentence.length);
        nextSentence();

    });

    function nextSentence(){
        if (letterIndex == sentence.length && sentenceIndex != 4){
            sentenceIndex++;
            sentence = sentences[sentenceIndex];
            $('#yellow-block').css('left','0px');
            letterIndex = 0;
            letter = sentence[letterIndex];
            $('#feedback').empty();
            $('#target-letter').text(letter);
        }
        $('#sentence').text(sentence);
    }

    function endGame() {
        endTime = new Date();
        let timeDiff = endTime - startTime;
        let minutes = timeDiff / 60000;
        let NumberOfWords = 240;
        let wordsPerMinute = (NumberOfWords / minutes - 2 * wrongLetters);
        $('#feedback').empty();
        $('#target-letter').empty();
        $('#yellow-block').remove();
        $('#sentence').text('your words per minute are ' + wordsPerMinute);
    }
  
    nextSentence();
});