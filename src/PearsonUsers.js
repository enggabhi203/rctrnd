import React, { Component } from "react";
import axios from "axios";
import User from './User';

export default class PearsonUsers extends Component {
	constructor(props) {
		super(props);
		this.displayUsers = this.displayUsers.bind(this);
		this.removeDuplidateUsers = this.removeDuplidateUsers.bind(this);
		this.clearUser = this.clearUser.bind(this);

		this.state = {
			users: [
				{
					id: 1,
					first_name: "Eve",
					last_name: "Holt",
					avatar:
						"https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
				},
				{
					id: 2,
					first_name: "Charles",
					last_name: "Morris",
					avatar:
						"https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
				},
				{
					id: 3,
					first_name: "Tracey",
					last_name: "Ramos",
					avatar:
						"https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
				}
			]
		};
	}

	componentDidMount() {
		axios.get('https://reqres.in/api/users?page=1&per_page=10')
			.then(response => {
				let newUsers = this.removeDuplidateUsers([...this.state.users, ...response.data.data]);
				this.setState({ users: newUsers });
			})
			.catch(function (error) {
				// console.log(error);
			});
	}

	removeDuplidateUsers(users) {
		return users.filter((user, index, self) => {
			return index === self.findIndex(u => (u.id === user.id))
		});
	}

	clearUser(evt) {
		if (evt.target.nodeName === 'BUTTON') {
			let currentItem = Number(evt.target.id.split('item')[1]);
			let newUsers = [...this.state.users.slice(0, currentItem), ...this.state.users.slice(currentItem + 1, this.state.users.length)];
			this.setState({
				users: newUsers
			})
		}
	}

	displayUsers() {
		let { users } = this.state;
		return (
			<ul className="list container clearfix" onClick={this.clearUser}>
				{
					users.map((user, index) => <User key={user.id} index={index} user={user} />)
				}
			</ul>
		);
	}

	render() {
		return (
			<div className="pearson-users">
				<h1 className="container heading">Pearson User Management</h1>
				<div className="list-wrapper">
					{this.displayUsers()}
				</div>
			</div>
		);
	}
}
