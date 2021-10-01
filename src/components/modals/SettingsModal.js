import { Col, Row, Button, Modal, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { phraseActions } from 'reducers/phraseSlice'

export default function SettingsModal(props) {
  const handleClose = () => {
    props.refreshPhrases()
    props.setShow(false)
  }

  const dispatch = useDispatch()
  const phrases = useSelector((state) => state.phrases)

  return (
    <Modal show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            Passphrase Length
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              value={phrases.phraseLength}
              onChange={(e) => {
                const val = Number(e.target.value)
                dispatch(phraseActions.updateLength(val))
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            Phrases to Create
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              value={phrases.phraseCount}
              onChange={(e) => {
                const val = Number(e.target.value)
                dispatch(phraseActions.updateCount(val))
              }}
            />
          </Col>
        </Form.Group>
        <Row>
          <Col>
            <Form>
              {['combo', 'words'].map((option) => {
                return (
                  <label key={`check-${option}`} htmlFor={`radio-${option}`}>
                    <Form.Check
                      inline
                      checked={phrases.passType === option}
                      type="radio"
                      name="radio2"
                      aria-label="radio 1"
                      label={option}
                      value={option}
                      id={`radio-${option}`}
                      onChange={() => dispatch(phraseActions.updatePasstype(option))}
                    />
                  </label>
                )
              })}
              {/* <label htmlFor="radio-combo">
                <Form.Check
                  inline
                  checked={phrases.passType === 'combo'}
                  type="radio"
                  name="radio2"
                  aria-label="radio 1"
                  value="combo"
                  label="combo"
                  id="radio-combo"
                  onChange={() => dispatch(phraseActions.updatePasstype('combo'))}
                />
              </label>
              <label htmlFor="radio-words">
                <Form.Check
                  inline
                  checked={phrases.passType === 'words'}
                  type="radio"
                  name="radio2"
                  aria-label="radio 2"
                  value="words"
                  label="words"
                  id="radio-words"
                  onChange={() => dispatch(phraseActions.updatePasstype('words'))}
                />
              </label> */}
            </Form>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={2} />
          <Col>
            <FormGroup onChange={this.handleRadio}>
              {['got', 'potter', 'narnia'].map(key => {
                return (
                  <Radio
                    checked={key === selectedList}
                    name="radioGroup"
                    key={key}
                    value={key}
                    inline
                    readOnly
                  >
                    {key}
                  </Radio>
                );
              })}
            </FormGroup>
          </Col>
        </Row> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleClose()
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
