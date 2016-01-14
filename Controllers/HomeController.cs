using Microsoft.AspNet.Mvc;

namespace Frontend
{
    /// <summary>
    /// Home controller for the web application
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Shows the homepage of the application
        /// </summary>
        public IActionResult Index()
        {
            return View();
        }
    }
}
