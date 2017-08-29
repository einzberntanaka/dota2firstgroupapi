import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../component/shared/header/header.component';
import { FooterComponent } from '../../component/shared/footer/footer.component';
import { NavbarComponent } from '../../component/shared/navbar/navbar.component';


@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent,
        NavbarComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NavbarComponent
    ]
})

export class AppCommonModule {}