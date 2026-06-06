
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [meetingLink, setMeetingLink] = useState('');

const [email, setEmail] = useState('');
const [botId, setBotId] = useState(null);

  const startMeeting = async () => {

    try {

      const response = await axios.post(
        'http://localhost:5000/api/start-bot',
  
{
  meetingLink,
  email
}

      );
setBotId(response.data.botId);

alert(response.data.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Failed to start bot'
      );

    }

  };

  const stopMeeting = async () => {

    try {

      const response = await axios.post(
  'http://localhost:5000/api/stop-bot',
  {
    botId
  }
);

      alert(response.data.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Failed to stop bot'
      );

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

      <button
        onClick={stopMeeting}
        style={{
          padding: '10px 20px'
        }}
      >
        Stop Meeting Bot
      </button>

    </div>
  );

}

export default App;
