import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

import Image1 from './IMG_2532.JPG';
import Image2 from './IMG_2582.JPG';
import Image3 from './IMG_2614.JPG';
import Image4 from './IMG_2629.JPG';
import Image5 from './IMG_9516.jpg';

function App() {
  const [showBirthdayAnimation, setShowBirthdayAnimation] = useState(true);
  const [confettiFinished, setConfettiFinished] = useState(false);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [showText, setShowText] = useState(true); // State to control text visibility
  const [imagesDisplayed, setImagesDisplayed] = useState(false); // State to track if images have been displayed
  const [showFinalMessage, setshowFinalMessage] = useState(false); // State to control text visibility
  const [sentences, setSentences] = useState([
    "Happy Birthday Natalia!",
    "I really appreciate spending the last couple months with you!",
    "23 is going to be the best year yet!",
    "Here's a couple photos of us so far :)"
  ]);

  const finalMessage = "I hope you have the best birthday ever! I know its only been a couple of months but I feel like I've known you for so much longer than that. We've definitely gone through a lot together, and even though its been tough, I think its brought us closer together! You're so beautiful inside and out and I can't wait to spend even more time with you! Happy Birthday and can't wait for our vacation in Arizona!"

  // Confetti animation
  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowBirthdayAnimation(false);
      setConfettiFinished(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(confettiTimer);
  }, []);

  // Sentence animation
  useEffect(() => {
    if (showBirthdayAnimation) {
      const sentenceTimer = setInterval(() => {
        setSentenceIndex(prevIndex => (prevIndex + 1) % sentences.length);
      }, 5000); // 5 seconds

      return () => clearInterval(sentenceTimer);
    }
  }, [showBirthdayAnimation, sentences.length]);

  const { width, height } = useWindowSize();

  var imgs = [Image1, Image2, Image3, Image4, Image5];

  const natimgs = imgs.map(image => (
    <img src={image} height={400} width={300} />
  ));

  useEffect(() => {
    if (confettiFinished && sentenceIndex === sentences.length - 1) {
      setImagesDisplayed(true); // Mark images as displayed
    }
  }, [confettiFinished, sentenceIndex, sentences.length]);

  useEffect(() => {
    const imagetimeout = setTimeout(() => {
    if (imagesDisplayed && sentenceIndex === sentences.length - 1) {
      setShowText(false); // Hide text after images are displayed
      setImagesDisplayed(false); // Mark images as displayed
    }}, 10000)
    return () => clearTimeout(imagetimeout);
  }, [imagesDisplayed, sentenceIndex, sentences.length]);

  useEffect(() => {
    if (!imagesDisplayed && !showText) {
      setshowFinalMessage(true); // Mark images as displayed
    }
  }, [imagesDisplayed, showText]);  

  return (
    <div className="container">
      {showBirthdayAnimation && (
        <Confetti
          width={width}
          height={height}
        />
      )}
      <div className={`page ${showText ? 'active' : ''}`}>
        {showText && <h1>{sentences[sentenceIndex]}</h1>}
        {imagesDisplayed && sentenceIndex === sentences.length - 1 && natimgs}
      </div>
      <div className={`page ${showFinalMessage ? 'finalMessage' : ''}`}>
        {showFinalMessage && finalMessage}
      </div>
    </div>
    
  );
}

export default App;
