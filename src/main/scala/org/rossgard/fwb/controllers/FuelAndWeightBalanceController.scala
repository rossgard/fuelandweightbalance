package org.rossgard.fwb.controllers

import org.scalatra._
import scalate.ScalateSupport
import org.rossgard.fwb.{FuelAndWeightBalance}
import org.scalatra.json.JacksonJsonSupport
import org.json4s.{DefaultFormats, Formats}

case class Calculation(emptyWeight : Double)

class FuelAndWeightBalanceController extends ScalatraServlet with ScalateSupport with JacksonJsonSupport {

  get("/") {
    contentType = "text/html"
    jade("index")
  }

  post("/calculate") {
    println("Calculate!!!")
    val calculation: Calculation = parsedBody.extract[Calculation]
    println(calculation)
    FuelAndWeightBalance.momentEmptyWeight(200)
  }

  get("/:page") {
    findTemplate(params("page")) map {
      path =>
        contentType = "text/html"
        jade(path)
    } orElse serveStaticResource() getOrElse resourceNotFound()
  }

  get("/partials/:page") {
    contentType = "text/html"
    jade("/partials/%s.jade" format params("page"), "layout" -> "")
  }

  protected implicit def jsonFormats: Formats = DefaultFormats.withBigDecimal
}
