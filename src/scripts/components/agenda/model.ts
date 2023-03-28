export interface AgendaData {
  backlog: string[];
  progress: string[];
  complete: string[];
  pending: string[];
}

export type AgendaDataList = "backlog" | "progress" | "complete" | "pending";

export type AgendaDataKeys = [
  AgendaDataList?,
  AgendaDataList?,
  AgendaDataList?,
  AgendaDataList?
];
