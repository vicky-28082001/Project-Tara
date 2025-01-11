function getWorkordersFromStorage() {
    return JSON.parse(localStorage.getItem('workorders')) || [];
}

// Utility function to save workorders to local storage
function saveWorkordersToStorage(workorders) {
    localStorage.setItem('workorders', JSON.stringify(workorders));
}

// Populate the table with workorders from local storage
function populateWorkordersTable() {
    const workorders = getWorkordersFromStorage();
    const tbody = document.querySelector('.fl-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    workorders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" data-index="${index}"></td>
            <td>
                <div class="image-placeholder">
                    ${order.image ? `<img src="${order.image}" alt="Order Image" style="height: 50px; width: 50px;">` : 'No Image'}
                </div>
            </td>
            <td>${order.orderNumber}</td>
            <td>${order.creationDate}</td>
            <td>${order.category}</td>
            <td>${order.quantity}</td>
            <td>${order.weight}</td>
            <td>${order.dueDate}</td>
            <td>${order.size}</td>
            <td>${order.stone}</td>
            <td>${order.rodium}</td>
            <td>${order.hallmark}</td>
            <td>${order.screw}</td>
            <td>${order.hook}</td>
            <td>${order.narration}</td>
        `;
        tbody.appendChild(row);
    });
}

// Handle form submission to create a new order
function submitOrderForm(event) {
    event.preventDefault();

    const currentDate = new Date().toLocaleDateString('en-GB'); // Format: DD/MM/YYYY

    const newOrder = {
        orderNumber: document.getElementById('order-number').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        weight: document.getElementById('weight').value,
        dueDate: document.getElementById('due-date').value,
        size: document.getElementById('size').value,
        stone: document.getElementById('stone').value,
        rodium: document.getElementById('rodium').value,
        hallmark: document.getElementById('hallmark').value,
        screw: document.getElementById('screw').value,
        hook: document.getElementById('hook').value,
        narration: document.getElementById('narration').value,
        image: document.getElementById('order-image').files[0]
            ? URL.createObjectURL(document.getElementById('order-image').files[0])
            : null,
        creationDate: currentDate,
    };

    const workorders = getWorkordersFromStorage();
    workorders.push(newOrder);
    saveWorkordersToStorage(workorders);

    alert('Workorder created successfully!');
    populateWorkordersTable();
    document.getElementById('add-order-form').style.display = 'none';
    document.querySelector('form.creation-section').reset();
}

function toggleEditOrderForm() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndex = -1;

    // Find the selected checkbox
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert('Please select an order to edit.');
        return;
    }

    const workorders = getWorkordersFromStorage();
    const order = workorders[selectedIndex];

    // Populate the edit form fields with the selected order data
    document.getElementById('edit-order-number').value = order.orderNumber;
    document.getElementById('edit-category').value = order.category;
    document.getElementById('edit-quantity').value = order.quantity;
    document.getElementById('edit-weight').value = order.weight;
    document.getElementById('edit-due-date').value = order.dueDate;
    document.getElementById('edit-size').value = order.size;
    document.getElementById('edit-stone').value = order.stone;
    document.getElementById('edit-rodium').value = order.rodium;
    document.getElementById('edit-hallmark').value = order.hallmark;
    document.getElementById('edit-screw').value = order.screw;
    document.getElementById('edit-hook').value = order.hook;
    document.getElementById('edit-narration').value = order.narration;
    document.getElementById('edit-creation-date').value = order.creationDate;

    // Attach the index of the order being edited to the form
    document.getElementById('edit-order-form').dataset.editIndex = selectedIndex;

    // Show the edit form
    document.getElementById('edit-order-form').style.display = 'block';
}

// Function to handle form submission and save the updated order
function submitEditOrderForm(event) {
    event.preventDefault();

    const selectedIndex = document.getElementById('edit-order-form').dataset.editIndex;
    const workorders = getWorkordersFromStorage();

    // Update the selected order with new details
    workorders[selectedIndex] = {
        ...workorders[selectedIndex], // Keep existing data
        category: document.getElementById('edit-category').value,
        quantity: document.getElementById('edit-quantity').value,
        weight: document.getElementById('edit-weight').value,
        dueDate: document.getElementById('edit-due-date').value,
        size: document.getElementById('edit-size').value,
        stone: document.getElementById('edit-stone').value,
        rodium: document.getElementById('edit-rodium').value,
        hallmark: document.getElementById('edit-hallmark').value,
        screw: document.getElementById('edit-screw').value,
        hook: document.getElementById('edit-hook').value,
        narration: document.getElementById('edit-narration').value,
        image: document.getElementById('edit-order-image').files[0]
            ? URL.createObjectURL(document.getElementById('edit-order-image').files[0])
            : workorders[selectedIndex].image,
    };

    // Save updated data to local storage
    saveWorkordersToStorage(workorders);

    alert('Order updated successfully!');
    populateWorkordersTable();
    document.getElementById('edit-order-form').style.display = 'none';

    deselectAllCheckboxes();
}

// Function to cancel editing
function cancelEditOrder() {
    document.getElementById('edit-order-form').style.display = 'none';

    deselectAllCheckboxes();
}

function deleteSelectedOrders() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndices = [];

    // Collect indices of selected checkboxes
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndices.push(index);
        }
    });

    if (selectedIndices.length === 0) {
        alert('Please select at least one order to delete.');
        return;
    }

    const workorders = getWorkordersFromStorage();

    // Filter out the orders that are not selected
    const updatedWorkorders = workorders.filter((_, index) => !selectedIndices.includes(index));

    // Save the updated orders to local storage
    saveWorkordersToStorage(updatedWorkorders);

    alert('Selected orders deleted successfully!');
    populateWorkordersTable(); // Refresh the table

    deselectAllCheckboxes();
}

function toggleViewOrderForm() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndex = -1;

    // Find the selected checkbox
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert('Please select an order to view.');
        return;
    }

    const workorders = getWorkordersFromStorage();
    const order = workorders[selectedIndex];

    // Populate the view form fields with the selected order data
    document.getElementById('view-order-number').value = order.orderNumber;
    document.getElementById('view-category').value = order.category;
    document.getElementById('view-quantity').value = order.quantity;
    document.getElementById('view-weight').value = order.weight;
    document.getElementById('view-due-date').value = order.dueDate;
    document.getElementById('view-size').value = order.size;
    document.getElementById('view-stone').value = order.stone;
    document.getElementById('view-rodium').value = order.rodium;
    document.getElementById('view-hallmark').value = order.hallmark;
    document.getElementById('view-screw').value = order.screw;
    document.getElementById('view-hook').value = order.hook;
    document.getElementById('view-narration').value = order.narration;
    document.getElementById('view-creation-date').value = order.creationDate;

    const imageContainer = document.getElementById('view-order-image');
    imageContainer.innerHTML = order.image
        ? `<img src="${order.image}" alt="Order Image" style="height: 150px; width: 150px; border-radius: 10px;">`
        : 'No Image Available';

    // Show the view form
    document.getElementById('view-order-form').style.display = 'block';
}

// Function to close the view form
function closeViewOrder() {
    document.getElementById('view-order-form').style.display = 'none';

    deselectAllCheckboxes();
}


// Initialize table on page load
document.addEventListener('DOMContentLoaded', () => {
    populateWorkordersTable();
});

function toggleOrderForm() {
    const orderForm = document.getElementById('add-order-form');
    orderForm.style.display = orderForm.style.display === 'block' ? 'none' : 'block';
}


function setActive(event) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
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

function printSelectedDetails() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    let selectedIndex = -1;

    // Find the selected checkbox
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert('Please select an order to print.');
        return;
    }

    const workorders = getWorkordersFromStorage();
    const order = workorders[selectedIndex];

    // Prepare the printable content
    let printContent = `
        <h2>Order Details</h2>
        <ul>
            <li><strong>Order No:</strong> ${order.orderNumber}</li>
            <li><strong>Category:</strong> ${order.category}</li>
            <li><strong>Quantity:</strong> ${order.quantity}</li>
            <li><strong>Weight:</strong> ${order.weight}</li>
            <li><strong>Due Date:</strong> ${order.dueDate}</li>
            <li><strong>Size:</strong> ${order.size}</li>
            <li><strong>Stone:</strong> ${order.stone}</li>
            <li><strong>Rodium:</strong> ${order.rodium}</li>
            <li><strong>Hallmark:</strong> ${order.hallmark}</li>
            <li><strong>Screw:</strong> ${order.screw}</li>
            <li><strong>Hook:</strong> ${order.hook}</li>
            <li><strong>Narration:</strong> ${order.narration}</li>
        </ul>
    `;

    if (order.image) {
        printContent += `
            <div>
                <strong>Order Image:</strong>
                <br>
                <img src="${order.image}" alt="Order Image" style="height: 150px; width: 150px; border-radius: 10px;">
            </div>
        `;
    } else {
        printContent += '<p><strong>Order Image:</strong> No Image Available</p>';
    }

    // Open a new window and print the content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Order Details</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; }
                    h2 { text-align: center; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin-bottom: 10px; }
                    img { display: block; margin-top: 10px; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    deselectAllCheckboxes();
}

function deselectAllCheckboxes() {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function toggleSelectAll(source) {
    const checkboxes = document.querySelectorAll('.fl-table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked; // Set each checkbox's state to match the header checkbox
    });
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

function navigateToKeyUsers(url, event) {
    // Remove the active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the clicked nav item
    event.currentTarget.classList.add('active');

    // Navigate to the specified URL
    window.location.href = "Keyusers List.html";
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