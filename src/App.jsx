import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Submissions from "./pages/Submissions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/teacher" element={<TeacherDashboard />} />

        <Route path="/student" element={<StudentDashboard />} />

        <Route path="/teacher/submissions/:assignmentId" element={<Submissions />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;