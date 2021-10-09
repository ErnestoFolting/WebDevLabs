"use strict"

document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('form');
	form.addEventListener('submit',formSend);

	async function formSend(e){
		e.preventDefault();
		console.log('check');
    }
});