import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style.css';
import Home from './Home.js';

function App() {

  /* Light mode */
  const [mode, setMode] = useState("light");  // light*, dark
  const toggleMode = () => {
    setMode (prev => prev==="light" ? "dark" : "light");
  }

  /* Render */
  return (
    <div className="mode">
      <Home
        mode={mode}
        toggleMode={toggleMode}
      />
      <Router><Routes>
        <Route path='/' element={<Home />} />
      </Routes></Router>
    </div>
  );
}

export default App;

/*
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<AboutPage />} />
        <Route path='/Login' element={<LoginPage
          user={user}
          setUser={setUser}
          pwd={pwd}
          setPwd={setPwd}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
          />}
        />
        <Route path='/SignUp' element={<SignUpPage 
          user={user}
          setUser={setUser}
          pwd={pwd}
          setPwd={setPwd}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
          successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}/>}
        />
        <Route
          path='/upload'
          element={<UploadPage
            addedPics={addedPics}
            setAddedPics={setAddedPics}
            addedPicsUrl={addedPicsUrl}
            setAddedPicsUrl={setAddedPicsUrl}
            formDataList={formDataList}
            setFormDataList={setFormDataList}
            completePercentages={completePercentages}
            setCompletePercentages={setCompletePercentages}
            addedLabels={addedLabels}
            setAddedLabels={setAddedLabels}
            picAnnotation={picAnnotation}
            setPicAnnotation={setPicAnnotation}
            user={user}
            // success={success}
            // setSuccess={setSuccess}
          />}
        />
        <Route
          path='/explore'
          //exact // use 'exact' when there are multiple paths with similar names: https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path
          element={<ExplorePage
            filterList={filterList}
            setFilterList={setFilterList}
            facetList={facetList}
            setFacetList={setFacetList}
          />}
        />
        <Route
          path='/admin'
          element={<AdminPage />}
        />
      </Routes>
    </Router>
  );
}
*/
