namespace CollegeApp.Forms
{
    partial class Enter
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label_Wellcome = new Label();
            button_LogInStudent = new Button();
            button_EnterTeacher = new Button();
            label_Students = new Label();
            label_Password = new Label();
            label_Teachers = new Label();
            label_Name = new Label();
            label_NAT = new Label();
            textBox_ID = new TextBox();
            textBox_Password = new TextBox();
            textBox_Name = new TextBox();
            button_NewStudent = new Button();
            SuspendLayout();
            // 
            // label_Wellcome
            // 
            label_Wellcome.AutoSize = true;
            label_Wellcome.Location = new Point(335, 75);
            label_Wellcome.Name = "label_Wellcome";
            label_Wellcome.Size = new Size(176, 25);
            label_Wellcome.TabIndex = 0;
            label_Wellcome.Text = "Wellcome To College";
            label_Wellcome.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // button_LogInStudent
            // 
            button_LogInStudent.Location = new Point(89, 344);
            button_LogInStudent.Name = "button_LogInStudent";
            button_LogInStudent.Size = new Size(130, 34);
            button_LogInStudent.TabIndex = 1;
            button_LogInStudent.Text = "Log In";
            button_LogInStudent.UseVisualStyleBackColor = true;
            button_LogInStudent.Click += button_LogInStudent_Click;
            // 
            // button_EnterTeacher
            // 
            button_EnterTeacher.Location = new Point(582, 344);
            button_EnterTeacher.Name = "button_EnterTeacher";
            button_EnterTeacher.Size = new Size(112, 34);
            button_EnterTeacher.TabIndex = 2;
            button_EnterTeacher.Text = "Enter";
            button_EnterTeacher.UseVisualStyleBackColor = true;
            // 
            // label_Students
            // 
            label_Students.AutoSize = true;
            label_Students.Location = new Point(107, 176);
            label_Students.Name = "label_Students";
            label_Students.Size = new Size(112, 25);
            label_Students.TabIndex = 3;
            label_Students.Text = "For Students";
            // 
            // label_Password
            // 
            label_Password.AutoSize = true;
            label_Password.Location = new Point(459, 266);
            label_Password.Name = "label_Password";
            label_Password.Size = new Size(87, 25);
            label_Password.TabIndex = 4;
            label_Password.Text = "Password";
            // 
            // label_Teachers
            // 
            label_Teachers.AutoSize = true;
            label_Teachers.Location = new Point(611, 176);
            label_Teachers.Name = "label_Teachers";
            label_Teachers.Size = new Size(109, 25);
            label_Teachers.TabIndex = 5;
            label_Teachers.Text = "For Teachers";
            // 
            // label_Name
            // 
            label_Name.AutoSize = true;
            label_Name.Location = new Point(32, 289);
            label_Name.Name = "label_Name";
            label_Name.Size = new Size(59, 25);
            label_Name.TabIndex = 6;
            label_Name.Text = "Name";
            // 
            // label_NAT
            // 
            label_NAT.AutoSize = true;
            label_NAT.Location = new Point(32, 221);
            label_NAT.Name = "label_NAT";
            label_NAT.Size = new Size(30, 25);
            label_NAT.TabIndex = 7;
            label_NAT.Text = "ID";
            // 
            // textBox_ID
            // 
            textBox_ID.Location = new Point(137, 218);
            textBox_ID.Name = "textBox_ID";
            textBox_ID.Size = new Size(150, 31);
            textBox_ID.TabIndex = 8;
            // 
            // textBox_Password
            // 
            textBox_Password.Location = new Point(582, 260);
            textBox_Password.Name = "textBox_Password";
            textBox_Password.Size = new Size(150, 31);
            textBox_Password.TabIndex = 9;
            // 
            // textBox_Name
            // 
            textBox_Name.Location = new Point(137, 286);
            textBox_Name.Name = "textBox_Name";
            textBox_Name.Size = new Size(150, 31);
            textBox_Name.TabIndex = 10;
            // 
            // button_NewStudent
            // 
            button_NewStudent.Location = new Point(89, 384);
            button_NewStudent.Name = "button_NewStudent";
            button_NewStudent.Size = new Size(130, 34);
            button_NewStudent.TabIndex = 11;
            button_NewStudent.Text = "New Student";
            button_NewStudent.UseVisualStyleBackColor = true;
            button_NewStudent.Click += button_NewStudent_Click;
            // 
            // Enter
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(button_NewStudent);
            Controls.Add(textBox_Name);
            Controls.Add(textBox_Password);
            Controls.Add(textBox_ID);
            Controls.Add(label_NAT);
            Controls.Add(label_Name);
            Controls.Add(label_Teachers);
            Controls.Add(label_Password);
            Controls.Add(label_Students);
            Controls.Add(button_EnterTeacher);
            Controls.Add(button_LogInStudent);
            Controls.Add(label_Wellcome);
            Name = "Enter";
            Text = "Enter";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label_Wellcome;
        private Button button_LogInStudent;
        private Button button_EnterTeacher;
        private Label label_Students;
        private Label label_Password;
        private Label label_Teachers;
        private Label label_Name;
        private Label label_NAT;
        private TextBox textBox_ID;
        private TextBox textBox_Password;
        private TextBox textBox_Name;
        private Button button_NewStudent;
    }
}