import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../item-list/item-list-interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailComponent implements OnChanges {
  @Input() itemId: number |null=null;
  item:Item|null = null;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemId'] && this.itemId !== null) { // Fetch data if itemId changes and is not null
      this.fetchItemDetails(this.itemId);
    }
  }

  fetchItemDetails(itemId: number) {
    this.http.get<Item>(`https://668636ed83c983911b01353c.mockapi.io/user/users/${itemId}`)
      .subscribe(
        response => {
          this.item = response;
        },
        error => {
          console.error('Error fetching item:', error);
        }
      );
  }
  
}

