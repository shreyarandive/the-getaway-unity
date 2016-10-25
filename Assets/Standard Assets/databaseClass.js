#pragma strict
 
import System.Data; 
import Mono.Data.Sqlite;
import System.Collections.Generic;

 
class databaseClass 
{
    private var _connection : String;
    private var _dbcommand : IDbCommand;
    private var _dbconnection : IDbConnection;
    private var _reader : IDataReader;


    function OpenDatabase (dbName : String)
	{
		_connection = "URI=file:" + Application.persistentDataPath + "/" + dbName; // we set the connection to our database
 
    	Debug.Log(_connection);
 
    	_dbconnection = new SqliteConnection(_connection);
 
    	_dbconnection.Open();
 	}


// 	   	// dbName = "example.sqlite";
//    	var pathDB : String = System.IO.Path.Combine (Application.persistentDataPath, dbName);
//    	//original path
//    	var sourcePath : String = System.IO.Path.Combine (Application.streamingAssetsPath, dbName);
//
//	    //if DB does not exist in persistent data folder (folder "Documents" on iOS) or source DB is newer then copy it
//	    if (!System.IO.File.Exists (pathDB) || (System.IO.File.GetLastWriteTimeUtc(sourcePath) > System.IO.File.GetLastWriteTimeUtc(pathDB))) {
//
//	        if (sourcePath.Contains ("://")) {
//	            // Android  
//	            var www : WWW = new WWW (sourcePath);
//	            // Wait for download to complete - not pretty at all but easy hack for now 
//	            // and it would not take long since the data is on the local device.
//	            while (!www.isDone) {;}
//
//	            if (String.IsNullOrEmpty(www.error)) {                  
//	                System.IO.File.WriteAllBytes(pathDB, www.bytes);
//	            } else {
//	                Debug.Log("CMMMOOON");//CanExQuery = false;//CanExQuery = false;                                     
//	            }   
//
//	        } else {
//	            // Mac, Windows, Iphone
//
//	            //validate the existens of the DB in the original folder (folder "streamingAssets")
//	            if (System.IO.File.Exists (sourcePath)) {
//
//	                //copy file - alle systems except Android
//	                System.IO.File.Copy (sourcePath, pathDB, true);
//
//	            } else {
//	                Debug.Log("CMMMOOON");//CanExQuery = false;//CanExQuery = false;
//	                Debug.Log ("ERROR: the file DB named " + dbName + " doesn't exist in the StreamingAssets Folder, please copy it there.");
//	            }   
//
//	        }           
//
//	    }
//	    Debug.Log(pathDB);
//	    _connection = "URI = file:" + pathDB;
//    	//_connection = Application.dataPath + "/StreamingAssets/" +DbName;
//   		_dbconnection = new SqliteConnection(_connection);
//   		_dbconnection.Open();


 
//    	var pathDB : String = Application.persistentDataPath + "/" + dbName;
//	    if (!System.IO.File.Exists (pathDB))// || (System.IO.File.GetLastWriteTimeUtc(sourcePath) > System.IO.File.GetLastWriteTimeUtc(pathDB))) 
//	    {
//	            var loadDB : WWW = new WWW("jar:file://" + Application.dataPath + "!/assets/" + dbName);  // this is the path to your StreamingAssets in android
//	            while (!loadDB.isDone) {}
//
//	                System.IO.File.WriteAllBytes(pathDB, loadDB.bytes);
//	     } 
//	     else 
//	     {
//	                Debug.Log("CMMMOOON");//CanExQuery = false;//CanExQuery = false;
//	                Debug.Log ("ERROR: the file DB named " + dbName + " doesn't exist in the StreamingAssets Folder, please copy it there.");
//	      }   
//	    
//	    Debug.Log(pathDB);
//	    _connection = "URI = file:" + pathDB;
//   		_dbconnection = new SqliteConnection(_connection);
//   		_dbconnection.Open();


    function CreateTable(name : String, col : Array, colType : Array) { // Create a table, name, column array, column type array
        var query : String;

        query = "DROP TABLE IF EXISTS " + name;
        _dbcommand = _dbconnection.CreateCommand(); 
        _dbcommand.CommandText = query; 
        _reader = _dbcommand.ExecuteReader(); 

        query  = "CREATE TABLE " + name + "(" + col[0] + " " + colType[0];
        for(var i=1; i<col.length; i++) {
            query += ", " + col[i] + " " + colType[i];
        }
        query += ")";
        _dbcommand = _dbconnection.CreateCommand(); 
        _dbcommand.CommandText = query; 
        _reader = _dbcommand.ExecuteReader(); 

        //InsertRow
        //("1","What was the real name of Noorjehan, the wife of Jahangir, who had considerable political influence?", "Mehrun Nissa" , "Munia Khan", "Razia Beghum","Kehkashan","Mehrun Nissa","1","1");
        //InsertRow
        //("2","Who wrote the Babarnama?",	"Mumtaz Mahal",	"Jahanara Beghum",	"Roshanara Beghum",	"Gulbadan Beghum"	,"Gulbadan Beghum",	"5",	"1");


        query = "insert into Questionnaire values(1,'Who wrote the Babarnama?','Mumtaz Mahal','Jahanara Beghum','Roshanara Beghum','Gulbadan Beghum','Gulbadan Beghum',5,1);";
        _dbcommand = _dbconnection.CreateCommand(); // create empty command
        _dbcommand.CommandText = query; // fill the command
        _reader = _dbcommand.ExecuteReader(); // execute command which returns a reader
        query = "insert into Questionnaire values(2,'What was the real name of Noorjehan, the wife of Jahangir, who had considerable political influence?','Mehrun Nissa','Munia Khan','Razia Beghum','Kehkashan','Mehrun Nissa',1,1);";
        _dbcommand = _dbconnection.CreateCommand(); // create empty command
        _dbcommand.CommandText = query; // fill the command
        _reader = _dbcommand.ExecuteReader(); // execute command which returns a reader

        query = "insert into Questionnaire values(3,'The Third Battle of Panipat was fought between the _____ and ____.','Afghans and Marathas','Afghans and Sikhs','Marathas and Mughals','None of these','Marathas and Mughals',1,1);";
        _dbcommand = _dbconnection.CreateCommand(); // create empty command
        _dbcommand.CommandText = query; // fill the command
        _reader = _dbcommand.ExecuteReader(); // execute command which returns a reader

         query = "insert into Questionnaire values(4,'Identify the incorrect pair.','India Divided: Rajendra Prasad  ','India Divided: Rajendra Prasad  ','Poverty and Un-British Rule in India: Dadabhai Nauroji',' My Experiments with Truth: Mahatma Gandhi','Poverty and Un-British Rule in India: Dadabhai Nauroji',1,0);";
        _dbcommand = _dbconnection.CreateCommand(); // create empty command
        _dbcommand.CommandText = query; // fill the command
        _reader = _dbcommand.ExecuteReader(); // execute command which returns a reader

    }


//    function InsertRow(number:String, question:String, op1:String, op2:String, op3:String, op4:String, ans:String, gen:String, lev:String) 
//    {
//    	var values = new Array(("'"+number+"'"),("'"+question+"'"),("'"+op1+"'"),("'"+op2+"'"),("'"+op3+"'"),("'"+op4+"'"),("'"+ans+"'"),("'"+gen+"'"),("'"+lev+"'"));
//    	//db.InsertInto(TableName, values);
//    	var query : String;
//        query = "INSERT INTO " + tableName + " VALUES (" + values[0];
//        for(var i=1; i<values.length; i++) {
//            query += ", " + values[i];
//        }
//        query += ")";
//        dbcmd = dbcon.CreateCommand();
//        dbcmd.CommandText = query; 
//        reader = dbcmd.ExecuteReader(); 
//	}

    function ReadSingleQuestion(_tableName : String, _questionNumber : Number)
    {
    	var _query : String;
    	_query = "SELECT * FROM " + _tableName + " WHERE NUMBER =" + _questionNumber;
    	_dbcommand = _dbconnection.CreateCommand();
    	_dbcommand.CommandText = _query;
    	_reader = _dbcommand.ExecuteReader();
    	var readArray = new ArrayList();

    	while(_reader.Read()) { 

            var lineArray = new ArrayList();

            for (var i:int = 0; i < _reader.FieldCount; i++)
            {    
            	if(_reader.GetValue(0) == _questionNumber)
            		lineArray.Add(_reader.GetValue(i)); 
            }

            readArray.Add(lineArray); 
        }

        return readArray;
    }

     function CloseDB() 
     {
        _reader.Close(); 
        _reader = null; 

        _dbcommand.Dispose(); 
        _dbcommand = null; 

        _dbconnection.Close(); 
        _dbconnection = null; 
    }
}