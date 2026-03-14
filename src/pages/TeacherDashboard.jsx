import { useEffect, useState } from "react";
import API from "../services/api";

function TeacherDashboard() {

  const [assignments, setAssignments] = useState([]);

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

      <div className="space-y-4">

        {assignments.map((assignment) => (

          <div
            key={assignment._id}
            className="border p-4 rounded flex flex-col gap-2"
          >

            <h2 className="text-lg font-semibold">
              {assignment.title}
            </h2>

            <p>{assignment.description}</p>

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

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeacherDashboard;