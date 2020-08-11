
$("form").submit(function (event) {
    var mainContent = $('#mainContent');

    if (mainContent.children().length == 0) {
        var ops = document.getElementsByName("operation");
        var operation = GetOperation(ops);

        for (var i = 0; i < 5; i++) {
            AddEquation(operation, mainContent, i, i);
        }

        mainContent.append('<input id="submitAnswer" class="btn btn-primary customButton" type="submit" value="Done">');

        //clear the form
        $('#optionPart').empty();
    } else if($('#submitRetry').length == 1){
        setupOption();
        mainContent.empty();
    } else{
        $('#submitAnswer').remove();
        //make answer spots unchangable.
        //calculate Results here
        mainContent.append('<h1>Total Correct: '+GetAnswerTotal()+' out of '+$('.entryFieldClass').length+'</h1>');
        mainContent.append('<input id="submitRetry" class="btn btn-primary customButton" type="submit" value="Retry">');
    }
    event.preventDefault();

});

function GetAnswerTotal(){
    var enteredValues = $('.entryFieldClass');
    var answerValues = $('.answerFieldClass');
    var total = 0;
    for(i = 0; i < enteredValues.length; i++){
        if(enteredValues[i].value == answerValues[i].value){
            total++;
        }
    }
    return total;
}
function GetOperationAnswer(one, two, operation) {
    switch (operation) {
        case "-":
            return one - two;
            break;
        case "*":
            return one * two;
            break;
        default:
            return one + two;
    }
}

function AddEquation(operation, htmlPlacement, enterFieldName, answerName) {
    var one = Math.floor(Math.random() * 9);
    var two = Math.floor(Math.random() * 9);
    var answer = GetOperationAnswer(one, two, operation);

    //Add Equation.
    htmlPlacement.append('<h1 class="equationField">' + one + operation + two + '=</h1>');

    //Add field to enter answer
    htmlPlacement.append('<input name="' + enterFieldName + '" class="entryFieldClass" type="number" min="-99" max="99" required="" >');

    //Add hidden answer field
    htmlPlacement.append('<input type="hidden" id="stuff" class="answerFieldClass" name="' + answerName + '" value="' + answer + '">');
    htmlPlacement.append("<hr>");

}

function GetOperation(opsList) {
    //get array of operations.
    var ops = document.getElementsByName("operation");

    //Check which operation in list is checked and return it.
    for (i = 0; i < ops.length; i++) {
        if (ops[i].checked)
            return ops[i].value;
    }
    return 0;
}

function setupOption(){
    var optionPart = $('#optionPart');
    optionPart.append('<h5>~Enter an option~</h5>');
    optionPart.append('<hr>')
    optionPart.append('<input type="radio" id="add" name="operation" value="+" checked>');
    optionPart.append('<label for="add"> Addition (+)</label><br>');
    optionPart.append('<input type="radio" id="minus" name="operation" value="-">');
    optionPart.append('<label for="minus"> Subtraction (-)</label><br>');
    optionPart.append('<input type="radio" id="times" name="operation" value="*">');
    optionPart.append('<label for="times"> Multiplication (*)</label><br>');
    optionPart.append('<input type="submit" value="Submit" class="btn btn-primary customButton">');
    
}
setupOption();