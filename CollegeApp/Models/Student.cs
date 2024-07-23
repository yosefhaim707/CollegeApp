using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollegeApp.Models
{
    internal class Student
    {
        // Properties
        public string Name { get; set; }
        public int Id { get; set; }

        // Constructor
        public Student(string name, int id)
        {
            Name = name;
            Id = id;
        }
    }
}
