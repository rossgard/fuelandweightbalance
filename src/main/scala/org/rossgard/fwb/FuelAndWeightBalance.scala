package org.rossgard.fwb


object FuelAndWeightBalance {

  def momentEmptyWeight(emptyWeight: Double): Double = emptyWeight * 967.74

  def momentFuel(liter: Double) = liter * 0.7 * 1219

  def momentOil(liter: Double) = liter * 0.7 * -381

  def momentPilotCoPilot(weight: Double) = weight * 914.4

  def momentPassengers(weight: Double) = weight * 1778

  def momentBaggageHold(weight: Double) = weight * 2413

  def weightOfFuel(literOfFuel: Double): Double = literOfFuel * 0.7

  def weightOfOil(literOfOil: Double): Double = literOfOil * 0.7

  def totalWeight(emptyWeight: Double,
                  literOfFuel: Double,
                  literOfOil: Double,
                  weightOfPilotCoPilot: Double,
                  weightOfPassengers: Double,
                  weightOfBaggageHold: Double): Double =
    emptyWeight + weightOfFuel(literOfFuel) + weightOfOil(literOfOil) + weightOfPilotCoPilot + weightOfPassengers + weightOfBaggageHold

  def totalMoment(emptyWeight: Double,
                    literOfFuel: Double,
                    literOfOil: Double,
                    weightOfPilotCoPilot: Double,
                    weightOfPassengers: Double,
                    weightOfBaggageHold: Double): Double =
    momentEmptyWeight(emptyWeight) + momentFuel(literOfFuel) + momentOil(literOfOil) + momentPilotCoPilot(weightOfPilotCoPilot) + momentPassengers(weightOfPassengers) + momentBaggageHold(weightOfBaggageHold)

  def tolerence(totalMomentum: Double, totalWeight: Double): Double = totalMomentum / totalWeight


}
