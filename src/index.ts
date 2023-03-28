import "./index.scss";

import updateAgendaList from "./scripts/components/agenda/ui/util/update-agenda-list";
import agendaComponentAddEventListeners from "./scripts/components/agenda/index";

/* on initialize app */
updateAgendaList();
agendaComponentAddEventListeners();