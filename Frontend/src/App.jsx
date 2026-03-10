import { RouterProvider } from "react-router"
import { router } from "./router/app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import {InterviewProvider } from "./features/interview/interview.context.jsx"
import './style/button.scss'


const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App