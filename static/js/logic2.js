const GAMESTATE = {
    DIRECTIONS: 0,
    START: 1
};

var round = 1;
var randomString = "";

var currentState = GAMESTATE.DIRECTIONS;

$("form").submit(function (event) {
    if (currentState == GAMESTATE.DIRECTIONS) {
        $(".IntroContent").empty();
        $(".MainContent").append('<h5>Level:</h5>');
        $(".MainContent").append('<p id="round">'+round+'</p>')
        $(".MainContent").append('<hr>');
        $(".MainContent").append('<h1 id="displayString"></h1>');
        currentState = GAMESTATE.START;
        Start();

    }
    else{
        if(randomString == $('#EnterChar').val()){
            round++;
        }
        else if(round > 1){
            round--;
        }
        $('#round').text(round);
        $('#EnterChar').remove();
        $('#submit').remove();
        Start();

    }
    event.preventDefault();

});
function Start() {
    if (round <= 1)
        randomString = generate_random_string(3);
    else {
        randomString = generate_random_string(round + 2);
    }

    $('#displayString').text(randomString);
    setTimeout(function () { AfterString(); }, 3000);
}

function AfterString() {
    //since it resets then length will never go up in Start()
    $('#displayString').text('');
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

