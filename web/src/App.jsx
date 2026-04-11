import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./Dashboard"
import Register from "./pages/Register"
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
</Routes>
  </div>
</UserProvider>
  )
}
export default App
