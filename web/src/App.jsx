import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./Dashboard"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import { UserProvider } from "./context/context"

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
        </Routes>
      </div>
    </UserProvider>
  )
}
export default App
