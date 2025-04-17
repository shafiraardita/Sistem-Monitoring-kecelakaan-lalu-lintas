let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let myChart;

// Data kecelakaan per bulan dan tahun
const accidentDataByMonth = {
    '2023': {
        'Januari': { total: 7, meninggal: 6, lukaBerat: 1, lukaRingan: 5 },
        'Februari': { total: 16, meninggal: 6, lukaBerat: 9, lukaRingan: 7 },
        'Maret': { total: 10, meninggal: 5, lukaBerat: 0, lukaRingan: 10 },
        'April': { total: 9, meninggal: 3, lukaBerat: 1, lukaRingan: 6 },
        'Mei': { total: 14, meninggal: 6, lukaBerat: 8, lukaRingan: 9 },
        'Juni': { total: 10, meninggal: 2, lukaBerat: 7, lukaRingan: 6 },
        'Juli': { total: 10, meninggal: 8, lukaBerat: 0, lukaRingan: 8 },
        'Agustus': { total: 9, meninggal: 4, lukaBerat: 4, lukaRingan: 9 },
        'September': { total: 6, meninggal: 3, lukaBerat: 1, lukaRingan: 3 },
        'Oktober': { total: 14, meninggal: 5, lukaBerat: 7, lukaRingan: 14 },
        'November': { total: 6, meninggal: 2, lukaBerat: 1, lukaRingan: 7 },
        'Desember': { total: 8, meninggal: 2, lukaBerat: 5, lukaRingan: 4 }
    },
    '2024': {
        'Januari': { total: 8, meninggal: 5, lukaBerat: 1, lukaRingan: 6 },
        'Februari': { total: 6, meninggal: 3, lukaBerat: 0, lukaRingan: 8 },
        'Maret': { total: 5, meninggal: 3, lukaBerat: 0, lukaRingan: 2 },
        'April': { total: 12, meninggal: 2, lukaBerat: 6, lukaRingan: 16 },
        'Mei': { total: 11, meninggal: 4, lukaBerat: 4, lukaRingan: 9 },
        'Juni': { total: 14, meninggal: 4, lukaBerat: 5, lukaRingan: 12 },
        'Juli': { total: 11, meninggal: 4, lukaBerat: 7, lukaRingan: 12 },
        'Agustus': { total: 12, meninggal: 3, lukaBerat: 7, lukaRingan: 11 },
        'September': { total: 8, meninggal: 2, lukaBerat: 3, lukaRingan: 8 },
        'Oktober': { total: 14, meninggal: 3, lukaBerat: 3, lukaRingan: 12 },
        'November': { total: 16, meninggal: 7, lukaBerat: 7, lukaRingan: 17 },
        'Desember': { total: 9, meninggal: 2, lukaBerat: 5, lukaRingan: 7 }
    }
};

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// Inisialisasi Chart.js
function initChart() {
    const canvas = document.getElementById('myChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Jumlah Kecelakaan',
                        data: Array(12).fill(0),
                        backgroundColor: '#375B85',
                        borderWidth: 1
                    },
                    {
                        label: 'Meninggal Dunia',
                        data: Array(12).fill(0),
                        backgroundColor: '#F96D62',
                        borderWidth: 1
                    },
                    {
                        label: 'Luka Berat',
                        data: Array(12).fill(0),
                        backgroundColor: '#FFDD71',
                        borderWidth: 1
                    },
                    {
                        label: 'Luka Ringan',
                        data: Array(12).fill(0),
                        backgroundColor: '#DFEDFF',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah',
                            color: '#000'
                        },
                        ticks: {
                            color: '#f9fcff'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Bulan',
                            color: '#000'
                        },
                        ticks: {
                            color: '#000'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#000'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Data Kecelakaan 2023-2024',
                        color: '#000',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
}

// Fungsi untuk memperbarui grafik
function updateChart() {
    if (!myChart) return;
    const month = document.getElementById('monthFilter')?.value || 'all';
    const year = document.getElementById('yearFilter')?.value || 'all';

    myChart.data.datasets.forEach(dataset => {
        dataset.data = Array(12).fill(0);
    });

    if (month !== 'all' && year !== 'all' && accidentDataByMonth[year] && accidentDataByMonth[year][month]) {
        const selectedData = accidentDataByMonth[year][month];
        const monthIndex = months.indexOf(month);
        myChart.data.datasets[0].data[monthIndex] = selectedData.total;
        myChart.data.datasets[1].data[monthIndex] = selectedData.meninggal;
        myChart.data.datasets[2].data[monthIndex] = selectedData.lukaBerat;
        myChart.data.datasets[3].data[monthIndex] = selectedData.lukaRingan;
    } else if (month === 'all' && year !== 'all' && accidentDataByMonth[year]) {
        months.forEach((month, index) => {
            const monthData = accidentDataByMonth[year][month];
            myChart.data.datasets[0].data[index] = monthData.total;
            myChart.data.datasets[1].data[index] = monthData.meninggal;
            myChart.data.datasets[2].data[index] = monthData.lukaBerat;
            myChart.data.datasets[3].data[index] = monthData.lukaRingan;
        });
    } else if (month === 'all' && year === 'all') {
        const years = Object.keys(accidentDataByMonth);
        months.forEach((month, index) => {
            let total = 0, meninggal = 0, lukaBerat = 0, lukaRingan = 0;
            years.forEach(year => {
                const monthData = accidentDataByMonth[year][month];
                total += monthData.total;
                meninggal += monthData.meninggal;
                lukaBerat += monthData.lukaBerat;
                lukaRingan += monthData.lukaRingan;
            });
            myChart.data.datasets[0].data[index] = total / years.length;
            myChart.data.datasets[1].data[index] = meninggal / years.length;
            myChart.data.datasets[2].data[index] = lukaBerat / years.length;
            myChart.data.datasets[3].data[index] = lukaRingan / years.length;
        });
    }

    myChart.options.plugins.title.text = `Data Kecelakaan ${month !== 'all' ? month : 'Semua Bulan'} ${year !== 'all' ? year : '2023-2024'}`;
    myChart.update();
}

// Fungsi untuk menampilkan sidebar berdasarkan role
function renderSidebar(role) {
    const sidebarMenu = document.getElementById('sidebarMenu');
    if (!sidebarMenu) return;

    sidebarMenu.innerHTML = '';
    const profileUsername = document.getElementById('profile-username');
    if (profileUsername) {
        profileUsername.textContent = currentUser ? currentUser.username : 'Guest';
    }

    const allTabs = [
        { name: 'Home', id: 'home', visible: true },
        { name: 'Monitoring', id: 'monitoring', visible: true },
        { name: 'Titik Wilayah', id: 'titikwilayah', visible: role === 'admin' },
        { name: 'Evaluasi', id: 'evaluasi', visible: true },
        { name: 'Laporan', id: 'laporan', visible: true },
        { name: 'Kontak', id: 'kontak', visible: role === 'admin' }
    ];

    allTabs.forEach(tab => {
        if (tab.visible) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = tab.name;
            a.onclick = () => showTab(tab.id);
            if (tab.id === 'home') {
                a.classList.add('active');
            }
            li.appendChild(a);
            sidebarMenu.appendChild(li);
        }
    });
}

// Fungsi untuk logout
function logout() {
    const confirmLogout = confirm('Apakah Anda yakin ingin logout?');
    if (confirmLogout) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    } else {
        alert('Logout dibatalkan. Anda tetap berada di dashboard.');
    }
}

// Fungsi untuk menampilkan modal profil
function showProfileModal() {
    const modal = document.getElementById('profileModal');
    const formContent = document.getElementById('profileFormContent');
    if (!modal || !formContent) return;

    formContent.innerHTML = '';

    if (currentUser && currentUser.role === 'user') {
        formContent.innerHTML = `
            <div class="form-group">
                <label for="profileUsername">Username:</label>
                <input type="text" id="profileUsername" name="username" value="${currentUser.username || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileName">Nama:</label>
                <input type="text" id="profileName" name="name" value="${currentUser.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="profilePhone">Nomor Telepon:</label>
                <input type="tel" id="profilePhone" name="phone" value="${currentUser.phone || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileEmail">Email:</label>
                <input type="email" id="profileEmail" name="email" value="${currentUser.email || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileNik">NIK:</label>
                <input type="text" id="profileNik" name="nik" value="${currentUser.nik || ''}" required>
            </div>
            <div class="form-group">
                <label for="profilePosition">Alamat:</label>
                <input type="text" id="profilePosition" name="position" value="${currentUser.position || ''}" required>
            </div>
        `;
    } else if (currentUser && currentUser.role === 'admin') {
        formContent.innerHTML = `
            <div class="form-group">
                <label for="profileUsername">Username:</label>
                <input type="text" id="profileUsername" name="username" value="${currentUser.username || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileName">Nama:</label>
                <input type="text" id="profileName" name="name" value="${currentUser.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileEmail">Email:</label>
                <input type="email" id="profileEmail" name="email" value="${currentUser.email || ''}" required>
            </div>
            <div class="form-group">
                <label for="profileNik">NIK:</label>
                <input type="text" id="profileNik" name="nik" value="${currentUser.nik || ''}" required>
            </div>
            <div class="form-group">
                <label for="profilePosition">Jabatan:</label>
                <input type="text" id="profilePosition" name="position" value="${currentUser.position || ''}" required>
            </div>
            <div class="form-group">
                <label for="profilePhone">Nomor Telepon:</label>
                <input type="tel" id="profilePhone" name="phone" value="${currentUser.phone || ''}" required>
            </div>
        `;
    }

    modal.style.display = 'block';
}

// Fungsi untuk menutup modal profil
function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Simpan perubahan profil
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('profileUsername').value;
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const nik = document.getElementById('profileNik').value;
        const position = document.getElementById('profilePosition').value;
        const phone = document.getElementById('profilePhone').value;

        if (currentUser) {
            currentUser.username = username;
            currentUser.name = name;
            currentUser.email = email;
            currentUser.nik = nik;
            currentUser.position = position;
            currentUser.phone = phone;

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            document.getElementById('username-display').textContent = 'Pengguna: ' + currentUser.username;
            renderSidebar(currentUser.role);

            alert('Profil berhasil diperbarui!');
            closeProfileModal();
        }
    });
}