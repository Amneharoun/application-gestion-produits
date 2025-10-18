import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services: Service[] = [
    {
      id: 1,
      nom: 'Massage Relaxant',
      description: 'Un moment de détente absolue.',
      icone: 'leaf-outline',
      categorie: 'Bien-être',
      prix: 50
    },
    {
      id: 2,
      nom: 'Consultation Nutrition',
      description: 'Conseils personnalisés en nutrition.',
      icone: 'restaurant-outline',
      categorie: 'Santé',
      prix: 30
    },
    {
      id: 3,
      nom: 'Coaching Sportif',
      description: 'Programme adapté à vos objectifs.',
      icone: 'fitness-outline',
      categorie: 'Sport',
      prix: 40
    }
  ];

  getServices(): Service[] {
    return this.services;
  }

  getCategories(): string[] {
    return ['toutes', ...new Set(this.services.map(s => s.categorie))];
  }
}
