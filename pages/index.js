import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [feedBacks, setFeedbacks] = useState([]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.feedBacks));
  };

  const loadFeedbackHandler = (event) => {
    event.preventDefault();
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedback));
  };

  console.log(feedBacks);

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailInputRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackInputRef} rows={5} id="feedback"></textarea>
        </div>
        <button onClick={submitFormHandler}>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedbacks</button>

      <ul>
        {feedBacks.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
