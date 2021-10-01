import React, { useState, useEffect, useCallback } from 'react'
import { generatePhrases, copyTextToClipboard } from '../utils'
import { Container, Card, Row, Col, Button, ListGroup } from 'react-bootstrap'
import PassphraseCopyModal from './modals/PassphraseCopyModal'
import SettingsModal from './modals/SettingsModal'
import { useSelector, useDispatch } from 'react-redux'
import { phraseActions } from 'reducers/phraseSlice'

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
}

export default function FunctionalApp() {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showPassphraseModal, setShowPassphraseModal] = useState(false)

  const dispatch = useDispatch()
  const {
    phrases: phraseList,
    phraseCount,
    phraseLength,
    passType,
  } = useSelector((state) => state.phrases)

  const selectedList = useSelector((state) => state.words.wordList.name)
  const wordList = useSelector((state) => state.words.wordList.words)

  const template = templates[selectedList]

  const refreshPhrases = useCallback(() => {
    const phrases = generatePhrases(phraseCount, phraseLength, wordList, passType)
    dispatch(phraseActions.updatePhrases(phrases))
  }, [dispatch, passType, phraseCount, phraseLength, wordList])

  const handleClick = (phrase) => {
    const noSpaces = phrase.replace(/\s/g, '')
    copyTextToClipboard(noSpaces)
    dispatch(phraseActions.updateSelectedPhrase(noSpaces))
    setShowPassphraseModal(true)
  }

  useEffect(() => {
    refreshPhrases()
  }, [refreshPhrases])

  return (
    <Container>
      <h1 className="top-title">{template.title} Passphrase Generator</h1>
      <Row className="justify-content-center">
        <Col xs={12} sm={{ span: 8, offset: 2 }}>
          <Card>
            <ListGroup className="passphrases">
              {phraseList.map((phrase, i) => {
                return (
                  <Button
                    variant="light"
                    className="pw-text list-group-item"
                    onClick={() => {
                      handleClick(phrase)
                    }}
                    key={i}
                  >
                    {phrase}
                  </Button>
                )
              })}
            </ListGroup>
          </Card>
        </Col>
        <Col xs={4} sm={2}>
          <Button variant="outline-dark" onClick={refreshPhrases}>
            Refresh
          </Button>
          <Button
            variant="outline-dark"
            className="top-buffer"
            onClick={() => {
              setShowSettingsModal(true)
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
              <span className="code">jB2WvCp0</span>. My short-term memory span for such a password
              is basically one character, meaning I have to refer back to an 8-character password 8
              times in order to type it successfully. Also, typing capital letters on a smartphone
              screen is really annoying, and punctuation is even worse.
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
            <h3 className="section-title">Does this website save the passphrases it generates?</h3>
            <p>
              Nah, I wouldn't do that. But also, as a technical matter I <em>can't</em> do that,
              because this website doesn't actually generate passphrases, it just sends a list of
              words over to your browser and then <em>you</em> generate the passphrases by picking
              words at random from that list. So not only do I not save your passphrases, I never
              even know them, because I have no way of knowing what words you picked.
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
      <PassphraseCopyModal
        show={showPassphraseModal}
        setShow={(val) => setShowPassphraseModal(val)}
      />
      <SettingsModal
        show={showSettingsModal}
        setShow={(val) => setShowSettingsModal(val)}
        refreshPhrases={refreshPhrases}
      />
    </Container>
  )
}
