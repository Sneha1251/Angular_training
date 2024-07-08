import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDetailComponent } from '../item-details/item-details.component';
import { Item } from './item-list-interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemDetailComponent,CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items:Item[] = [];
  selectedItemId: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchItems(this.currentPage);
  }

  fetchItems(page: number): void{
    this.http.get<Item[]>(`https://668636ed83c983911b01353c.mockapi.io/user/users?page=${page}&limit=${this.itemsPerPage}`)
      .subscribe((response) => {
        this.items = response;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  selectItem(itemId: number): void {
    this.selectedItemId = itemId;
  }
  nextPage(): void {
    this.currentPage++;
    this.fetchItems(this.currentPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchItems(this.currentPage);
    }
  }
}