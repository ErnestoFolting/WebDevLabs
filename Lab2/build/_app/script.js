"use strict"
const debounce = (fn,delay)=>{
    let timeOut;
    return function(...args){
        if(timeOut){
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(()=>{
            fn(...args)
        },delay);
    };
};
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const responseGood = document.getElementById('responseGood');
    const responseBad = document.getElementById('responseBad');
    form.addEventListener("submit", preSend);
    form.addEventListener("submit", debounce(formSend,1000));
    async function preSend(e){
        form.classList.add('_sending');
        e.preventDefault();
    }
    async function formSend(){
        responseBad.classList.remove('_sending');
        responseGood.classList.remove('_sending');
        const referrerValue = document.referrer;
        let formData = {
            Name :form.elements.name.value,
            Email :form.elements.email.value,
            Message : form.elements.message.value,
            Sex :form.elements.sex.value,
            referrer: referrerValue
        }
        console.log(formData);
        let error = formValidate();
        if(error === 0){

            let response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
              });
            console.log(response.status);
            if(response.ok){
                responseGood.classList.add('_sending'); 
                responseBad.classList.remove('_sending');
                form.reset();
                form.classList.remove('_sending');
            }else{
                responseBad.classList.add('_sending'); 
                responseGood.classList.remove('_sending');
                alert("Помилка");
                alert(response.status);
                form.reset();
                form.classList.remove('_sending');
            }
        }else{
            alert("Заповніть обов'язкові поля та перевірте email");
            form.classList.remove('_sending')
        }
    }
    function formValidate () {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for( let i = 0; i<formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});