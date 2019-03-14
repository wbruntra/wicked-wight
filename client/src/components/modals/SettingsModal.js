import React, { Component } from 'react';
import { generatePhrases } from '../../utils';

import { Col, Row, Button, Modal, Radio, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SettingsModal extends Component {
  changeWordList = key => {
    const existingList = this.props.words[key];
    if (!existingList) {
      this.props
        .fetchWordlist(key)
        .then(() => {
          this.props.updateSelectedWordlist(key);
        })
        .catch(err => {
          console.log('Could not get list');
        });
    } else {
      this.props.updateSelectedWordlist(key);
    }
  };

  handleHide = () => {
    const { phraseCount, phraseLength } = this.props.phrases;
    const { selectedList } = this.props.words;
    const wordList = this.props.words[selectedList];
    const phrases = generatePhrases(phraseCount, phraseLength, wordList);
    this.props.updatePhrases(phrases);
    this.props.hideModal('settings');
  };

  handleUpdate = e => {
    this.props.editPhrase(e.target.value);
  };

  handleRadio = e => {
    this.changeWordList(e.target.value);
  };

  render() {
    const { phrases } = this.props;
    const { selectedList } = this.props.words;

    return (
      <Modal
        show={this.props.modals.settings}
        onHide={this.handleHide}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={2} />
            <Col>
              <div className="input-group col-sm-5">
                <span className="input-group-addon">Passphrase Length</span>
                <input
                  className="form-control"
                  type="number"
                  value={phrases.phraseLength}
                  onChange={e => {
                    const val = Number(e.target.value)
                    this.props.updateLength(val);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={2} />
            <div className="input-group col-sm-5">
              <span className="input-group-addon">Phrases to Create</span>
              <input
                className="form-control"
                aria-describedby="sizing-addon2"
                type="number"
                value={phrases.phraseCount}
                onChange={e => {
                  const val = Number(e.target.value)
                  this.props.updateCount(val);
                }}
              />
            </div>
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
              this.handleHide();
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
  words: state.words,
});

export default connect(
  mapStateToProps,
  actions
)(SettingsModal);
