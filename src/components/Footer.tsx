import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="bg-light mt-auto py-3">
    <Container>
      <Col className="text-center">
        Team USA 2025
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <a href="https://teamusa2025.github.io/">Project Home Page</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
