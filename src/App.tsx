import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DisciplinePage from "./pages/DisciplinePage";
import DisciplineMenu from "./components/DisciplineMenu";

import { highJumpMen } from "./data/highJumpMen";
import { hundredMetersMen } from "./data/hundredMetersMen";

function App() {
  return (
    <BrowserRouter>
      <DisciplineMenu />

      <Routes>
        <Route
          path="/men/high-jump"
          element={
            <DisciplinePage
              title="Men's High Jump"
              subtitle="Men's high jump · outdoor & indoor"
              leaders={highJumpMen}
              reference={2.40}
              referenceLabel="2,40 m"
              unit="m"
              tickStep={0.05}
            />
          }
        />

        <Route
          path="/men/100m"
          element={
            <DisciplinePage
              title="Men's 100m"
              subtitle="Men's 100m · outdoor"
              leaders={hundredMetersMen}
              reference={9.77}
              referenceLabel="9,77 s"
              unit="s"
              lowerIsBetter
              tickStep={0.1}
            />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/men/high-jump" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;