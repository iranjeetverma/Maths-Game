var leftNumber = 0;
var rightNumber = 0;
var answer = 0;
var first_option=0;
var second_option=0;
var correctAnwers = 0;
var total = 0;
var countDown;
var timer = 7000;
var progress;
var start;

var DIFFICULTY = {
	EASY: 15,
	MEDIUM : 30,
	HARD : 60
}
var difficulty = DIFFICULTY.EASY;

var OPERATION = {
		ADD: "ADDITION",
		SUBS: "SUBSTRACTION",
		MULTI: "MULTIPLICATION",
		DIVIDE: "DIVISION"
	}
var operation = OPERATION.ADD;


$(".page").hide();
$(".main-screen").show();
$(".page [data-page]").click(function(e){

	var target = $(e.target)
	$(".page").hide();
	if(target.attr('data-action') === "back"){
		$("."+target.attr('data-page')).show().addClass('bounceInRight');
	}
	else{
		$("."+target.attr('data-page')).show().addClass('bounceInLeft');
	}
	if(target.attr('data-page') === "level-screen"){
		operation = $(target).val()
	}
	if(target.attr('data-page') === "game-container"){
		setTimeout(startGame, 250);
	}
})

$(".answer-option").click(function(){
	 var ans = $(this).text();
	 var answer = getAnswer();
		if (ans == answer) {
			correctAnwers++;
		}
	startGame();
})

var startCountDown = function(){
	countDown = setInterval(changeQuestion,timer)
}

function getRandomNumber(){
	var num = Math.floor(Math.random()*difficulty)
	while(num == 0){
		num = Math.floor(Math.random()*difficulty)
	}
	return num;
}

function showProgress(){
	var sec = timer/10;
	var progressWidth = 100/sec;
	$(".progress").css('width',progressWidth+'%');
	progress = setInterval(function(){
		progressWidth = progressWidth + 100/sec;
		$(".progress").css('width',progressWidth+'%');

	},10)
}

function changeOperation(){
	var displayOp = "+";
	switch(operation){
		case "SUBSTRACTION" : 
			displayOp = "-";
			leftNumber = Math.max(leftNumber, rightNumber)
			rightNumber = Math.min( leftNumber , rightNumber)	
			break;
		case "MULTIPLICATION" :
			displayOp = "x";
			break;
		case "DIVISION" :
			displayOp = "/";
			leftNumber = leftNumber*rightNumber
			break;
	}
	return displayOp;
}

var changeQuestion = function(){
	leftNumber = getRandomNumber()
	rightNumber = getRandomNumber()
	var displayOp = changeOperation();
	while(leftNumber == rightNumber){
		rightNumber = getRandomNumber()
	}

	
	$('#left-block').html(leftNumber);
	$('#op-block').html(displayOp);
	$('#right-block').html(rightNumber);

	updateScore();
	clearInterval(progress)
	showProgress();
	displayAnswers();
	total++;
}

var displayAnswers = function(){
	var options = getAnswerOptions();	
	$('#first-option').html(options.first_option);
	$('#second-option').html(options.second_option);
	$('#third-option').html(options.third_option);
}


function updateScore(){
	$("#points").html(correctAnwers+" / "+total);
}

function getAnswer(){
	var answer = 0;
	switch(operation){
		case "ADDITION" : 
			answer = leftNumber+rightNumber;
			break;
		case "SUBSTRACTION" : 
			answer = leftNumber-rightNumber;
			break;
		case "MULTIPLICATION" :
			answer = leftNumber*rightNumber;
			break;
		case "DIVISION" :
			answer = Math.floor(leftNumber/rightNumber);
			break;
	}
	return answer;
}

function getAnswerOptions (){
	var answer = getAnswer();
	var answerVariation =  getRandomNumber()
	var options =[answer, (answer + answerVariation), Math.abs(answer - answerVariation)];
	var pos = getRandomNumber()%3;
	options.splice(pos,0,answer);
	options.shift();
	return{
		"first_option": options[0],
		"second_option": options[1],
		"third_option": options[2]
	}
}

function startGame(){
	clearInterval(countDown);
	changeQuestion();	
	startCountDown();
}
var date = new Date();
date=new Date(date).toUTCString();
date=date.split(' ').slice(0, 4).join(' ')
$(".date").html(date);

