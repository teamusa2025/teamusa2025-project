'use client';

import { Col, Container, Image, Row } from 'react-bootstrap';
import { Alert } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <div
        className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">
            Ensure that these requirements are met:
          </span>
          <ul className="mt-1.5 list-disc list-inside">
            <li>At least 10 characters (and up to 100 characters)</li>
            <li>At least one lowercase character</li>
            <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
          </ul>
        </div>
      </div>
      <div
        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Danger</span>
        <div>
          <span className="font-medium">
            Ensure that these requirements are met:
          </span>
          <ul className="mt-1.5 list-disc list-inside">
            <li>At least 10 characters (and up to 100 characters)</li>
            <li>At least one lowercase character</li>
            <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
          </ul>
        </div>
      </div>

      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image src="next.svg" width="150px" alt="" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
        </Col>
      </Row>
      <div className="bg-gray-100">
        <Dropdown label="Flowbite Dropdown Test">
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown>
      </div>
    </Container>
  </main>
);

export default Home;
