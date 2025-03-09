document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    
    // Fetch users when page loads
    fetchUsers();
    
    // Handle form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        
        // Validate input
        if (!username || !email) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Submit the form
        submitUser(username, email);
    });
    
    // Fetch users from API
    function fetchUsers() {
        fetch('http://localhost:8000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                userList.innerHTML = '<p>Error loading users. Please try again later.</p>';
            });
    }
    
    // Submit user to API
    function submitUser(username, email) {
        fetch('http://localhost:8000/users', {
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
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear form
            userForm.reset();
            
            // Refresh user list
            fetchUsers();
        })
        .catch(error => {
            console.error('Error submitting user:', error);
            alert('Error submitting user. Please try again.');
        });
    }
    
    // Display users in the UI
    function displayUsers(users) {
        if (users.length === 0) {
            userList.innerHTML = '<p>No users found.</p>';
            return;
        }
        
        let html = '<ul>';
        users.forEach(user => {
            html += `<li>
                <strong>${user.username}</strong> - ${user.email}
            </li>`;
        });
        html += '</ul>';
        
        userList.innerHTML = html;
    }
    
    // Validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});