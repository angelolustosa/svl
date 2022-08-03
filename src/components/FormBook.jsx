import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function FormBook() {
  const [validated, setValidated] = useState(false);
  let [cities, setCities] = useState([]);
  let [selectedCity, setSelectedCity] = useState();
  let [states, setStates] = void([]);

  const estados = []

  const fetchStates = () => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(response => response.json())
      .then(data => {
        console.log(`states`, data)
        setStates(data)
      })
  }

  const fetchCities = city => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${city}/distritos`)
      .then(response => response.json())
      .then(data => {
        let cities = []
        console.log(`cities`, data)
        data.map((state, index) => cities.push(<option key={index} value={state.sigla}>{state.nome}</option>))
        setCities(cities)
      })
  }

  useEffect(() => {
    fetchStates();
    /* fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/CE/distritos")
      .then(response => response.json())
      .then(data => {
        //console.log(`data`, data)
        setStates(data)
      }) */
  }, [])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className='mt-5' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Título</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="digite o titulo do livro"
          //defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="digite o titulo do livro"
          //defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group> */}
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Estado</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => {
            console.log(`estado_selecionado:`, e.target.value)
            //setSelectedCity(e.target.value)
            fetchCities(e.target.value)
          }}>
            <option>Selecione</option>
            {states.map((city, index) => <option key={index} value={city.sigla}>{city.nome}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Cidade</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Selecione</option>
            {cities}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
            {/* {console.log(`states:`, states)} */}
            {/* {states.map((state, index) => (
              //console.log(`state:`, index, state)

              <option key={index} value={state.sigla}>{state.nome}</option>
            ))} */}
            {/* {states.map((state, index) => <option key={index} value={state.sigla}>{state.nome}</option>)} */}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

