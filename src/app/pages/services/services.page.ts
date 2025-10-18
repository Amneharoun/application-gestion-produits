import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service.model';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss']
})
export class ServicesPage implements OnInit {
  services: Service[] = [];
  servicesFiltres: Service[] = [];
  categories: string[] = [];

  recherche: string = '';
  categorieSelectionnee: string = 'toutes';
  triSelectionne: string = 'nom';

  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    this.services = this.servicesService.getServices();
    this.categories = this.servicesService.getCategories();
    this.filtrerServices();
  }

  filtrerServices() {
    let resultats = [...this.services];

    if (this.recherche.trim()) {
      const terme = this.recherche.toLowerCase();
      resultats = resultats.filter(service =>
        service.nom.toLowerCase().includes(terme) ||
        service.description.toLowerCase().includes(terme)
      );
    }

    if (this.categorieSelectionnee !== 'toutes') {
      resultats = resultats.filter(service =>
        service.categorie === this.categorieSelectionnee
      );
    }

    this.servicesFiltres = this.trierServices(resultats);
  }

  trierServices(services: Service[]): Service[] {
    switch (this.triSelectionne) {
      case 'nom':
        return services.sort((a, b) => a.nom.localeCompare(b.nom));
      case 'prix':
        return services.sort((a, b) => a.prix - b.prix);
      case 'categorie':
        return services.sort((a, b) => a.categorie.localeCompare(b.categorie));
      default:
        return services;
    }
  }

  voirDetails(service: Service) {
    console.log('Service sélectionné :', service);
  }
}
