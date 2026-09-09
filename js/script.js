let daftarPendaftar = JSON.parse(localStorage.getItem("daftarPendaftar")) || [];

const form = document.getElementById('formDaftar');
const nama = document.getElementById('nama');
const email = document.getElementById('email');
const kelas = document.getElementById('kelas');
const jurusan = document.getElementById('jurusan');
const kegiatan = document.getElementById('kegiatan');
const setuju = document.getElementById('setuju');
const btnDaftar = document.getElementById('btnDaftar');
const hasil = document.getElementById('hasil');

const errorNama = document.getElementById('errorNama');
const errorEmail = document.getElementById('errorEmail');
const errorSetuju = document.getElementById('errorSetuju');

if (form) {
function cekForm() {
    if (
        nama.value.trim() !== "" &&
        email.value.trim() !== "" &&
        setuju.checked
    ) {
        btnDaftar.disabled = false;
    } else {
        btnDaftar.disabled = true;
    }
}

nama.addEventListener('input', function () {
    errorNama.textContent = '';
    nama.classList.remove('input-error');
    cekForm();
});

email.addEventListener('input', function () {
    errorEmail.textContent = '';
    email.classList.remove('input-error');

    setuju.addEventListener('change', function () {
        btnDaftar.disabled = !setuju.checked;
    
        if (setuju.checked) {
            errorSetuju.textContent = '';
        }
    });

    cekForm();
});

cekForm();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    errorNama.textContent = '';
    errorEmail.textContent = '';
    errorSetuju.textContent = '';

    nama.classList.remove('input-error');
    email.classList.remove('input-error');

    if (nama.value.trim() === '') {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        nama.classList.add('input-error');
        valid = false;
    } else if (nama.value.trim().length < 3) {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        nama.classList.add('input-error');
        valid = false;
    }

    if (email.value.trim() === '') {
        errorEmail.textContent = 'Email harus mengandung karakter "@" .';
        email.classList.add('input-error');
        valid = false;
    } else if (!email.value.includes('@')) {
        errorEmail.textContent = 'Email harus mengandung karakter "@".';
        email.classList.add('input-error');
        valid = false;
    }

    if (!setuju.checked) {
        errorSetuju.textContent = 'Kamu harus menyetujui syarat & ketentuan.';
        valid = false;
    }

    if (!valid) {
        return;
    }

    let dataSiswa = {
        id: Date.now(),
        nama: nama.value,
        email: email.value,
        kelas: kelas.value,
        jurusan: jurusan.value,
        kegiatan: kegiatan.value,
        status: "pending"
    };

    let index = -1;

for (let i = 0; i < daftarPendaftar.length; i++) {
    if (daftarPendaftar[i].nama === dataSiswa.nama &&
        daftarPendaftar[i].email === dataSiswa.email) {
        index = i;
        break;
    }
}

if (index !== -1) {
    dataSiswa.id = daftarPendaftar[index].id;
    daftarPendaftar[index] = dataSiswa;
} else {
    daftarPendaftar.push(dataSiswa);
}

    localStorage.setItem(
        "daftarPendaftar",
        JSON.stringify(daftarPendaftar)
    );

    hasil.innerHTML =
        'Pendaftaran berhasil!<br>' +
        'Nama: ' + nama.value + '<br>' +
        'Kelas: ' + kelas.value + '<br>' +
        'Jurusan: ' + jurusan.value + '<br>' +
        'Kegiatan: ' + kegiatan.value;

    hasil.className = 'success';

    form.reset();
    btnDaftar.disabled = true;
});

}
const tabelPeserta = document.getElementById('tabel-peserta');
const tbodyPeserta = document.getElementById('tbody-peserta');
const pesanKosong = document.getElementById('pesanKosong');

if (tbodyPeserta) {

    if (daftarPendaftar.length === 0) {

        pesanKosong.style.display = 'block';
        tabelPeserta.style.display = 'none';

    } else {

        pesanKosong.style.display = 'none';
        tabelPeserta.style.display = 'table';

        for (let i = 0; i < daftarPendaftar.length; i++) {

            let data = daftarPendaftar[i];

            let baris = document.createElement('tr');

            baris.innerHTML =
                '<td>' + data.nama + '</td>' +
                '<td>' + data.email + '</td>' +
                '<td>' + data.kelas + '</td>' +
                '<td>' + data.jurusan + '</td>' +
                '<td>' + data.kegiatan + '</td>' +
                '<td>' + data.status + '</td>' +
                '<td>' +
                    '<button class="icon-btn edit">Edit</button>' +
                    '<button class="icon-btn hapus">Hapus</button>' +
                '</td>';

            tbodyPeserta.appendChild(baris);
        }
    }
}