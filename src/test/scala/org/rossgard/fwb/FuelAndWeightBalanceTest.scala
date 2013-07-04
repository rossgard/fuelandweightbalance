package org.rossgard.fwb

import org.scalatest.FunSuite

import org.rossgard.fwb.FuelAndWeightBalance._

class FuelAndWeightBalanceTest extends FunSuite {

  test("Test moment") {
    val emptyWeight: Double = 913
    val literOfFuel: Double = 80
    val literOfOil: Double = 10
    val weightOfPilotCoPilot: Double = 170
    val weightOfPassengers: Double = 70
    val weightOfBaggageHold: Double = 64

    assert(883546.62 == momentEmptyWeight(emptyWeight))
    assert(68264 == momentFuel(literOfFuel))
    assert(-2667 == momentOil(literOfOil))
    assert(155448 == momentPilotCoPilot(weightOfPilotCoPilot))
    assert(124460 == momentPassengers(weightOfPassengers))
    assert(154432 == momentBaggageHold(weightOfBaggageHold))

    val totalMoment_ = totalMoment(emptyWeight, literOfFuel, literOfOil, weightOfPilotCoPilot, weightOfPassengers, weightOfBaggageHold)
    val totalWeight_ = totalWeight(emptyWeight, literOfFuel, literOfOil, weightOfPilotCoPilot, weightOfPassengers, weightOfBaggageHold)

    assert(1280 == totalWeight_)
    assert(1383483.62 == totalMoment_)

    assert(1080.8465781250002 == tolerence(totalMoment_, totalWeight_))
  }
}
