import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Shelf } from 'src/app/models/shelf.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-shelf-overview',
  templateUrl: './shelf-overview.component.html',
  styleUrls: ['./shelf-overview.component.css'],
  providers: [ConfirmationService]
})
export class ShelfOverviewComponent implements OnInit {
  shelfToShow: number = 0;
  shelves: Shelf[] = [];

  img: Map<number, SafeUrl> = new Map();

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllShelfs().subscribe(data => {
      this.shelves = data;
    });
  }

  toggle(event, index: number, op){
    this.shelfToShow = index;
    op.toggle(event);
  }

  makeNewShelf(){
    this.router.navigate(['admin/shelf-edit/new']);
  }

  editShelf(shelf: Shelf){
    this.adminService.cacheShelfToEdit(shelf);
    this.router.navigate(['admin/shelf-edit/', shelf.id]);
  }

  removeShelf(event, i){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Da li zaista želite da izbrišete policu?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Da',
      rejectLabel: 'Ne',
      accept: () => {
        this.shelves.splice(i,1);
      },
      reject: () => {
          //reject action
      }
    });
  }

}
