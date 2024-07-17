import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class UpdateStudentComponent implements OnInit {
  @Input() student: any;
  studentForm!: FormGroup;
  isModalOpen: boolean = false;
  branches: string[] = ['MCA', 'BCA', 'MBA', 'BBA']; // Example branches

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [this.student?.name, Validators.required],
      email: [this.student?.email, [Validators.required, Validators.email]],
      branch: [this.student?.branch, Validators.required]
    });
  }

  openModal(student: any): void {
    this.student = student;
    this.isModalOpen = true;
    this.studentForm.patchValue(student);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateStudent(): void {
    if (this.studentForm.valid) {
      const updatedStudent = this.studentForm.value;
      // Handle the updated student data (e.g., send it to the server)
      console.log('Updated Student:', updatedStudent);
      this.closeModal();
    }
  }
}
