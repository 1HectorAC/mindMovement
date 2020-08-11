$("form").submit(function (event) {
    var amountIncrease = 1;
    if ($('.MainContent').children().length == 0) {
        $(".IntroContent").empty();
        $(".MainContent").append('<h5>Level:</h5>');
        $(".MainContent").append('<p id="round">1</p>')
        $(".MainContent").append('<hr>');
        $(".MainContent").append('<h1 id="String"></h1>');
        $(".MainContent").append('<input type="hidden" name="stuff" id="hiddenString" value="">');
        
    }
    else{
        //remove input box and submit
        if($('#hiddenString').text() == $('#EnterChar').val()){
            var num = parseInt($('#round').text());
            $('#round').text(num + 1);
            //$(".MainContent").append('<p id="round">1</p>')
            //$(".MainContent").append('<p>'+$('#hiddenString').text()+ ' ' + $('#EnterChar').val() +'</p>');
        }
        else{
            var num = parseInt($('#round').text());
            if(num > 1){
                $('#round').text(num - 1);

            }
            amountIncrease = -1;
        }
            
        $('#EnterChar').remove();
        $('#submit').remove();

    }
    /*
    if($('h1').is('#String')){

    }*/
    Start(amountIncrease);
    event.preventDefault();

});
function Start(amount) {

    var string = $('#hiddenString').text();
    var newString = ""
    if (string.length < 3)
        newString = generate_random_string(3);
    else {
        newString = generate_random_string(string.length + amount);
    }

    $('#hiddenString').text(newString);
    $('#String').text(newString);
    setTimeout(function () { AfterString(); }, 3000);
}

function AfterString() {
    //since it resets then length will never go up in Start()
    $('#String').text('');
    $('.MainContent').append('<input name="stuff" class="stuff" id="EnterChar">');
    $('.MainContent').append('<input type="submit" value="Submit" id="submit">');
}

function generate_random_string(string_length) {
    let random_string = '';
    let random_ascii;
    //cap: 65-90
    //lower:97-122
    let ascii_low = 97;
    let ascii_high = 122;
    for (let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii);
    }
    return random_string
}

