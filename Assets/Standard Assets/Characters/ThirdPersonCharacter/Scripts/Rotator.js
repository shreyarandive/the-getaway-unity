#pragma strict


public var speed : float = 50f;

function Update () {
	transform.Rotate(Vector3.left, speed * Time.deltaTime);
	transform.Rotate(Vector3.up, speed * Time.deltaTime);
}