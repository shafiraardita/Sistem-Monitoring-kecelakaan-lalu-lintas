// Simulasi login dengan form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = [
            { 
                username: 'pimpinan', 
                password: '123', 
                role: 'user', 
                name: 'Pengguna Biasa', 
                email: 'user@example.com', 
                nik: '1234567890123456', 
                phone: '+62 823 4567 8901', 
                position: 'Jl. Contoh No. 123, Bogor' 
            },
            { 
                username: 'admin', 
                password: 'admin123', 
                role: 'admin', 
                name: 'Admin Sistem', 
                email: 'admin@example.com', 
                nik: '9876543210987654', 
                position: 'Administrator', 
                phone: '+62 812 3456 7890' 
            }
        ];

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Masuk Berhasil! Selamat Datang, ' + user.username);
            window.location.href = user.role === 'admin' ? 'admin.html' : 'pimpinan.html';
        } else {
            alert('Nama Pengguna atau Kata Sandi Salah.');
        }
    });
}

// Simulasi login dengan Google
function simulateGoogleLogin() {
    const mockUser = { 
        username: 'GoogleUser', 
        password: 'google123', 
        role: 'user', 
        name: 'Google User', 
        email: 'googleuser@example.com', 
        nik: '1112223334445556', 
        phone: '+62 811 222 3333', 
        position: 'Jl. Google No. 456, Bogor' 
    };
    currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('Masuk Menggunakan Google, Akan dialihkan ke dashboard...');
    alert('Masuk Berhasil! Selamat Datang, ' + mockUser.username);
    window.location.href = 'pimpinan.html';
}