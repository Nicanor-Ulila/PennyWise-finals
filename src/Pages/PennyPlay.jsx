import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import DbHeader from "../Components/DbHeader";

// All 40 questions with 3 similar choices
const allQuestions = [
  { question: "You receive a bonus at work. What’s your first move?", options: [
    { text: "Save or invest it immediately", type: "savings" },
    { text: "Treat yourself and use the rest wisely", type: "expense" },
    { text: "Save a portion and use the rest on a few upgrades", type: "expense" },
  ] },
  { question: "Your car breaks down unexpectedly. How do you handle the cost?", options: [
    { text: "Dip into your emergency fund", type: "savings" },
    { text: "Use a credit card to cover the cost", type: "expense" },
    { text: "Ask a friend for a loan to cover the cost", type: "expense" },
  ] },
  { question: "You find a great deal on an item you don’t need immediately. What’s your decision?", options: [
    { text: "Buy it now to save money later", type: "expense" },
    { text: "Wait until you truly need it", type: "savings" },
    { text: "Buy it and store it for future use", type: "savings" },
  ] },
  { question: "You receive unexpected inheritance money. What’s your first step?", options: [
    { text: "Invest in long-term assets", type: "savings" },
    { text: "Buy something you’ve always wanted", type: "expense" },
    { text: "Pay off any outstanding debts", type: "savings" },
  ] },
  { question: "You want to remodel your home. How do you plan the budget?", options: [
    { text: "Save first and plan carefully", type: "savings" },
    { text: "Take a loan to start immediately", type: "expense" },
    { text: "Use a credit card for some expenses and save for the rest", type: "expense" },
  ] },
  { question: "Your favorite store announces a huge sale. How do you respond?", options: [
    { text: "Buy only what you planned to", type: "savings" },
    { text: "Take advantage of the sale and stock up", type: "expense" },
    { text: "Buy the essentials and skip the extras", type: "savings" },
  ] },
  { question: "You get a raise at work. What do you do with the extra income?", options: [
    { text: "Increase your savings contributions", type: "savings" },
    { text: "Increase your spending on lifestyle upgrades", type: "expense" },
    { text: "Save half and spend the other half on non-essentials", type: "expense" },
  ] },
  { question: "You find out that your favorite hobby requires a lot of money. How do you handle this?", options: [
    { text: "Cut back on spending elsewhere to fund your hobby", type: "expense" },
    { text: "Consider whether the hobby is worth the expense and save more", type: "savings" },
    { text: "Look for cheaper alternatives to maintain the hobby", type: "savings" },
  ] },
  { question: "A family member asks you to lend money. What’s your response?", options: [
    { text: "Lend the money because it's family", type: "expense" },
    { text: "Politely decline and suggest other ways to help", type: "savings" },
    { text: "Offer a smaller loan that’s easier to manage", type: "expense" },
  ] },
  { question: "You’re planning a vacation. How do you save for it?", options: [
    { text: "Save up by cutting back on non-essential expenses", type: "savings" },
    { text: "Put it on a credit card and pay later", type: "expense" },
    { text: "Set up a dedicated vacation fund and save a little each month", type: "savings" },
  ] },
  { question: "You get an unexpected bonus at work. How do you use it?", options: [
    { text: "Invest it for future growth", type: "savings" },
    { text: "Buy something special for yourself", type: "expense" },
    { text: "Put it into your emergency fund", type: "savings" },
  ] },
  { question: "You're considering buying a new gadget. What do you do?", options: [
    { text: "Buy it immediately", type: "expense" },
    { text: "Wait for a sale", type: "savings" },
    { text: "Save up for it over time", type: "savings" },
  ] },
  { question: "You want to start a new hobby that requires upfront costs. How do you approach it?", options: [
    { text: "Invest in quality tools and supplies", type: "expense" },
    { text: "Save for the hobby slowly over time", type: "savings" },
    { text: "Find cheaper alternatives", type: "savings" },
  ] },
  { question: "You have a credit card debt. What do you do first?", options: [
    { text: "Pay it off as quickly as possible", type: "savings" },
    { text: "Only make minimum payments to keep cash flow", type: "expense" },
    { text: "Put it off and use the money for something else", type: "expense" },
  ] },
  { question: "A new subscription service catches your eye. What do you do?", options: [
    { text: "Sign up immediately for convenience", type: "expense" },
    { text: "Evaluate if it's necessary and then decide", type: "savings" },
    { text: "Skip it and save money", type: "savings" },
  ] },
  { question: "You want to take a vacation. What’s your plan?", options: [
    { text: "Put it on a credit card and pay later", type: "expense" },
    { text: "Save money each month until you can afford it", type: "savings" },
    { text: "Take a quick weekend trip instead to save money", type: "savings" },
  ] },
  { question: "Your favorite clothing brand has a sale. What do you do?", options: [
    { text: "Buy the clothes now and stock up", type: "expense" },
    { text: "Only buy what you need", type: "savings" },
    { text: "Avoid the sale entirely to save more", type: "savings" },
  ] },
  { question: "You get a raise. How do you allocate the extra money?", options: [
    { text: "Increase savings contributions", type: "savings" },
    { text: "Upgrade your lifestyle with nicer things", type: "expense" },
    { text: "Split it between savings and some small luxuries", type: "expense" },
  ] },
  { question: "You’re considering buying a new car. How do you approach it?", options: [
    { text: "Purchase a brand new car, even if it's expensive", type: "expense" },
    { text: "Buy a used car to save money", type: "savings" },
    { text: "Wait until you can pay for it in full", type: "savings" },
  ] },
  { question: "You want to remodel your house. What do you do?", options: [
    { text: "Take out a loan to finance the project", type: "expense" },
    { text: "Save money for the remodel over time", type: "savings" },
    { text: "Do small updates yourself to reduce costs", type: "savings" },
  ] },
  { question: "You’ve been invited to a wedding. What’s your approach to the gift?", options: [
    { text: "Buy a lavish gift to impress", type: "expense" },
    { text: "Buy a thoughtful, but affordable gift", type: "savings" },
    { text: "Send a small cash gift", type: "savings" },
  ] },
  { question: "You need a new phone. What do you do?", options: [
    { text: "Buy the latest model", type: "expense" },
    { text: "Buy a slightly older model to save money", type: "savings" },
    { text: "Hold off on the purchase until you really need it", type: "savings" },
  ] },
  { question: "You receive a tax refund. How do you use it?", options: [
    { text: "Invest it for the future", type: "savings" },
    { text: "Treat yourself to something nice", type: "expense" },
    { text: "Pay down debt", type: "savings" },
  ] },
  { question: "A friend asks to borrow money. What’s your response?", options: [
    { text: "Lend them the money without hesitation", type: "expense" },
    { text: "Lend only what you can afford to part with", type: "expense" },
    { text: "Politely decline, offering non-financial help", type: "savings" },
  ] },
  { question: "You want to buy a new television. How do you handle it?", options: [
    { text: "Buy a top-tier model regardless of cost", type: "expense" },
    { text: "Buy a mid-range model that offers good value", type: "savings" },
    { text: "Wait until the price drops", type: "savings" },
  ] },
  { question: "You find a great deal on a new laptop. What do you do?", options: [
    { text: "Buy it because it's a great price", type: "expense" },
    { text: "Wait until your current laptop fully breaks down", type: "savings" },
    { text: "Only buy if you truly need it", type: "savings" },
  ] },
  { question: "You are considering a weekend getaway. How do you handle the expense?", options: [
    { text: "Book it now, worry about the cost later", type: "expense" },
    { text: "Save up for the trip before booking", type: "savings" },
    { text: "Look for cheaper options or local activities", type: "savings" },
  ] },
  { question: "You want to get a gym membership. What do you do?", options: [
    { text: "Sign up immediately because it's important to your health", type: "expense" },
    { text: "Look for discounts or trials before committing", type: "savings" },
    { text: "Try home workouts to save money", type: "savings" },
  ] },
  { question: "You’re considering a career change. What financial decision do you make?", options: [
    { text: "Save money for a few months to cushion the transition", type: "savings" },
    { text: "Take the risk and hope the new career pays off quickly", type: "expense" },
    { text: "Keep both jobs to ensure steady income", type: "savings" },
  ] },
  { question: "You’re about to move into a new apartment. What’s your approach?", options: [
    { text: "Spend extra for a place in a great location", type: "expense" },
    { text: "Choose a place that’s affordable and fits your budget", type: "savings" },
    { text: "Move in with a friend to save money", type: "savings" },
  ] },
  { question: "You want to buy a new wardrobe. How do you handle the cost?", options: [
    { text: "Buy everything you want at once", type: "expense" },
    { text: "Buy only essentials and wait for sales", type: "savings" },
    { text: "Spend a little each month on a few new items", type: "savings" },
  ] },
  { question: "You want to go to a concert. What’s your approach?", options: [
    { text: "Buy tickets right away for the best seats", type: "expense" },
    { text: "Wait for a discount or cheaper tickets", type: "savings" },
    { text: "Skip the concert and save the money", type: "savings" },
  ] },
  { question: "A friend invites you on a trip abroad. How do you handle it?", options: [
    { text: "Book your ticket and go without thinking about the cost", type: "expense" },
    { text: "Save for the trip over the next few months", type: "savings" },
    { text: "Politely decline to save money", type: "savings" },
  ] },
  { question: "You get a promotion at work. How do you use the extra money?", options: [
    { text: "Increase your standard of living", type: "expense" },
    { text: "Save it for future investments", type: "savings" },
    { text: "Spend a little more on entertainment and luxuries", type: "expense" },
  ] },
  { question: "You’re considering buying a new sofa. What’s your plan?", options: [
    { text: "Buy a high-end sofa immediately", type: "expense" },
    { text: "Look for deals and buy it later", type: "savings" },
    { text: "Buy a used sofa to save money", type: "savings" },
  ] },
  { question: "A new season of your favorite show is coming out. What do you do?", options: [
    { text: "Subscribe to a streaming service to watch it", type: "expense" },
    { text: "Wait until it’s available for free", type: "savings" },
    { text: "Skip it and save the money", type: "savings" },
  ] },
  { question: "You want to buy a new fitness tracker. What do you do?", options: [
    { text: "Buy the latest model for all the features", type: "expense" },
    { text: "Wait until a sale or discount", type: "savings" },
    { text: "Keep using the old one until it stops working", type: "savings" },
  ] },
  { question: "You want to upgrade your kitchen. What’s your plan?", options: [
    { text: "Do a full remodel with new appliances", type: "expense" },
    { text: "Save money for the remodel over time", type: "savings" },
    { text: "Renovate a few key areas to improve the space", type: "savings" },
  ] },
  { question: "You’re thinking about investing in stocks. What do you do?", options: [
    { text: "Start investing immediately without much research", type: "expense" },
    { text: "Save for an emergency fund first before investing", type: "savings" },
    { text: "Do extensive research and then invest wisely", type: "savings" },
  ] },
  { question: "You want to join a professional association. What’s your plan?", options: [
    { text: "Sign up immediately to network and grow", type: "expense" },
    { text: "Evaluate if it's worth the cost and join later", type: "savings" },
    { text: "Skip it to save money for now", type: "savings" },
  ] },
  { question: "You want to buy a new bike. How do you handle it?", options: [
    { text: "Buy the most expensive one for the best quality", type: "expense" },
    { text: "Buy a mid-range bike that fits your needs", type: "savings" },
    { text: "Look for second-hand bikes to save money", type: "savings" },
  ] }
  // Add the rest of the questions (total of 40 questions)
  // Ensure all 40 questions are here
];

const PennyPlay = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);

  const startGame = () => {
    const shuffledQuestions = [...allQuestions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    const selectedQuestions = shuffledQuestions.slice(0, 5);
    setQuestionSet(selectedQuestions);
    setGameStarted(true);
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const handleAnswer = (text, type) => {
    setAnswers([...answers, { question: questionSet[currentQuestion].question, answerText: text, answerType: type }]);
    if (currentQuestion + 1 < questionSet.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getJudgment = () => {
    const savingsCount = answers.filter((answer) => answer.answerType === "savings").length;
    const expenseCount = answers.length - savingsCount;

    if (savingsCount > expenseCount) {
      return {
        title: "Excellent Financial Mindset!",
        message: "You consistently make wise financial decisions.",
        recommendation: "Consider exploring investment opportunities to grow your savings further.",
      };
    } else {
      return {
        title: "Consider Reviewing Your Spending Habits",
        message: "Your answers suggest a preference for immediate gratification over long-term planning.",
        recommendation: "Start tracking your expenses and setting achievable financial goals.",
      };
    }
  };

  const { title, message, recommendation } = showResult ? getJudgment() : {};

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-[#f5e8c7] to-[#ebd4b5]">
      <Sidebar />
      <div className="flex flex-col flex-grow p-6">
        <DbHeader />
        {!gameStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
              PennyPlay 🎮
            </h2>
            <p className="text-xl mb-6 text-gray-700 text-center">
              Test your financial habits and gain insightful advice tailored to you! 💰💡
            </p>
            <button
              onClick={startGame}
              className="bg-[#435585] text-white px-8 py-4 text-lg rounded-lg shadow-md hover:shadow-lg hover:bg-[#1d1f25] transition-all"
            >
              Play the Game 🎲
            </button>
          </div>
        ) : !showResult ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-3/4 max-w-3xl p-6 bg-white shadow-lg rounded-xl">
              <div className="absolute top-2 right-2 text-sm text-gray-500">
                Question {currentQuestion + 1} / {questionSet.length}
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {questionSet[currentQuestion].question} 🤔
              </h2>
              <div className="grid gap-4 mt-4">
                {questionSet[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.text, option.type)}
                    className="bg-[#435585] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform shadow-md"
                  >
                    {option.text} 🏦
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white p-6 rounded-xl shadow-md w-3/4 max-w-2xl text-center">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                {title} 🎉
              </h2>
              <p className="text-lg mb-4 text-gray-700">{message}</p>
              <p className="text-lg font-semibold text-gray-800">{recommendation}</p>
              <div className="mt-6 text-left">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Your Answers 📝:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {answers.map((answer, index) => (
                    <li key={index}>
                      <strong>Question {index + 1}:</strong> {answer.question} <br />
                      <strong>Your Answer:</strong> "{answer.answerText}" <br />
                      <strong>Type:</strong> {answer.answerType === "savings" ? "Savings-oriented 💸" : "Expense-oriented 💳"}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={startGame}
                className="mt-6 bg-[#435585] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform shadow-md"
              >
                Play Again 🔁
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default PennyPlay;
