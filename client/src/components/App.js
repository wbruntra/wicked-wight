import React, { Component } from 'react';
import { generatePhrases } from '../utils';
import { Grid, Panel, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import PassphraseCopyModal from './PassphraseCopyModal';
import SettingsModal from './modals/SettingsModal';
import { connect } from 'react-redux';
import * as actions from '../actions';

const templates = {
  got: {
    title: 'Game of Thrones',
    pw1: 'hodor',
    pw2: 'h0dor',
    pw3: 'Hodor123',
  },
  potter: {
    title: 'Harry Potter',
    pw1: 'voldemort',
    pw2: 'v0ldemort',
    pw3: 'Voldemort123',
  },
};

class App extends Component {
  handleClick = phrase => {
    this.props.updateSelectedPhrase(phrase);
    this.props.showModal('box');
  };

  handleModalShow = name => {
    this.setState(prevState => ({
      modalVisibility: {
        ...prevState.modalVisibility,
        [name]: true,
      },
    }));
  };

  handleModalHide = name => {
    if (name === 'settings') {
      this.refreshPhrases();
    }
  };

  componentDidMount() {
    this.refreshPhrases();
  }

  refreshPhrases = () => {
    const { selectedList } = this.props.words;
    const wordList = this.props.words[selectedList];
    const { phraseCount, phraseLength } = this.props.phrases;
    const phrases = generatePhrases(phraseCount, phraseLength, wordList);
    this.props.updatePhrases(phrases);
  };

  render() {
    const { phrases } = this.props;
    const { phrases: phraseList } = phrases;
    const { selectedList } = this.props.words;
    const template = templates[selectedList];

    return (
      <Grid>
        <h1 className="top-title">{template.title} Passphrase Generator</h1>
        <Row>
          <Col xs={12} smOffset={2} sm={8} >
            <Panel>
              <ListGroup className="passphrases">
                {phraseList.map((p, i) => {
                  return (
                    <ListGroupItem
                      className="pw-text"
                      onClick={() => {
                        this.handleClick(p);
                      }}
                      key={i}
                    >
                      {p}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Panel>
          </Col>
          <Col xs={4} sm={2}>
            <Button onClick={this.refreshPhrases}>Refresh</Button>
          </Col>
          <Col xs={4} sm={2}>
            <Button
              className="top-buffer"
              onClick={() => {
                this.props.showModal('settings');
              }}
            >
              Settings
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              Increase your password strength using this xkcd-inspired passphrase generator with a{' '}
              <em>{template.title}</em> twist.
            </p>
            <div className="section">
              <h3 className="section-title">What's this about?</h3>
              <p>
                Whether your go-to is <span className="code">{template.pw1}</span>,{' '}
                <span className="code">{template.pw2}</span>, or{' '}
                <span className="code">{template.pw3}</span>, people tend to follow predictable
                patterns when tasked with creating a password. On the other hand, most
                computer-generated passwords look something like this mess:{' '}
                <span className="code">jB2WvCp0</span>. My short-term memory span for such a
                password is basically one character, meaning I have to refer back to an 8-character
                password 8 times in order to type it successfully. Also, typing capital letters on a
                smartphone screen is really annoying, and punctuation is even worse.
              </p>
              <p>
                So the main purpose here is to create fun passphrases that require an minimum of
                character manipulation and special symbols, and which you only have refer to once or
                twice in order to transcribe successfully. They also should be relatively easy to
                remember, at least compared to a random string of characters.
              </p>
            </div>
            <div className="section">
              <h3 className="section-title">How does it work?</h3>
              <p>
                The site picks at random from a list of the 4,000 most common words in the{' '}
                <em>{template.title}</em> series to generate a passphrase. That randomness makes for
                a pretty secure passphrase. For example, a four-word passphrase generated using this
                method offers better security than a random 8-character password consisting of
                letters and digits (there are almost 300 trillion possible four-word passphrases).
              </p>
              <p>
                Longer passphrases, naturally, are more secure. Each word added to the passphrase
                makes it 4,000 times harder to guess.
              </p>
            </div>
            <div className="section">
              <h3 className="section-title">
                Does this website save the passphrases it generates?
              </h3>
              <p>
                Nah, I wouldn't do that. But also, technically this website doesn't generate
                passphrases, it just sends the list of words over to your browser and then{' '}
                <em>you</em> generate the passphrases. So not only do I not save your passphrases, I
                never even knew them in the first place.
              </p>
            </div>
            <br />
            <p>
              <a href="https://xkcd.com/936/">Here</a> is the relevant xkcd.
            </p>
            <footer className="footer">
              <p className="top-buffer pull-right">Created by William Bruntrager</p>
            </footer>
          </Col>
        </Row>
        <PassphraseCopyModal />
        <SettingsModal />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  modals: state.modals,
  phrases: state.phrases,
  words: state.words,
});

export default connect(mapStateToProps, actions)(App);
