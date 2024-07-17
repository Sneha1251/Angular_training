import { Component,ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateStudentModalComponent } from './create-student-modal/create-student-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UpdateStudentComponent,CommonModule,CreateStudentModalComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('updateStudentModal') updateStudentModal!: UpdateStudentComponent;
  @ViewChild(CreateStudentModalComponent) createStudentModal!: CreateStudentModalComponent;

  students = [
    { name: 'dolly', email: 'dolly@gmail.com', branch: 'MCA' },
    { name: 'gaurav', email: 'gaurav@gmail.com', branch: 'BCA' },
    // other students
  ];

  searchTermControl = new FormControl('');
  isCreateModalOpen = false;
  selectedStudent: any = null;

  get searchTerm(): string {
    return this.searchTermControl.value!;
  }

  get filteredStudents() {
    const searchTerm = this.searchTerm.toLowerCase();
    return this.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm)
    );
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    // Implement logic to open a modal or navigate to a create student component
    console.log('Creating a new student');
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false; // Close modal
  }

  deleteStudent(student: any): void {
    const index = this.students.indexOf(student);
    if (index !== -1) {
      this.students.splice(index, 1);
      console.log('Deleted Student:', student);
    }
  }

  createStudent(newStudent: any): void {
    this.students.push(newStudent);
    this.closeCreateModal();
  }

  onSearchChange(value: string): void {
    this.searchTermControl.setValue(value);
  }

  viewStudentDetails(student: any): void {
    this.selectedStudent = student;
    // Close any open modals or do additional logic if needed
    this.closeCreateModal(); // Close create modal if open
    this.updateStudentModal.closeModal(); // Close update modal if open
  }
}