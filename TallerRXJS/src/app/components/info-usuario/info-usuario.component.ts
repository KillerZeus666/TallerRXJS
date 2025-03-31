import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent {
  @Input() usuario: User | null = null;
}
