import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/headers/Navbar";
import Pages from "./components/pages/page";
import { DataProvider } from "./globalStates";
function App() {
  return (
    <DataProvider>
    <Router>
        <div>
          <Navbar />
          <Pages />
        </div>
      </Router>
     </DataProvider>
  );
}

export default App;
