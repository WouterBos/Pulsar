using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Telerik.TeamPulse.Sdk;
using Telerik.TeamPulse.Sdk.Models;

namespace Pulsar.Controllers
{
    public class PulsarApiController : ApiController
    {
        [HttpGet]
        public virtual int Login(string Username, string Password, string Domain)
        {
            var settings = new TeamPulseAppSettings()
            {
                SiteUrl = System.Configuration.ConfigurationManager.AppSettings["TeamPulseUrl"],
                UseWindowsAuth = true,
                Username = Username,
                Password = Password,
                Domain = Domain
            };

            TeamPulseApp app = new TeamPulseApp(settings);
            app.Login();
            WorkItem[] workitems = app.WorkItems.Get().results;

            return app.WorkItems.Get().results.Count();
        }
    }
}
