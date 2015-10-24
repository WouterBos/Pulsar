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
            var settings = new TeamPulseAppSettings()
            {
                SiteUrl = "XXX",
                UseWindowsAuth = true,
                Username = "XXX",
                Password = "XXX",
                Domain = "XXX"
            };

            TeamPulseApp app = new TeamPulseApp(settings);
            app.Login();
            WorkItem[] workitems = app.WorkItems.Get().results;

            var model = new DashboardPageModel { };
            return View(model);
        }
    }
}