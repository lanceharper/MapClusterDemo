using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MapClusterDemo.Models;

namespace MapClusterDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("FixedFluid");
        }

        [HttpPost]
        public JsonResult GetUpcomingEvents()
        {
            var random = new Random();
            var events = Enumerable.Range(0, 500)
                .Select(n =>
                        new MappedEvent
                            {
                                
                                Id = n + 1,
                                Latitude =  random.Next(24, 50),
                                Longitude = random.Next(-124, -67),
                                LocationId = n + 1
                            });
            return Json(new
            {
                events
            });
        }


        [HttpPost]
        public JsonResult GetClusterEvents(long[] eventIds)
        {
            // Select some details from a database.
            var clusterEvents = eventIds.Select(ev => new MappedEvent
                                                          {
                                                              Id = ev
                                                          });

            return Json(clusterEvents);
        }
    }
}
