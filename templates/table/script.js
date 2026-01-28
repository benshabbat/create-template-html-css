let currentPage = 1;
const rowsPerPage = 6;
let allRows = [];
let filteredRows = [];

// Initialize table
document.addEventListener('DOMContentLoaded', function() {
    allRows = Array.from(document.querySelectorAll('#tableBody tr'));
    filteredRows = [...allRows];
    
    // Add event listeners
    document.getElementById('searchInput').addEventListener('keyup', filterTable);
    document.getElementById('filterSelect').addEventListener('change', filterTable);
    
    displayTable();
});

// Filter and search table
function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterSelect = document.getElementById('filterSelect').value;
    
    filteredRows = allRows.filter(row => {
        const text = row.textContent.toLowerCase();
        const status = row.querySelector('.status-badge');
        const statusValue = status ? status.textContent.trim().toLowerCase() : '';
        
        // Search filter
        const matchesSearch = searchInput === '' || text.includes(searchInput);
        
        // Status filter
        const matchesStatus = filterSelect === '' || statusValue === filterSelect;
        
        return matchesSearch && matchesStatus;
    });
    
    currentPage = 1;
    displayTable();
}

// Display table with pagination
function displayTable() {
    const tableBody = document.getElementById('tableBody');
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    // Hide all rows
    allRows.forEach(row => row.classList.add('hidden'));
    
    // Show filtered rows
    const visibleRows = filteredRows.slice(start, end);
    visibleRows.forEach(row => row.classList.remove('hidden'));
    
    // Update footer
    updateFooter();
}

// Update table footer
function updateFooter() {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, filteredRows.length);
    
    document.getElementById('rowCount').textContent = 
        `Showing ${filteredRows.length === 0 ? 0 : startRow} to ${endRow} of ${filteredRows.length} rows`;
    
    document.getElementById('pageInfo').textContent = 
        `Page ${filteredRows.length === 0 ? 0 : currentPage} of ${totalPages || 1}`;
    
    // Disable/enable pagination buttons
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.disabled = filteredRows.length === 0;
    });
    
    if (btn.textContent.includes('Previous')) {
        btn.disabled = currentPage === 1 || filteredRows.length === 0;
    }
    if (btn.textContent.includes('Next')) {
        btn.disabled = currentPage >= totalPages || filteredRows.length === 0;
    }
}

// Navigation
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Button actions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.closest('tr');
        const id = row.cells[0].textContent;
        alert(`Edit row: ${id}`);
    }
    
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.closest('tr');
        const id = row.cells[0].textContent;
        if (confirm(`Delete row: ${id}?`)) {
            // Remove from allRows
            const index = allRows.indexOf(row);
            if (index > -1) {
                allRows.splice(index, 1);
            }
            // Re-filter
            filterTable();
            alert('Row deleted successfully!');
        }
    }
});
