//CONFIGURATION
var uName   = 'GAYUSERNAMEHERE' //For Username follow scraper
var hashTag = '#HASHTAG' //For Hashtag scraper
var hashArray = ['#HASH1', '#HASH2', '#HASH3', '#HASH4', '#HASH5', '#ASMANYHASHESYOUFUCKINGWANT']
var keyWord = 'KEYWORD' //For Keyword scraper
var keyArray = ['KEYWORD', 'KEYWORD1', 'KEYWORD2']


//Variables
var colors = require('colors');
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'puugdRtAPwdU4kYiovqAXz7wz'
  , consumer_secret:      'dqQG14vnfKTcNYumRQVDFeYxZyxuYXtAQx0En47HkFckr8NuGz'
  , access_token:         '3892353202-hZ4jWjvCid58fq0LBKkPoQYaDgGr53iPqnorHDu'
  , access_token_secret:  'qNUyrdTImeZ0sZkB8vrs6SblIrAtI11lIUIp37rFIAy4B'
})

var menuHandler;

//Intialise
function initialize() {
    showMain();
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', checkMenu);

    function checkMenu() {
        var input = process.stdin.read();
        if(input !== null) {
            menuHandler(input.trim());
        }
    }
}

//Main
function showMain() {
    console.log(
        '1 = Grab followers ID' + '\n' +
        '2 = Grab tweets by Hashtag CTRL-C TO STOP'  + '\n' +
        '3 = Grab tweets by Hashtag Array CTRL-C TO STOP' + '\n' + 
        '4 = Grab tweets by Keyword CTRL-C TO STOP' + '\n' +
        '5 = Grab tweets by Keyword Array CTRL-C TO STOP' + '\n' +
        '6 = Exit'  + '\n\n' +
        'Choose number, then press ENTER:'
        );

    menuHandler = function(input){
        switch(input) {
            case '1': grabID(); break;
            case '2': grabTag(); break;
            case '3': grabTagArray(); break;
	    case '4': grabKeyword(); break;
            case '5': grabKeywordArray(); break;
            case '6': process.exit(); break;
            default: showMain();
        }
    };
}

//Functions
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return "Y:M:D[" + year + ":" + month + ":" + day + ":] H:M:S[" + hour + ":" + min + ":" + sec + "]";

}

function grabID()
{
   T.get('followers/ids', { screen_name: uName },  function (err, data, response) 
   {
       console.log(data)
       process.exit();
   });
}

function grabTag()
{
   var stream = T.stream('statuses/filter', { track: hashTag });

   stream.on('tweet', function (tweet) 
   {
      console.log(getDateTime().green + '-' + tweet.text.red + ' (' + tweet.user.screen_name.magenta  + ')\n');
   })
}

function grabTagArray()
{
   var stream = T.stream('statuses/filter', { track: hashArray });

   stream.on('tweet', function (tweet)
   {
      console.log(getDateTime().green + '-' + tweet.text.red + ' (' + tweet.use$
   })
}


function grabKeyword()
{
   var stream = T.stream('statuses/filter', { track: keyWord });

   stream.on('tweet', function (tweet)
   {
      console.log(getDateTime().green + '-' + tweet.text.red + ' (' + tweet.user.screen_name.magenta  + ')\n');

   })
}

function grabKeywordArray()
{
   var stream = T.stream('statuses/filter', { track: keyArray });

   stream.on('tweet', function (tweet)
   {
      console.log(getDateTime().green + '-' + tweet.text.red + ' (' + tweet.user.screen_name.magenta  + ')\n');

   })
}


initialize();
