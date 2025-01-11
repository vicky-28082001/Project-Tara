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
function toggleCreationForm() {
    const creationForm = document.querySelector('.form-section');
    creationForm.style.display = creationForm.style.display === 'block' ? 'none' : 'block';
}

function submitCreationForm(event) {
    event.preventDefault();
    alert('User created successfully!');
    document.querySelector('.form-section').style.display = 'none';
}

function toggleEditForm() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    selectedUser = null;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            selectedUser = {
                fullName: row.querySelector('.full-name').textContent,
                companyName: row.querySelector('.company-name').textContent,
                priceSlab: row.querySelector('.price-slab').textContent,
                mobileNo: row.querySelector('.mobile-no').textContent,
                emailId: row.querySelector('.email-id').textContent,
                userRole: row.querySelector('.user-role').textContent,
                city: row.querySelector('.city').textContent,
                status: row.querySelector('.status').textContent
            };
        }
    });

    if (selectedUser) {
        populateEditForm(); 
        document.querySelector('.edit-form').style.display = 'block';
        document.querySelector('.table_container').style.marginTop = '20px';
    } else {
        alert('Please select a user to edit.');
    }
}

function populateEditForm() {
    const editForm = document.querySelector('.edit-form');
    editForm.querySelector('#edit-full-name').value = selectedUser.fullName;
    editForm.querySelector('#edit-company-name').value = selectedUser.companyName;
    editForm.querySelector('#edit-price-slab').value = selectedUser.priceSlab;
    editForm.querySelector('#edit-mobile-no').value = selectedUser.mobileNo;
    editForm.querySelector('#edit-email-id').value = selectedUser.emailId;
    editForm.querySelector('#edit-user-role').value = selectedUser.userRole;
    editForm.querySelector('#edit-city').value = selectedUser.city;
    editForm.querySelector('#edit-status').value = selectedUser.status;
}

function saveEditedUser() {
    alert('User details saved successfully!');

    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.table-container').style.marginTop = '0';
}

function cancelEdituser() {
    alert('User details Edition Cancelled!');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.table-container').style.marginTop = '0';
}

function toggleViewForm() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    selectedUser = null;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            selectedUser = {
                fullName: row.querySelector('.full-name').textContent,
                companyName: row.querySelector('.company-name').textContent,
                priceSlab: row.querySelector('.price-slab').textContent,
                mobileNo: row.querySelector('.mobile-no').textContent,
                emailId: row.querySelector('.email-id').textContent,
                userRole: row.querySelector('.user-role').textContent,
                city: row.querySelector('.city').textContent,
                status: row.querySelector('.status').textContent
            };
        }
    });

    if (selectedUser) {
        populateViewForm();
        document.querySelector('.view-form').style.display = 'block';
        document.querySelector('.table-container').style.marginTop = '20px';
    } else {
        alert('Please select a user to view.');
    }
}

function populateViewForm() {
    const viewForm = document.querySelector('.view-form');
    viewForm.querySelector('#view-full-name').value = selectedUser.fullName;
    viewForm.querySelector('#view-company-name').value = selectedUser.companyName;
    viewForm.querySelector('#view-price-slab').value = selectedUser.priceSlab;
    viewForm.querySelector('#view-mobile-no').value = selectedUser.mobileNo;
    viewForm.querySelector('#view-email-id').value = selectedUser.emailId;
    viewForm.querySelector('#view-user-role').value = selectedUser.userRole;
    viewForm.querySelector('#view-city').value = selectedUser.city;
    viewForm.querySelector('#view-status').value = selectedUser.status;
}

function closeViewForm() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector('.view-form').style.display = 'none';
    document.querySelector('.table-container').style.marginTop = '0';
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
    const detailKeys = ['Full Name', 'Company Name', 'Price Slab', 'Mobile No', 'Email ID', 'User Role', 'Reg From', 'City', 'Status'];

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

function navigateTousers(url, event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.location.href = "Users.html";
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