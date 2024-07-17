import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-student-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-student-modal.component.html',
  styleUrl: './create-student-modal.component.css'
})
export class CreateStudentModalComponent {
  @Output() create = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branch: ['', Validators.required]
    });
  }

  createStudent(): void {
    if (this.studentForm.valid) {
      this.create.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }

  closeModal(): void {
    this.close.emit();
    this.studentForm.reset();
    // Implement logic to close the modal
  }
}
