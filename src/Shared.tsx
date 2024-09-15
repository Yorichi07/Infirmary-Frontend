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
  faSquareCheck,
  faSquareXmark,
  faHospitalUser,
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
  List: <FontAwesomeIcon icon={faList} />,
  SquareCheck: <FontAwesomeIcon icon={faSquareCheck} />,
  SquareCross: <FontAwesomeIcon icon={faSquareXmark} />,
  Report: <FontAwesomeIcon icon={faHospitalUser} />,
};

export default Shared;
