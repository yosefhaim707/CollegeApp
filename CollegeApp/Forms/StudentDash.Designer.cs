namespace CollegeApp.Forms
{
    partial class StudentDash
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
            label_MyCourses = new Label();
            label_AllCourses = new Label();
            dataGridView1 = new DataGridView();
            dataGridView2 = new DataGridView();
            button_Pay = new Button();
            button_Register = new Button();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            ((System.ComponentModel.ISupportInitialize)dataGridView2).BeginInit();
            SuspendLayout();
            // 
            // label_Wellcome
            // 
            label_Wellcome.AutoSize = true;
            label_Wellcome.Location = new Point(358, 45);
            label_Wellcome.Name = "label_Wellcome";
            label_Wellcome.Size = new Size(141, 25);
            label_Wellcome.TabIndex = 0;
            label_Wellcome.Text = "Wellcome Name";
            // 
            // label_MyCourses
            // 
            label_MyCourses.AutoSize = true;
            label_MyCourses.Location = new Point(96, 79);
            label_MyCourses.Name = "label_MyCourses";
            label_MyCourses.Size = new Size(105, 25);
            label_MyCourses.TabIndex = 1;
            label_MyCourses.Text = "My Courses";
            // 
            // label_AllCourses
            // 
            label_AllCourses.AutoSize = true;
            label_AllCourses.Location = new Point(668, 79);
            label_AllCourses.Name = "label_AllCourses";
            label_AllCourses.Size = new Size(100, 25);
            label_AllCourses.TabIndex = 2;
            label_AllCourses.Text = "All Courses";
            // 
            // dataGridView1
            // 
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(12, 129);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowHeadersWidth = 62;
            dataGridView1.Size = new Size(400, 433);
            dataGridView1.TabIndex = 3;
            // 
            // dataGridView2
            // 
            dataGridView2.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView2.Location = new Point(482, 129);
            dataGridView2.Name = "dataGridView2";
            dataGridView2.RowHeadersWidth = 62;
            dataGridView2.Size = new Size(383, 433);
            dataGridView2.TabIndex = 4;
            // 
            // button_Pay
            // 
            button_Pay.Location = new Point(12, 591);
            button_Pay.Name = "button_Pay";
            button_Pay.Size = new Size(112, 34);
            button_Pay.TabIndex = 5;
            button_Pay.Text = "Pay Course";
            button_Pay.UseVisualStyleBackColor = true;
            // 
            // button_Register
            // 
            button_Register.Location = new Point(697, 591);
            button_Register.Name = "button_Register";
            button_Register.Size = new Size(168, 34);
            button_Register.TabIndex = 6;
            button_Register.Text = "Register Course";
            button_Register.UseVisualStyleBackColor = true;
            // 
            // StudentDash
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(884, 719);
            Controls.Add(button_Register);
            Controls.Add(button_Pay);
            Controls.Add(dataGridView2);
            Controls.Add(dataGridView1);
            Controls.Add(label_AllCourses);
            Controls.Add(label_MyCourses);
            Controls.Add(label_Wellcome);
            Name = "StudentDash";
            Text = "StudentDash";
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ((System.ComponentModel.ISupportInitialize)dataGridView2).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label_Wellcome;
        private Label label_MyCourses;
        private Label label_AllCourses;
        private DataGridView dataGridView1;
        private DataGridView dataGridView2;
        private Button button_Pay;
        private Button button_Register;
    }
}