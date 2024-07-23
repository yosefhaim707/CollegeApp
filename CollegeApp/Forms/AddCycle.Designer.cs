namespace CollegeApp.Forms
{
    partial class AddCycle
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
            label2 = new Label();
            label_DayInWeek = new Label();
            label_CyclePrice = new Label();
            label_EndDate = new Label();
            labelCourseName = new Label();
            label_StartDate = new Label();
            label_CycleName = new Label();
            textBox_CycleName = new TextBox();
            textBox_Price = new TextBox();
            textBox_CourseName = new TextBox();
            dateTimePicker_Start = new DateTimePicker();
            dateTimePicker_End = new DateTimePicker();
            comboBox_DaysInWeek = new ComboBox();
            comboBox_TimeInDay = new ComboBox();
            button_AddCycle = new Button();
            SuspendLayout();
            // 
            // label_Add
            // 
            label_Add.AutoSize = true;
            label_Add.Location = new Point(307, 31);
            label_Add.Name = "label_Add";
            label_Add.Size = new Size(149, 25);
            label_Add.TabIndex = 0;
            label_Add.Text = "Add A New Cycle";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(406, 328);
            label2.Name = "label2";
            label2.Size = new Size(50, 25);
            label2.TabIndex = 1;
            label2.Text = "Time";
            // 
            // label_DayInWeek
            // 
            label_DayInWeek.AutoSize = true;
            label_DayInWeek.Location = new Point(55, 323);
            label_DayInWeek.Name = "label_DayInWeek";
            label_DayInWeek.Size = new Size(43, 25);
            label_DayInWeek.TabIndex = 2;
            label_DayInWeek.Text = "Day";
            // 
            // label_CyclePrice
            // 
            label_CyclePrice.AutoSize = true;
            label_CyclePrice.Location = new Point(50, 376);
            label_CyclePrice.Name = "label_CyclePrice";
            label_CyclePrice.Size = new Size(95, 25);
            label_CyclePrice.TabIndex = 3;
            label_CyclePrice.Text = "Cycle Price";
            // 
            // label_EndDate
            // 
            label_EndDate.AutoSize = true;
            label_EndDate.Location = new Point(406, 214);
            label_EndDate.Name = "label_EndDate";
            label_EndDate.Size = new Size(84, 25);
            label_EndDate.TabIndex = 4;
            label_EndDate.Text = "End Date";
            // 
            // labelCourseName
            // 
            labelCourseName.AutoSize = true;
            labelCourseName.Location = new Point(406, 141);
            labelCourseName.Name = "labelCourseName";
            labelCourseName.Size = new Size(119, 25);
            labelCourseName.TabIndex = 5;
            labelCourseName.Text = "Course Name";
            // 
            // label_StartDate
            // 
            label_StartDate.AutoSize = true;
            label_StartDate.Location = new Point(55, 214);
            label_StartDate.Name = "label_StartDate";
            label_StartDate.Size = new Size(90, 25);
            label_StartDate.TabIndex = 6;
            label_StartDate.Text = "Start Date";
            // 
            // label_CycleName
            // 
            label_CycleName.AutoSize = true;
            label_CycleName.Location = new Point(55, 142);
            label_CycleName.Name = "label_CycleName";
            label_CycleName.Size = new Size(105, 25);
            label_CycleName.TabIndex = 7;
            label_CycleName.Text = "Cycle Name";
            // 
            // textBox_CycleName
            // 
            textBox_CycleName.Location = new Point(201, 135);
            textBox_CycleName.Name = "textBox_CycleName";
            textBox_CycleName.Size = new Size(150, 31);
            textBox_CycleName.TabIndex = 8;
            // 
            // textBox_Price
            // 
            textBox_Price.Location = new Point(201, 376);
            textBox_Price.Name = "textBox_Price";
            textBox_Price.Size = new Size(150, 31);
            textBox_Price.TabIndex = 9;
            // 
            // textBox_CourseName
            // 
            textBox_CourseName.Location = new Point(556, 135);
            textBox_CourseName.Name = "textBox_CourseName";
            textBox_CourseName.Size = new Size(150, 31);
            textBox_CourseName.TabIndex = 10;
            // 
            // dateTimePicker_Start
            // 
            dateTimePicker_Start.Location = new Point(55, 255);
            dateTimePicker_Start.Name = "dateTimePicker_Start";
            dateTimePicker_Start.Size = new Size(300, 31);
            dateTimePicker_Start.TabIndex = 11;
            // 
            // dateTimePicker_End
            // 
            dateTimePicker_End.Location = new Point(406, 255);
            dateTimePicker_End.Name = "dateTimePicker_End";
            dateTimePicker_End.Size = new Size(300, 31);
            dateTimePicker_End.TabIndex = 12;
            // 
            // comboBox_DaysInWeek
            // 
            comboBox_DaysInWeek.FormattingEnabled = true;
            comboBox_DaysInWeek.Items.AddRange(new object[] { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" });
            comboBox_DaysInWeek.Location = new Point(173, 320);
            comboBox_DaysInWeek.Name = "comboBox_DaysInWeek";
            comboBox_DaysInWeek.Size = new Size(182, 33);
            comboBox_DaysInWeek.TabIndex = 13;
            // 
            // comboBox_TimeInDay
            // 
            comboBox_TimeInDay.FormattingEnabled = true;
            comboBox_TimeInDay.Items.AddRange(new object[] { "Morning", "After Noon", "Evening" });
            comboBox_TimeInDay.Location = new Point(524, 320);
            comboBox_TimeInDay.Name = "comboBox_TimeInDay";
            comboBox_TimeInDay.Size = new Size(182, 33);
            comboBox_TimeInDay.TabIndex = 14;
            // 
            // button_AddCycle
            // 
            button_AddCycle.Location = new Point(594, 471);
            button_AddCycle.Name = "button_AddCycle";
            button_AddCycle.Size = new Size(112, 34);
            button_AddCycle.TabIndex = 15;
            button_AddCycle.Text = "Add Cycle";
            button_AddCycle.UseVisualStyleBackColor = true;
            // 
            // AddCycle
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 546);
            Controls.Add(button_AddCycle);
            Controls.Add(comboBox_TimeInDay);
            Controls.Add(comboBox_DaysInWeek);
            Controls.Add(dateTimePicker_End);
            Controls.Add(dateTimePicker_Start);
            Controls.Add(textBox_CourseName);
            Controls.Add(textBox_Price);
            Controls.Add(textBox_CycleName);
            Controls.Add(label_CycleName);
            Controls.Add(label_StartDate);
            Controls.Add(labelCourseName);
            Controls.Add(label_EndDate);
            Controls.Add(label_CyclePrice);
            Controls.Add(label_DayInWeek);
            Controls.Add(label2);
            Controls.Add(label_Add);
            Name = "AddCycle";
            Text = "AddCycle";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label_Add;
        private Label label2;
        private Label label_DayInWeek;
        private Label label_CyclePrice;
        private Label label_EndDate;
        private Label labelCourseName;
        private Label label_StartDate;
        private Label label_CycleName;
        private TextBox textBox_CycleName;
        private TextBox textBox_Price;
        private TextBox textBox_CourseName;
        private DateTimePicker dateTimePicker_Start;
        private DateTimePicker dateTimePicker_End;
        private ComboBox comboBox_DaysInWeek;
        private ComboBox comboBox_TimeInDay;
        private Button button_AddCycle;
    }
}