import {useEffect, useState} from "react";
import dashboardService, {
  DashboardSummary,
} from "../services/dashboardService";

export default function useDashboard(){
    const [summary, setSummary]=useState<DashboardSummary | null>(null);
    const [loading, setLoading]=useState(true);
    const [error, setError] = useState("");

    const loadDashboard = async()=>{
        try{
            setLoading(true);
            setError("");
            const data=await dashboardService.getSummary();

            console.log("Dashboard:",data);
            setSummary(data);
        }catch(error){
            console.error("Dashboard error:", error);
            if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load dashboard");
      }
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadDashboard();
    },[]);

    return{
        summary,
        loading,
        error,
        refresh: loadDashboard,
    };
}