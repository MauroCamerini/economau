import * as React from 'react';
import { createRoot } from 'react-dom/client';
import ChildTest from './Components/ChildTest';

const root = createRoot(document.getElementById('app'));
root.render(<ChildTest />);