import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [meetingLink, setMeetingLink] = useState('');
  const [email, setEmail] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const loadMeetings = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/meetings'
      );

      setMeetings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMeetings();

    const interval = setInterval(() => {
      loadMeetings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startMeeting = async () => {
    if (!meetingLink || !email) {
      alert('Please enter both Google Meet link and email.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/api/start-bot',
        {
          meetingLink,
          email
        }
      );

      alert(response.data.message);

      setMeetingLink('');
      loadMeetings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Failed to start bot'
      );
    } finally {
      setLoading(false);
    }
  };

  const stopMeeting = async (botId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/stop-bot',
        {
          botId
        }
      );

      alert(response.data.message);

      setTimeout(() => {
        loadMeetings();
      }, 3000);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Failed to stop bot'
      );
    }
  };

  const viewTranscript = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/meetings/${id}/transcript`
      );

      setTranscript(response.data.transcript);
      setSummary('');
    } catch (error) {
      alert('Transcript not found');
    }
  };

  const viewSummary = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/meetings/${id}/summary`
      );

      setSummary(response.data.summary);
      setTranscript('');
    } catch (error) {
      alert('Summary not found');
    }
  };
  const parseSummary = (text) => {
    const sections = {
      summary: '',
      actions: [],
      decisions: [],
      deadlines: []
    };
  
    const summaryMatch = text.match(
      /MEETING SUMMARY\s*([\s\S]*?)(?=\nACTION ITEMS|\nDECISIONS|\nDEADLINES|$)/i
    );
  
    const actionMatch = text.match(
      /ACTION ITEMS\s*([\s\S]*?)(?=\nDECISIONS|\nDEADLINES|$)/i
    );
  
    const decisionMatch = text.match(
      /DECISIONS\s*([\s\S]*?)(?=\nDEADLINES|$)/i
    );
  
    const deadlineMatch = text.match(
      /DEADLINES\s*([\s\S]*?)(?=\n----------------------|$)/i
    );
  
    if (summaryMatch) {
      sections.summary = summaryMatch[1].trim();
    }
  
    if (actionMatch) {
      sections.actions = actionMatch[1]
        .split('\n')
        .map(item => item.replace(/^-\s*/, '').trim())
        .filter(item => item && item !== 'None identified');
    }
  
    if (decisionMatch) {
      sections.decisions = decisionMatch[1]
        .split('\n')
        .map(item => item.replace(/^-\s*/, '').trim())
        .filter(item => item && item !== 'None identified');
    }
  
    if (deadlineMatch) {
      sections.deadlines = deadlineMatch[1]
        .split('\n')
        .map(item => item.replace(/^-\s*/, '').trim())
        .filter(item => item && item !== 'None identified');
    }
  
    return sections;
  };

  const getStatusText = (status) => {
    if (status === 'running') return 'Processing';
    if (status === 'completed') return 'Completed';
    if (status === 'failed') return 'Failed';
    return status || 'Unknown';
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <div className="brand">
            <span className="brand-icon">✦</span>
            MeetMind AI
          </div>

          <p className="tagline">
            Your intelligent meeting assistant
          </p>
        </div>

        <div className="ai-badge">
          <span className="status-dot"></span>
          AI Powered
        </div>
      </header>


      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <span className="eyebrow">
            INTELLIGENT MEETING AUTOMATION
          </span>

          <h1>
            Never miss what
            <br />
            <span>matters in a meeting.</span>
          </h1>

          <p>
            MeetMind joins your Google Meet, captures the conversation,
            creates a transcript and extracts actionable meeting intelligence.
          </p>
        </div>


        {/* Start Meeting Card */}
        <div className="meeting-card">

          <h2>Start a new meeting</h2>

          <p className="card-description">
            Enter your meeting details and let MeetMind handle the rest.
          </p>

          <label>Google Meet link</label>

          <div className="input-wrapper">
            <span>🔗</span>

            <input
              type="text"
              placeholder="https://meet.google.com/..."
              value={meetingLink}
              onChange={(e) =>
                setMeetingLink(e.target.value)
              }
            />
          </div>


          <label>Email address</label>

          <div className="input-wrapper">
            <span>✉</span>

            <input
              type="email"
              placeholder="Where should we send the meeting notes?"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>


          <button
            className="start-button"
            onClick={startMeeting}
            disabled={loading}
          >
            {loading ? 'Starting MeetMind...' : 'Start Meeting'}
            {!loading && <span>→</span>}
          </button>

          <p className="privacy-note">
            🔒 Your meeting data stays locally processed.
          </p>

        </div>

      </section>


      {/* How it works */}
      <section className="how-section">

        <div className="section-heading">
          <span className="eyebrow">HOW IT WORKS</span>

          <h2>
            From conversation to
            <span> clarity.</span>
          </h2>
        </div>


        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <div>
              <h3>Join</h3>
              <p>MeetMind automatically joins your Google Meet.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div>
              <h3>Capture</h3>
              <p>Meeting audio is securely captured and transcribed.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div>
              <h3>Understand</h3>
              <p>Important actions, decisions and deadlines are extracted.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div>
              <h3>Deliver</h3>
              <p>Meeting notes are sent directly to your email.</p>
            </div>
          </div>

        </div>

      </section>


      {/* Meeting History */}
      <section className="history-section">

        <div className="history-header">
          <div>
            <span className="eyebrow">YOUR MEETINGS</span>
            <h2>Meeting History</h2>
          </div>

          <span className="meeting-count">
            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''}
          </span>
        </div>


        {meetings.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">◌</div>
            <h3>No meetings yet</h3>
            <p>
              Start your first meeting above and your history will appear here.
            </p>
          </div>
        )}


        <div className="meeting-list">

          {meetings.map((meeting) => (

            <div
              className="history-card"
              key={meeting.id}
            >

              <div className="history-main">

                <div className="meeting-icon">
                  🎙
                </div>

                <div className="meeting-info">

                  <div className="meeting-title-row">
                    <h3>Google Meet Session</h3>

                    <span
                      className={`status status-${meeting.status}`}
                    >
                      <span></span>
                      {getStatusText(meeting.status)}
                    </span>
                  </div>

                  <p className="meeting-email">
                    {meeting.email}
                  </p>

                  <p className="meeting-date">
                    {meeting.createdAt}
                  </p>

                  <p className="meeting-link">
                    {meeting.meetingLink}
                  </p>

                </div>

              </div>


              <div className="history-actions">

                <button
                  onClick={() =>
                    viewTranscript(meeting.id)
                  }
                >
                  Transcript
                </button>

                <button
                  onClick={() =>
                    viewSummary(meeting.id)
                  }
                >
                  Summary
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:5000/api/meetings/${meeting.id}/download-transcript`
                    )
                  }
                >
                  ↓ Transcript
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:5000/api/meetings/${meeting.id}/download-summary`
                    )
                  }
                >
                  ↓ Summary
                </button>

                {meeting.status === 'running' && (
                  <button
                    className="stop-button"
                    onClick={() =>
                      stopMeeting(meeting.id)
                    }
                  >
                    Stop
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Transcript */}
      {transcript && (
        <section className="result-section">

          <div className="result-header">
            <span className="result-icon">📝</span>

            <div>
              <span className="eyebrow">MEETING OUTPUT</span>
              <h2>Transcript</h2>
            </div>
          </div>

          <div className="result-content">
            <pre>{transcript}</pre>
          </div>

        </section>
      )}


      {/* Summary */}
      {summary && (
        <section className="result-section summary-result">

          <div className="result-header">
            <span className="result-icon">✦</span>

            <div>
              <span className="eyebrow">MEETING INTELLIGENCE</span>
              <h2>Summary</h2>
            </div>
          </div>

          <div className="result-content structured-summary">

  {(() => {
    const data = parseSummary(summary);

    return (
      <>
        <div className="summary-block">
          <div className="summary-block-title">
            <span>📝</span>
            <h3>Meeting Summary</h3>
          </div>

          <p>{data.summary || 'No summary available.'}</p>
        </div>


        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-card-header">
              <span>✓</span>
              <h3>Action Items</h3>
            </div>

            {data.actions.length > 0 ? (
              <ul>
                {data.actions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-result">
                No action items identified.
              </p>
            )}
          </div>


          <div className="summary-card">
            <div className="summary-card-header">
              <span>◆</span>
              <h3>Decisions</h3>
            </div>

            {data.decisions.length > 0 ? (
              <ul>
                {data.decisions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-result">
                No decisions identified.
              </p>
            )}
          </div>


          <div className="summary-card">
            <div className="summary-card-header">
              <span>◷</span>
              <h3>Deadlines</h3>
            </div>

            {data.deadlines.length > 0 ? (
              <ul>
                {data.deadlines.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-result">
                No deadlines identified.
              </p>
            )}
          </div>

        </div>
      </>
    );
  })()}

</div>

        </section>
      )}


      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <span>✦</span> MeetMind AI
        </div>

        <p>
          Intelligent meeting automation • Built for the future of work
        </p>
      </footer>

    </div>
  );
}

export default App;