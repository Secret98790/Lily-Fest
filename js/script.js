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
        cekForm();
    });

    setuju.addEventListener('change', function () {
        if (setuju.checked) {
            errorSetuju.textContent = '';
        }

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
            errorEmail.textContent = 'Email harus mengandung karakter "@".';
            email.classList.add('input-error');
            valid = false;
        } else if (!email.value.includes('@')) {
            errorEmail.textContent = 'Email harus mengandung karakter "@".';
            email.classList.add('input-error');
            valid = false;
        }

        if (!setuju.checked) {
            errorSetuju.textContent =
                'Kamu harus menyetujui syarat & ketentuan.';
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

            if (
                daftarPendaftar[i].nama === dataSiswa.nama &&
                daftarPendaftar[i].email === dataSiswa.email
            ) {
                index = i;
                break;
            }
        }

        if (index !== -1) {

            // Pakai ID lama
            dataSiswa.id = daftarPendaftar[index].id;

            // Ganti data lama
            daftarPendaftar[index] = dataSiswa;

        } else {

            // Tambahkan peserta baru
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

    const formEdit = document.getElementById('formEdit');
    const editNama = document.getElementById('editNama');
    const editEmail = document.getElementById('editEmail');
    const editKelas = document.getElementById('editKelas');
    const editJurusan = document.getElementById('editJurusan');
    const editKegiatan = document.getElementById('editKegiatan');
    const editStatus = document.getElementById('editStatus');

    const btnSimpanEdit =
        document.getElementById('btnSimpanEdit');

    const btnBatalEdit =
        document.getElementById('btnBatalEdit');

    let editId = null;


    function tampilkanData() {

        tbodyPeserta.innerHTML = '';

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
                        '<button class="icon-btn edit" data-id="' +
                        data.id +
                        '">Edit</button>' +

                        '<button class="icon-btn hapus" data-id="' +
                        data.id +
                        '">Hapus</button>' +
                    '</td>';

                tbodyPeserta.appendChild(baris);


                let tombolEdit =
                    baris.querySelector('.edit');

                let tombolHapus =
    baris.querySelector('.hapus');

tombolHapus.addEventListener('click', function () {

    let id = Number(this.getAttribute('data-id'));

    let yakin = confirm('Yakin ingin menghapus data ini?');

    if (yakin) {

        for (let i = 0;
            i < daftarPendaftar.length;
            i++) {

            if (daftarPendaftar[i].id === id) {

                daftarPendaftar.splice(i, 1);

                break;
            }
        }

        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );

        tampilkanData();
    }
});

                tombolEdit.addEventListener('click', function () {

                    editId =
                        Number(this.getAttribute('data-id'));

                    for (let i = 0;
                        i < daftarPendaftar.length;
                        i++) {

                        if (daftarPendaftar[i].id === editId) {

                            editNama.value =
                                daftarPendaftar[i].nama;

                            editEmail.value =
                                daftarPendaftar[i].email;

                            editKelas.value =
                                daftarPendaftar[i].kelas;

                            editJurusan.value =
                                daftarPendaftar[i].jurusan;

                            editKegiatan.value =
                                daftarPendaftar[i].kegiatan;

                            editStatus.value =
                                daftarPendaftar[i].status;

                            formEdit.style.display = 'block';

                            break;
                        }
                    }
                });
            }
        }
    }

    btnSimpanEdit.addEventListener('click', function () {

        for (let i = 0;
            i < daftarPendaftar.length;
            i++) {

            if (daftarPendaftar[i].id === editId) {

                daftarPendaftar[i].nama =
                    editNama.value;

                daftarPendaftar[i].email =
                    editEmail.value;

                daftarPendaftar[i].kelas =
                    editKelas.value;

                daftarPendaftar[i].jurusan =
                    editJurusan.value;

                daftarPendaftar[i].kegiatan =
                    editKegiatan.value;

                daftarPendaftar[i].status =
                    editStatus.value;

                break;
            }
        }

        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );

        formEdit.style.display = 'none';

        editId = null;

        tampilkanData();
    });


    btnBatalEdit.addEventListener('click', function () {

        formEdit.style.display = 'none';

        editId = null;
    });

    tampilkanData();
}