const contactForm = document.querySelector('#contact_form');

const userName = document.querySelector('#user_name');
const userEmail = document.querySelector('#user_email');
const message = document.querySelector('#message');

// Evento submit al button del form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const body = {
        service_id: 'service_bebm2km',
        template_id: 'contact_form',
        user_id: '0OII96_5hfFl7zTgU',
        template_params: {
            'user_name': userName.value,
            'user_email': userEmail.value,
            'message': message.value,
        }
    };

    sendEmail(body)
        .then((resp) => {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El formulario fue enviado correctamente.',
                width: 400,
                confirmButtonColor: '#1C4662',
            });
            return resp;
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Parece que algo salió mal. Por favor, intenta nuevamente.',
                width: 400,
                confirmButtonColor: '#1C4662',
            })
            return err;
        });

    userName.value = '';
    userEmail.value = '';
    message.value = '';
});


// sendEmail function
const sendEmail = async (body) => {
    const config = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', config)
    const data = await response.text();
    return data;
}