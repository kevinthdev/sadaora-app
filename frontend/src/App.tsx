import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { routes } from "./routes";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="md:h-screen md:pt-24">
          <Routes>
            {routes.map((route) => {
              const { path, element, isPrivate } = route;
              return (
                <Route
                  key={path}
                  path={route.path}
                  element={
                    isPrivate ? <AuthGuard>{element}</AuthGuard> : element
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
