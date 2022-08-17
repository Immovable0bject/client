import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const [employees, setEmployees] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [newName, setNewName] = useState('');
	const [newDepartment, setNewDepartment] = useState('');
	const [newAddress, setNewAddress] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/').then((response) => {
			const { data } = response;
			setEmployees(data.result);
		});

		axios.get('http://localhost:3001/departments').then((response) => {
			const { data } = response;
			setDepartments(data.result);
		});
	}, []);

	const addEmployee = () => {
		const name = newName.trim();
		const department = newDepartment;
		const address = newAddress.trim();
		if (name && department && address) {
			axios
				.post('http://localhost:3001/', {
					name,
					department,
					address,
				})
				.then((response) => {
					const { data } = response;
					setEmployees([...employees, data.result]);
					setNewName('');
					setNewAddress('');
					setNewDepartment('');
				});
		}
	};

	const onChangeHandler = (id, key, value) => {
		console.log({ id, key, value });
		setEmployees((values) => {
			return values.map((item) =>
				item.id === id ? { ...item, [key]: value } : item
			);
		});
	};

	const updateAddress = (id) => {
		const data = employees.find((item) => item.id === id);
		axios.put(`http://localhost:3001/${id}`, data).then((response) => {
			toast.success('Employee updated successfully', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		});
	};

	const deleteNotify = () =>
		toast.success('Employee deleted successfully', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const deleteEmployee = (id) => {
		axios.delete(`http://localhost:3001/${id}`).then((response) => {
			setEmployees((values) => {
				return values.filter((item) => item.id !== id);
			});
			deleteNotify();
		});
	};

	return (
		<div className='container d-flex align-items-center'>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
			/>
			<table className='table'>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>Name</th>
						<th>Department</th>
						<th>Address</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => {
						const { id, name, address, department } = employee;
						return (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td>{department}</td>
								<td>{address}</td>
								<td>
									<button
										className='btn btn-primary'
										onClick={() => updateAddress(id)}
									>
										Update
									</button>
									<button
										className='btn btn-danger'
										onClick={() => deleteEmployee(id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td>
							<div className='input-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Add name here...'
									value={newName}
									onChange={(e) => setNewName(e.target.value)}
								/>
							</div>
						</td>
						<td>
							<div>
								<select
									className='form-select'
									onChange={(e) => setNewDepartment(e.target.value)}
									value={newDepartment}
								>
									<option selected>Select department</option>
									{departments.map((department) => {
										const { id, name } = department;
										return (
											<option key={id} value={id}>
												{name}
											</option>
										);
									})}
								</select>
							</div>
						</td>
						<td>
							<div className='input-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Add address here...'
									value={newAddress}
									onChange={(e) => setNewAddress(e.target.value)}
								/>
							</div>
						</td>
						<td>
							<button className='btn btn-success' onClick={addEmployee}>
								Add Employee
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default App;
