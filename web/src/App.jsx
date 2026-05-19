import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./Dashboard"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import GpaCalculator from "./pages/GpaCalculator"
import AdminDashboard from "./AdminDashboard"
import { UserProvider } from "./context/context"
import AcademicYear from "./pages/AcademicYear"
import QuickLinks from "./pages/QuickLinks"

function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/calculator" element={<GpaCalculator/>}></Route>
          <Route path="/academic" element={<AcademicYear/>}></Route>
          <Route path="/links" element={<QuickLinks/>}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        </Routes>
      </div>
    </UserProvider>
  )
}
export default App
