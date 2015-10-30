using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Telerik.TeamPulse.Sdk;
using Telerik.TeamPulse.Sdk.Models;
using Newtonsoft.Json;

namespace Pulsar.Controllers
{
    public class PulsarApiController : ApiController
    {
        [HttpGet]
        public virtual string Login(string Username, string Password, string Domain)
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
            DateTime date = DateTime.Now;
            Iteration iteration = app.Iterations.GetAll("$filter=startDate lt DateTime'" + date.ToString("yyyy-MM-dd") + "' and endDate gt DateTime'" + date.ToString("yyyy-MM-dd") + "'&$orderby=startDate desc").results.FirstOrDefault();
            User user = app.Users.GetCurrent();

            var result = new {
                iteration = new {
                    id = iteration.id,
                    startDate = iteration.startDate.ToString("yyyy-MM-dd"),
                    endDate = iteration.endDate.ToString("yyyy-MM-dd")
                },
                accountInfo = new
                {
                    displayName = user.displayName
                }
            };

            return JsonConvert.SerializeObject(result);
        }
    }
}
