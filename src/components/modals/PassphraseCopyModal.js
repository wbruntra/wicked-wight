import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'
import ClippySVG from './clippy.svg'
import { upperFirst, copyTextToClipboard } from 'utils'
import { phraseActions } from 'reducers/phraseSlice'

import { useSelector, useDispatch } from 'react-redux'

const renderTooltip = (props) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Copied!
    </Tooltip>
  )
}

export default function NewPassModal(props) {
  const handleClose = () => props.setShow(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const target = useRef(null)

  const dispatch = useDispatch()
  const selectedPhrase = useSelector((state) => state.phrases.selectedPhrase)

  const editPhrase = (e) => {
    dispatch(phraseActions.updateSelectedPhrase(e.target.value))
  }

  const handleCapNum = () => {
    const newText = selectedPhrase.match(/\d$/) ? selectedPhrase : upperFirst(selectedPhrase) + '1'
    handleCopyText(newText)
    dispatch(phraseActions.updateSelectedPhrase(newText))
  }

  const handleCopyText = (text) => {
    copyTextToClipboard(text)
    setShowTooltip(true)

    window.setTimeout(() => {
      setShowTooltip(false)
    }, 1300)
  }

  useEffect(() => {
    copyTextToClipboard(selectedPhrase)
  }, [selectedPhrase])

  return (
    <Modal show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Use the Passphrase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <p>
              The passphrase below has been copied to your clipboard automatically. If you want,
              you can edit the text in the box; clicking the icon will copy your new text.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} className="input-group justify-content-center">
            <Col xs={8}>
              <input
                style={{ width: '95%' }}
                onChange={editPhrase}
                className="pw-text"
                value={selectedPhrase}
              />
            </Col>
            <span className="input-group-button col-xs-2">
              <OverlayTrigger
                overlay={renderTooltip}
                delay={{ show: 300 }}
                placement="right"
                show={showTooltip}
              >
                <Button
                  variant="outline-secondary"
                  ref={target}
                  onClick={() => {
                    setShowTooltip(true)
                    handleCopyText(selectedPhrase)
                  }}
                >
                  <img alt="clipboard" src={ClippySVG} style={{ height: '24px' }} />
                </Button>
              </OverlayTrigger>
            </span>
          </Col>
          <Col xs={12}>
            <p>
              Heedless of my efforts, some sites will not trust your password without a capital
              letter and a number, so you can click{' '}
              <a className="copy-trigger" onClick={handleCapNum}>
                here
              </a>{' '}
              to fulfill that requirement in the simplest possible way.
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            props.setShow(false)
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
