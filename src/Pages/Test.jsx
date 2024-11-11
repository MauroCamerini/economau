import * as React from 'react';
import { Button } from 'react-bootstrap';

export default function Test () {

    const handleClick = async () => {
        await window.db.testinsert()
    }

    return (<>
    <h2>THIS IS THE TEST PAGE</h2>
    <Button onClick={handleClick}>BOTONASO</Button>
    </>)
}