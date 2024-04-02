import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layouts';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    console.error("Root element with id 'root' not found in the document.");
}
