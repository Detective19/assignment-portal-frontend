import { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {

  const [assignments, setAssignments] = useState([]);
  const [answers, setAnswers] = useState({});
  const [mySubmissions, setMySubmissions] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments/published");
      setAssignments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMySubmissions = async () => {
    try {
      const res = await API.get("/submissions/my");
      setMySubmissions(res.data.submissions || []);
    } catch (error) {
      console.log(error);
    }
  };

  const submitAnswer = async (assignmentId) => {
    try {

      await API.post("/submissions", {
        assignmentId,
        answer: answers[assignmentId]
      });

      alert("Answer submitted");

      fetchMySubmissions();

    } catch (error) {

      console.log(error);
      alert("You may have already submitted");

    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchMySubmissions();
  }, []);

  const availableAssignments = assignments.filter((assignment) => {

    const submission = mySubmissions.find(
      (s) => String(s.assignmentId?._id || s.assignmentId) === String(assignment._id)
    );

    return !submission;

  });

  const sortedSubmissions = [...mySubmissions].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-center underline">
        Student Dashboard
      </h1>


      <h2 className="text-xl font-semibold mb-4 text-blue-600 underline">
        Pending Assignments
      </h2>

      <div className="space-y-4">

        {availableAssignments.length === 0 ? (

          <p className="text-gray-500 text-sm">
            No pending assignments. Please check back later.
          </p>

        ) : (

          availableAssignments.map((assignment) => {

            const isExpired = new Date(assignment.dueDate) < new Date();

            return (

              <div
                key={assignment._id}
                className={`border p-4 rounded flex flex-col gap-2 ${
                  isExpired ? "border-red-500 bg-red-50" : "border-black"
                }`}
              >

                <h2 className="text-lg font-semibold">
                  📍 {assignment.title}
                </h2>

                <p>{assignment.description}</p>

                <p className="text-sm text-gray-500">
                  Due Date:
                  <span className="font-semibold ml-1">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </p>

                <textarea
                  placeholder="Write your answer..."
                  className="border p-2 w-full"
                  value={answers[assignment._id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [assignment._id]: e.target.value
                    })
                  }
                  disabled={isExpired}
                />

                {isExpired ? (

                  <p className="text-red-600 font-semibold">
                    Deadline Passed ⛔
                  </p>

                ) : (

                  <button
                    onClick={() => submitAnswer(assignment._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-fit"
                  >
                    Submit Answer
                  </button>

                )}

              </div>

            );

          })

        )}

      </div>


      <h2 className="text-xl font-semibold mt-10 mb-4 text-green-600 underline">
        Submitted Assignments
      </h2>

      <div className="space-y-4">

        {sortedSubmissions.length === 0 ? (

          <p className="text-gray-500 text-sm">
            No submissions yet
          </p>

        ) : (

          sortedSubmissions.map((submission) => (

            <div
              key={submission._id}
              className="border border-black p-4 rounded flex flex-col gap-2"
            >

              <h3 className="text-lg font-semibold">
                ✅ {submission.assignmentId?.title }
              </h3>

              <p className="text-green-600 font-semibold">
                Submitted ✔
              </p>

              <p>
                <strong>Your Answer:</strong> {submission.answer}
              </p>

              <p className="text-sm text-gray-500">
                Submitted On: {new Date(submission.submittedAt).toLocaleString()}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default StudentDashboard;