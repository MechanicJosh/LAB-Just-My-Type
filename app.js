$(document).ready(function(){

    $("#keyboard-upper-container").hide();
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let sentenceIndex = 0;
    let letterIndex = 0;
    let sentence = sentences[sentenceIndex];
    let letter = sentence[letterIndex];

    $('#target-letter').text(letter);

    $(document).on('keydown', function(event) {
        let asciiValue = event.key.charCodeAt(0);
        $('#' + asciiValue).css('background-color', 'yellow'); 
        
        if (event.shiftKey) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
         }
        
    });

    $(document).on('keyup', function(event){

      
      

        if(event.keyCode !== 16){


            let currentLetter = sentence[letterIndex];
            let nextLetter = sentence[letterIndex + 1];

            $('#yellow-block').css('left', function(index, current) {
                return parseInt(current, 10) + 17 + 'px'; // Adjust the 10 to change the movement distance
            });

            $('#target-letter').text(nextLetter);
            
            if(event.key.charCodeAt() == currentLetter.charCodeAt()){
                $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
             }
            else{
                $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            }

        
            console.log(letterIndex)


        }

        $('.well').css('background-color', 'rgb(245, 245, 245)');
        if(event.code == 'ShiftLeft' || 'ShiftRight'){
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }


        letterIndex++;
        nextSentence();
        
    
    });


    function nextSentence(){
        if (letterIndex == sentence.length){
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

    nextSentence();
});