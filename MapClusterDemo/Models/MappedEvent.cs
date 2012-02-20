using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MapClusterDemo.Models
{
    public class MappedEvent
    {
        public virtual long Id { get; set; }
        public virtual long EventId { get { return Id; } }
        public virtual DateTime EventDate { get; set; }
        public virtual int LocationId { get; set; }
        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; } 
    }
}