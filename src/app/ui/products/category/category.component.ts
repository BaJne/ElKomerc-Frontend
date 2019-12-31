import { ArticalService } from './../../../services/artical.service';
import { Artical } from './../../../models/artical.model';
import { Category, CategoryService } from './../../../services/category.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  articals: Artical[];

  // Logika je da se ucitaju sve kategorije za prikaz preko CategoryServisa
  constructor(private categoryService: CategoryService, private articalService: ArticalService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.articals = this.articalService.getSomeArticals('all');
  }

  // Test
  onCategorySwitch(s: any) {
    console.log(s);
  }
}
