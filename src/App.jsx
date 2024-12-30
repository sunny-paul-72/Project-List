import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageChart from './PageChart/PageChart.jsx'
import Calculator from './Projects/Calculator/Calculator';
import ToDo from './Projects/ToDo-List/ToDo-List.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageChart />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path='/todo-list' element={<ToDo />} />
      </Routes>
    </>
  );
};

export default App;
