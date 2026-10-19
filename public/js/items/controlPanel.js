const btnCloseAdd = document.getElementById("modal-btn-close-add-item");
const formAdd = document.getElementById("form-add-item");

btnCloseAdd.addEventListener("click", () => {
  formAdd.reset();
});

document.getElementById("btn-add").addEventListener("click", (e) => {
  e.preventDefault();

  if (validateFormData()) {
    formAdd.submit();
  } else {
    return;
  }
});

const validateFormData = () => {
  const name = document.getElementById("item-name");
  const price = document.getElementById("item-price").value;
  const quantity = document.getElementById("item-quantity").value;
  const classes = document.querySelectorAll('input[name="classes"]');
  const nameError = document.getElementById("error-name");
  const priceError = document.getElementById("error-price");
  const quantityError = document.getElementById("error-quantity");
  const classesError = document.getElementById("error-classes");
  let ok = true;

  if (name.value.trim().length === 0) {
    ok = false;
    nameError.innerText = "Enter name of item";
    nameError.classList.remove("hidden");
    return ok;
  } else {
    ok = true;
    nameError.innerText = "";
    nameError.classList.add("hidden");
  }

  if (!(Number(price) > 0 && Number.isInteger(Number(price)))) {
    ok = false;
    priceError.innerText = "Price must be > 0 and integer";
    priceError.classList.remove("hidden");
    return ok;
  } else {
    ok = true;
    priceError.innerText = "";
    priceError.classList.add("hidden");
  }

  if (!(Number(quantity) > 0 && Number.isInteger(Number(quantity)))) {
    ok = false;
    quantityError.innerText = "Quantity must be > 0 and integer";
    quantityError.classList.remove("hidden");
    return ok;
  } else {
    ok = true;
    quantityError.innerText = "";
    quantityError.classList.add("hidden");
  }

  const anyChecked = [...classes].some((c) => c.checked);
  if (!anyChecked) {
    ok = false;
    classesError.innerText = "Choose at least 1 class or 'all'";
    classesError.classList.remove("hidden");
    return ok;
  } else {
    ok = true;
    classesError.innerText = "";
    classesError.classList.add("hidden");
  }

  return ok;
};
