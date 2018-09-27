/* Import Routes Config */
import { RouterModule } from '@angular/router';

const routes = [
    { path: '', loadChildren: './src/home/home.module#HomeModule' },
    { path: 'contact', loadChildren: './src/contact/contact.module#ContactModule' },
    { path: 'about', loadChildren: './src/about/about.module#AboutModule' }
];


export default RouterModule.forRoot(routes);

