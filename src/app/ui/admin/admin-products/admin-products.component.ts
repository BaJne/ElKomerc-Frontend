import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';
import { Artical } from '../../../models/artical.model';
import { ProducerService } from '../../../services/producer.service';
import { Producer } from '../../../models/producer.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  // TODO odraditi filtere
  // TODO odraditi lazy loading
  // {
  //   id: 1,
  //   article_code: '15',
  //   article_name: 'KABL PP/R 2X1.5',
  //   price: 61.56,
  //   article_rate: 2,
  //   profile_picture: '',
  //   sub_category: '(PPY | PP/R | PP/L | PPJ) Instalacioni',
  //   producer_info:{
  //     producer_name: 'ABB',
  //     profile_image: '',
  //     uri: ''
  //   }
  // },
  @Input('selectable') selectable: boolean;
  @Input('selectedProduct') inProduct: Artical[];
  @Output() onArticalAdded = new EventEmitter<Artical[]>();

  producers: Producer[] = [];
  articles: Artical[] = [];
  count: number = 0;

  selectedProducts: Artical[] = [];

  constructor(private service: AdminService, private producerService: ProducerService) { }

  ngOnInit(): void {
    if(this.selectable !== undefined && this.inProduct !== undefined){
      this.selectedProducts = this.inProduct;
    }

    this.loadProducers();
    this.service.getArticles().subscribe( data => {
      this.articles = data.result;
      this.count = data.count;
    });
  }

  changePage(event: any){
    this.service.getArticles(event.page+1).subscribe( data => {
      this.articles = data.result;
      this.count = data.count;
    });
  }

  onRowSelect(event){
    console.log(this.selectedProducts);
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
  }

  loadProducers() {
    this.producers = this.producerService.getProducers();
    if (this.producers === null) {
      this.producerService.requestProducers().subscribe(data => this.producers = data);
    }
  }

  saveSelected(){
    console.log(this.selectedProducts);

    this.onArticalAdded.emit(this.selectedProducts);
  }

  discardSelected(){
    this.onArticalAdded.emit(this.inProduct);
  }

}


