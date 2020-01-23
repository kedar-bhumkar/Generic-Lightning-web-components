import { LightningElement,api, track } from 'lwc';

export default class AccountView extends LightningElement {
    @api payload;
    @track obj;

    connectedCallback() {        
        console.log("Inside account view connectedCallback - " + JSON.stringify(this.payload));
        this.obj = this.payload.linkName;
    }
}