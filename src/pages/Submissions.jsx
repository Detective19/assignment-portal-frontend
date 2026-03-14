import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Submissions() {

  const { assignmentId } = useParams();

  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {

    try {

      const res = await API.get(`/submissions/assignment/${assignmentId}`);

      setSubmissions(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-center underline text-green-600">
        Submissions
      </h1>

      <div className="space-y-4">

        {submissions.length === 0 ? (

          <p className="text-center text-gray-500">
            No submissions yet.
          </p>

        ) : null}
        {submissions.map((submission) => (

          <div
            key={submission._id}
            className="border border-black p-4 rounded"
          >

            <p>
              <strong>Student:</strong>{" "}
              {submission.studentId.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {submission.studentId.email}
            </p>

            <p>
              <strong>Answer:</strong>{" "}
              {submission.answer}
            </p>

            <p className="text-sm text-gray-500">
              Submitted At:{" "}
              {new Date(submission.submittedAt).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Submissions;