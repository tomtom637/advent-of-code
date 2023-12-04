/** Convert string input to array of strings */
export function convertInputToArray(input: string) {
  return input.split("\n");
}

/** Retrieves a scratchcard information */
export function getCardInfo(card: string) {
  const [cardNumber, cardValues] = card.split(":");
  const [, cardId] = cardNumber.split(" ");
  const [winningNumbers, scratchNumbers] = cardValues.split("|");
  const winning = winningNumbers
    .split(" ")
    .map(n => parseInt(n))
    .filter(n => !isNaN(n));
  const scratch = scratchNumbers
    .split(" ")
    .map(n => parseInt(n))
    .filter(n => !isNaN(n));
  return { cardId, winning, scratch };
}

/** Calculate scratchcard points */
export function getPoints(card: string) {
  const { winning, scratch } = getCardInfo(card);
  const winningNumbers = [];
  for (const number of winning) {
    if (scratch.includes(number)) {
      winningNumbers.push(number);
    }
  }
  let scratchPoints = 0;
  for (let i = 0; i < winningNumbers.length; i++) {
    if (i === 0) {
      scratchPoints += 1;
    } else {
      scratchPoints = scratchPoints * 2;
    }
  }
  return scratchPoints;
}

type Scratchcard = {
  id: string;
  instances: number;
};

/** Calculate scratchcards amount */
export function getScratchcardsAmount(input: string[]) {
  const scratchcards: Scratchcard[] = [];
  input.forEach(line => {
    scratchcards.push({
      id: getCardInfo(line).cardId,
      instances: 1,
    });
  });
  for (let i = 0; i < input.length; i++) {
    const { winning, scratch } = getCardInfo(input[i]);
    const winningNumbers = [];
    for (const number of winning) {
      if (scratch.includes(number)) {
        winningNumbers.push(number);
      }
    }
    for (let j = 1; j <= winningNumbers.length; j++) {
      if (i + j < input.length) {
        const currentCard = scratchcards.find(
          c => c.id === getCardInfo(input[i]).cardId
        );
        const nextCard = scratchcards.find(
          c => c.id === getCardInfo(input[i + j]).cardId
        );
        if (currentCard && nextCard) {
          nextCard.instances += currentCard.instances;
        }
      }
    }
  }
  return scratchcards.reduce((acc, card) => {
    return acc + card.instances;
  }, 0);
}
