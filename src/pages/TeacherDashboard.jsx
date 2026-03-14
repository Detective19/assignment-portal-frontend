import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";



function TeacherDashboard() {

  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const logout = () => {

  localStorage.removeItem("token");

  navigate("/");

};

  const handleCreateAssignment = async (e) => {

    e.preventDefault();

    try {
        if (!title.trim() || !description.trim() || !dueDate.trim()) {  
            alert("All fields are required");
            return;
        }


      await API.post("api/assignments", {
        title,
        description,
        dueDate
      });

      setTitle("");
      setDescription("");
      setDueDate("");

      alert("Assignment created Successfully");

      fetchAssignments();

    } catch (error) {
      console.log(error);
    }

  };

  const publishAssignment = async (id) => {

    try {

      await API.put(`api/assignments/${id}/publish`);
      fetchAssignments();

    } catch (error) {
      console.log(error);
    }

  };

  const completeAssignment = async (id) => {

    try {

      await API.put(`api/assignments/${id}/complete`);
      fetchAssignments();

    } catch (error) {
      console.log(error);
    }

  };

  const deleteAssignment = async (id) => {

    try {

      await API.delete(`api/assignments/${id}`);
      fetchAssignments();

    } catch (error) {
      console.log(error);
    }

  };

  const editAssignment = async (assignment) => {

    const newTitle = prompt("Enter new title", assignment.title);
    const newDescription = prompt("Enter new description", assignment.description);
    const newDueDate = prompt(
      "Enter new due date (YYYY-MM-DD)",
      assignment.dueDate?.split("T")[0]
    );

    if (!newTitle || !newDescription || !newDueDate) return;

    try {

      await API.put(`api/assignments/${assignment._id}`, {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate
      });

      fetchAssignments();

    } catch (error) {
      console.log(error);
    }

  };

  const viewSubmissions = (id) => {
    navigate(`teacher/submissions/${id}`);
  };

  const fetchAssignments = async () => {

    try {

      const res = await API.get("api/assignments");

      const assignmentsData = res.data;

      const assignmentsWithSubmissions = await Promise.all(

        assignmentsData.map(async (assignment) => {

          const subRes = await API.get(
            `api/submissions/assignment/${assignment._id}`
          );

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

  const filteredAssignments = assignments.filter((assignment) => {

    if (filter === "all") return true;

    return assignment.status === filter;

  });

  return (

    <div className="relative p-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        <span className="underline">Teacher Dashboard</span>  👩🏻‍🏫
      </h1>

    <button
    onClick={logout}
    className="absolute top-7 right-10 bg-red-500 text-white px-3 py-1 rounded text-sm"
  >
    Logout
  </button>
      
      <form
        onSubmit={handleCreateAssignment}
        className="border border-black p-4 rounded mb-6 space-y-3"
      >

        <h2 className="text-lg font-semibold">
          Create Assignment ➕
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

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("all")}
          className="border px-3 py-1 rounded bg-gray-800 text-white"
        >
          All
        </button>

        <button
          onClick={() => setFilter("draft")}
          className="border px-3 py-1 rounded bg-yellow-500 text-white"
        >
          Draft
        </button>

        <button
          onClick={() => setFilter("published")}
          className="border px-3 py-1 rounded bg-blue-500 text-white"
        >
          Published
        </button>

        <button
          onClick={() => setFilter("completed")}
          className="border px-3 py-1 rounded bg-green-600 text-white"
        >
          Completed
        </button>

      </div>

      {/* ASSIGNMENT LIST */}

      <div className="space-y-4">

        {filteredAssignments.map((assignment) => (

          <div
            key={assignment._id}
            className="border border-black p-4 rounded flex flex-col gap-2"
          >

            <h2 className="text-lg font-semibold">
              📎 {assignment.title}
            </h2>

            <p>{assignment.description}</p>

            <p className="text-sm text-gray-500">
              Due Date:
              <span className="font-semibold text-gray-700 ml-1">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </p>

            <p className="text-sm font-semibold text-gray-500">
              Status:
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
                <>
                  <button
                    onClick={() => editAssignment(assignment)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteAssignment(assignment._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => publishAssignment(assignment._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Publish
                  </button>
                </>
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
