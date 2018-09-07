// Based on an example:
//https://github.com/don/cordova-plugin-ble-central


// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// this is ble hm-10 UART service
/*var blue= {
    serviceUUID: "0000FFE0-0000-1000-8000-00805F9B34FB",
    characteristicUUID: "0000FFE1-0000-1000-8000-00805F9B34FB"
};*/

//the bluefruit UART Service
var blue ={
	serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
}

var ConnDeviceId;

function scanForDevices(){
	//alert("scan for devices fundet");
	if (cordova.platformId === 'android') { // Android filtering is broken
		//alert("if-statement true");
		ble.scan([], 5, onDiscoverDevice, onError);
	} else {
		//alert("if statement false");
		ble.scan([blue.serviceUUID], 5, onDiscoverDevice, onError);
	}
}

/*function testbutton() 
{
	document.write("hello");
}
*/
function onDiscoverDevice(device){
	//alert("fundet");
	//document.getElementById("test").innerHTML += device.name + "<br>";
	var listItem = document.createElement('li'),
		html = device.name+ "," + device.id;
		listItem.innerHTML = html;
		document.getElementById("test").appendChild(listItem);
	
	/*if (device.name == "HolgerB")
	{
		alert("fundet");
	}
	else
	{
		alert("ikke fundet");
	}*/
	
}