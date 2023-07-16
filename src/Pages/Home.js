import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <Container fluid className="p-3 mb-2">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Welcome to Budgeting App</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
