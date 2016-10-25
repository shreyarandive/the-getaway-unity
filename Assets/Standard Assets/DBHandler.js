var obj : Onclickcheck;
private var Randomize : Number;

function OnTriggerEnter (other : Collider)
{
	if(other.CompareTag("PickUp"))
	{
		Debug.Log("Trigger");
		other.gameObject.SetActive(false);

		Randomize = Random.Range(1,4);
		//Randomize = 1;

		obj.Quiz (Randomize);
	}
}