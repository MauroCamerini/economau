import * as React from 'react';
import { createRoot } from 'react-dom/client';
import UI from './UI/UI';



const root = createRoot(document.getElementById('app'));
root.render(<>
    <UI />
</>);