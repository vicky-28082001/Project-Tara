// Utility function to get users from local storage
// function getUsersFromStorage() {
//     return JSON.parse(localStorage.getItem('users')) || [];
// }

// // Utility function to save users to local storage
// function saveUsersToStorage(users) {
//     localStorage.setItem('users', JSON.stringify(users));
// }

// Populate the table with users from local storage
function populateTable() {
    const users = getUsersFromStorage();
    const tbody = document.querySelector('.fl-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="user-checkbox" data-index="${index}"></td>
            <td class="type">${user.type}</td>
            <td class="full-name">${user.fullName}</td>
            <td class="company-name">${user.companyName}</td>  
            <td class="mobile-no">${user.mobileNo}</td>
            <td class="email-id">${user.emailId}</td>
            <td class="reg-from">Desktop</td>
            <td class="city">${user.city}</td>
            <td class="status">${user.status}</td>
        `;
        tbody.appendChild(row);
    });
}
//opens creation form
function toggleCreationForm() {
    const creationForm = document.querySelector('.form-section');
    creationForm.style.display = creationForm.style.display === 'block' ? 'none' : 'block';
}

// Add new user
function submitCreationForm(event) {
    event.preventDefault();

    const newUser = {
        type: document.querySelector('input[name="type"]:checked').value,
        fullName: document.getElementById('fullname').value,
        companyName: document.getElementById('company').value,
        mobileNo: document.getElementById('mobile').value,
        emailId: document.getElementById('email').value,   
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value,
        status: document.getElementById('status').value,
        dob: document.getElementById('date').value,
        gender: document.getElementById('gender').value,
    };

    const users = getUsersFromStorage();
    users.push(newUser);
    saveUsersToStorage(users);

    alert('User created successfully!');
    populateTable();
    document.querySelector('.form-section').style.display = 'none';
    document.querySelector('form.creation-section').reset();
}

function saveEditedUser() {
    const selectedCheckbox = document.querySelector('.user-checkbox:checked');
    if (!selectedCheckbox) {
        alert('Please select a user to edit.');
        return;
    }

    const index = selectedCheckbox.dataset.index;
    const users = getUsersFromStorage();

    users[index] = {
        type: document.querySelector('#edit-type-internal').checked ? 'Internal' : 'External',
        fullName: document.getElementById('edit-full-name').value,
        companyName: document.getElementById('edit-company-name').value,
        
        mobileNo: document.getElementById('edit-mobile-no').value,
        emailId: document.getElementById('edit-email-id').value,
        
        regFrom: 'Desktop', // Example field for Reg-From
        city: document.getElementById('edit-city').value,
        status: document.getElementById('edit-status').value,
    };

    saveUsersToStorage(users);
    alert('User details updated successfully!');
    populateTable();
    document.querySelector('.edit-form').style.display = 'none';
}


function deleteSelectedUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Please select at least one user to delete.');
        return;
    }

    let users = getUsersFromStorage();

    // Get the indices of selected users
    const indicesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.index));

    // Filter out the users that are not selected
    users = users.filter((_, index) => !indicesToDelete.includes(index));

    // Save the updated user list back to local storage
    saveUsersToStorage(users);

    alert('Selected user(s) deleted successfully!');
    populateTable();
}

// Open Edit Form with Selected User Details
function toggleEditForm() {
    const selectedCheckbox = document.querySelector('.user-checkbox:checked');
    if (!selectedCheckbox) {
        alert('Please select a user to edit.');
        return;
    }

    const index = selectedCheckbox.dataset.index;
    const users = getUsersFromStorage();
    const user = users[index];

    // Populate edit form fields
    document.getElementById('edit-full-name').value = user.fullName;
    document.getElementById('edit-company-name').value = user.companyName;
    
    document.getElementById('edit-mobile-no').value = user.mobileNo;
    document.getElementById('edit-email-id').value = user.emailId;
    
    document.getElementById('edit-city').value = user.city;
    document.getElementById('edit-status').value = user.status;

    if (user.type.toLowerCase() === 'internal') {
        document.getElementById('edit-type-internal').checked = true;
    } else if (user.type.toLowerCase() === 'external') {
        document.getElementById('edit-type-external').checked = true;
    } else {
        document.getElementById('edit-type-internal').checked = false;
        document.getElementById('edit-type-external').checked = false;
    }

    // Store the index of the user being edited
    document.querySelector('.edit-form').dataset.editIndex = index;

    // Show the edit form
    document.querySelector('.edit-form').style.display = 'block';
}

// Save Changes to the User
function saveEditedUser() {
    const index = document.querySelector('.edit-form').dataset.editIndex;
    const users = getUsersFromStorage();

    // Update user details
    users[index] = {
        type: document.querySelector('#edit-type-internal').checked ? 'Internal' : 'External',
        fullName: document.getElementById('edit-full-name').value,
        companyName: document.getElementById('edit-company-name').value,
       
        mobileNo: document.getElementById('edit-mobile-no').value,
        emailId: document.getElementById('edit-email-id').value,
       
        regFrom: 'Desktop', // Example field for Reg-From
        city: document.getElementById('edit-city').value,
        status: document.getElementById('edit-status').value,
    };

    // Save updated user list to local storage
    saveUsersToStorage(users);

    alert('User details updated successfully!');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    populateTable();

    // Hide the edit form
    document.querySelector('.edit-form').style.display = 'none';
}

// Cancel Edit
function cancelEditUser() {
   
    alert('Edit cancelled.');
    // Hide the edit form without saving changes
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector('.edit-form').style.display = 'none';
}

function toggleViewForm() {
    const selectedCheckbox = document.querySelector('.user-checkbox:checked');
    if (!selectedCheckbox) {
        alert('Please select a user to view.');
        return;
    }

    const index = selectedCheckbox.dataset.index;
    const users = getUsersFromStorage();
    const user = users[index];

    // Populate view form fields
    document.getElementById('view-full-name').value = user.fullName;
    document.getElementById('view-company-name').value = user.companyName;
   
    document.getElementById('view-mobile-no').value = user.mobileNo;
    document.getElementById('view-email-id').value = user.emailId;
   
    document.getElementById('view-city').value = user.city;
    document.getElementById('view-status').value = user.status;

    if (user.type === 'Internal') {
        document.getElementById('view-type-internal').checked = true;
    } else {
        document.getElementById('view-type-external').checked = true;
    }

    // Show the view form
    document.querySelector('.view-form').style.display = 'block';
}

// Close the View Form
function closeViewForm() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    // Hide the view form
    document.querySelector('.view-form').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    populateTable();
});


function setActive(event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}
function toggleCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
    function closeFooterTab() {
        const footer = document.querySelector('.footer');
        footer.style.display = 'none';
    }
}

function navigateToDashboard(url, event) {
    // Remove the active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the clicked nav item
    event.currentTarget.classList.add('active');

    // Navigate to the specified URL
    window.location.href = "Dashboard.html";
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
function printSelectedDetails() {
    const table = document.querySelector('.fl-table tbody');
    const rows = table.querySelectorAll('tr');

    let selectedRow = null;
    for (const row of rows) {
        const checkbox = row.querySelector('.user-checkbox');
        if (checkbox && checkbox.checked) {
            selectedRow = row;
            break;
        }
    }

    if (!selectedRow) {
        alert('Please select a person by checking the first checkbox.'); 
        return;
    }

    const details = Array.from(selectedRow.querySelectorAll('td')).map(cell => cell.textContent.trim());
    const detailKeys = ['Full Name', 'Company Name', 'Mobile No', 'Email ID', 'Reg From', 'City', 'Status'];

    let printContent = `<h2>Selected Person Details</h2><ul>`;
    for (let i = 1; i < details.length; i++) {
        printContent += `<li><strong>${detailKeys[i - 1]}:</strong> ${details[i]}</li>`;
    }
    printContent += `</ul>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function toggleSort() {
    const table = document.querySelector('.fl-table tbody');
    const rows = Array.from(table.querySelectorAll('tr'));
    const sortButton = document.querySelector('#sort-button');
    const isAscending = sortButton.dataset.sortOrder === 'asc';

    rows.sort((a, b) => {
        const aText = a.querySelector('.full-name').textContent.trim().toLowerCase();
        const bText = b.querySelector('.full-name').textContent.trim().toLowerCase();

        if (aText < bText) return isAscending ? -1 : 1;
        if (aText > bText) return isAscending ? 1 : -1;
        return 0;
    });

    rows.forEach(row => table.appendChild(row));
    sortButton.dataset.sortOrder = isAscending ? 'desc' : 'asc'; 
}

function exportData(type) {
    const table = document.querySelector('.fl-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    let content = '';

    if (type === 'excel' || type === 'csv') {
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('th, td')).map(cell => cell.textContent.trim());
            content += cells.join(',') + '\n';
        });

        const blob = new Blob([content], { type: type === 'csv' ? 'text/csv' : 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `export.${type}`;
        link.click();
        URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
        const printWindow = window.open('', '_blank');
        let tableHtml = table.outerHTML.replace(/<input[^>]*checkbox[^>]*>/g, ''); // Remove checkboxes
        printWindow.document.write(`<html><head><title>Export PDF</title></head><body>${tableHtml}</body></html>`);
        printWindow.document.close();
        printWindow.print();
    }
}

function toggleExportMenu() {
    const menu = document.querySelector('.export-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function filterTable() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const tableRows = document.querySelectorAll(".fl-table tbody tr");

    tableRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        let matchFound = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                matchFound = true;
            }
        });

        if (matchFound) {
            row.style.display = ""; 
        } else {
            row.style.display = "none";
        }
    });
}