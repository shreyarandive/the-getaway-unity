#pragma strict

public var Q : UI.Text;
public var O1 : GameObject;
public var O2 : GameObject;
public var O3 : GameObject;
public var O4 : GameObject;
public var backDrop : UI.RawImage;

public var theMessage : UI.Text;
public var theMessageBox : UI.RawImage;

public var live1 : UI.RawImage;
public var live2 : UI.RawImage;
public var live3 : UI.RawImage;

public var scoreText : UI.Text; 

private var correctAnswer : String;
private var score : Number;
private var totalLives : Number;

public var _DbName : String = "TerrainDataBase.sqdb";
public var _TableName : String = "Questionnaire";
var dB : databaseClass;

private var line1;
private var line2;
private var line3;
private var line4;

function Quiz (RandomQuestions : Number)
{
	Debug.Log("IM IN");
	dB = new databaseClass();
    dB.OpenDatabase(_DbName);

	var table = _TableName;
    var columns = new Array("number","question","option1","option2","option3","option4","answer","genre","level");
    var values = new Array("integer","text","text","text","text","text","text","text","text");
    try {
        dB.CreateTable(_TableName,columns,values);
    }
    catch(e) {// Do nothing - our table was already created
        //- we don't care about the error, we just don't want to see it
    }
    //dB.execSQL();
    var _databaseData : ArrayList = new ArrayList();
    totalLives = 4;

    _databaseData = ReadSingleQuestion(RandomQuestions);
    for (var line : ArrayList in _databaseData) 
    {

    	correctAnswer = line[6];
 		Q.text = line[1];
 		O1.GetComponentInChildren(UI.Text).text = line[2];
 		O2.GetComponentInChildren(UI.Text).text = line[3];
 		O3.GetComponentInChildren(UI.Text).text = line[4];
 		O4.GetComponentInChildren(UI.Text).text = line[5];

 		line1 = line[2];
 		line2 = line[3];
 		line3 = line[4];
 		line4 = line[5];
 		//scoreText.text = line[2];

 		Debug.Log(correctAnswer);
 		//scoreText.text = line1;
	
		UnHideTheQuiz();
    }
}

public function ForOption1 ()
{
	if(line1 == correctAnswer)
	{
		score++;        			  	
	    scoreText.text = "Score : " + score;
		
	    HideTheQuiz();

	    GotThatRight();
	}
	else
	{
		totalLives--;
		HideTheQuiz();

		Whoops();

		if ( totalLives == 3)
	    	live1.enabled = false; 
	    if ( totalLives == 2)
	    	live2.enabled = false;
	    if ( totalLives == 1)
	    	live3.enabled = false;
	}
}

public function ForOption2 ()
{
	if(line2 == correctAnswer)
	{
		score++;        			  	
	    scoreText.text = "Score : " + score;
		
	    HideTheQuiz();

	    GotThatRight();
	}
	else
	{
		totalLives--;
		HideTheQuiz();

		Whoops();

		if ( totalLives == 3)
	    	live1.enabled = false; 
	    if ( totalLives == 2)
	    	live2.enabled = false;
	    if ( totalLives == 1)
	    	live3.enabled = false;
	}
}

public function ForOption3 ()
{
	if(line3 == correctAnswer)
	{
		score++;        			  	
	    scoreText.text = "Score : " + score;
		
	    HideTheQuiz();

	    GotThatRight();
	}
	else
	{
		totalLives--;
		HideTheQuiz();

		Whoops();

		if ( totalLives == 3)
	    	live1.enabled = false; 
	    if ( totalLives == 2)
	    	live2.enabled = false;
	    if ( totalLives == 1)
	    	live3.enabled = false;
	}
}

public function ForOption4 ()
{
	if(line4 == correctAnswer)
	{
		score++;        			  	
	    scoreText.text = "Score : " + score;
		
	    HideTheQuiz();
	    GotThatRight();
	}
	else
	{
		totalLives--;
		HideTheQuiz();

		Whoops();

		if ( totalLives == 3)
	    	live1.enabled = false; 
	    if ( totalLives == 2)
	    	live2.enabled = false;
	    if ( totalLives == 1)
	    	live3.enabled = false;
	}
}

function HideTheQuiz ()
{
	Q.enabled = false;
    O1.SetActive (false);
   	O2.SetActive (false);
   	O3.SetActive (false);
   	O4.SetActive (false);
   	backDrop.enabled = false;
}

function UnHideTheQuiz ()
{
	Q.enabled = true;
    O1.SetActive(true);
   	O2.SetActive(true);
   	O3.SetActive(true);
   	O4.SetActive(true);
   	backDrop.enabled = true;
}

function GotThatRight ()
{
	//stheMessageBox.enabled = true;
	theMessage.text = "That's Right!";
	theMessage.enabled = true;
	yield WaitForSeconds(2.0);
	theMessageBox.enabled = false;
	theMessage.enabled = false;
}

function Whoops ()
{
	//theMessageBox.enabled = true;
	theMessage.text = "Whoops!";
	theMessage.enabled = true;
	yield WaitForSeconds(2.0);
	theMessageBox.enabled = false;
	theMessage.enabled = false;
}
 
function ReadSingleQuestion(Randomize : Number) 
{
	Randomize = Random.Range(1,4);
    return dB.ReadSingleQuestion(_TableName, Randomize);
}