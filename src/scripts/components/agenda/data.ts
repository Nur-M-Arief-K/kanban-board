import agendaDummyData from "../../../data/dummy-data/agenda-dummy-data";

import { AgendaData } from "./model";

export let agendaData: AgendaData;

export const populateLocalStorageWithDummyData = () => {
  localStorage.setItem("agendaData", JSON.stringify(agendaDummyData));
};

export const updateAgendaDataFromLocalStorage = () => {
  agendaData = JSON.parse(localStorage.getItem("agendaData") || "");
};