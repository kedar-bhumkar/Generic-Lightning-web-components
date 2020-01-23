import { LightningElement,api,wire,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class GenericVerticalNavigator extends LightningElement {
    @api menu;
    @track links=[];
    @wire(CurrentPageReference) pageRef;


    connectedCallback() {
        console.log('Inside connected callback ....menu = ' + this.menu); 
        if(!this.isJsonString()) return;
        var menuObj = JSON.parse(this.menu);
        var linkNames = Object.keys(menuObj);      
        console.log("linkNames =" + linkNames);  
        linkNames.map(m=>this.links.push({"linkName": m,"url":menuObj[m]}));
        console.log("Links *** = " +  this.links);
    }

    isJsonString() {
        console.log('CALLING isJsonString...');
        try {
            JSON.parse(this.menu); 
        } catch (e) {
            return false; 
        }
        return true; 
    }

    handleSelect(event) {
        var pgname = event.target.dataset.pgname;
        console.log("Link clicked is..." + pgname);
        console.log("linkNames = " + JSON.stringify(this.links));
        var payload = this.links.filter(m=>m.linkName == pgname);
        console.log("payload = " + JSON.stringify(payload));
        fireEvent(this.pageRef, 'linkSelected', payload);
    }

}