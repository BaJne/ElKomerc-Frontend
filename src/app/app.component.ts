import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'el-komerc';
  users: string[] = [];

  refreshTable(e: any) {
    console.log(e);

    this.users.push(e);
  }
}
