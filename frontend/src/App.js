import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [meetingLink, setMeetingLink] = useState('');
  const [email, setEmail] = useState('');
 
  const [meetings, setMeetings] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
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

    try {

      const response = await axios.post(
        'http://localhost:5000/api/start-bot',
        {
          meetingLink,
          email
        }
      );


      alert(response.data.message);

      loadMeetings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Failed to start bot'
      );

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
  
      console.log(response.data);
      setTranscript(
        response.data.transcript
      );
  
    } catch (error) {
  
      alert('Transcript not found');
  
    }
  
  };

  const viewSummary = async (id) => {

    try {
  
      const response = await axios.get(
        `http://localhost:5000/api/meetings/${id}/summary`
      );
      console.log('SUMMARY RESPONSE:', response.data);
      setSummary(
        response.data.summary
      );
  
    } catch (error) {
      console.log(error);
      alert('Summary not found');
  
    }
  
  };

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >

      <h1>AI Meeting Bot</h1>

      <input
        type="text"
        placeholder="Enter Google Meet Link"
        value={meetingLink}
        onChange={(e) =>
          setMeetingLink(e.target.value)
        }
        style={{
          width: '400px',
          padding: '10px'
        }}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: '400px',
          padding: '10px'
        }}
      />

      <br /><br />

      <button
        onClick={startMeeting}
        style={{
          padding: '10px 20px',
          marginRight: '10px'
        }}
      >
        Start Meeting Bot
      </button> 

      <hr style={{ marginTop: '40px' }} />

      <h2>Meeting History</h2>

      {meetings.length === 0 && (
        <p>No meetings found</p>
      )}

      {meetings.map((meeting) => (

        <div
          key={meeting.id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '15px'
          }}
        >

          <p>
            <strong>Email:</strong> {meeting.email}
          </p>

          <p>
            <strong>Status:</strong> {meeting.status}
          </p>

          <p>
            <strong>Created:</strong> {meeting.createdAt}
          </p>

          <p>
            <strong>Meeting Link:</strong>
            {' '}
            {meeting.meetingLink}
          </p>
          <button
  onClick={() =>
    viewTranscript(meeting.id)
  }
>
  View Transcript
</button>
<button
  onClick={() =>
    viewSummary(meeting.id)
  }
  style={{
    marginLeft: '10px'
  }}
>
  View Summary
</button>
<button
  onClick={() =>
    window.open(
      `http://localhost:5000/api/meetings/${meeting.id}/download-transcript`
    )
  }
  style={{
    marginLeft: '10px'
  }}
>
  Download Transcript
</button>

<button
  onClick={() =>
    window.open(
      `http://localhost:5000/api/meetings/${meeting.id}/download-summary`
    )
  }
  style={{
    marginLeft: '10px'
  }}
>
  Download Summary
</button>

{meeting.status === 'running' && (
  <button
    onClick={() => stopMeeting(meeting.id)}
    style={{
      marginLeft: '10px',
      background: 'red',
      color: 'white'
    }}
  >
    Stop Bot
  </button>
)}
        </div>

      ))}

{transcript && (

<div
  style={{
    marginTop: '30px',
    border: '1px solid black',
    padding: '20px'
  }}
>

  <h2>Transcript</h2>

  <pre
    style={{
      whiteSpace: 'pre-wrap'
    }}
  >
    {transcript}
  </pre>

</div>

)}
{summary && (

<div
  style={{
    marginTop: '30px',
    border: '1px solid green',
    padding: '20px'
  }}
>

  <h2>Summary</h2>

  <pre
    style={{
      whiteSpace: 'pre-wrap'
    }}
  >
    {summary}
  </pre>

</div>

)}

    </div>
  );

}

export default App;