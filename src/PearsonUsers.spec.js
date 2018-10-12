import React from "react";
import { mount } from "enzyme";
import PearsonUsers from "./PearsonUsers";
import User from './User';

describe("<PearsonUsers /> Test Cases", () => {
	let component;

	beforeEach(() => {
		component = mount(<PearsonUsers />);
		let users = [
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
		];
		component.setState({ users });
	});

	it("Should render h1", () => {
		const h1 = component.find("h1");
		expect(h1.text()).toEqual("Pearson User Management");
	});

	it('Should display first name', () => {
		const item = component.find('.first_name');
		item.forEach((element, index) => {
			expect(element.text()).toEqual(component.state('users')[index].first_name);
		});
	});

	it('Should display three users', () => {
		const item = component.find(User);
		expect(item.length).toEqual(3);
	});

	it('Should display last name', () => {
		const item = component.find('.last_name');
		item.forEach((element, index) => {
			expect(element.text()).toEqual(component.state('users')[index].last_name);
		});
	});

	it('Should display avatar', () => {
		const item = component.find('.avatar');
		item.forEach((element, index) => {
			expect(element.prop('src')).toEqual(component.state('users')[index].avatar);
		});
	});

	it('Should delete the user on click of button', () => {
		const deleteBtn = component.find('#item-1 button');
		deleteBtn.simulate('click');
		expect(component.state('users').length).toEqual(2);
	});


	it('Should remove duplicate users', () => {
		let duplicateUsers = [
			{
				id: 1,
				first_name: "Eve",
				last_name: "Holt",
				avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
			},
			{
				id: 1,
				first_name: "Charles",
				last_name: "Morris",
				avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
			}
		];
		let obj = new PearsonUsers();
		expect(obj.removeDuplidateUsers(duplicateUsers).length).toBe(1);
	});
});
