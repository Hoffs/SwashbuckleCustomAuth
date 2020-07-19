const IDENTITY_URL='Development';

const authorize = () => {
    // Do request or whatever.
    console.log('Authorizing...');
    var xUser = document.getElementById('x-username');
    var xPass = document.getElementById('x-password');
    var xAcc = document.getElementById('x-account');

    xUser.disabled = true;
    xPass.disabled = true;
    xAcc.disabled = true;
    document.getElementById('x-auth-button').disabled = true;

    const user = xUser.value;
    const pass = xPass.value;
    const account = xAcc.value;
    console.log(`Auth with ${user}:${pass}:${account}`);

    // fetch(...) -> postAuthorize(result, error)
    setTimeout(() => postAuthorize("smileyface", 'xd'), 1500);
}

const postAuthorize = (result, error = null) => {
    document.getElementById('x-username').disabled = false;
    document.getElementById('x-password').disabled = false;
    document.getElementById('x-account').disabled = false;
    document.getElementById('x-auth-button').disabled = false;

    console.log(`Authorized with ${result}.`);
    if (!error) {
        window.ui.preauthorizeApiKey("Bearer", result);
        document.getElementById('x-error-container').innerText = null;
    } else {
        document.getElementById('x-error-container').innerText = `Error: ${error}`;
    }
} 

const createModal = () => {
    const wrapper = document.getElementsByClassName('auth-wrapper');

    if (wrapper.length === 0) {
        return;
    }
    
    const dialogEl = document.createElement('div');
    dialogEl.classList.add('dialog-ux');

    //#region backdrop
    const backdropEl = document.createElement('div');
    backdropEl.classList.add('backdrop-ux');
    dialogEl.appendChild(backdropEl);
    //#endregion backdrop
    
    //#region modal-boilerplate
    const modalEl = document.createElement('div');
    modalEl.classList.add('modal-ux');
    dialogEl.appendChild(modalEl);
    
    const modalDialogEl = document.createElement('div');
    modalDialogEl.classList.add('modal-dialog-ux');
    modalEl.appendChild(modalDialogEl);
    
    const modalInnerEl = document.createElement('div');
    modalInnerEl.classList.add('modal-ux-inner');
    modalDialogEl.appendChild(modalInnerEl);
    //#endregion modal-boilerplate

    //#region modal-header
    const modalHeaderEl = document.createElement('div');
    modalHeaderEl.classList.add('modal-ux-header');
    modalInnerEl.appendChild(modalHeaderEl);
    const modalHeaderH3El = document.createElement('h3');
    modalHeaderH3El.innerText = "Authorize using Identity service";
    modalHeaderEl.appendChild(modalHeaderH3El);
    //#endregion modal-header

    //#region modal-body
    const modalBodyEl = document.createElement('div');
    modalBodyEl.classList.add('modal-ux-content');
    modalInnerEl.appendChild(modalBodyEl);
    
    const modalBodyContainerEl = document.createElement('div');
    modalBodyContainerEl.classList.add('auth-container');
    modalBodyEl.appendChild(modalBodyContainerEl);
    
    const bodyTitle = document.createElement('h4');
    bodyTitle.innerText = `To: ${IDENTITY_URL}`;
    modalBodyContainerEl.appendChild(bodyTitle);

    const errorContainer = document.createElement('h6');
    errorContainer.id = 'x-error-container';
    modalBodyContainerEl.appendChild(errorContainer);

    const userInputContainter = document.createElement('div');
    userInputContainter.classList.add('wrapper');
    userInputContainter.innerHTML = '<label>Username:</label><section class=""><input id="x-username" type="text"></section>';
    modalBodyContainerEl.appendChild(userInputContainter);

    const passwordInputContainter = document.createElement('div');
    passwordInputContainter.classList.add('wrapper');
    passwordInputContainter.innerHTML = '<label>Password:</label><section class=""><input id="x-password" type="password"></section>';
    modalBodyContainerEl.appendChild(passwordInputContainter);

    const accountInputContainter = document.createElement('div');
    accountInputContainter.classList.add('wrapper');
    accountInputContainter.innerHTML = '<label>Account:</label><section class=""><input id="x-account" type="text"></section>';
    modalBodyContainerEl.appendChild(accountInputContainter);


    //#region modal-buttons
    const modalButtons = document.createElement('div');
    modalButtons.classList.add('auth-btn-wrapper');
    modalBodyContainerEl.appendChild(modalButtons);
    
    const buttonAuth = document.createElement('button');
    buttonAuth.id = "x-auth-button";
    buttonAuth.classList.add('btn', 'modal-btn', 'auth', 'authorize', 'button');
    buttonAuth.innerText = 'Authorize';
    buttonAuth.onclick = (_) => authorize();
    const buttonClose = document.createElement('button');
    buttonClose.classList.add('btn', 'modal-btn', 'auth', 'btn-done', 'button');
    buttonClose.innerText = 'Close';
    buttonClose.onclick = (_) => dialogEl.remove();
    modalButtons.appendChild(buttonAuth);
    modalButtons.appendChild(buttonClose);
    //#endregion modal-buttons
    

    //#endregion modal-body

    wrapper[0].appendChild(dialogEl);
}

const addAuthButton = (attempt) => {
    if (attempt > 20) {
        return;
    }
    const wrapper = document.getElementsByClassName('auth-wrapper');
    if (wrapper.length === 0) {
        setTimeout(() => addAuthButton(attempt + 1), 250);
        return;
    }

    const element = document.createElement('button');
    element.classList.add('btn');
    element.classList.add('authorize');
    element.classList.add('unlocked');

    const btnTextElement = document.createElement('span');
    btnTextElement.innerText = "Authorize with Identity"
    btnTextElement.style.paddingRight = 0;
    element.appendChild(btnTextElement);

    element.onclick = (e) => createModal();

    wrapper[0].appendChild(element);
}


window.addEventListener('load', () => {
    addAuthButton(0);
})