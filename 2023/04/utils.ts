/** Convert string input to array of strings */
export function convertInputToArray(input: string) {
  return input.split("\n");
}

/** Retrieves an array of numbers in a string */
export function getNumbersFromString(input: string) {
  return input
    .split(" ")
    .map(n => parseInt(n))
    .filter(n => !isNaN(n));
}

/** Retrieves a scratchcard information */
export function getCardInfo(card: string) {
  const [cardNumber, cardValues] = card.split(":");
  const cardId = cardNumber.replace("Card ", "").trim();
  const [winningNumbers, scratchNumbers] = cardValues.split("|");
  const winning = getNumbersFromString(winningNumbers);
  const scratch = getNumbersFromString(scratchNumbers);
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
    const winningNumbers = new Set<number>();
    for (const number of winning) {
      if (scratch.includes(number)) {
        winningNumbers.add(number);
      }
    }
    for (let j = 1; j <= winningNumbers.size; j++) {
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
