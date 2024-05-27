document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get username and password values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform simple validation (you can add more complex checks)
    if (username === "admin" && password === "password") {
      // Redirect to another page
      window.location.href = "indexx.html";
    } else {
      alert("Invalid username or password");
    }
  });
  