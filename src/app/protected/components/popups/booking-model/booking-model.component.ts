import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/protected/services/store.service';
@Component({
  selector: 'app-booking-model',
  templateUrl: './booking-model.component.html',
  styleUrls: ['./booking-model.component.scss']
})
export class BookingModelComponent {
  meetingForm: FormGroup;
  showRoomSelection = false;
  rooms = [{ id: 1, name: 'Meeting Room #1' }, { id: 2, name: 'Meeting Room #2' }, { id: 3, name: 'Meeting Room #3' }, { id: 4, name: 'Meeting Room #4' }];
  showError = true;
  disablePastDates = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date ? date >= today : false;
  };
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.meetingForm = this.fb.group({
      username: [data.username || '', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      agenda: [''],
    });
  }
  onSearchRooms() {
    const { date, startTime, endTime } = this.meetingForm.value;
    this.meetingForm.addControl('room', this.fb.control('', Validators.required));
    this.showError = false;
    this.showRoomSelection = true;
  }
  onSubmit() {
    if (this.meetingForm.valid) {
      this.dialogRef.close(this.meetingForm.value);
    }
  }
}
