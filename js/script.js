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

setuju.addEventListener('change', function () {
    btnDaftar.disabled = !setuju.checked;
});

nama.addEventListener('input', function () {
    errorNama.textContent = '';
    nama.classList.remove('input-error');
});

email.addEventListener('input', function () {
    errorEmail.textContent = '';
    email.classList.remove('input-error');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    errorNama.textContent = '';
    errorEmail.textContent = '';
    errorSetuju.textContent = '';
    nama.classList.remove('input-error');
    email.classList.remove('input-error');

    if (nama.value.trim().length < 3) {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        nama.classList.add('input-error');
        valid = false;
    }

    if (email.value.indexOf('@') === -1) {
        errorEmail.textContent = 'Email harus mengandung karakter "@".';
        email.classList.add('input-error');
        valid = false;
    }

    if (setuju.checked === false) {
        errorSetuju.textContent = 'Kamu harus menyetujui syarat & ketentuan.';
        valid = false;
    }

    if (valid === false) {
        return;
    }

    hasil.innerHTML = 'Pendaftaran berhasil!<br>' +
        'Nama: ' + nama.value + '<br>' +
        'Kelas: ' + kelas.value + '<br>' +
        'Jurusan: ' + jurusan.value + '<br>' +
        'Kegiatan: ' + kegiatan.value;
    hasil.className = 'success';

    localStorage.setItem("nama_siswa", nama.value)


    form.reset();
    btnDaftar.disabled = true;
});

console.log(localStorage.getItem("nama_siswa"))