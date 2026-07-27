import GrievanceForm from "../../components/grievance/GrievanceForm";

function NewGrievance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Grievance</h1>

        <p className="text-gray-500 mt-2">Submit a new grievance for review.</p>
      </div>

      <GrievanceForm />
    </div>
  );
}

export default NewGrievance;
