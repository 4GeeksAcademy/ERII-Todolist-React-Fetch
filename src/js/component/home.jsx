import React, { useState, useEffect } from "react";


const Home = () => {

	const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/eurorincon";

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([])

	const fetchData = async () => {
		try {
		  const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			},
		  });
	
		  if (response.ok) {
			const data = await response.json();
			console.log(data);
			
			const loadedData = data.map((e) => e.label);
			setTodos(...loadedData)
			console.log(loadedData)
			console.log(todos)
			
			// setSentences([...loadedData]);
			// console.log(JSON.stringify(loadedData));
		  }
		} catch (error) {
		  console.error(error);
		}
	  };
	  fetchData(); 
	 

	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li><input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setTodos(todos.concat(inputValue));
							setInputValue("");
						}
					}}
					placeholder="What do you need to do?"></input>
				</li>
				{todos.map((item, index) => 
				{
					return(
						<li>
							{item}{""}
							<i className="far fa-times-circle"
								onClick={() =>
									setTodos(
										todos.filter(
											(t, currentIndex) => index != currentIndex))}></i>
						</li>)}
					)}
			</ul>
			<div>{todos.length} tasks</div>

		</div>
	);
};

export default Home;
