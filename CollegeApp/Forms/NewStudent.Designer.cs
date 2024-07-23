namespace CollegeApp.Forms
{
    partial class NewStudent
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
            label_Add = new Label();
            label_StudentID = new Label();
            label_StudentName = new Label();
            textBox_StudentName = new TextBox();
            textBox_StudentID = new TextBox();
            button_Enter = new Button();
            SuspendLayout();
            // 
            // label_Add
            // 
            label_Add.AutoSize = true;
            label_Add.Location = new Point(96, 39);
            label_Add.Name = "label_Add";
            label_Add.Size = new Size(169, 25);
            label_Add.TabIndex = 0;
            label_Add.Text = "Add A New Student";
            // 
            // label_StudentID
            // 
            label_StudentID.AutoSize = true;
            label_StudentID.Location = new Point(37, 205);
            label_StudentID.Name = "label_StudentID";
            label_StudentID.Size = new Size(30, 25);
            label_StudentID.TabIndex = 1;
            label_StudentID.Text = "ID";
            // 
            // label_StudentName
            // 
            label_StudentName.AutoSize = true;
            label_StudentName.Location = new Point(37, 120);
            label_StudentName.Name = "label_StudentName";
            label_StudentName.Size = new Size(59, 25);
            label_StudentName.TabIndex = 2;
            label_StudentName.Text = "Name";
            // 
            // textBox_StudentName
            // 
            textBox_StudentName.Location = new Point(169, 114);
            textBox_StudentName.Name = "textBox_StudentName";
            textBox_StudentName.Size = new Size(150, 31);
            textBox_StudentName.TabIndex = 3;
            // 
            // textBox_StudentID
            // 
            textBox_StudentID.Location = new Point(169, 202);
            textBox_StudentID.Name = "textBox_StudentID";
            textBox_StudentID.Size = new Size(150, 31);
            textBox_StudentID.TabIndex = 4;
            // 
            // button_Enter
            // 
            button_Enter.Location = new Point(119, 294);
            button_Enter.Name = "button_Enter";
            button_Enter.Size = new Size(112, 34);
            button_Enter.TabIndex = 5;
            button_Enter.Text = "Enter";
            button_Enter.UseVisualStyleBackColor = true;
            // 
            // NewStudent
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(374, 379);
            Controls.Add(button_Enter);
            Controls.Add(textBox_StudentID);
            Controls.Add(textBox_StudentName);
            Controls.Add(label_StudentName);
            Controls.Add(label_StudentID);
            Controls.Add(label_Add);
            Name = "NewStudent";
            Text = "NewStudent";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label_Add;
        private Label label_StudentID;
        private Label label_StudentName;
        private TextBox textBox_StudentName;
        private TextBox textBox_StudentID;
        private Button button_Enter;
    }
}