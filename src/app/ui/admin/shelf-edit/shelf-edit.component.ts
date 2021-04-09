import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Artical } from 'src/app/models/artical.model';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shelf-edit',
  templateUrl: './shelf-edit.component.html',
  styleUrls: ['./shelf-edit.component.css']
})
export class ShelfEditComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  isAddingArticles = false;
  routeSub: Subscription;
  articles: Artical[] = [];


  newShelfForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    link: new FormControl(''),
    discount: new FormControl(0)
  });

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.isEditMode = params.id !== "new";

      if(!this.isEditMode){
        this.newShelfForm.patchValue({name: ''});
        this.newShelfForm.patchValue({link: ''});
        this.newShelfForm.patchValue({discount: 0});
        return;
      }

      if(Number(+params.id) === NaN){
        console.log('ID is not number');
        params.id = 'new';
        return;
      }

      this.getShelfById(+params.id);
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  getShelfById(id: number){
    this.adminService.getShelfByIndex(id).subscribe(data => {
      console.log(data);
      this.newShelfForm.patchValue({name: data.title});
      this.newShelfForm.patchValue({link: data.link});
      this.newShelfForm.patchValue({discount: 0});
      this.articles = [];
    })
  }

  makeNewShelf(){
    console.log('Make new shelf');

  }

  removeArticle(i: number){
    this.articles.splice(i,1);
  }

  updateArticleList(list){
    console.log(list);
    this.articles = list;
    this.isAddingArticles = false;
  }


}
