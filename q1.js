// input: hour and min


function findAngle(hour, min) {
  const angleMinHand = min * 6;
  const diff = (min / 60) * 30;
  const angleHourHand = hour * 30 + diff;

  const angle = Math.abs(angleHourHand - angleMinHand)
  const acute = Math.min(360 - angle, angle);
  return acute;
}

const angle = findAngle(10, 15);
console.log(angle);