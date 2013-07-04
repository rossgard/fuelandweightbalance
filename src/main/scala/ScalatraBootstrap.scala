import org.rossgard.fwb.controllers.FuelAndWeightBalanceController
import org.scalatra._
import javax.servlet.ServletContext

/**
 * Use to mount controllers.
 */
class ScalatraBootstrap extends LifeCycle {
  override def init(context: ServletContext) {
    context.mount(new FuelAndWeightBalanceController, "/*")
  }
}
