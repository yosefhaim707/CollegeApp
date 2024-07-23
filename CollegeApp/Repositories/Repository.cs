using CollegeApp.Models;
using CollegeApp.Services;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollegeApp.Repositories
{
    internal class Repository : IRepository
    {
        // Properties
        public DBContex dBContex { get; set; }
        // Constructor
        public Repository(DBContex dBContex)
        {
            this.dBContex = dBContex;
        }
        // Methods
        // Adds a cycle to the database
        public void AddCycle(string cycleName, DateOnly startDate, DateOnly endDate, int coursePrice, string courseName, string day, string time)
        {
            // query
            string stringQuery = @"-- Title: Insert Cycle
                                    -- Declare the data we need to get into variables
                                    DECLARE @CycleName VARCHAR(50);
                                    DECLARE @StartDate DATE;
                                    DECLARE @EndDate DATE;
                                    DECLARE @CoursePrice INT;
                                    DECLARE @DayInWeek INT;
                                    DECLARE @TimeInDay VARCHAR(50);
                                    DECLARE @CourseName VARCHAR(50);
                                    DECLARE @CourseID INT;

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the course is actually exist
                                        IF EXISTS (SELECT 1 FROM Courses WHERE CourseName = @CourseName)
                                        BEGIN
                                            -- Get the course ID
                                            SET @CourseID = (SELECT ID FROM Courses WHERE CourseName = @CourseName);
                                            -- Checks if there is another cycle of the same course in the same date range
                                            IF NOT EXISTS (SELECT 1 FROM Cycles WHERE CourseID = @CourseID AND (@StartDate >= StartDate AND @EndDate <= EndDate))
                                            BEGIN
                                                -- Insert the cycle into the Cycles table except the day in week and hour in day
                                                INSERT INTO Cycles (CourseID, CycleName, StartDate, EndDate, CoursePrice)
                                                VALUES (@CourseID, @CycleName, @StartDate, @EndDate, @CoursePrice);
                                                -- Insert the day in week and hour in day into the CycleSchedule table
                                                INSERT INTO CyclesSchedule (CycleID, DayInWeek, TimeInDay)
                                                VALUES ((SELECT ID FROM Cycles WHERE CourseID = @CourseID AND StartDate = @StartDate AND EndDate = @EndDate), @DayInWeek, @TimeInDay);
                                                -- Commit the transaction if the cycle is inserted successfully
                                                COMMIT TRANSACTION;
                                            END
                                            ELSE
                                            BEGIN
                                                -- Rollback the transaction if there is another cycle of the same course in the same date range
                                                ROLLBACK TRANSACTION;
                                            END
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the course is not exist
                                            ROLLBACK TRANSACTION;
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                    END CATCH;";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@CycleName", cycleName),
                new SqlParameter("@StartDate", startDate),
                new SqlParameter("@EndDate", endDate),
                new SqlParameter("@CoursePrice", coursePrice),
                new SqlParameter("@DayInWeek", day),
                new SqlParameter("@TimeInDay", time),
                new SqlParameter("@CourseName", courseName)
            };
            // Execute the query
            dBContex.ExecuteNonQuery(stringQuery, sqlParameters);
        }

        // Adds a student to the database
        public void AddStudent(int Nat, string name)
        {
            // query
            string stringQuery = @"DECLARE @StudentName VARCHAR(50);
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @StudentDebt INT = 0;

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF NOT EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT)
                                        BEGIN
                                            -- Insert the student into the Students table
                                            INSERT INTO Students (StudentName, StudentNAT, StudentDebt)
                                            VALUES (@StudentName, @StudentNAT, @StudentDebt);
                                            -- Commit the transaction if the student is inserted successfully
                                            COMMIT TRANSACTION;
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the student is already exist
                                            ROLLBACK TRANSACTION;
                                            -- Raise an error if the student is already exist
                                            RAISERROR('The student is already exist', 16, 1);
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while adding the student', 16, 1);
                                    END CATCH";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentName", name),
                new SqlParameter("@StudentNAT", Nat)
            };
            // Execute the query
            dBContex.ExecuteNonQuery(stringQuery, sqlParameters);
        }

        public void AddStudentToCycle(int cycleID, int studentNat)
        {
            // query
            string stringQuery = @"DECLARE @StudentID INT;
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @CycleID INT;
                                    DECLARE @CyclePrice INT;

                                    -- Get the student ID
                                    SET @StudentID = (SELECT ID FROM Students WHERE StudentNAT = @StudentNAT);
                                    -- Get the cycle price from the Cycles table
                                    SET @CyclePrice = (SELECT CoursePrice FROM Cycles WHERE ID = @CycleID);



                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT)
                                        BEGIN
                                            -- Checks if the cycle is actually exist
                                            IF EXISTS (SELECT 1 FROM Cycles WHERE ID = @CycleID)
                                            BEGIN
                                                -- Checks if the student is already registered in the cycle
                                                IF NOT EXISTS (SELECT 1 FROM SelectedCourses WHERE StudentID = @StudentID AND CycleID = @CycleID)
                                                BEGIN
                                                    -- Insert the student into the SelectedCourses table
                                                    INSERT INTO SelectedCourses (StudentID, CycleID)
                                                    VALUES (@StudentID, @CycleID);
                                                    -- Update the student debt
                                                    UPDATE Students
                                                    SET StudentDebt = StudentDebt + @CyclePrice
                                                    WHERE ID = @StudentID;
                                                    -- Commit the transaction if the student is inserted successfully
                                                    COMMIT TRANSACTION;
                                                END
                                                ELSE
                                                BEGIN
                                                    -- Rollback the transaction if the student is already registered in the cycle
                                                    ROLLBACK TRANSACTION;
                                                    -- Raise an error if the student is already registered in the cycle
                                                    RAISERROR('The student is already registered in the cycle', 16, 1);
                                                END
                                            END
                                            ELSE
                                            BEGIN
                                                -- Rollback the transaction if the cycle is not exist
                                                ROLLBACK TRANSACTION;
                                                -- Raise an error if the cycle is not exist
                                                RAISERROR('The cycle is not exist', 16, 1);
                                            END
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the student is not exist
                                            ROLLBACK TRANSACTION;
                                            -- Raise an error if the student is not exist
                                            RAISERROR('The student is not exist', 16, 1);
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while adding the student to the cycle', 16, 1);
                                    END CATCH";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentNAT", studentNat),
                new SqlParameter("@CycleID", cycleID)
            };
            // Execute the query
            dBContex.ExecuteNonQuery(stringQuery, sqlParameters);
        }

        // Get all cycles from the database
        public List<Cycle> GetCycles()
        {
            // query
            string stringQuery = @"-- Title: Get all cycles
                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Get all cycles
                                        SELECT * FROM Cycles;
                                        -- Commit the transaction if the cycles are found successfully
                                        COMMIT TRANSACTION;
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while getting the cycles', 16, 1);
                                    END CATCH";
            // Execute the query
            DataTable cycleTable = dBContex.ExecuteQuery(stringQuery, null!);
            // Create a new list of cycles
            List<Cycle> cycles = new List<Cycle>();
            // Loop through the rows of the DataTable
            foreach (DataRow row in cycleTable.Rows)
            {
                // Add a new cycle to the list
                cycles.Add(new Cycle((int)row["ID"], (string)row["CycleName"], (DateOnly)row["StartDate"], (DateOnly)row["EndDate"], (int)row["CourseID"], (int)row["CoursePrice"]));

            }
            // Return the list of cycles
            return cycles;
        }

        // Get all selected courses for a specific student by national ID and name
        public List<SelectedCourse> GetSelectedCourses(int Nat, string name)
        {
            // query
            string stringQuery = @"-- Title: Get all selected courses of a specific student
                                    -- Declare the data we need to get into variables
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @StudentName VARCHAR(50);
                                    DECLARE @StudentID INT;

                                    -- Get the student ID
                                    SET @StudentID = (SELECT ID FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName);

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName)
                                        BEGIN
                                            -- Get all selected courses of the student from the SelectedCourses table
                                            -- But also get the course name and the cycle name
                                            SELECT Students.StudentName, Courses.CourseName, Cycles.CycleName
                                            FROM Students
                                            INNER JOIN SelectedCourses ON Students.ID = SelectedCourses.StudentID
                                            INNER JOIN Cycles ON SelectedCourses.CycleID = Cycles.ID
                                            INNER JOIN Courses ON Cycles.CourseID = Courses.ID
                                            WHERE Students.ID = @StudentID;
                                            -- Commit the transaction if the selected courses are found successfully
                                            COMMIT TRANSACTION;
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the student is not exist
                                            ROLLBACK TRANSACTION;
                                            -- Raise an error if the student is not exist
                                            RAISERROR('The student is not exist', 16, 1);
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while getting the selected courses of the student', 16, 1);
                                    END CATCH";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentNAT", Nat),
                new SqlParameter("@StudentName", name)
            };
            // Execute the query
            DataTable selectedCoursesTable = dBContex.ExecuteQuery(stringQuery, sqlParameters);
            // Create a new list of selected courses
            List<SelectedCourse> selectedCourses = new List<SelectedCourse>();
            // Loop through the rows of the DataTable
            foreach (DataRow row in selectedCoursesTable.Rows)
            {
                // Add a new selected course to the list
                selectedCourses.Add(new SelectedCourse((string)row["StudentName"], (string)row["CourseName"], (string)row["CycleName"]));
            }
            // Return the list of selected courses
            return selectedCourses;
        }

        // Get a single student by name and national ID
        public Student GetStudent(int Nat, string name)
        {
            // query
            string stringQuery = @"-- Title: Get a single student by NAT and name
                                    -- Declare the data we need to get into variables
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @StudentName VARCHAR(50);

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName)
                                        BEGIN
                                            -- Get the student by NAT and name
                                            SELECT * FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName;
                                            -- Commit the transaction if the student is found successfully
                                            COMMIT TRANSACTION;
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the student is not exist
                                            ROLLBACK TRANSACTION;
                                            -- Raise an error if the student is not exist
                                            RAISERROR('The student is not exist', 16, 1);
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while getting the student', 16, 1);
                                    END CATCH";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentNAT", Nat),
                new SqlParameter("@StudentName", name)
            };
            // Execute the query
            DataTable studentTable = dBContex.ExecuteQuery(stringQuery, sqlParameters);
            // Create a new student
            Student student = new Student((string)studentTable.Rows[0]["StudentName"], (int)studentTable.Rows[0]["StudentNAT"]);
            // Return the student
            return student;
        }

        // Pay for a cycle
        public void PayCycle(string cycleName, int studentNat, string studentName)
        {
            string stringQuery = @"-- Title: Pay the student debt
                                    -- Declare the data we need to get into variables
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @StudentName VARCHAR(50);
                                    DECLARE @CycleName VARCHAR(50);

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName)
                                        BEGIN
                                            -- Get the student ID
                                            DECLARE @StudentID INT;
                                            SET @StudentID = (SELECT ID FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName);
                                            -- Get the cycle price
                                            DECLARE @CyclePrice INT;
                                            SET @CyclePrice = (SELECT CoursePrice FROM Cycles WHERE CycleName = @CycleName);
                                            -- Update the isPaid column in the SelectedCourses table
                                            UPDATE SelectedCourses
                                            SET isPaid = 1
                                            WHERE StudentID = @StudentID AND CycleID = (SELECT ID FROM Cycles WHERE CycleName = @CycleName);
                                            -- Pay the student debt
                                            UPDATE Students
                                            SET StudentDebt = StudentDebt - @CyclePrice
                                            WHERE ID = @StudentID;
                                            -- Commit the transaction if the student debt is paid successfully
                                            COMMIT TRANSACTION;
                                        END
                                        ELSE
                                        BEGIN
                                            -- Rollback the transaction if the student is not exist
                                            ROLLBACK TRANSACTION;
                                            -- Raise an error if the student is not exist
                                            RAISERROR('The student is not exist', 16, 1);
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Raise an error if there is an error
                                        RAISERROR('An error occurred while paying the student debt', 16, 1);
                                    END CATCH";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentNAT", studentNat),
                new SqlParameter("@StudentName", studentName),
                new SqlParameter("@CycleName", cycleName)
            };
            // Execute the query
            dBContex.ExecuteNonQuery(stringQuery, sqlParameters);
        }

        public bool ValidateStudent(int Nat, string name)
        {
            // query
            string stringQuery = @"-- Title: Check if a student exists by NAT and name
                                    -- Returns: 1 if the student exists, 0 if not
                                    -- Declare the data we need to get into variables
                                    DECLARE @StudentNAT VARCHAR(14);
                                    DECLARE @StudentName VARCHAR(50);
                                    DECLARE @IsVerified BIT;

                                    -- Starts the transaction
                                    BEGIN TRANSACTION
                                    -- Starts the try inside the success transaction section
                                    BEGIN TRY
                                        -- Checks if the student is actually exist
                                        IF EXISTS (SELECT 1 FROM Students WHERE StudentNAT = @StudentNAT AND StudentName = @StudentName)
                                        BEGIN
                                            -- Set the IsVerified variable to 1 if the student is exist
                                            SET @IsVerified = 1;
                                            -- Commit the transaction if the student is exist
                                            COMMIT TRANSACTION;
                                        END
                                        ELSE
                                        BEGIN
                                            -- Set the IsVerified variable to 0 if the student is not exist
                                            SET @IsVerified = 0;
                                            -- Commit the transaction if the student is not exist
                                            COMMIT TRANSACTION;
                                        END
                                    END TRY
                                    -- Starts the catch inside the failure transaction section
                                    BEGIN CATCH
                                        -- Rollback the transaction if there is an error
                                        ROLLBACK TRANSACTION;
                                        -- Set the IsVerified variable to 0 if there is an error
                                        SET @IsVerified = 0;
                                    END CATCH
                                    -- Return the IsVerified variable
                                    SELECT @IsVerified;";
            // Add the parameters
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@StudentNAT", Nat),
                new SqlParameter("@StudentName", name)
            };
            // Execute the query
            DataTable isVerifiedTable = dBContex.ExecuteQuery(stringQuery, sqlParameters);
            // Return the result
            return (bool)isVerifiedTable.Rows[0]["IsVerified"];
        }
    }
}
