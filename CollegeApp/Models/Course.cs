using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollegeApp.Models
{
    internal class Course
    {
        // Properties
        public string Name { get; set; }

        // Constructor
        public Course(string name)
        {
            Name = name;
        }
    }
}
