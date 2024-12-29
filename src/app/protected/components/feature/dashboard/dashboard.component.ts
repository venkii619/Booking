import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingModelComponent } from '../../popups/booking-model/booking-model.component';
import { StoreService } from 'src/app/protected/services/store.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  upcomingColumns = ['srNo', 'userName', 'agenda', 'date', 'time', 'room'];
  roomColumns = ['srNo', 'userName', 'agenda', 'date', 'time', 'room'];
  upcomingMeetings: any = [];
  emptyData = []
  roomMeetings: any = [];
  username: string | undefined
  rooms = [{ id: 1, name: 'Meeting Room #1' }, { id: 2, name: 'Meeting Room #2' }, { id: 3, name: 'Meeting Room #3' }, { id: 4, name: 'Meeting Room #4' }];
  selectedRoom = 1;
  constructor(private dialog: MatDialog, private store: StoreService) { }
  ngOnInit() {
    this.store.user$.subscribe((user) => {
      this.username = user.name
    });
    let meetings = localStorage.getItem('meetings')
    if (meetings != null) {
      this.upcomingMeetings = JSON.parse(meetings)
      this.sortByDateandTime();
    }
    this.onRoomChange();
  }
  sortByDateandTime() {
    const sortedMeetings = this.upcomingMeetings.sort((a: { date: string | number | Date; startTime: string; }, b: { date: string | number | Date; startTime: string; }) => {
      const dateTimeA = new Date(new Date(a.date).toDateString() + ' ' + a.startTime);
      const dateTimeB = new Date(new Date(b.date).toDateString() + ' ' + b.startTime);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
    this.upcomingMeetings = sortedMeetings
  }
  remove(index: number) {
    this.upcomingMeetings.splice(index, 1);
    this.upcomingMeetings = [...this.upcomingMeetings]
    this.sortByDateandTime()
    localStorage.setItem('meetings', JSON.stringify(this.upcomingMeetings))
    this.onRoomChange()
  }
  onRoomChange() {
    this.roomMeetings = this.upcomingMeetings.filter((meeting: { room: number; }) => meeting.room === this.selectedRoom);
  }
  openBookingDialog() {
    const dialogRef = this.dialog.open(BookingModelComponent, {
      width: '600px',
      data: { username: this.username },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.upcomingMeetings = [...this.upcomingMeetings, result];
        this.sortByDateandTime()
        localStorage.setItem('meetings', JSON.stringify(this.upcomingMeetings))
        this.onRoomChange();
      }
    });
  }
}
