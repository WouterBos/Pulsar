using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Pulsar.Models;
using Telerik.TeamPulse.Sdk;
using Telerik.TeamPulse.Sdk.Models;

namespace Pulsar.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {

            var model = new DashboardPageModel { };
            return View(model);
        }
    }
}