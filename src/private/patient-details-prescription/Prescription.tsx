import { useEffect, useState } from "react";
import "./Prescription.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const Prescription = () => {
	const [rows, setRows] = useState([1]);
	const [ndata,setNdata] = useState<{name:string,age:number,sex:string,id:string,course:string,medHis:string,famHis:string,allergies:string,reports:[],reason:string}>();
	const [stock,setStock] = useState<Array<{id:number,name:string}>>()
	
	const age = (dob:string) =>{
		const diff_ms = Date.now() - (new Date(dob).getTime());

		const age_dt = new Date(diff_ms);

		return Math.abs(age_dt.getUTCFullYear() - 1970);
	}

	useEffect(()=>{
		
		const fetchData = async () => {

			try{

				const resp = await axios.get("http://localhost:8081/api/doctor/getPatient",{
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("token")}`
					}
				});
				
				const response = resp.data;
				
				const formatData = {
					name:response.patient.name,
					age:age(response.patient.dateOfBirth),
					sex:response.patient.gender,
					id:response.patient.email.substring(0,response.patient.email.indexOf("@")),
					course:response.patient.school,
					medHis:response.medicalDetails.medicalHistory,
					famHis:response.medicalDetails.familyMedicalHistory,
					allergies:response.medicalDetails.allergies,
					reports:response.prescriptions,
					reason:response.reason
					
				};
				setNdata(formatData)
			}catch(err){	
				console.log(err);
			}
		}
		fetchData();

		const fetchMed = async () =>{
			try{
				const resp = await axios.get("http://localhost:8081/api/stock/",{
					headers:{
						Authorization:`Bearer ${localStorage.getItem("token")}`
					}
				});

				const response = resp.data;
			
			}catch(err){
				console.log(err)
			}
		}
	},[])

  // Function to add a row
  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  // Function to remove the last row
  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  return (
    <div className="h-[83%] p-5 flex flex-col">
      <div className="patient-details-container">
        <div className="patient-details-content gap-12">
          <img
            className="w-[15%] border-black border"
            src="/public/default-user.jpg"
            alt="Profile Picture"
          />
          <div className="details-section">
            <div className="input-field">
              <label>Name:</label>
              <input type="text" value={ndata?.name} disabled />
            </div>
            <div className="input-field">
              <label>Age:</label>
              <input type="text" value={ndata?.age} disabled />
            </div>
            <div className="input-field">
              <label>Sex:</label>
              <input type="text" value={ndata?.sex} disabled />
            </div>
            <div className="input-field">
              <label>ID:</label>
              <input type="text" value={ndata?.id} disabled />
            </div>
            <div className="input-field">
              <label>School:</label>
              <input type="text" value={ndata?.course} disabled />
            </div>
          </div>
          <div className="options-section">
            <Popover>
              <PopoverTrigger className="history-btn">
                Medical History
              </PopoverTrigger>
              <PopoverContent>{ndata?.medHis}</PopoverContent>
            </Popover>
            <Popover>
              
              <PopoverTrigger className="history-btn">
                Family Medical History
              </PopoverTrigger>
              <PopoverContent>
				{ndata?.famHis}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="history-btn">Allergies</PopoverTrigger>
              <PopoverContent>{ndata?.allergies}</PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="history-btn">Reports</PopoverTrigger>
              <PopoverContent>{ndata?.reports}</PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>Reason for Visit:</label>
            <textarea
              className="h-full p-2 bg-white"
              placeholder={ndata?.reason}
              disabled
            ></textarea>
          </div>
        </div>
        <div className="prescription-section">
          <div className="prescription-heading-container">
            <h1 className="prescription-heading">Prescription</h1>
          </div>
          <div className="prescription-box">
            <div className="prescription-header">
              <div className="logo-placeholder">
                <img
                  src="/public/upes-logo.png"
                  alt="Logo"
                  className="logo-image"
                />
              </div>
              <h2 className="prescription-title">INFIRMARY</h2>
              <div className="prescription-date">24-09-12</div>
            </div>
            <hr className="header-divider" />
            <div className="patient-details-section">
              <div className="patient-info">
                <div className="info-field name-field">
                  <label>Name:</label>
                  <input type="text" value={ndata?.name} className="info-input" />
                </div>
                <div className="info-field age-field">
                  <label>Age:</label>
                  <input type="text" value={ndata?.age} className="info-input age-input" />
                </div>
                <div className="info-field sex-field">
                  <label>Sex:</label>
                  <input type="text" value={ndata?.sex} className="info-input sex-input" />
                </div>
              </div>
              <div className="additional-info">
                <div className="info-field">
                  <label>ID:</label>
                  <input type="text" value={ndata?.id} className="info-input" />
                </div>
                <div className="info-field">
                  <label>School:</label>
                  <input type="text" value={ndata?.course} className="info-input" />
                </div>
              </div>
            </div>
            <hr className="section-divider" />
            <div className="diagnosis-section">
              <label>Diagnosis:</label>
              <textarea
                className="diagnosis-input"
                placeholder="Enter diagnosis here..."
              ></textarea>
            </div>
            <div className="medicine-section">
              <h2 className="medicine-heading">Medicine</h2>
              <table className="medicine-table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Medicine</th>
                    <th>Dosage (per day)</th>
                    <th>Duration (Days)</th>
                    <th>Suggestions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="search-box">
                          <input type="text" placeholder="Search Medicine..." />
                        </div>
                      </td>
                      <td>
                        <input type="text" className="small-input" />
                      </td>
                      <td>
                        <input type="text" className="small-input" />
                      </td>
                      <td>
                        <input type="text" className="suggestions-input" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-actions">
                <button className="add-btn" onClick={addRow}>
                  Add
                  {/* <img src="/add.png" alt="" width={20} /> */}
                </button>
                <button className="remove-btn" onClick={removeRow}>
                  Remove
                  {/* <img src="/remove.png" alt="" width={15} />s */}
                </button>
              </div>
            </div>
            <div className="dietary-section">
              <label>Dietary Recommendations:</label>
              <textarea
                className="dietary-input"
                placeholder="Enter dietary recommendations here..."
              ></textarea>
            </div>
            <div className="tests-section">
              <label>Tests Needed:</label>
              <textarea
                className="tests-input"
                placeholder="Enter tests needed here..."
              ></textarea>
            </div>
            <div className="signature-section">
              <div className="signature-wrapper">
                <img
                  src="/public/sig.png"
                  alt="Signature"
                  className="signature-image"
                />
                <div className="signature-text">Dr. Name</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
