const btnCloseAdd = document.getElementById("modal-btn-close-add-item");
const formAdd = document.getElementById("form-add-item");

btnCloseAdd.addEventListener("click", () => {
  formAdd.reset();
});

document.getElementById("btn-add").addEventListener("click", (e) => {
  e.preventDefault();

  if (validateFormData("add")) {
    formAdd.submit();
  } else {
    return;
  }
});

const editBtnHandler = (e, id) => {
  e.preventDefault();

  const formEdit = document.getElementById(`form-edit-item-${id}`);

  if (validateFormData("edit", id)) {
    formEdit.submit();
  } else {
    return;
  }
};

const validateFormData = (prefix, id = null) => {
  const suffix = id !== null ? `-${id}` : "";
  const form = document.getElementById(`form-${prefix}-item${suffix}`);
  const name = document.getElementById(`${prefix}-item-name${suffix}`);
  const price = document.getElementById(`${prefix}-item-price${suffix}`).value;
  const quantity = document.getElementById(
    `${prefix}-item-quantity${suffix}`,
  ).value;
  const classes = form.querySelectorAll('input[name="classes"]');
  const nameError = document.getElementById(`${prefix}-error-name${suffix}`);
  const priceError = document.getElementById(`${prefix}-error-price${suffix}`);
  const quantityError = document.getElementById(
    `${prefix}-error-quantity${suffix}`,
  );
  const classesError = document.getElementById(
    `${prefix}-error-classes${suffix}`,
  );
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
