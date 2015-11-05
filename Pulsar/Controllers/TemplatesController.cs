using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Pulsar.Models;

namespace Pulsar.Controllers
{
    public class TemplatesController : Controller
    {
        // GET: Templates
        public ActionResult Index()
        {
            var model = new DashboardPageModel {};
            return View(model);
        }
    }
}