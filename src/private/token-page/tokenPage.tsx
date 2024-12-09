import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const TokenPage = () =>{
    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState<Array<{doctorName:string,PatientToken:string}>>();

    useEffect(()=> {
        if(!localStorage.getItem('token'))  navigate("/")
        const fetchData = async () =>{
            try{
                const data = await axios.get("http://localhost:8081/api/AD/getTokenData",{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });

                if(data.status === 200){
                    const resp = data.data;
                    setTokenData(resp);
                }else if(data.status === 401){
                    navigate("/") ;  
                }
                else{
                    alert(data.data.message);
                }
            }catch(err){
                alert("Something Went Wrong");
            }
        }
        fetchData();
    },[]);
    
    return(
        <div className="min-h-[83svh]">
            {
                tokenData?.map((data)=>(<div>
                    <div>{data.doctorName}</div>
                    <div>{data.PatientToken}</div>
                </div>))
            }
        </div>
    )
}

export default TokenPage