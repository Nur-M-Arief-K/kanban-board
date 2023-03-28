const showAgendaAddItemFormHandler = (event: MouseEvent) => {
  /* helper variables */
  const thisBtnElement = event.target as HTMLButtonElement;
  const btnParentElement = thisBtnElement.parentElement!;
  const associatedFormElement = btnParentElement.querySelector(
    ".agenda__add-item-form"
  ) as HTMLFormElement;
  const formInputArea = associatedFormElement.querySelector(
    ".agenda__add-item-form__text-area"
  )!;
  const inputText = formInputArea.textContent!;
  const formSaveBtn = associatedFormElement.querySelector(
    ".agenda__save-item-btn"
  ) as HTMLButtonElement;

  /* main logic */
  associatedFormElement.style.display = "initial";
  thisBtnElement.style.display = "none";

  if (inputText.trim() == "") {
    formSaveBtn.classList.add("disabled");
    formSaveBtn.setAttribute("disabled", "true");
  }
};

export default showAgendaAddItemFormHandler;