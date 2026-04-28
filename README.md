# BUG_HUNT

# BUG 1 
image pada action button tidak ada
![alt text](bug1.png)
![alt text](bug1ui.png)
fix :
tambahkan file image sesuai action yang dibutuhkan
![alt text](bug1fix.png)

# BUG 2
Tanggal pada form di isi secara manual, Pengguna bisa menginput tanggal yang tidak ada secara kalender.
![alt text](datebug1.png)
![alt text](datebug2.png)
![alt text](dateui.png)
fix :
daripada menggunakan secara manual, bisa memakai ```type=date``` yang lebih efisien untuk penanggalan.
![alt text](datefix.png)
![alt text](dateuifix.png)
hapus script js yang masih menggunakan id tanggal bulan tahun
![alt text](image-1.png)
![alt text](image-2.png)
ganti dengan code berikut pada bagian tanggal lahir
![alt text](image-3.png)
hasil fix:
![alt text](image-4.png)

# BUG 3
agar data tetap tersimpan setelah refresh web/laman, menggunakan local storage
![alt text](image-5.png)
fix :
tambahkan function ini pada kode
![alt text](image-6.png)
dan panggil function tersebut setelah tambah baris data, edit data, dan delete data
![alt text](image-7.png)
