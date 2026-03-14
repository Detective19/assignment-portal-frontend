import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {

  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreateAssignment = async (e) => {

  e.preventDefault();

  try {

    await API.post("/assignments", {
      title,
      description,
      dueDate
    });

    setTitle("");
    setDescription("");
    setDueDate("");

    fetchAssignments(); // doing this to refresh the list after creating a new assignment

  } catch (error) {
    console.log(error);
  }

};
    const publishAssignment = async (id) => {

  try {

    await API.put(`/assignments/${id}/publish`);

    fetchAssignments();

  } catch (error) {
    console.log(error);
  }

};

const completeAssignment = async (id) => {

  try {

    await API.put(`/assignments/${id}/complete`);

    fetchAssignments();

  } catch (error) {
    console.log(error);
  }

};

const navigate = useNavigate();

const viewSubmissions = (id) => {
  navigate(`/teacher/submissions/${id}`);
};

  const fetchAssignments = async () => {
  try {

    const res = await API.get("/assignments");

    const assignmentsData = res.data;

    const assignmentsWithSubmissions = await Promise.all(

      assignmentsData.map(async (assignment) => {

        const subRes = await API.get(
          `/submissions/assignment/${assignment._id}`
        );
        console.log("assignment", assignment._id);
console.log("submissions", subRes.data);
        return {
          ...assignment,
          submissions: subRes.data.length
        };

      })

    );

    setAssignments(assignmentsWithSubmissions);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-center underline">
        Teacher Dashboard
      </h1>

      <form
      onSubmit={handleCreateAssignment}
      className="border border-black p-4 rounded mb-6 space-y-3"
    >

      <h2 className="text-lg font-semibold">
        Create Assignment
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Assignment
      </button>

    </form>

      <div className="space-y-4">

        {assignments.map((assignment) => (

          <div
            key={assignment._id}
            className="border border-black p-4 rounded flex flex-col gap-2"
          >

            <h2 className="text-lg font-semibold">
              {assignment.title}
            </h2>

            <p>{assignment.description}</p>
             <p className="text-sm text-gray-500">
    Due Date:
    <span className="font-semibold text-gray-700 ml-1">
      {new Date(assignment.dueDate).toLocaleDateString()}
    </span>
  </p>

            <p className="text-sm font-semibold text-gray-500">
              Status : 
              <span
                className={`
                  ${assignment.status === "draft" ? "text-red-500" : ""}
                  ${assignment.status === "published" ? "text-yellow-500" : ""}
                  ${assignment.status === "completed" ? "text-green-600" : ""}
                `}
              >
                {" "}
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </p>

            <div className="flex justify-end text-sm text-gray-500">
              Total Submissions:
              <span className="font-semibold ml-1 text-gray-800">
                {assignment.submissions}
              </span>
            </div>
            <div className="flex gap-2 mt-3">

  {assignment.status === "draft" && (
    <button
      onClick={() => publishAssignment(assignment._id)}
      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
    >
      Publish
    </button>
  )}

  {assignment.status === "published" && (
    <button
      onClick={() => completeAssignment(assignment._id)}
      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
    >
      Complete
    </button>
  )}

  <button
    onClick={() => viewSubmissions(assignment._id)}
    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
  >
    View Submissions
  </button>

</div>
          </div>
          

        ))}
        
      </div>
      
    </div>
  );
}

export default TeacherDashboard;