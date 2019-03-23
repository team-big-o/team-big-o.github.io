/*Calculate daily water usage in gallons given:
Toilet flushes in a day (1.5 gallon times flushes)
Total time spent showering in a day (2.5 gallons per minute, times minutes)
Number of baths taken in a day (35 gallons times baths taken)
Glasses of water drunk in a day (16 glasses is one gallon, so 1/16 times glasses)
How many washing machine cycles in week (40 gallons per cycle)
How many dishwasher cycles in week (5 gallons per cycle)
*/
function calculateWeeklyUsageGallons(flushes, shower, bath, water, laundry, dish) {
  var total = 0; //in gallons, then convert to litres after
  total += 1.5 * flushes * 7;
  total += 2.5 * shower * 7;
  total += 35 * bath * 7;
  total += 0.0625 * water * 7;
  total += 40 * laundry;
  total += 5 * dish;

  return total;
}

//Calculate daily water usage in litres, using the above method and converting to litres
function calculateWeeklyUsageLitres(flushes, shower, bath, water, laundry, dish) {
  return 3.7854 * calculateWeeklyUsageGallons(flushes, shower, bath, water, laundry, dish);
}

//Calculate how many times more water you use as opposed to an average African.
//The average African uses 35 litres, or 9.246051 gallons of water a day
function compareToAfrica(weeklyUsageGallons) {
  return weeklyUsageGallons / (9.246051*7)
}
