import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  tituloPagina = "";
  exibirLayout = true;
  userName: any = ''

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
     this.userName = localStorage.getItem('userName');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.exibirLayout = !event.url.includes('/login'); // Oculta o layout no login
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route?.outlet === 'primary'),
      mergeMap(route => route!.data)
    ).subscribe(data => {
      this.tituloPagina = data['title'];
    });
  }

  isCollapsed = true;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('logado');
    this.router.navigate(['/login']);
  }
}
