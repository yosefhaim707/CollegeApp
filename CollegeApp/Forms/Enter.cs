using CollegeApp.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CollegeApp.Forms
{
    public partial class Enter : Form
    {
        // Initialize a repository instance
        Repository repository;
        public Enter()
        {
            // Initialize the repository
            repository = new Repository();
            
            InitializeComponent();
        }

        private void button_NewStudent_Click(object sender, EventArgs e)
        {
            // Go to NewStudent form
            NewStudent newStudent = new NewStudent();
            newStudent.Show();
            this.Hide();
        }

        private void button_LogInStudent_Click(object sender, EventArgs e)
        {
            // Check if the id and name fields are empty
            if(string.IsNullOrEmpty(textBox_ID.Text) || string.IsNullOrEmpty(textBox_Name.Text))
            {
                MessageBox.Show("Please fill the name and id fields");
            }
            else if ()
        }
    }
}
