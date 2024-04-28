let pName = document.getElementById("ProductName");
let pPrice = document.getElementById("ProductPrice");
let pCategory = document.getElementById("ProductCategory");
let pDescription = document.getElementById("ProductDescription");
let pBody = document.getElementById("productBody");
let pArr;
let mode = -1;
if (localStorage.getItem("ourProducts") == null) {
  pArr = [];
} else {
  pArr = JSON.parse(localStorage.getItem("ourProducts"));
  display();
}
function addProduct() {
  let product = {
    name: pName.value,
    price: pPrice.value,
    category: pCategory.value,
    description: pDescription.value,
  };
  if (mode > -1) {
    pArr[mode] = product;
    mode = -1;
  } else {
    pArr.push(product);
  }
  localStorage.setItem("ourProducts", JSON.stringify(pArr));
  display();
  clearInputs();
}
function display() {
  let data = "";
  for (let i = 0; i < pArr.length; i++) {
    data += `
      <tr>
        <td>${i + 1}</td>
        <td>${pArr[i].name}</td>
        <td>${pArr[i].price}</td>
        <td>${pArr[i].category}</td>
        <td>${pArr[i].description}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteOneProduct(${i})">Delete</button>
        <button class="btn btn-warning" onclick="editOneProduct(${i})">Edit</button>
        
        </td>
      </tr>
    `;
  }
  pBody.innerHTML = data;
}
function deleteAll() {
  pArr.splice(0);
  localStorage.setItem("ourProducts", JSON.stringify(pArr));
  display();
}
function deleteOneProduct(i) {
  pArr.splice(i, 1);
  localStorage.setItem("ourProducts", JSON.stringify(pArr));
  display();
}
function editOneProduct(i) {
  pName.value = pArr[i].name;
  pPrice.value = pArr[i].price;
  pCategory.value = pArr[i].category;
  pDescription.value = pArr[i].description;
  mode = i;
}
function clearInputs() {
  pName.value = "";
  pPrice.value = "";
  pCategory.value = "";
  pDescription.value = "";
}
// Search
function serchP(term) {
  // term => النص ال بعمل سيرش عليه
  let data2 = "";
  for (let i = 0; i < pArr.length; i++) {
    if (pArr[i].name.toLowerCase().includes(term.toLowerCase().trim()))
      data2 += `
      <tr>
        <td>${i + 1}</td>
        <td>${pArr[i].name}</td>
        <td>${pArr[i].price}</td>
        <td>${pArr[i].category}</td>
        <td>${pArr[i].description}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteOneProduct(${i})">Delete</button>
        <button class="btn btn-warning" onclick="editOneProduct(${i})">Edit</button>
        
        </td>
      </tr>
    `;
  }
  pBody.innerHTML = data2;
}
