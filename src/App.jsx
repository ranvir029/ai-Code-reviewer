import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EditorPart from './components/EditorPart';

const App = () => {
  return (
    <div
      className="
        h-screen w-full bg-[#d3e1c9]
        overflow-hidden
        lg:overflow-hidden
        md:overflow-auto
      "
    >
      <Navbar />
      <EditorPart />
    </div>
  );
};

export default App;
