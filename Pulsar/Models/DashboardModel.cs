using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pulsar.Models
{
    public class DashboardPageModel
    {
        public string ApplicationName
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["ApplicationName"];
            }
        }
        public string Layout
        {
            get
            {
                return "~/Views/Shared/_Template.cshtml";
            }
        }
        public string Templates
        {
            get
            {
                return "~/Templates/Index";
            }
        }
    }
}