let datapro = JSON.parse(localStorage.getItem('products')) || [];
let mood = 'create';

window.onload = function() {
    showData(); // عند تحميل الصفحة، سيتم عرض البيانات المحفوظة
}

function getTotal() {
    let price = parseFloat(document.getElementById('price').value) || 0;
    let taxes = parseFloat(document.getElementById('taxes').value) || 0;
    let ads = parseFloat(document.getElementById('ads').value) || 0;
    let discount = parseFloat(document.getElementById('discount').value) || 0;

    let total = +price + +taxes + +ads - +discount;
    let totalElement = document.getElementById('total');

    totalElement.innerHTML = total;

    // Change the color of the Total button
    let totalButton = document.getElementById('total');
    if (total !== 0) {
        totalButton.style.backgroundColor = 'green';
    } else {
        totalButton.style.backgroundColor = ''; // Reset to default
    }
}

function createProduct() {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let taxes = document.getElementById('taxes').value;
    let ads = document.getElementById('ads').value;
    let discount = document.getElementById('discount').value;
    let total = document.getElementById('total').innerHTML;
    let count = document.getElementById('count').value;
    let category = document.getElementById('category').value;

    let newProduct = {
        title: title,
        price: price,
        taxes: taxes,
        ads: ads,
        discount: discount,
        total: total,
        count: count,
        category: category
    };

    if (mood === 'create') {
        datapro.push(newProduct);
    } else if (mood === 'update') {
        datapro[count].title = title;
        datapro[count].price = price;
        datapro[count].taxes = taxes;
        datapro[count].ads = ads;
        datapro[count].discount = discount;
        datapro[count].total = total;
        datapro[count].category = category;
    }

    localStorage.setItem('products', JSON.stringify(datapro));

    showData();
    clearInputs();

    // Reset the submit button text and mood
    document.getElementById('submit').innerHTML = 'Create';
    mood = 'create';
}

function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>
                  </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}

function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(datapro));
    showData();
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('taxes').value = '';
    document.getElementById('ads').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('total').innerHTML = '';
    document.getElementById('count').value = '';
    document.getElementById('category').value = '';

    // Reset Total button color
    let totalButton = document.getElementById('total');
    totalButton.style.backgroundColor = '';
}

function updateData(i) {
    document.getElementById('title').value = datapro[i].title;
    document.getElementById('price').value = datapro[i].price;
    document.getElementById('taxes').value = datapro[i].taxes;
    document.getElementById('ads').value = datapro[i].ads;
    document.getElementById('discount').value = datapro[i].discount;
    document.getElementById('total').innerHTML = datapro[i].total;
    document.getElementById('count').value = i;
    document.getElementById('category').value = datapro[i].category;

    document.getElementById('submit').innerHTML = 'Update';
    mood = 'update';
}

let searchMood = 'title';

function getsearchMood(id) {
    let search = document.getElementById('search');
if(id == 'searchTitle') {
    searchMood = 'title';
    search.placeholder = 'البحث باسم الطالب';
}else{
    searchMood = 'category';
    search.placeholder = 'االبحث بنظام الحضور';
}
search.focus();

}


function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value)) {
                table += `<tr>
                            <td>${i + 1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updateData(${i})">Update</button></td>
                            <td><button onclick="deleteData(${i})">Delete</button></td>
                        </tr>`;
            }
        }
    } else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value)) {
                table += `<tr>
                            <td>${i + 1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updateData(${i})">Update</button></td>
                            <td><button onclick="deleteData(${i})">Delete</button></td>
                        </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}