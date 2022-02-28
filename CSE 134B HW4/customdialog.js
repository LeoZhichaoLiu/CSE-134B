// We get all document object by searching the id
var al2 = document.getElementById("alert2");
var al_di = document.getElementById("alert-dialog");
//confirm
var co2 = document.getElementById("confirm2");
var co_di = document.getElementById("confirm-dialog");
var co_ok = document.getElementById("confirm-ok");
var co_cancel = document.getElementById("confirm-cancel");
//prompt
var pr2 = document.getElementById("prompt2");
var pr_di = document.getElementById("prompt-dialog");
var pr_text = document.getElementById("prompt-form");
var pr_ok = document.getElementById("prompt-ok");
var pr_cancel = document.getElementById("prompt-cancel");
//output
var custom_output = document.getElementById("custom_output");

//If alert, we show dialog
al2.addEventListener ('click', function alert2Message() {
    al_di.showModal();
});

//If confirm, we show dialog
co2.addEventListener ('click', function confirmMessage() {
    co_di.showModal();
});

//If ok, we output result
co_ok.addEventListener ('click', function co_okMessage() {
    custom_output.innerHTML = "Confirm result : true";
});
co_cancel.addEventListener ('click', function co_cancelMessage() {
    custom_output.innerHTML = "Confirm result : false";
});

//If prompt, we show dialog
pr2.addEventListener ('click', function promptMessage() {
    pr_di.showModal();
    pr_text.value = '';
});  

//If ok, we output result of input
pr_ok.addEventListener ('click', function pr_okMessage() {
    let clean = DOMPurify.sanitize(pr_text.value);
    custom_output.innerHTML = "The value returned by the prompt method is : " + clean;
});
pr_cancel.addEventListener ('click', function pr_cancelMessage() {
    custom_output.innerHTML = "User didn’t enter anything";
});     
