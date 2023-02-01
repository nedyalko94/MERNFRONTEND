import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ResponseModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      
      </Modal.Header>
      <Modal.Body>
      <div>
        {props.msg}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='bg-dark text-light border border-0'>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}