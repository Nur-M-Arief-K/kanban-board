import { AgendaDataKeys, AgendaDataList } from "../../model";
import editIcon from "../../../../../images/icon/edit-icon.svg";

import {
  agendaData,
  updateAgendaDataFromLocalStorage,
  populateLocalStorageWithDummyData,
} from "../../data";

const updateAgendaList = (...args: AgendaDataKeys) => {
  /* setup */
  if (!localStorage.getItem("agendaData")) {
    populateLocalStorageWithDummyData();
  }

  updateAgendaDataFromLocalStorage();

  /* helper variable */
  let agendaDataKeys: AgendaDataKeys;

  /* main logic */
    /* update agendaDataKeys based on args */
  args.length == 0
    ? (agendaDataKeys = ["backlog", "progress", "complete", "pending"])
    : (agendaDataKeys = [...args]);

    /* update HTMLLiElement with class "agenda__item__content__item " on its HTMLLiElement with id backlog, progress, complete, and pending*/
  agendaDataKeys.forEach((key) => {
    const ulParent = document.querySelector(
      `.agenda__item--${key} .agenda__item__content`
    )!;
    ulParent.textContent = "";

    /* create list element and helper element, cannot use foreach because we need add one helper element eventhough the array is empty */
    for (let index = 0; index <= agendaData[key!].length; index++) {
      const activityText = agendaData[key!][index];

      /* create list element */
      const activityListEl = document.createElement("li");

      const activityListElTextContent = document.createElement(
        "span"
      ) as HTMLSpanElement;
      activityListElTextContent.classList.add(
        "agenda__item__content__item__text-content"
      );

      activityListEl.appendChild(activityListElTextContent);

      if (index != agendaData[key!].length) {
        activityListEl.setAttribute("draggable", "true");

        /* add event listener to not-last list element */
        activityListElTextContent.addEventListener(
          "focusout",
          (event: FocusEvent) => {
            /* helper variable */
            const spanElement = event.target as HTMLSpanElement;
            const liElement = spanElement.parentElement as HTMLLIElement;

            const textContent = liElement.textContent!;
            const liElementId = +liElement.getAttribute("index")!;

            const parentElement = liElement.closest(
              ".agenda__item"
            ) as HTMLUListElement;
            const parentElementId = parentElement.id as AgendaDataList;

            /* main logic */
            spanElement.removeAttribute("contenteditable");
            liElement.classList.remove("agenda__item__content__item--edit");

            if (textContent.trim() == "") {
              // if the content is empty, remove the item from array and update DOM
              agendaData[parentElementId].splice(liElementId, 1);
              localStorage.setItem("agendaData", JSON.stringify(agendaData));
              updateAgendaList(parentElementId);
            } else {
              agendaData[parentElementId][liElementId] = textContent;
              localStorage.setItem("agendaData", JSON.stringify(agendaData));
            }
          }
        );
      }

      activityListEl.classList.add(
        "agenda__item__content__item",
        "cannot-be-selected"
      );

      activityListEl.setAttribute("index", index.toString());
      activityListElTextContent.textContent = activityText;

      /* create edit icon, span and img element */
      if (index != agendaData[key!].length) {
        const editIconSpanEl = document.createElement("span");
        editIconSpanEl.classList.add("agenda__item__content__item__edit-icon");

        const editImgIconEl = new Image();
        editImgIconEl.src = editIcon;
        editImgIconEl.setAttribute("alt", "edit icon");

        editIconSpanEl.appendChild(editImgIconEl);
        activityListEl.appendChild(editIconSpanEl);

        /* add event listener to edit icon */
        editIconSpanEl.addEventListener("click", (event: MouseEvent) => {
          const listElement = (event.target as HTMLSpanElement).closest(
            ".agenda__item__content__item"
          ) as HTMLLIElement;
          
          const spanElement = listElement.querySelector("span");
          listElement.classList.add("agenda__item__content__item--edit");
          console.log(listElement);
          spanElement.setAttribute("contenteditable", "true");
          spanElement.focus();
        });
      }

      ulParent.appendChild(activityListEl);

      /* drag event */
      activityListEl.addEventListener("dragstart", (event: DragEvent) => {
        /* make this drag item disappear but still draggable */
        setTimeout(() => {
          (event.target as HTMLLIElement).style.display = "none";
        }, 0);

        /* helper variable */
        const liElement = event.target as HTMLLIElement;
        const liElementIndex = liElement.getAttribute("index")!;

        const containerElement = (
          liElement.parentElement as HTMLUListElement
        ).closest(".agenda__item__container")!;
        const columnElement = containerElement.parentElement!;
        const columnElementId = columnElement.id;

        /* set data */
        event.dataTransfer!.setData("list", columnElementId);
        event.dataTransfer!.setData("index", liElementIndex);
      });

      activityListEl.addEventListener("dragend", (event: DragEvent) => {
        (event.target as HTMLLIElement).style.display = "flex";
      });

      activityListEl.addEventListener("dragenter", (event: DragEvent) => {
        /* helper variable */
        const liElement = event.target as HTMLLIElement;

        /* main logic */
        /* event.target should be ensured because dragenter can trigger its children element */
        if (liElement.tagName == "LI") {
          liElement.classList.add("border-top");
        }
      });

      activityListEl.addEventListener("dragleave", (event: FocusEvent) => {
        /* helper variable */
        const liElement = event.target as HTMLLIElement;

        /* main logic */
        liElement.classList.remove("border-top");
      });

      activityListEl.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
      });

      activityListEl.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();

        if ((event.target as HTMLLIElement).tagName == "LI") {
          const liElement = event.target as HTMLLIElement;
          const liElementIndex = liElement.getAttribute("index");
          const ulElement = liElement.parentElement!;
          const containerElement = (
            liElement.parentElement as HTMLUListElement
          ).closest(".agenda__item__container")!;
          const columnElement = containerElement.parentElement!;
          const columnElementId = columnElement.id as AgendaDataList;

          //get data
          const transferredId = (event.dataTransfer!.getData(
            "list"
          ) as AgendaDataList)!;
          const transferredIndex = event.dataTransfer!.getData("index");

          ulElement.insertBefore(
            document.querySelector(
              `#${transferredId} li[index="${transferredIndex}"]`
            )!,
            document.querySelector(
              `#${columnElementId} li[index="${liElementIndex}"]`
            )
          );

          if (columnElementId == transferredId) {
            const newArray = Array.from(ulElement.children)
              .filter((children) => children.textContent != "")
              .map((item) => item.textContent) as string[];
            agendaData[transferredId] = newArray;

            localStorage.setItem("agendaData", JSON.stringify(agendaData));
            updateAgendaList(transferredId);
          } else {
            const departureArray = Array.from(
              document.querySelector(
                `#${transferredId} .agenda__item__content`
              )!.children
            )
              .filter((children) => children.textContent != "")
              .map((item) => item.textContent) as string[];
            agendaData[transferredId] = departureArray;

            const arrivalArray = Array.from(ulElement.children)
              .filter((children) => children.textContent != "")
              .map((item) => item.textContent) as string[];
            agendaData[columnElementId] = arrivalArray;
            localStorage.setItem("agendaData", JSON.stringify(agendaData));
            updateAgendaList(transferredId, columnElementId);
          }

          liElement.classList.remove("border-top");
        }
      });
    }
  });
};

export default updateAgendaList;