using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollegeApp.Models
{
    internal class Cycle
    {
        // Properties
        public int Id { get; set; }
        public string CycleName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int CourseId { get; set; }
        public int CoursePrice { get; set; }

        // Constructor
        public Cycle(int id, string cycleName, DateOnly startDate, DateOnly endDate, int courseId, int coursePrice)
        {
            Id = id;
            CycleName = cycleName;
            StartDate = startDate;
            EndDate = endDate;
            CourseId = courseId;
            CoursePrice = coursePrice;
        }
    }
}
