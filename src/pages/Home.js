import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
	const [data, setData] = useState([]);

	const loadData = async () => {
		const response = await axios.get('http://localhost:5000/api/get');
		setData(response.data);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div className='container'>
			<table className='table'>
				<thead>
					<tr>
						<th>No.</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contact</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => {
						return (
							<tr key={item.id}>
								<th scope='row'>{index + 1}</th>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>{item.contact}</td>
								<td>
									<Link to={`/update/${item.id}`}>
										<button className='btn-small btn-primary'>Edit</button>
									</Link>
									<button className='btn-small btn-danger'>Delete</button>
									<Link to={`/view/${item.id}`}>
										<button className='btn-small btn-secondary'>View</button>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
