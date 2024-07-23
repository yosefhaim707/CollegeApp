using CollegeApp.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CollegeApp.Models;
using CollegeApp.Repositories;
using CollegeApp.Services;

namespace CollegeApp.Repositories
{
    internal interface IRepository
    {
        // Methods
        // Add a new student
        void AddStudent(int Nat, string name);
        // Add a new cycle
        void AddCycle(string cycleName, DateOnly startDate, DateOnly endDate, int coursePrice, string courseName, string day, string time);
        // Add a student to a cycle
        void AddStudentToCycle(int cycleID, int studentNat);
        // Get single student by name and national ID
        Student GetStudent(int Nat, string name);
        // Get all cycles
        List<Cycle> GetCycles();
        // Get all selected courses for a specific student by national ID and name
        List<SelectedCourse> GetSelectedCourses(int Nat, string name);
        // Pay for a cycle
        void PayCycle(string cycleName, int studentNat, string studentName);
        // Validate a student
        bool ValidateStudent(int Nat, string name);
    }
}
