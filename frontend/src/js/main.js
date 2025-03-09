document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const API_URL = 'http://localhost:8000/api';
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const connectionStatus = document.getElementById('connection-status');
    const alertContainer = document.getElementById('alert-container');
    
    // Check API connection
    checkConnection();
    
    // Initial users load
    fetchUsers();
    
    // Form validation and submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset validation state
        resetValidation();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Submit the form
        submitUser(username, email);
    });
    
    // Form input validation
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
    
    // Validate a specific input
    function validateInput(input) {
        const isValid = input.checkValidity();
        
        if (!isValid) {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Reset all validation state
    function resetValidation() {
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid');
        });
    }
    
    // Validate the entire form
    function validateForm() {
        let isValid = true;
        
        document.querySelectorAll('.form-control').forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Check API connection
    function checkConnection() {
        fetch(`${API_URL}/health`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API is unreachable');
                }
                return response.json();
            })
            .then(data => {
                connectionStatus.textContent = 'Connected';
                connectionStatus.style.color = '#4cc9f0';
            })
            .catch(error => {
                connectionStatus.textContent = 'Disconnected';
                connectionStatus.style.color = '#f72585';
                showAlert('Unable to connect to the API. Please check if the backend is running.', 'danger');
            });
    }
    
    // Fetch users from API
    function fetchUsers() {
        userList.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading users...</p>
            </div>
        `;
        
        fetch(`${API_URL}/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                displayUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                userList.innerHTML = `
                    <div class="alert alert-danger">
                        Failed to load users. Please try again later.
                    </div>
                `;
            });
    }
    
    // Submit user to API
    function submitUser(username, email) {
        // Disable submit button during request
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
        
        fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.detail || 'Failed to create user');
                });
            }
            return response.json();
        })
        .then(data => {
            // Clear form
            userForm.reset();
            
            // Show success message
            showAlert(`User ${data.username} created successfully!`, 'success');
            
            // Refresh user list
            fetchUsers();
        })
        .catch(error => {
            console.error('Error submitting user:', error);
            showAlert(error.message, 'danger');
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Register User';
        });
    }
    
    // Display users in the UI
    function displayUsers(users) {
        if (users.length === 0) {
            userList.innerHTML = `
                <div class="alert">
                    No users found. Register a new user to get started.
                </div>
            `;
            return;
        }
        
        let html = '<ul class="user-list">';
        users.forEach(user => {
            html += `
                <li class="user-item">
                    <div>
                        <span class="user-name">${user.username}</span>
                        <div class="user-email">${user.email}</div>
                    </div>
                    <div>
                        <span class="user-date">${formatDate(new Date(user.created_at))}</span>
                    </div>
                </li>
            `;
        });
        html += '</ul>';
        
        userList.innerHTML = html;
    }
    
    // Show alert message
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alert);
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    // Format date to readable string
    function formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
});