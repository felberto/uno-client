import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import JoinLobbyModal from "../components/Modal/JoinLobbyModal";
import React from "react";

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <BrowserRouter>
            <JoinLobbyModal show={true}/>
        </BrowserRouter>);
});

describe('verify modal components', () => {

    it('should render one form field', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('should render 1 input fields', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    });

    it('should render 1 select fields', () => {
        expect(wrapper.find('select')).toHaveLength(1);
    });

    it('should render 2 labels', () => {
        expect(wrapper.find('label')).toHaveLength(2);
    });

    it('should render two buttons', () => {
        expect(wrapper.find('button')).toHaveLength(2);
    });
});

describe('enter data', () => {
    it('enter name to input field', () => {
        const findInput = wrapper => wrapper.find({'name': 'userName'}).hostNodes();

        expect(findInput(wrapper).prop('value')).toBe('');

        findInput(wrapper).instance().value = "someName";
        findInput(wrapper).simulate('change');
        expect(findInput(wrapper).prop('value')).toBe('someName');
    });
});