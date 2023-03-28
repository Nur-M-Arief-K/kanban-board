import { agendaData } from "../data";
import { AgendaDataList } from "../model";

import updateAgendaList from "./util/update-agenda-list";
import { disableSaveBtn } from "./input-text-hadler";

const submitItem = (event: SubmitEvent, form: HTMLFormElement) => {
  /* helper variables */
  const formParentId = form.closest(".agenda__item")!.id as AgendaDataList;
  const input = form.querySelector(".agenda__add-item-form__text-area")!;
  let inputText = input.textContent!.trim();

  const ulElement = (
    event.target as HTMLFormElement
  ).parentElement!.querySelector(".agenda__item__content")!;
  
  const formSaveBtn = form.querySelector(".agenda__save-item-btn") as HTMLButtonElement;

  /* main logic */
  event.preventDefault();
  /* prevent empty string to be pushed to data array */
  if (inputText != "") {
    agendaData[formParentId].push(inputText);
    localStorage.setItem("agendaData", JSON.stringify(agendaData));
    input.textContent = "";

    disableSaveBtn(formSaveBtn);

    updateAgendaList(formParentId);

    ulElement.scrollTo(0, ulElement.scrollHeight);
  }
};

export const submitItemHandler = (event: SubmitEvent) => {
  const formElement = event.target as HTMLFormElement;
  submitItem(event, formElement);
};

export default submitItemHandler;