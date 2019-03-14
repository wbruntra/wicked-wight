import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClippySVG from './clippy.svg';
import { upperFirst } from '../utils';
import { connect } from 'react-redux';
import * as actions from '../actions';

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Copied!</strong>
  </Tooltip>
);

class PassphraseCopyModal extends Component {
  handleCapNum = () => {
    const { phrases, updateSelectedPhrase } = this.props;
    const { selectedPhrase } = phrases;
    const newText = upperFirst(selectedPhrase) + '1';
    updateSelectedPhrase(newText);
  };

  handleRemoveSpaces = () => {
    const { phrases, updateSelectedPhrase } = this.props;
    const { selectedPhrase } = phrases;
    const newText = selectedPhrase.split(' ').join('');
    updateSelectedPhrase(newText);
  };

  handleUpdate = e => {
    this.props.updateSelectedPhrase(e.target.value);
  };

  render() {
    const { phrases } = this.props;
    const { selectedPhrase } = phrases;

    return (
      <Modal
        show={this.props.modals.box}
        onHide={() => {
          this.props.hideModal('box');
        }}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            Use the Passphrase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <p>
                Click the icon to copy what's in the box to your clipboard. If
                you want, you can edit the text yourself or automatically{' '}
                <a
                  onClick={() => {
                    this.handleRemoveSpaces();
                    console.log(this.refs.overlay.click);
                  }}
                  href="#remove-spaces"
                >
                  remove spaces
                </a>
                .
              </p>
            </Col>
            <Col xs={12} className="input-group">
              <Col xs={1} />
              <input
                onChange={this.handleUpdate}
                className="pw-text col-xs-8"
                value={selectedPhrase}
              />
              <span className="input-group-button col-xs-2">
                <CopyToClipboard text={selectedPhrase}>
                  <OverlayTrigger
                    ref="overlay"
                    trigger={['click']}
                    placement="right"
                    overlay={tooltip}
                    onClick={() => {
                      setTimeout(() => {
                        this.refs.overlay.hide();
                      }, 1200);
                    }}
                  >
                    <Button>
                      <img
                        alt="clipboard"
                        src={ClippySVG}
                        style={{ height: '24px' }}
                      />
                    </Button>
                  </OverlayTrigger>
                </CopyToClipboard>
              </span>
            </Col>
            <Col xs={12}>
              <p>
                Heedless of my efforts, some sites will not trust your password
                without a capital letter and a number, so you can click{' '}
                <a onClick={this.handleCapNum} href="#capital">
                  here
                </a>{' '}
                to fulfill that requirement in the simplest possible way.
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.props.hideModal('box');
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modals: state.modals,
  phrases: state.phrases,
});

export default connect(
  mapStateToProps,
  actions
)(PassphraseCopyModal);
