using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollegeApp.Models
{
    internal class SelectedCourse
    {
        // Properties
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public string CycleName { get; set; }


        // Constructor
        public SelectedCourse(string studentName, string courseName, string cycleName)
        {
            StudentName = studentName;
            CourseName = courseName;
            CycleName = cycleName;
        }
    }
}
