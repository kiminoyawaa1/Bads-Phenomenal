// Function to handle login form submission
function handleLogin(e) {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
  
    // Check if the username exists and password matches
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = accounts.find(account => account.username === username && account.password === password);
    if (user) {
      console.log('Login successful:', user);
      window.location.href = 'home.html'; // Redirect to home page
    } else {
      console.log('Login failed: Incorrect username or password');
      alert('Incorrect username or password. Please try again.'); // Show error message
    }
    loginForm.reset(); // Reset the form after submission
  }
  
  // Function to handle signup form submission
  function handleSignup(e) {
    e.preventDefault();
    const username = signupForm.username.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.'); // Show error message
      return;
    }
  
    // Check if the username is already taken
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const existingUser = accounts.find(account => account.username === username);
    if (existingUser) {
      alert('Username already exists. Please choose a different username.'); // Show error message
      return;
    }
  
    // Add new account to local storage
    const newAccount = { username, password };
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  
    alert('Account created successfully. You can now login.'); // Show success message
    signupForm.reset(); // Reset the form after submission
  }
  
  // Add event listeners to the login and signup forms
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', handleLogin);
  
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', handleSignup);
  