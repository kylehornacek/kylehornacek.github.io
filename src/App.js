import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

function App() {
  const [showBirthdayAnimation, setShowBirthdayAnimation] = useState(true);
  const [confettiFinished, setConfettiFinished] = useState(false);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState([
    "Happy Birthday Natalia!",
    "I really appreciate you being in my life!",
    "23 is going to be the best year yet!",
    "Here's something to reflect on the last couple months!"
  ]);
  const [showSecondTitle, setShowSecondTitle] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowBirthdayAnimation(false); // Turn off confetti after 15 seconds
      setConfettiFinished(true); // Mark confetti animation as finished
    }, 25000); // 15 seconds in milliseconds

    return () => clearTimeout(confettiTimer); // Clean up timer on component unmount
  }, []);

  useEffect(() => {
    if (showBirthdayAnimation) {
      const sentenceTimer = setInterval(() => {
        setSentenceIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < sentences.length) {
            return nextIndex;
          } else {
            clearInterval(sentenceTimer); // Stop the timer when all sentences are displayed
            return prevIndex;
          }
        });
      }, 5000); // Display next sentence every 5 seconds during confetti animation

      return () => clearInterval(sentenceTimer); // Clean up timer on component unmount
    }
  }, [showBirthdayAnimation, sentences]);

  useEffect(() => {
    if (confettiFinished) {
      setShowSecondTitle(true);
      displayImages(); // Display images after confetti animation
    }
  }, [confettiFinished]);

  const displayImages = () => {
    // Placeholder image URLs
    const imageUrls = [
      'https://via.placeholder.com/150/0000FF',
      'https://via.placeholder.com/150/00FF00',
      'https://via.placeholder.com/150/FF0000',
      'https://via.placeholder.com/150/FFFF00',
      'https://via.placeholder.com/150/FF00FF',
    ];
    setImages(imageUrls);
  };

  const { width, height } = useWindowSize();

  return (
    <div className="container">
      {showBirthdayAnimation && (
        <Confetti
          width={width}
          height={height}
        />
      )}
      <div className={`page ${showBirthdayAnimation ? 'active' : ''}`}>
        <h1>{sentences[sentenceIndex]}</h1>
        {confettiFinished && sentenceIndex === sentences.length - 1 && (
          <p>{sentences[sentenceIndex]}</p>
        )}
      </div>
      {showSecondTitle && (
        <div className="page">
          <h1>Second Title</h1>
          {images.map((imageUrl, idx) => (
            <img
              key={idx}
              src={imageUrl}
              alt={`Image ${idx + 1}`}
              style={{ width: '100px', height: '100px', margin: '5px', objectFit: 'cover' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
