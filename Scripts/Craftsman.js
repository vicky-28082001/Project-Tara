function getCraftsmenFromStorage() {
    return JSON.parse(localStorage.getItem('craftsmen')) || [];
}

// Utility function to save craftsman data to local storage
function saveCraftsmenToStorage(craftsmen) {
    localStorage.setItem('craftsmen', JSON.stringify(craftsmen));
}

// Populate the table with craftsman data from local storage
function populateCraftsmanTable() {
    const craftsmen = getCraftsmenFromStorage();
    const tbody = document.querySelector('.fl-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    craftsmen.forEach((craftsman, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" data-index="${index}"></td>
            <td>${craftsman.fullName}</td>
            <td>${craftsman.companyName}</td>
            <td>${craftsman.mobile}</td>
            <td>${craftsman.email}</td>
            <td>${craftsman.gst}</td>
            <td>${craftsman.city}</td>
            <td>${craftsman.status}</td>
        `;
        tbody.appendChild(row);
    });
}

// Handle form submission to add a new craftsman
function submitCreationForm(event) {
    event.preventDefault();

    const newCraftsman = {
        fullName: document.getElementById('fullname').value,
        mobile: document.getElementById('Mobile').value,
        userCode: document.getElementById('usercode')?.value || 'N/A',
        password: document.getElementById('password')?.value || '',
        companyName: document.getElementById('Company Name').value,
        gst: document.getElementById('GST').value,
        email: document.getElementById('Email-ID').value,
        country: document.getElementById('country').value,
        state: document.getElementById('State').value,
        city: document.getElementById('City').value,
        pincode: document.getElementById('Pincode').value,
        status: document.getElementById('Status').value,
        dob: document.getElementById('date').value,
        gender: document.getElementById('gender').value,
        profile: document.getElementById('image').files[0]
            ? URL.createObjectURL(document.getElementById('image').files[0])
            : null,
    };

    const craftsmen = getCraftsmenFromStorage();
    craftsmen.push(newCraftsman);
    saveCraftsmenToStorage(craftsmen);

    alert('Craftsman added successfully!');
    populateCraftsmanTable();
    document.querySelector('.form-section').style.display = 'none';
    event.target.reset();
}

// Handle form submission to edit an existing craftsman
function saveEditedUser() {
    const selectedIndex = document.querySelector('.edit-form').dataset.editIndex;
    if (selectedIndex === undefined) return;

    const craftsmen = getCraftsmenFromStorage();
    craftsmen[selectedIndex] = {
        ...craftsmen[selectedIndex],
        fullName: document.getElementById('edit-full-name').value,
        mobile: document.getElementById('edit-mobile-no').value,
        companyName: document.getElementById('edit-company-name').value,
        gst: document.getElementById('edit-GST').value,
        email: document.getElementById('edit-email-id').value,
        country: document.getElementById('edit-country').value,
        state: document.getElementById('edit-state').value,
        city: document.getElementById('edit-city').value,
        pincode: document.getElementById('edit-pincode').value,
        status: document.getElementById('edit-status').value,
    };

    saveCraftsmenToStorage(craftsmen);
    alert('Craftsman updated successfully!');
    populateCraftsmanTable();
    document.querySelector('.edit-form').style.display = 'none';

    uncheckAllCheckboxes()
}

// Delete selected craftsmen
function deleteSelectedUsers() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    const craftsmen = getCraftsmenFromStorage();
    const updatedCraftsmen = [];

    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            updatedCraftsmen.push(craftsmen[index]);
        }
    });

    saveCraftsmenToStorage(updatedCraftsmen);
    alert('Selected craftsmen deleted successfully!');
    populateCraftsmanTable();
}

// Toggle creation form visibility
function toggleCreationForm() {
    const formSection = document.querySelector('.form-section');
    formSection.style.display = formSection.style.display === 'block' ? 'none' : 'block';
}

// Toggle edit form visibility
function toggleEditForm() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndex = -1;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert('Please select a craftsman to edit.');
        return;
    }

    const craftsmen = getCraftsmenFromStorage();
    const craftsman = craftsmen[selectedIndex];

    document.getElementById('edit-full-name').value = craftsman.fullName;
    document.getElementById('edit-mobile-no').value = craftsman.mobile;
    document.getElementById('edit-company-name').value = craftsman.companyName;
    document.getElementById('edit-GST').value = craftsman.gst;
    document.getElementById('edit-email-id').value = craftsman.email;
    document.getElementById('edit-country').value = craftsman.country;
    document.getElementById('edit-state').value = craftsman.state;
    document.getElementById('edit-city').value = craftsman.city;
    document.getElementById('edit-pincode').value = craftsman.pincode;
    document.getElementById('edit-status').value = craftsman.status;

    const editForm = document.querySelector('.edit-form');
    editForm.dataset.editIndex = selectedIndex;
    editForm.style.display = 'block';
}
function cancelEditUser() {
   
    alert('Edit cancelled.');
    uncheckAllCheckboxes();
    // Hide the edit form without saving changes
    document.querySelector('.edit-form').style.display = 'none';
}
// Function to handle viewing a Craftsman
function toggleViewForm() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndex = -1;

    // Find the selected checkbox
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert('Please select a craftsman to view.');
        return;
    }

    const craftsmanList = JSON.parse(localStorage.getItem('craftsmen')) || [];
    const selectedCraftsman = craftsmanList[selectedIndex];

    if (!selectedCraftsman) {
        alert('Craftsman not found.');
        return;
    }

    // Populate the view form fields
    document.getElementById('view-full-name').value = selectedCraftsman.fullName || '';
    document.getElementById('view-mobile-no').value = selectedCraftsman.mobileNo || '';
    document.getElementById('view-company-name').value = selectedCraftsman.companyName || '';
    document.getElementById('view-GST').value = selectedCraftsman.gst || '';
    document.getElementById('view-email-id').value = selectedCraftsman.emailId || '';
    document.getElementById('view-country').value = selectedCraftsman.country || '';
    document.getElementById('view-state').value = selectedCraftsman.state || '';
    document.getElementById('view-city').value = selectedCraftsman.city || '';
    document.getElementById('view-pincode').value = selectedCraftsman.pincode || '';
    document.getElementById('view-status').value = selectedCraftsman.status || '';

    // Show the view form
    const viewForm = document.querySelector('.view-form');
    if (viewForm) {
        viewForm.style.display = 'block';
    }
}

// Function to close the view form
function closeViewCraftsmanForm() {
    const viewForm = document.querySelector('.view-form');

    if (viewForm) {
        viewForm.style.display = 'none';
    }

    alert('View operation closed.');

    uncheckAllCheckboxes()
   
}


// Initialize table on page load
document.addEventListener('DOMContentLoaded', () => {
    populateCraftsmanTable();
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
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.location.href = "Dashboard.html";
}

function navigateToKeyusers(url, event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.location.href = "Keyusers List.html";
}

function navigateToWorkorders(url, event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.location.href = "Workorders.html";
}

function navigateTousers(url, event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.location.href = "Users.html";
}

function uncheckAllCheckboxes() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

function printSelectedDetails() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedRow = null;

    // Find the first selected row
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedRow = checkbox.closest('tr'); // Get the row containing the checkbox
        }
    });

    if (!selectedRow) {
        alert('Please select a craftsman to print.');
        return;
    }

    // Collect details from the selected row
    const details = Array.from(selectedRow.querySelectorAll('td')).map(cell => cell.textContent.trim());
    const detailKeys = ['Full Name', 'Company Name', 'Mobile No', 'Email ID', 'GST', 'City', 'Status'];

    // Create printable content
    let printContent = `<h2>Craftsman Details</h2><ul>`;
    detailKeys.forEach((key, index) => {
        printContent += `<li><strong>${key}:</strong> ${details[index + 1] || 'N/A'}</li>`; // Skip the checkbox column
    });
    printContent += `</ul>`;

    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head><title>Print Craftsman Details</title></head>
            <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
function exportData(format) {
    const table = document.querySelector('.fl-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    let content = '';

    if (format === 'csv' || format === 'excel') {
        // Convert table rows to CSV/Excel format
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('th, td')).map(cell => `"${cell.textContent.trim()}"`);
            content += cells.join(',') + '\n';
        });

        // Create a Blob and download the file
        const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `craftsman_data.${format}`;
        link.click();
        URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
        // Convert table to printable HTML and export as PDF
        const printWindow = window.open('', '_blank');
        const tableHtml = table.outerHTML.replace(/<input[^>]*checkbox[^>]*>/g, ''); // Remove checkboxes
        printWindow.document.write(`
            <html>
                <head><title>Export as PDF</title></head>
                <body>${tableHtml}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Toggle Export Menu Visibility
function toggleExportMenu() {
    const menu = document.querySelector('.export-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleSort() {
    const tableBody = document.querySelector('.fl-table tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const sortButton = document.querySelector('#sort-button');
    const isAscending = sortButton.dataset.sortOrder === 'asc';

    // Sort rows based on the text content of the first column (Full Name)
    rows.sort((a, b) => {
        const aText = a.cells[1]?.textContent.trim().toLowerCase(); // Full Name column
        const bText = b.cells[1]?.textContent.trim().toLowerCase();

        if (aText < bText) return isAscending ? -1 : 1;
        if (aText > bText) return isAscending ? 1 : -1;
        return 0;
    });

    // Append sorted rows back to the table
    rows.forEach(row => tableBody.appendChild(row));

    // Toggle sort order for the next click
    sortButton.dataset.sortOrder = isAscending ? 'desc' : 'asc';
}
