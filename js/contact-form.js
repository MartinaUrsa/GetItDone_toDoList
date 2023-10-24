const contactForm = document.querySelector('#contact_form');

const userName = document.querySelector('#user_name');
const userEmail = document.querySelector('#user_email');
const message = document.querySelector('#message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(userName.value);
    console.log(userEmail.value);
    console.log(message.value);
x})