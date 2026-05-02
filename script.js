const form = document.getElementById("formMahasiswa");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search-mhs");
const STORAGE_KEY = "data_mhs";

loadData();

function saveToLocal(){
    // Simpan isi tabel ke localStorage (biar data tidak hilang saat refresh)
    localStorage.setItem(STORAGE_KEY, tableBody.innerHTML);
}

function loadData(){
    // Ambil data dari localStorage lalu tampilkan kembali ke tabel
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) tableBody.innerHTML = saved;
}

// Search berdasarkan NIM dan Nama
searchInput.addEventListener("input", function() {
    const filter = searchInput.value.toLowerCase(); // input user
    const rows = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const nimCell = rows[i].getElementsByTagName("td")[0];
        const namaCell = rows[i].getElementsByTagName("td")[1];

        if (nimCell && namaCell) {
            const nimText = nimCell.textContent || nimCell.innerText;
            const namaText = namaCell.textContent || namaCell.innerText;

            // tampil jika cocok dengan NIM atau Nama
            if (nimText.toLowerCase().indexOf(filter) > -1 || 
                namaText.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
});

function toggleView(btn) {
    const container = btn.parentElement;
    const textSpan = container.querySelector('.pw-text');
    const isOpened = textSpan.getAttribute('data-opened') === 'true';
    const originalPw = textSpan.getAttribute('data-pw');

    // Toggle tampil/sembunyi password di tabel
    if (isOpened) {
        textSpan.innerText = "••••••••";
        textSpan.setAttribute('data-opened', 'false');
        btn.innerHTML = `<img src="eye.png" width="20">`;
    } else {
        textSpan.innerText = originalPw;
        textSpan.setAttribute('data-opened', 'true');
        btn.innerHTML = `<img src="hide.png" width="20">`;
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault(); // mencegah reload halaman

    // Ambil input user
    const nim = document.getElementById("nim").value;
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const jk = document.querySelector('input[name="jk"]:checked')?.value || "-";
    const tl = document.getElementById("tl").value;
    const password = document.getElementById("password").value;

    const row = document.createElement("tr");

    // Membuat baris tabel secara dinamis
    row.innerHTML = `
        <td>${nim}</td>
        <td>${nama}</td>
        <td>${alamat}</td>
        <td>${jk}</td>
        <td>${tl}</td>
        <td>
            <div class="pw-container">
                <span class="pw-text" data-opened="false" data-pw="${password}">••••••••</span>
                <button type="button" class="view-btn" onclick="toggleView(this)"><img src="eye.png" width="20"></button>
            </div>
        </td>
        <td>
            <button class="action-btn" onclick="editRow(this)">
                <img src="edit.png" width="20">
            </button>
            <button class="action-btn" onclick="deleteRow(this)">
                <img src="trash.png" width="20">
            </button>
        </td>
    `;

    tableBody.appendChild(row);
    saveToLocal();
    form.reset();
});

function deleteRow(el) {
    // Hapus baris dari tabel + update storage
    el.parentElement.parentElement.remove();
    saveToLocal();
    const row = el.closest('tr');
    
    if(confirm("Apakah Anda yakin ingin menghapus data ini?")){
        row.remove();
        saveToLocal();
    }
}

function editRow(el) {
    const row = el.closest('tr');
    const cells = row.children;

    // Mengisi kembali form dengan data yang dipilih
    document.getElementById("nim").value = cells[0].innerText;
    document.getElementById("nama").value = cells[1].innerText;
    document.getElementById("alamat").value = cells[2].innerText;
    
    const jkValue = cells[3].innerText;
    const radio = document.querySelector(`input[name="jk"][value="${jkValue}"]`);
    if (radio) radio.checked = true;

    document.getElementById("tl").value = cells[4].innerText;
    
    // Ambil password asli dari attribute data-pw
    const pwSpan = cells[5].querySelector('.pw-text');
    document.getElementById("password").value = pwSpan.getAttribute('data-pw');

    row.remove();
    saveToLocal();
}

// Search global (semua kolom)
searchInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    const rows = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const text = rows[i].innerText.toLowerCase();
        const match = text.includes(keyword);

        rows[i].style.display = match ? "" : "none";
    }
});