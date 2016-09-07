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
var data = localStorage.getItem('data');
var START_SCREEN = "main-screen";
if(data){
	data = JSON.parse(data);
}else{
	var data = {
		CORRECT: 0,
		TOTAL: 0,
		ADDITION: {
			total:0,
			correct:0,
			easy: 0,
			medium: 0,
			hard: 0
		},
		SUBSTRACTION: {
			total:0,
			correct:0,
			easy: 0,
			medium: 0,
			hard: 0
		},
		MULTIPLICATION: {
			total:0,
			correct:0,
			easy: 0,
			medium: 0,
			hard: 0
		},
		DIVISION: {
			total:0,
			correct:0,
			easy: 0,
			medium: 0,
			hard: 0
		}
	};

	localStorage.setItem('data', JSON.stringify(data));
}
function updateLocalStorage(data){
	localStorage.setItem('data', JSON.stringify(data));
}
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
$("."+START_SCREEN).show();
$("#total").text(data.TOTAL);
$("#correct").text(data.CORRECT);
$("#wrong").text(data.TOTAL-data.CORRECT);
$("#total-addition").text(data.ADDITION.total);
$("#total-substraction").text(data.SUBSTRACTION.total);
$("#total-multiplication").text(data.MULTIPLICATION.total);
$("#total-division").text(data.DIVISION.total);
$(".page [data-page]").click(function(e){

	var target = $(e.target)
	$(".page").hide();
	if(target.attr('data-action') === "back"){
		$("."+target.attr('data-page')).show().addClass('bounceInRight');
		clearInterval(countDown);
	}
	else{
		$("."+target.attr('data-page')).show().addClass('bounceInLeft');
	}
	if(target.attr('data-page') === "level-screen" && target.attr('data-action') !== "back"){
		operation = $(target).val()
	}
	if(target.attr('data-page') === "game-container"){
		difficulty =  DIFFICULTY[$(target).val()];
		total = 0;
		setTimeout(startGame, 250);
	}
	if(target.attr('data-page') === "menu-screen"){
		$("#total-addition").text(data.ADDITION.total);
		$("#total-substraction").text(data.SUBSTRACTION.total);
		$("#total-multiplication").text(data.MULTIPLICATION.total);
		$("#total-division").text(data.DIVISION.total);
	}
	if(target.attr('data-page') === "main-screen"){
		$("#total").text(data.TOTAL);
		$("#correct").text(data.CORRECT);
		$("#correct").text(data.TOTAL-data.CORRECT);
	}
})

$(".answer-option").click(function(){
	 var ans = $(this).text();
	 var answer = getAnswer();
		if (ans == answer) {
			correctAnwers++;
			data.CORRECT++;
			data.ADDITION.correct++;
			data.SUBSTRACTION.correct++;
			data.MULTIPLICATION.correct++;
			data.DIVISION.correct++;
			updateLocalStorage(data);
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
		case "ADDITION" :
			displayOp = "+";
			data.ADDITION.total++;
			updateLocalStorage(data);
			break;
		case "SUBSTRACTION" : 
			displayOp = "-";
			leftNumber = Math.max(leftNumber, rightNumber)
			rightNumber = Math.min( leftNumber , rightNumber)
			data.SUBSTRACTION.total++;
			updateLocalStorage(data);	
			break;
		case "MULTIPLICATION" :
			displayOp = "x";
			data.MULTIPLICATION.total++;
			updateLocalStorage(data);
			break;
		case "DIVISION" :
			displayOp = "/";
			leftNumber = leftNumber*rightNumber
			data.DIVISION.total++;
			updateLocalStorage(data);
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
	data.TOTAL++;
	updateLocalStorage(data);
}

var displayAnswers = function(){
	var options = getAnswerOptions();	
	$('#first-option').html(options.first_option);
	$('#second-option').html(options.second_option);
	$('#third-option').html(options.third_option);
	$('#forth-option').html(options.forth_option);
}


function updateScore(){
	$("#total-qus").html(total+" "+"Total Questions");
	$("#points").html(correctAnwers+" "+"Correct Anwers");
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
	var options =[answer, (answer + answerVariation), Math.abs(answer - answerVariation),(answerVariation+answerVariation)];
	var pos = getRandomNumber()%5;
	options.splice(pos,0,answer);
	options.shift();
	return{
		"first_option": options[0],
		"second_option": options[1],
		"third_option": options[2],
		"forth_option":options[3]
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
