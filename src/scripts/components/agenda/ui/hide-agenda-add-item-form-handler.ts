const hideAgendaAddItemFormHandler = (event: MouseEvent) => {
  /* helper variables */
  const thisBtnElement = event.target as HTMLButtonElement;

  /* variable related to main logic */
  const associatedFormElement = thisBtnElement.form!;
  const agendaAddItemBtn = associatedFormElement.parentElement!.querySelector(
    ".agenda__add-item-btn"
  ) as HTMLButtonElement;

  /* main logic */
  associatedFormElement.style.display = "none";
  agendaAddItemBtn.style.display = "initial";
};

export default hideAgendaAddItemFormHandler;
