import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  items: MenuItem[] | undefined;
  ngOnInit(){
        this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Product table',
                        escape: false,
                        icon: 'pi pi-list',
                        iconClass: 'text-xl',
                        url: '/products'
                    },
                    {
                        label: 'Generate Excel report',
                        escape: false,
                        icon: 'pi pi-file-excel',
                        iconClass: 'text-xl',
                        url: '/report'
                    }
                ]
            },
            {
                label: 'More elements',
                items: [
                    {
                        label: 'Coming soon',
                        icon: 'pi pi-clock',
                        url: 'http://angular.io'
                    }
                ]
            }
        ];
    }
}
