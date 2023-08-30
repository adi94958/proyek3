var items = [
{
    nama: "Flasdisk",
    harga: "30000"
},
{
    nama: "USB",
    harga: "10000"
},
{
    nama: "Hardisk",
    harga: "90000"
},
{
    nama: "Keyboard",
    harga: "80000"
},
{
    nama: "Mouse",
    harga: "20000"
},
{
    nama: "Mouse Pad",
    harga: "15000"
},
];
var selectedBarang = [];

function updateItemDetails(itemIndex) {
    var namaElement = document.getElementById('nama-barang' + itemIndex);
    var hargaElement = document.getElementById('harga-barang' + itemIndex);

    namaElement.textContent = items[itemIndex].nama;
    hargaElement.textContent = items[itemIndex].harga;
}


// Fungsi untuk menambah nilai pada input
function tambahNilai(itemIndex) {
    var inputJumlah = document.getElementById('jumlah-barang' + itemIndex);
    var currentValue = parseInt(inputJumlah.value);
    if (!isNaN(currentValue)) {
        inputJumlah.value = currentValue + 1;
    }
}

// Fungsi untuk mengurangi nilai pada input
function kurangiNilai(itemIndex) {
    var inputJumlah = document.getElementById('jumlah-barang' + itemIndex);
    var currentValue = parseInt(inputJumlah.value);
    if (!isNaN(currentValue) && currentValue > 0) {
        inputJumlah.value = currentValue - 1;
    }
}

updateItemDetails(0);
updateItemDetails(1);
updateItemDetails(2);
updateItemDetails(3);
updateItemDetails(4);
updateItemDetails(5);

// Fungsi tambah barang
function addBarang(itemIndex) {
    var jumlahBarang = parseInt(document.getElementById('jumlah-barang' + itemIndex).value);

    if (jumlahBarang > 0) {
        var namaBarang = items[itemIndex].nama;
        var harga = parseInt(items[itemIndex].harga);

        var existingIndex = selectedBarang.findIndex(barang => barang.nama === namaBarang);

        if (existingIndex !== -1) {
            // Barang sudah ada, update jumlah dan total harga
            selectedBarang[existingIndex].jumlah += jumlahBarang;
            selectedBarang[existingIndex].totalHarga += harga * jumlahBarang;
        } else {
            // Barang belum ada, tambahkan ke daftar
            selectedBarang.push({
                nama: namaBarang,
                harga: harga,
                jumlah: jumlahBarang,
                totalHarga: harga * jumlahBarang
            });
        }

        updateInformasiBarang();
    }
}

// Fungsi untuk memperbarui tampilan informasi barang di My Chart
function updateInformasiBarang() {
    var informasiBarangElement = document.getElementById('informasi-barang');
    informasiBarangElement.innerHTML = ''; // Mengosongkan konten sebelum memperbarui

    var totalPembelian = 0; // Menyimpan total harga keseluruhan

    selectedBarang.forEach((barang, index) => {
        var newInformasiBarang = document.createElement('div');
        newInformasiBarang.classList.add('mb-3');

        var informasiBarangHtml = `
        <li class="list-group-item">
            <div class="row">
                <div class="col-2">
                    <img src="assets/img/profil.jpg" class="card-img-top" alt="profil">
                </div>
                <div class="col-8">
                    <p>${barang.nama}</p>
                    <p>Rp. ${barang.harga} x ${barang.jumlah}</p>
                </div>
                <div class="col-2" style="display: flex; justify-content: center; align-items: center;">
                    <p>Rp. ${barang.totalHarga}</p>
                </div>
            </div>
        </li>
        `;

        totalPembelian += barang.totalHarga; // Menambahkan total harga barang ke total keseluruhan

        newInformasiBarang.innerHTML = informasiBarangHtml;
        informasiBarangElement.appendChild(newInformasiBarang);
    });

    
    // Menampilkan total harga keseluruhan di bagian bawah My Chart
    var totalPembelianElement = document.getElementById('total-pembelian');
    var totalBayarElement = document.getElementById('total-bayar');
    var pajakElement = document.getElementById('pajak');

    totalPembelianElement.textContent = `Total pembelian     Rp. ${totalPembelian}`;
    pajak = totalPembelian * 0.11;
    pajakElement.textContent = `Pajak 11%  Rp. ${pajak}`;
    totalBayar = totalPembelian - pajak;
    totalBayarElement.textContent = `Total Bayar    Rp. ${totalBayar}`;
}