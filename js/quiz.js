function checkAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  const feedback = document.getElementById('feedback');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'b') {
    feedback.innerHTML = '<b>Correct!</b> Assignment is most likely when the option is in-the-money near or at expiration.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>When the option is in-the-money near or at expiration.</b><br>Don’t worry — keep going, understanding comes with practice!';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerATM() {
  const selected = document.querySelector('input[name="atm-answer"]:checked');
  const feedback = document.getElementById('feedback-atm');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'b') {
    feedback.innerHTML = '<b>Correct!</b> ATM options have a strike price equal or close to the current stock price.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>When the stock price and strike price are nearly the same.</b><br>Keep going — you’re learning step by step!';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerExpiration() {
  const selected = document.querySelector('input[name="expiration-answer"]:checked');
  const feedback = document.getElementById('feedback-expiration');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> After expiration, an option becomes worthless and cannot be exercised.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>It becomes worthless and cannot be exercised.</b><br>Don’t worry — mastering options takes time!';
    feedback.className = 'feedback incorrect';
  }
}
function checkAnswerExtrinsic() {
  const selected = document.querySelector('input[name="extrinsic-answer"]:checked');
  const feedback = document.getElementById('feedback-extrinsic');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'b') {
    feedback.innerHTML = '<b>Correct!</b> Extrinsic value is the portion of the option’s price based on time and volatility, above intrinsic value.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>The value based on time and volatility, above intrinsic value.</b><br>Keep it up — repetition is key to mastering options!';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerGreeks() {
  const selected = document.querySelector('input[name="greeks-answer"]:checked');
  const feedback = document.getElementById('feedback-greeks');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> Theta measures how much an option’s price decays with the passage of time.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>Theta.</b> Theta represents the rate at which options lose value as time passes — also called time decay.<br>Nice try, keep going!';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerIntrinsic() {
  const selected = document.querySelector('input[name="intrinsic-answer"]:checked');
  const feedback = document.getElementById('feedback-intrinsic');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> A call option has intrinsic value when the stock price is above the strike price.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>Stock at $55, strike at $50.</b><br>That’s when the call is in-the-money and has intrinsic value. Keep it up!';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerOTM() {
  const selected = document.querySelector('input[name="otm-answer"]:checked');
  const feedback = document.getElementById('feedback-otm');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> A call option is out-of-the-money when the stock price is below the strike price.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>Stock at $40, strike at $50.</b><br>This means the call option has no intrinsic value. Keep going — you\'re doing great!';
    feedback.className = 'feedback incorrect';
  }
}


function checkAnswerPremium() {
  const selected = document.querySelector('input[name="premium-answer"]:checked');
  const feedback = document.getElementById('feedback-premium');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> $1.50 × 100 shares = $150 total premium paid.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>$150</b> — remember, one contract covers 100 shares.<br>Keep going — understanding options is a valuable skill!';
    feedback.className = 'feedback incorrect';
  }
}


function checkAnswerStrike() {
  const selected = document.querySelector('input[name="strike-answer"]:checked');
  const feedback = document.getElementById('feedback-strike');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> The strike price is the price at which the option holder can buy or sell the asset.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>The price at which the option holder can buy or sell the asset.</b><br>This is the core of what makes options valuable. Keep learning!';
    feedback.className = 'feedback incorrect';
  }
}


 function checkAnswerType() {
      const selected = document.querySelector('input[name="type-answer"]:checked');
      const feedback = document.getElementById('feedback-type');

      if (!selected) {
        feedback.innerHTML = 'Please select an answer before submitting.';
        feedback.className = 'feedback';
        return;
      }

      if (selected.value === 'c') {
        feedback.innerHTML = '<b>Correct!</b> Buying a call is bullish — you want the stock to rise so you can profit.';
        feedback.className = 'feedback correct';
      } else {
        feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>You want to profit if the stock price rises.</b><br>Try to link the strategy to the expected market move.';
        feedback.className = 'feedback incorrect';
      }
    }


    function checkAnswerCallVsStock() {
  const selected = document.querySelector('input[name="call-vs-stock-answer"]:checked');
  const feedback = document.getElementById('feedback-call-vs-stock');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'b') {
    feedback.innerHTML = '<b>Correct!</b> Call options let you benefit from stock moves with a smaller investment — but remember they carry expiration risk.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>It allows for greater potential return with a smaller initial investment.</b><br>Options are powerful, but timing and risk management matter!';
    feedback.className = 'feedback incorrect';
  }
}


function checkAnswerPutVsShort() {
  const selected = document.querySelector('input[name="put-vs-short-answer"]:checked');
  const feedback = document.getElementById('feedback-put-vs-short');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'b') {
    feedback.innerHTML = '<b>Correct!</b> Shorting a stock carries unlimited loss potential if the price keeps rising — unlike buying a put, where your loss is limited to the premium paid.';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>You can lose more than your initial investment.</b><br>Put options limit risk, while shorting can expose you to huge losses.';
    feedback.className = 'feedback incorrect';
  }
}

function checkAnswerITM() {
  const selected = document.querySelector('input[name="itm-answer"]:checked');
  const feedback = document.getElementById('feedback-itm');

  if (!selected) {
    feedback.innerHTML = 'Please select an answer before submitting.';
    feedback.className = 'feedback';
    return;
  }

  if (selected.value === 'c') {
    feedback.innerHTML = '<b>Correct!</b> A call option is in-the-money when the stock price is above the strike price (55 > 50).';
    feedback.className = 'feedback correct';
  } else {
    feedback.innerHTML = '<b>Not quite.</b> The correct answer is: <b>Stock at $55, strike at $50</b> — a call is ITM when spot is above strike.';
    feedback.className = 'feedback incorrect';
  }

  // optional: pomakni feedback u vidljivi dio ekrana
  if (typeof feedback.scrollIntoView === 'function') {
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}












