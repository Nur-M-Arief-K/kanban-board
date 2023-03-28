import submitItemHandler from "./ui/submit-item-handler";
import inputTextHandler from "./ui/input-text-hadler";
import hideAgendaAddItemFormHandler from "./ui/hide-agenda-add-item-form-handler";
import showAgendaAddItemFormHandler from "./ui/show-agenda-add-item-form-handler";

/* add event listeners */
const agendaComponentAddEventListeners = () => {
  const addItemBtns = Array.from(
    document.querySelectorAll(".agenda__add-item-btn")
  );
  
  addItemBtns.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener("click", showAgendaAddItemFormHandler);
  });
  
  const cancelAddItemBtns = Array.from(
    document.querySelectorAll(".agenda__cancel-add-item-btn")
  );
  
  cancelAddItemBtns.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener("click", hideAgendaAddItemFormHandler);
  });
  
  const inputAreas = Array.from(
    document.querySelectorAll(".agenda__add-item-form__text-area")
  );
  
  inputAreas.forEach((inputArea) => inputArea.addEventListener("keyup", inputTextHandler));
  
  const addItemForms = Array.from(
    document.querySelectorAll(".agenda__add-item-form")
  );

  addItemForms.forEach((form: HTMLFormElement) => form.addEventListener("submit", submitItemHandler));
}

export default agendaComponentAddEventListeners;