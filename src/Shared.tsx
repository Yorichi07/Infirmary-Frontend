import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCalendarCheck,
  faUser,
  faHouse,
  faFileMedical,
  faChevronLeft,
  faDownload,
  faUserDoctor,
  faArrowRightFromBracket,
  faUserCheck,
  faPills,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Shared = {
  UserPlus: <FontAwesomeIcon icon={faUserPlus} />,
  calendarCheck: <FontAwesomeIcon icon={faCalendarCheck} />,
  User: <FontAwesomeIcon icon={faUser} />,
  HomeUser: <FontAwesomeIcon icon={faHouse} />,
  Prescription: <FontAwesomeIcon icon={faFileMedical} />,
  ArrowLeft: <FontAwesomeIcon icon={faChevronLeft} />,
  Download: <FontAwesomeIcon icon={faDownload} />,
  DoctorHome: <FontAwesomeIcon icon={faUserDoctor} />,
  LogOut: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  DoctorCheckin: <FontAwesomeIcon icon={faUserCheck} />,
  Pills: <FontAwesomeIcon icon={faPills} />,
  List: <FontAwesomeIcon icon={faList} />
};

export default Shared;
