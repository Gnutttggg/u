// Define the functions
function openSignupPopup() {
  document.getElementById("signupPopup").style.display = "block";
}

function closeSignupPopup() {
  document.getElementById("signupPopup").style.display = "none";
}

function signup(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = event.target.querySelector("input[type='text']").value;
  const email = event.target.querySelector("input[type='email']").value;
  const password = event.target.querySelector("input[type='password']").value;

  console.log('User Input:');
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  if (!username || !email || !password) {
    console.log('Please fill in all required fields');
    return;
  }

  const data = {
    username: username,
    email: email,
    password: password
  };

fetch("http://localhost:3001/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})


    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Display a success message or perform any necessary actions
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle the error appropriately
    });

  closeSignupPopup();
}

// Attach event listeners
document.getElementById("signupButton").addEventListener("click", openSignupPopup);
document.getElementById("signupForm").addEventListener("submit", signup);
