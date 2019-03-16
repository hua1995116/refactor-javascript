const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

const invoice = {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
}

function statement (invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
      // print line for this order
      result += `  ${playFor(perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}

function totalAmount() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}


function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber/100);
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}


function amountFor(aPerformacne) {
    let result = 0;
    switch (playFor(aPerformacne).type) {
    case "tragedy":
      result = 40000;
      if (aPerformacne.audience > 30) {
        result += 1000 * (aPerformacne.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformacne.audience > 20) {
        result += 10000 + 500 * (aPerformacne.audience - 20);
      }
      result += 300 * aPerformacne.audience;
      break;
    default:
        throw new Error(`unknown type: ${playFor(aPerformacne).type}`);
    }
    return result;
  }

const result = statement(invoice, plays);

console.log(result);