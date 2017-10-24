import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'test.component.html',
    styleUrls: ['test.component.css']
})

export class TestComponent {
    constructor () {}
        ngOnInit(){
            let margin = document.getElementById("navbar-test").offsetHeight;
            document.getElementById("mySidenav").style.marginTop = margin + "px";
        }
        
        show() {
            let margin = document.getElementById("navbar-test").offsetHeight;
            document.getElementById("mySidenav").style.marginTop = margin + "px";
            //document.getElementById("mySidenav").style.width = "450px";

            document.getElementById("mySidenav").style.right = "0";
            
            
        }
        hide() {
           // document.getElementById("mySidenav").style.width = "0";
            document.getElementById("mySidenav").style.right = "-450px";      
        }
}