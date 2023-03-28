/* helper function */
export const disableSaveBtn = (btn: HTMLButtonElement) => {
    btn.setAttribute("disabled", "true");
    btn.classList.add("disabled");
};

const enableSaveBtn = (btn: HTMLButtonElement) => {
    btn.removeAttribute("disabled");
    btn.classList.remove("disabled");
};

/* exported function */
const inputTextHandler = (event: KeyboardEvent) => {
  /* helper variable */
  const parentElement = (event.target as HTMLDivElement).parentElement!;

  /* variable related to main logic */
  const saveBtn = parentElement.querySelector(
    ".agenda__save-item-btn"
  ) as HTMLButtonElement;
  const inputText = (event.target as HTMLDivElement).innerText.trim();

  /* main logic */
  if (inputText != "") {
    enableSaveBtn(saveBtn);
  } else {
    disableSaveBtn(saveBtn);
  }
};

export default inputTextHandler;