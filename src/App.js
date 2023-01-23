/**
 * Notes:
 * 
 * React version: 18.2.0.
 */

import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, /*HashRouter as Router,*/ Routes, Route } from "react-router-dom";

/* Foreign components */
import './style.css';
import Home, { Resume, Journey } from './Home.js';
import Case from './Case.js';

/* Libraries */
import { Transition, SwitchTransition, CSSTransition } from 'react-transition-group';



/**
 * App, the entry point
 */
function App() {

	/* Light mode */
	const [mode, setMode] = useState(localStorage&&localStorage.getItem("zhuanglingye_mode") ? localStorage.getItem("zhuanglingye_mode") : "light");  // light*, dark
	const toggleMode = () => {
		const prev_mode = mode;
		const new_mode = (prev_mode==="light" ? "dark" : "light");
		localStorage.setItem("zhuanglingye_mode", new_mode);
		setMode(new_mode);
	}
	useEffect (() => {
		if (localStorage && !localStorage.getItem("zhuanglingye_mode")) {
			localStorage.setItem("zhuanglingye_mode", "light");
		}
	}, []);

	/* Render */
	return (
		<div className="mode">
			<Router /*basename={process.env.PUBLIC_URL}*/><Routes>

				{/* Home */}
				<Route path='/' element = {
					<Home
						mode={mode}
						toggleMode={toggleMode}
					/>
				}>
					<Route path="/resume" element={ <Resume mode={mode} /> } />
					<Route path="/journey" element={ <Journey mode={mode} /> }></Route>
				</Route>

				{/* Cases */}
				<Route path="/case-ACM" element={ <Case case="ACM" mode={mode} toggleMode={toggleMode} /> } />
				<Route path="/case-Bitsrealm" element={ <Case case="Bitsrealm" mode={mode} toggleMode={toggleMode} /> } />
				<Route path="/case-RehaBuddy" element={ <Case case="RehaBuddy" mode={mode} toggleMode={toggleMode} /> } />
				<Route path="/case-CruzRoja" element={ <Case case="CruzRoja" mode={mode} toggleMode={toggleMode} /> } />

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
