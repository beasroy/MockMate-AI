import AddNewInterview from "./_components/AddNewInterview";

const DashboardPage = ()=>{
    return(
        <div className="p-10">
           <h2 className="font-bold text-2xl text-sky-800">Dashboard</h2> 
           <h2 className="text-slate-500">Create and start your Ai Mockup Interview</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 my-5">
           <AddNewInterview />
           </div>
          
        </div>
    );
}

export default DashboardPage