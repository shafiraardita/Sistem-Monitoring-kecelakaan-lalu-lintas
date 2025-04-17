// Inisialisasi dashboard untuk admin
document.addEventListener('DOMContentLoaded', function() {
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('username-display').textContent = 'Pengguna: ' + currentUser.username;
    renderSidebar('admin');
    showTab('home');
    initChart();
});

// Fungsi untuk menampilkan tab
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.tabs span').forEach(tab => {
        tab.classList.remove('active-tab');
    });

    const tabContent = document.getElementById(tabName + '-content');
    if (tabContent) {
        tabContent.style.display = 'block';
    }
    const tabLink = document.querySelector(`a[onclick="showTab('${tabName}')"]`);
    if (tabLink) {
        tabLink.classList.add('active');
    }

    if (tabName === 'monitoring') {
        updateChart();
    }
}
// Fungsi untuk menangani penambahan laporan baru
function addNewReport(event) {
    event.preventDefault();
    const nik = document.getElementById('newNik').value;
    const name = document.getElementById('newName').value;
    const address = document.getElementById('newAddress').value;
    const photo = document.getElementById('newPhoto').value || 'https://via.placeholder.com/300x200?text=Foto+Korban';
    const date = document.getElementById('newDate').value;

    // Validasi input
    if (!nik || !name || !address || !date) {
        alert('Semua kolom wajib diisi kecuali foto!');
        return;
    }

    // Ambil data reports dari localStorage
    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    // Buat ID baru (increment dari ID terakhir)
    const newId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;

    // Tambahkan laporan baru
    const newReport = {
        id: newId,
        nik: nik,
        name: name,
        address: address,
        photo: photo,
        officer: '',
        date: date,
        starred: false
    };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));

    // Reset form
    document.getElementById('addReportForm').reset();

    // Perbarui daftar laporan
    renderInbox();

    alert('Laporan berhasil ditambahkan!');
}

// Event listener untuk form tambah laporan
const addReportForm = document.getElementById('addReportForm');
if (addReportForm) {
    addReportForm.addEventListener('submit', addNewReport);
}