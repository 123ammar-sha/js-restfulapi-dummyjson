const API_URL = 'https://dummyjson.com/products';
const productList = document.getElementById('product-list');
const loadingElement = document.getElementById('loading');
const errorBox = document.getElementById('error-message');

const productForm = document.getElementById('product-form');
const productTitleInput = document.getElementById('product-title');
const productPriceInput = document.getElementById('product-price');

let isEditMode = false;

const productIdInput = document.getElementById('product-id');
const formTitle = document.getElementById('form-title');
const btnCancle = document.getElementById('btn-cancel');

function setupEditMode(id, title, price) {
    isEditMode = true;
    formTitle.textContent = 'EDIT DATA PRODUK!!!!';

    productIdInput.value = id;
    productTitleInput.value = title;
    productPriceInput.value = price;

    btnCancle.classList.remove('hidden');
    
    window.scrollTo({ top:0, behavior: 'smooth'});
}

function resetForm(){
    isEditMode = false;
    formTitle.textContent = 'Tambah Produk Baru';
    productForm.reset();
    productIdInput.value = '';
    btnCancle.classList.add('hidden');
}

btnCancle.addEventListener('click', resetForm);

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}?limit=30`);
        if(!response.ok) throw new Error('Gagal Mengambil data');
        
        const data = await response.json();
        loadingElement.classList.add('hidden');
        
        
        data.products.forEach(product => {
            renderProductCard(product);
        });

    } catch (error) {
        loadingElement.classList.add('hidden');
        errorBox.textContent = error.message;
        errorBox.classList.remove('hidden')
    }
}

function renderProductCard(product) {
    const card = document.createElement('div');

    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.innerHTML = `
        <div>
            <h3 class="title-text">${product.title}</h3>
            <p class="price-text">$${product.price}</p>
        </div>
        <div class="action-buttons">
            <button class="btn btn-edit" onclick="setupEditMode(${product.id}, '${product.title}', ${product.price})">Edit</button>
            <button class="btn btn-delete" onclick="deleteProduct(${product.id})">Hapus</button>
        </div>
    `;
    productList.prepend(card);

}

// POST, PUT, DELETE

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = productTitleInput.value;
    const price = Number(productPriceInput.value);
    const id = productIdInput.value;
    
    if(!isEditMode) {
        // POST Method
        try {
            const response = await fetch(`${API_URL}/add`, { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, price }) 
            });
    
            if(!response.ok) throw new Error('Gagal menambah data produk.');
    
            const newProduct = await response.json();
            newProduct.id = Date.now() //id unik sementara data baru
    
            renderProductCard(newProduct);
            productForm.reset();
        } catch (error) {
            errorBox.textContent = error.message;
            errorBox.classList.remove('hidden');
        }
    } else {
        // Mengakali data yang baru karena tidak ditemukan di API, jadi disimulasikan dengan memperbarui langsung di UI
        if (id > 200) {
            const productCard = document.querySelector(`[data-id="${id}"]`);
            if(productCard) {
                productCard.querySelector('.title-text').textContent = title;
                productCard.querySelector('.price-text').textContent = `$${price}`;

                const btnEdit = productCard.querySelector('.btn-edit');
                btnEdit.setAttribute('onclick', `setupEditMode(${id}, '${title}', ${price})`);
            }
            resetForm();
            return; 
        }
        // PUT Method
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({price,title})
            });

            if(!response.ok) throw new Error('Gagal edit data');
            const updateProduct = await response.json();

            const productCard = document.querySelector(`[data-id="${id}"]`);
            if(productCard) {
                productCard.querySelector('.title-text').textContent = updateProduct.title;
                productCard.querySelector('.price-text').textContent = `$${updateProduct.price}`;

                const btnEdit = productCard.querySelector('.btn-edit');
                btnEdit.setAttribute('onclick', `setupEditMode(${id}, '${updateProduct.title}', ${updateProduct.price})`);
            }

            resetForm()
        } catch (error) {
            showError(`Error saat memperbarui: ${error.message}`);
        }
    }
})

async function deleteProduct(id) {
    if(!confirm('Yakin ingin hapus produk?')) return;

    // manipulasi data yang baru karena tidak ditemukan di API, jadi disimulasikan dengan menghapus langsung dari UI
    if (id > 200) {
        const productCard = document.querySelector(`[data-id="${id}"]`);
        if (productCard) {
            productCard.remove();
        }
        alert('Produk baru berhasil dihapus!!');
        return;
    }
    // DELETE Method
    try {
        const response = await fetch(`${API_URL}/${id}`,{
            method: 'DELETE'
        });

        if(!response.ok) throw new Error('Gagal Menghapus produk');

        const data = await response.json();

        if(data.isDeleted) {
            const productCard = document.querySelector(`[data-id="${id}"]`);
            if(productCard){
                productCard.remove();
            }
            alert('Produk terhapus!');
        }
    } catch (error) {
        showError(`Error saat menghapus: ${error.message}`);
    }
}



fetchProducts();

// Fungsi Helper untuk menampilkan atau menyembunyikan pesan error di layar
function showError(message) {
    if (message) {
        errorBox.textContent = message; // Isi teks kotak error
        errorBox.classList.remove('hidden'); // Munculkan kotak error (hapus class hidden)
    } else {
        errorBox.textContent = ''; // Kosongkan teks
        errorBox.classList.add('hidden'); // Sembunyikan kembali kotak error
    }
}