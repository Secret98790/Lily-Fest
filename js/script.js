let daftarPendaftar =
    JSON.parse(localStorage.getItem("daftarPendaftar")) || [];

const form = document.getElementById("formDaftar");

if (form) {

    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const kelas = document.getElementById("kelas");
    const jurusan = document.getElementById("jurusan");
    const kegiatan = document.getElementById("kegiatan");
    const setuju = document.getElementById("setuju");
    const btnDaftar = document.getElementById("btnDaftar");

    const hasil = document.getElementById("hasil");

    const errorNama = document.getElementById("errorNama");
    const errorEmail = document.getElementById("errorEmail");
    const errorSetuju = document.getElementById("errorSetuju");


    function cekIsiForm() {

        let namaAda = nama.value.trim() != "";
        let emailAda = email.value.trim() != "";
        let sudahSetuju = setuju.checked;

        if (namaAda && emailAda && sudahSetuju) {
            btnDaftar.disabled = false;
        } else {
            btnDaftar.disabled = true;
        }
    }


    nama.oninput = function () {

        errorNama.textContent = "";
        nama.classList.remove("input-error");

        cekIsiForm();
    };


    email.oninput = function () {

        errorEmail.textContent = "";
        email.classList.remove("input-error");

        cekIsiForm();
    };


    setuju.onchange = function () {

        if (setuju.checked) {
            errorSetuju.textContent = "";
        }

        cekIsiForm();
    };


    cekIsiForm();


    form.onsubmit = function (e) {

        e.preventDefault();

        let valid = true;


        let namaSiswa = nama.value.trim();

        if (namaSiswa == "") {

            errorNama.textContent = "Nama belum diisi.";
            nama.classList.add("input-error");

            valid = false;

        } else {

            let panjangNama = namaSiswa.length;

            if (panjangNama < 3) {

                errorNama.textContent =
                    "Nama minimal 3 karakter.";

                nama.classList.add("input-error");

                valid = false;
            }
        }


        let alamatEmail = email.value.trim();
        let posisiAt = alamatEmail.indexOf("@");

        if (alamatEmail == "") {

            errorEmail.textContent =
                "Email belum diisi.";

            email.classList.add("input-error");

            valid = false;

        } else if (posisiAt < 1) {

            errorEmail.textContent =
                'Email harus mengandung karakter "@".';

            email.classList.add("input-error");

            valid = false;
        }


        if (setuju.checked == false) {

            errorSetuju.textContent =
                "Kamu harus menyetujui Syarat & Ketentuan.";

            valid = false;
        }


        if (valid == false) {
            return;
        }


        let pesertaBaru = {

            id: Date.now(),

            nama: namaSiswa,

            email: alamatEmail,

            kelas: kelas.value,

            jurusan: jurusan.value,

            kegiatan: kegiatan.value.trim(),

            status: "pending"
        };


        daftarPendaftar.push(pesertaBaru);

        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );


        hasil.innerHTML =
            "Pendaftaran berhasil!<br>" +
            "Nama: " + pesertaBaru.nama + "<br>" +
            "Kelas: " + pesertaBaru.kelas + "<br>" +
            "Jurusan: " + pesertaBaru.jurusan + "<br>" +
            "Kegiatan: " + pesertaBaru.kegiatan;

        hasil.className = "success";


        form.reset();

        btnDaftar.disabled = true;
    };
}


const tabel = document.getElementById("tabel-peserta");
const tbody = document.getElementById("tbody-peserta");
const pesanKosong = document.getElementById("pesanKosong");


if (tbody) {

    function tampilkanData() {

        tbody.innerHTML = "";


        if (daftarPendaftar.length == 0) {

            tabel.style.display = "none";
            pesanKosong.style.display = "block";

            return;
        }


        tabel.style.display = "table";
        pesanKosong.style.display = "none";


        for (let i = 0; i < daftarPendaftar.length; i++) {

            let peserta = daftarPendaftar[i];

            let baris = document.createElement("tr");


            baris.innerHTML =
                "<td>" + peserta.nama + "</td>" +
                "<td>" + peserta.email + "</td>" +
                "<td>" + peserta.kelas + "</td>" +
                "<td>" + peserta.jurusan + "</td>" +
                "<td>" + peserta.kegiatan + "</td>" +
                "<td>" + peserta.status + "</td>" +
                "<td>" +

                "<button class='edit' data-id='" +
                peserta.id +
                "'>Edit</button> " +

                "<button class='hapus' data-id='" +
                peserta.id +
                "'>Hapus</button>" +

                "</td>";


            tbody.appendChild(baris);


            baris.querySelector(".edit").onclick =
                function () {

                    bukaEdit(
                        Number(this.dataset.id)
                    );

                };


            baris.querySelector(".hapus").onclick =
                function () {

                    hapusData(
                        Number(this.dataset.id)
                    );

                };
        }
    }

    const formEdit = document.getElementById("formEdit");

    const editNama = document.getElementById("editNama");
    const editEmail = document.getElementById("editEmail");
    const editKelas = document.getElementById("editKelas");
    const editJurusan = document.getElementById("editJurusan");
    const editKegiatan = document.getElementById("editKegiatan");
    const editStatus = document.getElementById("editStatus");

    const btnSimpanEdit =
        document.getElementById("btnSimpanEdit");

    const btnBatalEdit =
        document.getElementById("btnBatalEdit");


    let idEdit = 0;


    function bukaEdit(id) {

        idEdit = id;


        for (let i = 0; i < daftarPendaftar.length; i++) {

            if (daftarPendaftar[i].id == id) {

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


                formEdit.style.display = "block";

                break;
            }
        }
    }


    btnSimpanEdit.onclick = function () {

        for (let i = 0; i < daftarPendaftar.length; i++) {

            if (daftarPendaftar[i].id == idEdit) {

                daftarPendaftar[i].nama =
                    editNama.value.trim();

                daftarPendaftar[i].email =
                    editEmail.value.trim();

                daftarPendaftar[i].kelas =
                    editKelas.value;

                daftarPendaftar[i].jurusan =
                    editJurusan.value;

                daftarPendaftar[i].kegiatan =
                    editKegiatan.value.trim();

                daftarPendaftar[i].status =
                    editStatus.value;

                break;
            }
        }


        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );


        formEdit.style.display = "none";

        idEdit = 0;

        tampilkanData();
    };


    btnBatalEdit.onclick = function () {

        formEdit.style.display = "none";

        idEdit = 0;
    };

    function hapusData(id) {

        let yakin =
            confirm("Yakin ingin menghapus peserta ini?");


        if (yakin == false) {
            return;
        }


        for (let i = 0; i < daftarPendaftar.length; i++) {

            if (daftarPendaftar[i].id == id) {

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


    tampilkanData();
}