// external import
import { Card, Col, Row } from "react-bootstrap"

const CardView = ({ title, description }) => {
    const desc = description.slice(0, 60)
    return (
        <Col className="mb-5">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <hr />
                    <Card.Text>
                        {desc}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default CardView