import React from 'react';
import {render, screen} from '@testing-library/react';
import NavBar from '.';


// test navbar tag must include the nav tag
test('renders needed title', () => {
    const title = 'RS School Store';
    render(<NavBar onClick={()=> {}} count={5} title={title} key={1}/>);
    const linkElement = screen.getByText(title);
    expect(linkElement).toBeInTheDocument();
})

