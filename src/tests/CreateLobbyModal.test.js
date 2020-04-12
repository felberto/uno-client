import React from 'react';
import {BrowserRouter} from "react-router-dom";
import CreateLobbyModal from '../components/Modal/CreateLobbyModal';
import {mount} from "enzyme";
import '@testing-library/jest-dom/extend-expect';

let wrapper;

beforeEach(() => {
    // funktioniert nur mit mount, nicht mit shallow oder render
    wrapper = mount(
        <BrowserRouter>
            <CreateLobbyModal show={true}/>
        </BrowserRouter>);
});

describe('test modal ', () => {
    it('should render one form field', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('should render 2 input fields', () => {
        expect(wrapper.find('input')).toHaveLength(2);
    });

    it('should render 2 labels', () => {
        expect(wrapper.find('label')).toHaveLength(2);
    });

    it('should render two buttons', () => {
        expect(wrapper.find('button')).toHaveLength(2);
    });
});
