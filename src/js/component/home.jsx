import React, { useState, useEffect } from "react";


const Home = () => {

	const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/eurorincon";

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([])

	const createUser = async () =>{
		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify ([]),
			});

			if (response.ok) {
				const data = await response.json();
				console.log ('Usuario creado', data);
			}

			else {console.error('Error al crear el usuario', response.status)}
		}

		catch (error) {
			console.error(error);
		}
	}

	const getAllTask = async () =>{
		try {
			const response = await fetch(apiUrl);

			if (response.ok) {
				const data = await response.json();
				console.log (data);

				setTodos(data);
			
			}

			else {
				if (response.status === 404){
					console.log('Usuario no encontrado');
					createUser();
				}

				else {console.error('Error en la solicitud', response.status)}
			}
			
		} catch(error){console.error}
		
	}

	const addTask = async (value) =>{
		try{
			const newTask = {
				label: value,
				done: false
			};

			const updatedTask = [...todos, newTask];

			const putOptions = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify (updatedTask),
			};

			const putResponse = await fetch(apiUrl, putOptions);

			if (putResponse.ok) {
				setInputValue(""); 
				getAllTask();
			}

			else {
				console.error('Error al agregar la tarea')
			}
		}

		catch(error){
			console.error('Error al agregar la tarea', error)
		}
	}

	const deleteTask = async (id) => {
		const updatedList = todos.filter( (task)=> task.id !== id);
		setTodos(updatedList);
		if (updatedList.length === 0) {
			const defaultTask = {
				id: 1,
				label: "default task",
				done: false
			}
			updatedList.push(defaultTask);

	
		}
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify (updatedList),
		};
		await fetch(apiUrl, options).then((response)=>{
			if (!response.ok){console.error('Error al actualizar API')}

		})

	}

	useEffect (() => {
		getAllTask()}, [])

	 
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
						addTask(inputValue);
						}
					}}
					placeholder="What do you need to do?"></input>
				</li>
				{todos.map((item) => 
				{
					return(
						<li key={item.id}>
							{`${item.label}`}
							<i className="far fa-times-circle"
								onClick={() =>
									deleteTask(item.id)}></i>
						</li>)}
					)}
			</ul>
			<div>{todos.length} tasks</div>

		</div>
	);
};

export default Home;
