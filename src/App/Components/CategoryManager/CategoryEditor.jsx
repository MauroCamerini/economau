import * as React from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import CategoryPicker from "./CategoryPicker";
import { FilteredDataContext } from "../../Context/FilteredDataContext";

const TABLE_NAME = "categories";

/**
 * Component to create, edit, or delete categories.
 * 
 * @param {Object} [props.categoryItem] - An existing record from the `category_item` view for editing or deleting. If undefined, allows creating a new category.
 * @param {() => void} props.onDBResponse - Callback function to handle the database response.
 */
export default function CategoryEditor({ categoryItem, onDBResponse }) {
    const { data } = React.useContext(FilteredDataContext);

    // Controlled form values
    const [parentID, setParentID] = React.useState(categoryItem?.parentID || null);
    const [name, setName] = React.useState(categoryItem?.name || "");

    // Determine if this is an update operation
    const isUpdate = !!categoryItem;

    // Handle CRUD actions (create, update, delete)
    const handleAction = async (action) => {

        let response

        if(action === "save" && !name) throw new Error("EL nombre no puede ser vacio, donde mostramos los errores amigo?");
        

        if (!isUpdate) {
            // CREATE
            response = await window.ipc.insertData(TABLE_NAME, {
                name,
                parent_id: parentID,
            })

            // Cleans form
            setParentID(categoryItem?.id || null)
            setName(categoryItem?.name || "")

        } else if (action === "save") {
            // UPDATE
            response = await window.ipc.updateByID(TABLE_NAME, categoryItem.id, {
                name,
                parent_id: parentID,
            })
        } else if (action === "delete") {
            // DELETE
            response = await window.ipc.deleteByID(TABLE_NAME, categoryItem.id)
        }
        onDBResponse(response)
    }

    React.useEffect(() => {
        setParentID(categoryItem?.id || null)
        setName(categoryItem?.name || "")
    }, [categoryItem])

    return (
    <>
        <Row>
            {/* Input field for category name */}
            <Form.Group as={Col} controlId="categoryName">
                <Form.Label>Nombre de la categoría</Form.Label>
                <Form.Control
                value={name}
                type="text"
                placeholder="Nombre de la categoría"
                onChange={(e) => setName(e.target.value)}
                aria-label="Category name"
                />
            </Form.Group>

            {/* Category picker for parent category selection */}
            <Form.Group as={Col} controlId="categoryParent">
                <Form.Label>Dependencia</Form.Label>
                <CategoryPicker
                categoryItems={
                    isUpdate
                    ? data.filter((item) => !item.path.startsWith(categoryItem.path))
                    : data
                }
                currentItem={categoryItem}
                onCategoryPick={(cat) => setParentID(cat?.id || null)}
                allowRootValue
                />
            </Form.Group>

            {/* Action buttons */}
            <Col xs={2} className="d-flex justify-content-center align-items-end">
            <ButtonGroup>
            <Button
                variant="success"
                onClick={() => handleAction("save")}
                aria-label="Save category"
            >
                Guardar
            </Button>

            {isUpdate && (
                <Button
                variant="danger"
                onClick={() => handleAction("delete")}
                aria-label="Delete category"
                >
                Borrar
                </Button>
            )}
            
            </ButtonGroup>
            </Col>
        </Row>
    </>
    )
}
