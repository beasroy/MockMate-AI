import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const DashboardPage = ()=>{
    return(
        <div className="p-10 max-md:p-5">
           <h2 className="font-bold text-2xl text-sky-800 mt-10 max-md:mt-12">Dashboard</h2> 
           <h2 className="text-slate-500">Create and start your Ai Mockup Interview</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 my-5">
           <AddNewInterview />
           </div>

           {/* Previous interview list */}
          <InterviewList />
        </div>
    );
}

export default DashboardPage