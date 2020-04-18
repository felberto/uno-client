import React from 'react';
import Home from "../components/Home/Home"
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

describe('load Home', () => {
    it('compare snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Home/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});