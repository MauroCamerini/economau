import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/index';


const root = createRoot(document.getElementById('app'));
root.render(<>
    <App />
</>);