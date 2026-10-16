const btnCloseAdd = document.getElementById("modal-btn-close-add-class");
const formAdd = document.getElementById("form-add-class");

btnCloseAdd.addEventListener("click", () => {
  formAdd.reset();
});
