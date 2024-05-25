let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');

form.onsubmit = handleFormSubmit;
textarea.oninput = handleInputChange;

async function handleFormSubmit(e) {
    e.preventDefault();
    disable(textarea);
    disable(button);
    show(loadingMessage);
    hide(errorMessage);

    try{
        await submitForm(textarea.value);
        show(successMessage);
        hide(form);
    } catch(e){
        show(errorMessage);
        errorMessage.textContent = e.message;
    } finally {
        hide(loadingMessage);
        enable(textarea);
        enable(form);
    }

}

function handleInputChange() {
    if(textarea.value.length === 0) {
        disable(button);
    }else {
        enable(button);
    }
}


function enable(item) {
    item.disabled = false;
}


function disable(item) {
    item.disabled = true;
}

function hide(item) {
    item.style.display = 'none';
}

function show(item) {
    item.style.display = '';
}

function submitForm(formData) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if(formData.toLowerCase() === 'delhi'){
                resolve();
            }else{
                reject(new Error('Your answer is incorrect. Please try again'));
            }
        }, 1500)
    })
}