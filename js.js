let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let Count = document.getElementById('Count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let mode = 'create';
let tem;
let serche = document.querySelector('#serche');
let sercheMode = 'title';

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
let product;
if(localStorage.datapro!=null){
   product=JSON.parse(localStorage.datapro)
}else{
    product=[]
}
// let product = localStorage.datapro ? JSON.parse(localStorage.datapro) : [];
// creat Product
submit.onclick = function() {
    let newproduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        Count: Count.value,
        category: category.value,
    };
    if(title.value!='' && price.value!=''
        &&category.value&&Count.value<100){
        if (mode === 'create') {
            if (newproduct.Count > 1) {
                for (let i = 0; i < newproduct.Count; i++) {
                    product.push({ ...newproduct, Count: 1 });
                }
            } else {
                product.push(newproduct);
            }
        }
        clear_product();
    }
   else {
        product[tem] = newproduct;
        mode = 'create';
        submit.innerHTML = 'create';
        Count.style.display = "block";
    }
    localStorage.setItem('datapro', JSON.stringify(product));
   
    show_data();
};
// clear Product
function clear_product() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = ''; 
    total.textContent = '';
    Count.value = '';
    category.value = '';
}
// show data
function show_data() {
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
            <td class="UPDATE"><button onclick="updateProduct(${i})">update</button></td>
            <td class="DELETE"><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btn = document.getElementById('del');
    if (product.length > 0) {
        btn.style.display = 'block';
        btn.innerHTML = `<button class="frf" onclick="deleteall()">delete all (${product.length})</button>`;
    } else {
        btn.style.display = 'none';
    }
}

function deleteall() {
    localStorage.clear();
    // product = [];
    document.getElementById('tbody').innerHTML = '';
    document.getElementById('del').style.display = 'none';
}

function deleteProduct(i) {
    product.splice(i, 1);
    localStorage.setItem('datapro', JSON.stringify(product));
    show_data();
}

function updateProduct(i) {
    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    category.value = product[i].category;
    Count.style.display = 'none';
    submit.innerHTML = 'update';
    mode = 'update';
    tem = i;
    window.scroll({ top: 0, behavior: 'smooth' });
    total.style.background = 'red';
}



function getsercheMode(value) {
        if(sercheMode=='titl'){
        sercheMode='title'
        serche.placeholder = 'Search By tilt'
    
    }else{
        sercheMode='Gategory'
        serche.placeholder = 'Search By Gategory'
    }
    // sercheMode = value === 'title' ? 'title' : 'category';
    // serche.placeholder = `Search By ${sercheMode.charAt(0).toUpperCase() + sercheMode.slice(1)}`;
    serche.focus();
}

function sercheData(value) {
    let table = '';
    if (sercheMode === 'title') {
        for (let i = 0; i < product.length; i++) {
            if (product[i].title.toLowerCase().includes(value.toLowerCase())) {
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
                    <td class="UPDATE"><button onclick="updateProduct(${i})">update</button></td>
                    <td class="DELETE"><button onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < product.length; i++) {
            if (product[i].category.toLowerCase().includes(value.toLowerCase())) {
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
                    <td class="UPDATE"><button onclick="updateProduct(${i})">update</button></td>
                    <td class="DELETE"><button onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
show_data()