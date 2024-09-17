import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Shared from "@/Shared";

const reports = [
  {
    reportId: "INV001",
    date: "2023-09-01",
    downloadLink: "/report-INV001.pdf",
  },
  {
    reportId: "INV002",
    date: "2023-09-02",
    downloadLink: "/report-INV002.pdf",
  },
  {
    reportId: "INV003",
    date: "2023-09-03",
    downloadLink: "/report-INV003.pdf",
  },
  {
    reportId: "INV004",
    date: "2023-09-04",
    downloadLink: "/report-INV004.pdf",
  },
  {
    reportId: "INV005",
    date: "2023-09-05",
    downloadLink: "/report-INV005.pdf",
  },
  {
    reportId: "INV006",
    date: "2023-09-06",
    downloadLink: "/report-INV006.pdf",
  },
  {
    reportId: "INV007",
    date: "2023-09-07",
    downloadLink: "/report-INV007.pdf",
  },
  {
    reportId: "INV001",
    date: "2023-09-01",
    downloadLink: "/report-INV001.pdf",
  },
  {
    reportId: "INV002",
    date: "2023-09-02",
    downloadLink: "/report-INV002.pdf",
  },
  {
    reportId: "INV003",
    date: "2023-09-03",
    downloadLink: "/report-INV003.pdf",
  },
  {
    reportId: "INV004",
    date: "2023-09-04",
    downloadLink: "/report-INV004.pdf",
  },
  {
    reportId: "INV005",
    date: "2023-09-05",
    downloadLink: "/report-INV005.pdf",
  },
  {
    reportId: "INV006",
    date: "2023-09-06",
    downloadLink: "/report-INV006.pdf",
  },
  {
    reportId: "INV007",
    date: "2023-09-07",
    downloadLink: "/report-INV007.pdf",
  },
];

const UserPrescription = () => {
  return (
    <div className="h-[83%] pt-5 pb-10 flex justify-center">
      <div className="w-[50%] overflow-y-scroll">
        <Table className="border">
          <TableCaption>A list of your recent reports</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[33%] text-center">Report Id</TableHead>
              <TableHead className="w-[33%] text-center">Date</TableHead>
              <TableHead className="text-center">Download Report</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={report.reportId}>
                {/* Report Id */}
                <TableCell className="font-medium text-center">{report.reportId}</TableCell>

                {/* Date */}
                <TableCell className="text-center">{report.date}</TableCell>

                {/* Download Report */}
                <TableCell className="text-center">
                  <a href={report.downloadLink} download>
                    {Shared.Download}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPrescription;
