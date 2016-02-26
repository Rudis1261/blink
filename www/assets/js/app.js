// Hook into Bluetooth.js to handle volume down
document.addEventListener("volumedownbutton", volumeDownAction, false);

// As well as volume down
document.addEventListener("volumeupbutton", volumeUpAction, false);

function volumeUpAction(){
    bth.action("vol-up");
}

function volumeDownAction() {
    bth.action("vol-down");
}
