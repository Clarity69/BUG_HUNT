   const form = document.getElementById("formMahasiswa");
    const tableBody = document.getElementById("tableBody");
    const STORAGE_KEY = "data_mhs";

    loadData();

    function saveToLocal(){
        localStorage.setItem(STORAGE_KEY, tableBody.innerHTML);
    }

    function loadData(){
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) tableBody.innerHTML = saved;
    }

    function toggleView(btn) {
            const container = btn.parentElement;
            const textSpan = container.querySelector('.pw-text');
            const isOpened = textSpan.getAttribute('data-opened') === 'true';
            const originalPw = textSpan.getAttribute('data-pw');

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
        e.preventDefault();

        const nim = document.getElementById("nim").value;
        const nama = document.getElementById("nama").value;
        const alamat = document.getElementById("alamat").value;
        const jk = document.querySelector('input[name="jk"]:checked')?.value || "-";
        const tl = document.getElementById("tl").value;
        const password = document.getElementById("password").value;

        const row = document.createElement("tr");

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

    document.getElementById("nim").value = cells[0].innerText;
    document.getElementById("nama").value = cells[1].innerText;
    document.getElementById("alamat").value = cells[2].innerText;
    
    const jkValue = cells[3].innerText;
    const radio = document.querySelector(`input[name="jk"][value="${jkValue}"]`);
    if (radio) radio.checked = true;

    document.getElementById("tl").value = cells[4].innerText;
    
    // Cari span di dalam kolom ke-6 (index 5)
    const pwSpan = cells[5].querySelector('.pw-text');
    document.getElementById("password").value = pwSpan.getAttribute('data-pw');

    row.remove();
    saveToLocal();
}