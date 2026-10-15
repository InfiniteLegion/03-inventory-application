const btnCloseAdd = document.getElementById("modal-btn-close-add-category");
const formAdd = document.getElementById("form-add-category");

btnCloseAdd.addEventListener("click", () => {
  formAdd.reset();
});
