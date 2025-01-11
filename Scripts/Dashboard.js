function navigateTokeyusers(url, event) {
  // Remove the active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to the clicked nav item
  event.currentTarget.classList.add('active');

  // Navigate to the specified URL
  window.location.href = "Keyusers List.html";
}

function navigateToUsers(url, event) {
  // Remove the active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to the clicked nav item
  event.currentTarget.classList.add('active');

  // Navigate to the specified URL
  window.location.href = "Users.html";
} 

function navigateToCraftsman(url, event) {
  // Remove the active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to the clicked nav item
  event.currentTarget.classList.add('active');

  // Navigate to the specified URL
  window.location.href = "Craftsman.html";
} 

function navigateToWorkorders(url, event) {
  // Remove the active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to the clicked nav item
  event.currentTarget.classList.add('active');

  // Navigate to the specified URL
  window.location.href = "Workorders.html";
} 