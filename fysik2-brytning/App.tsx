import React, { useState } from 'react';
import { ControlsView } from './components/ControlsView';
import { SimulationView } from './components/SimulationView';

const App: React.FC = () => {
  const [n1, setN1] = useState<number>(1.0);
  const [n2, setN2] = useState<number>(1.52);
  const [incidentAngle, setIncidentAngle] = useState<number>(-40);

  return (
    <div className="min-h-screen bg-sky-100 text-slate-800 font-sans flex flex-col">
      <header className="p-4 sm:p-6 bg-white/60 backdrop-blur-sm border-b border-sky-200 shadow-lg text-center sticky top-0 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-600">Snells Lag Interaktiv Simulering</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Utforska ljusets brytning vid gränsytan mellan två medier.</p>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
        <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0">
          <ControlsView
            n1={n1}
            setN1={setN1}
            n2={n2}
            setN2={setN2}
            incidentAngle={incidentAngle}
            setIncidentAngle={setIncidentAngle}
          />
        </div>
        <div className="flex-grow lg:w-2/3 xl:w-3/4 min-h-[400px] lg:min-h-0">
           <SimulationView
            n1={n1}
            n2={n2}
            incidentAngle={incidentAngle}
            setIncidentAngle={setIncidentAngle}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
