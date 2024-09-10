import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCalendarCheck,
  faUser,
  faHouse,
  faFileMedical,
  faChevronLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const Shared = {
  UserPlus: <FontAwesomeIcon icon={faUserPlus} />,
  calendarCheck: <FontAwesomeIcon icon={faCalendarCheck} />,
  User: <FontAwesomeIcon icon={faUser} />,
  HomeUser: <FontAwesomeIcon icon={faHouse} />,
  Prescription: <FontAwesomeIcon icon={faFileMedical} />,
  ArrowLeft: <FontAwesomeIcon icon={faChevronLeft} />,
  Download: <FontAwesomeIcon icon={faDownload} />
};

export default Shared;
