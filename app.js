let title = document.getElementById('product-title');
let price = document.getElementById('product-price');
let taxes = document.getElementById('product-taxes');
let ads = document.getElementById('product-ads');
let discount = document.getElementById('product-discount');
let Count = document.getElementById('product-count');
let category = document.getElementById('product-category');
let total = document.getElementById('total-display');
let submit = document.getElementById('create-update-btn');
let search = document.getElementById('search-bar');
let searchMode = 'title';
let mode = 'create';
let tempIndex;

// بيانات المنتجات
let product = localStorage.datapro ? JSON.parse(localStorage.datapro) : [];

// **حساب الإجمالي**
function get_total() {
    if (price.value !== "") {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.textContent = result;
        total.style.background = 'green';
    } else {
        total.textContent = '';
        total.style.background = 'red';
    }
}

// **إضافة أو تحديث المنتج**
submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        Count: Count.value,
        category: category.value,
    };

    if (title.value !== '' && price.value !== '' && category.value !== '' && Count.value < 100) {
        if (mode === 'create') {
            if (newProduct.Count > 1) {
                for (let i = 0; i < newProduct.Count; i++) {
                    product.push({ ...newProduct, Count: 1 });
                }
            } else {
                product.push(newProduct);
            }
        } else {
            product[tempIndex] = newProduct;
            mode = 'create';
            submit.innerHTML = 'Create';
            Count.style.display = 'block';
        }
        localStorage.setItem('datapro', JSON.stringify(product));
        clearInputs();
        showData();
    }
};

// **مسح الحقول بعد الإدخال**
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.textContent = '';
    Count.value = '';
    category.value = '';
}

// **عرض البيانات**
function showData() {
    let table = '';
    for (let i = 0; i < product.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${product[i].title}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].Count}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateProduct(${i})" class="button-primary">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="button-primary">Delete</button></td>
        </tr>`;
    }
    document.getElementById('table-body').innerHTML = table;

    let deleteAllButton = document.getElementById('delete-all-container');
    if (product.length > 0) {
        deleteAllButton.innerHTML = `<button onclick="deleteAll()" class="button-primary">Delete All (${product.length})</button>`;
        deleteAllButton.style.display = 'block';
    } else {
        deleteAllButton.style.display = 'none';
    }
}

// **حذف جميع المنتجات**
function deleteAll() {
    localStorage.clear();
    product = [];
    showData();
}

// **حذف منتج معين**
function deleteProduct(index) {
    product.splice(index, 1);
    localStorage.setItem('datapro', JSON.stringify(product));
    showData();
}

// **تحديث المنتج**
function updateProduct(index) {
    title.value = product[index].title;
    price.value = product[index].price;
    taxes.value = product[index].taxes;
    ads.value = product[index].ads;
    discount.value = product[index].discount;
    category.value = product[index].category;
    Count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'update';
    tempIndex = index;
    total.style.background = 'red';
    window.scroll({ top: 0, behavior: 'smooth' });
}

// **تحديد وضع البحث**
function getSearchMode(id) {
    if (id === 'search-by-title-btn') {
        searchMode = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMode = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
}

// **البحث**
function searchData(value) {
    let table = '';
    for (let i = 0; i < product.length; i++) {
        if (
            (searchMode === 'title' && product[i].title.toLowerCase().includes(value.toLowerCase())) ||
            (searchMode === 'category' && product[i].category.toLowerCase().includes(value.toLowerCase()))
        ) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${product[i].title}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].discount}</td>
                <td>${product[i].total}</td>
                <td>${product[i].Count}</td>
                <td>${product[i].category}</td>
                <td><button onclick="updateProduct(${i})" class="button-primary">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="button-primary">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById('table-body').innerHTML = table;
}

// **عرض البيانات فور تحميل الصفحة**
showData();
