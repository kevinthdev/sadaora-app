import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { routes } from "./routes";
import AuthGuard from "./components/AuthGuard";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="md:h-screen md:pt-24">
          <ErrorBoundary>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
