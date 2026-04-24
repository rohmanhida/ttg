import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1 class="text-3xl font-bold">
    Registration
  </h1>
<!-- Popup -->
<div id="errorPopup"
     class="fixed bottom-4 right-4 bg-red-500 hidden text-white px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300">
  <span id="errorMessage">Something went wrong</span>
</div>
<div id="successPopup"
     class="fixed bottom-4 right-4 bg-blue-500 hidden text-white px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300">
  <span id="successMessage">Something went wrong</span>
</div>
</form>
  <section>
    <form id="registration" action="" class="m-8">
      <div>
        <label for="fullName" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
        <div class="mt-2">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <input id="fullName" type="text" name="fullName" placeholder="John Doe" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
          </div>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
        <div class="mt-2">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <input id="email" type="text" name="email" placeholder="johndoe@mail.com" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
          </div>
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        <div class="mt-2">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <input id="password" type="password" name="password" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
          </div>
        </div>
      </div>
      <div>
        <label for="password_confirm" class="block text-sm/6 font-medium text-gray-900">Password Confirm</label>
        <div class="mt-2">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <input id="password_confirm" type="password" name="password_confirm" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
          </div>
        </div>
      </div>
      <div>
        <input type="submit" value="submit" class="rounded-md bg-white p-2 mt-2 outline-1 -outline-offset-1 outline-gray-300" />
      </div>
    </form>
  </section>
</body>
`;

const form = document.querySelector('form') as HTMLFormElement;
const popup = document.getElementById('errorPopup') as HTMLDivElement;
const popupSuccess = document.getElementById('successPopup') as HTMLDivElement;
const message = document.getElementById('errorMessage') as HTMLSpanElement;
const successMessage = document.getElementById('successMessage') as HTMLSpanElement;

function showError(msg: string) {
  message.textContent = msg;
  popup.classList.remove('hidden');

  // auto hide after 3s
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 3000);
}
function showMessage(msg: string) {
  successMessage.textContent = msg;
  popupSuccess.classList.remove('hidden');

  // auto hide after 3s
  setTimeout(() => {
    popupSuccess.classList.add('hidden');
  }, 3000);
}

form.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();

  const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const password_confirm = (document.getElementById('password_confirm') as HTMLInputElement).value;

  if (!fullName) {
    showError('Full name is required');
    return;
  }
  if (!email) {
    showError('Email is required');
    return;
  }
  if ( email && (!email.includes('@') || !email.includes('.'))) {
    showError('email format is incorrect');
    return;
  }
  if (password.length < 8) {
    showError('password must be at least 8 character');
    return;
  }
  if (password !== password_confirm) {
    showError('password must be match');
    return;
  }

  const formData = new FormData(form);

  const payload = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const BASE_URL = import.meta.env.VITE_APP_URL;
  const res = await fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const resjson = await res.json();
  if (res.status > 299) {
    showError(resjson.statusCode+': '+resjson.message)
  }
  else {
    showMessage('successfully registered!')
  }
});
