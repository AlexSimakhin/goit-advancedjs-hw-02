const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = savedData ? JSON.parse(savedData) : {};

const formData = {
  email: parsedData.email ?? '',
  message: parsedData.message ?? '',
};

form.elements.email.value = formData.email;
form.elements.message.value = formData.message;

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = form.elements;
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (!emailValue || !messageValue) {
    alert('Fill please all fields');
    return;
  }

  formData.email = emailValue;
  formData.message = messageValue;
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  form.reset();
});
