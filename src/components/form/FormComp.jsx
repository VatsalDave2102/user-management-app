import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
const FormComp = () => {
    const navigate = useNavigate()
    function submitHandler(){
       navigate('/home')
    }
  return (
    <Container fluid = 'md mt-5'>
    <Form onSubmit={submitHandler}>
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  )
}

export default FormComp