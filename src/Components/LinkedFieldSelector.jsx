import * as React from 'react'
import SelectLinkedField from './SelectLinkedField';
import { DatabaseContext } from '../Context/DatabaseContext';
import { Container, Col, Row } from "react-bootstrap";

export default function LinkedFieldSelector({ register }) {

    const { linkedFields } = React.useContext(DatabaseContext);

    return (
        <Row>
        {linkedFields.map((linkedField) => (
          <Col key={linkedField.TableName}>
            <SelectLinkedField
              
              linkedField={linkedField}
              register={register}
            />
          </Col>
        ))}
        </Row>
    );
  }