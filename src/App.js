import React, { Fragment, } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Containers/Home';
import PageNotFound from './Containers/PageNotFound';
import Loader from 'src/Components/Loader/index.js';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path={'/'} element={<Home />} />
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Loader />
    </Fragment>
  );
}

export default App;
