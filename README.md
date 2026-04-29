# BUG_HUNT

### BUG 1 
Ikon pada tombol aksi (Edit & Hapus) tidak muncul atau rusak (broken image) dikarenakan path file gambar tidak ditemukan atau file aset belum tersedia di direktori proyek.
![alt text](bug1.png)
<img src="bug1.png" width=500>
<img src="bug1ui.png" width=500>
fix :
Menyediakan file aset edit.png dan trash.png di direktori yang sesuai dan memastikan pemanggilan path pada tag ```<img>``` sudah benar.
<img src="bug1fix.png" width=500>

### BUG 2
Tanggal pada form di isi secara manual, Pengguna bisa menginput tanggal yang tidak ada secara kalender.
<img src="datebug1.png" width=500>
<img src="datebug2.png" width=500>
<img src="dateui.png" width=500>

fix :
daripada menggunakan secara manual, bisa memakai ```type=date``` yang lebih efisien untuk penanggalan.
<img src="datefix.png" width=500>
<img src="dateuifix.png" width=500>

hapus script js yang masih menggunakan id tanggal bulan tahun
<img src="image-1.png" width=500>
<img src="image-2.png" width=500>

ganti dengan code berikut pada bagian tanggal lahir
<img src="image-3.png" width=500>

hasil fix:
<img src="image-4.png" width=500>

### BUG 3
agar data tetap tersimpan setelah refresh web/laman, menggunakan local storage
<img src="image-5.png" width=500>

fix :
tambahkan function ini pada kode
<img src="image-6.png" width=500>

dan panggil function tersebut setelah tambah baris data, edit data, dan delete data
<img src="image-7.png" width=500>

### BUG 4
password pada table data masih visible, ini merupakan celah keamanan.
<img src="image-8.png" width=500>

fix :
