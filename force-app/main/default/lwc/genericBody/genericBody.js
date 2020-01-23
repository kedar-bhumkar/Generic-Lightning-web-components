import { LightningElement, wire, track,api} from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class GenericBody extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    @api recordId;
    @api objectApiName; 
    @track account;
    @track thecase;
    @track thecontact;
    @track payload;
    @track recordView;
    metadata;
    connectedCallback() {
        console.log("Inside genericBody connectedCallback...");
        this.recordView = true;
        this.metadata = {"objectApi": this.objectApiName, "recordId": this.recordId};
        registerListener('linkSelected', this.handleLinkSelected, this);
    }
 
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
 
    handleLinkSelected(thePayload) {
        console.log("Inside  genricBody handleLinkSelected ... " + thePayload);        
        console.log("recordId="+this.recordId);
        console.log("objectApiName="+this.objectApiName);
        this.payload = thePayload[0];   
        this.payload.url+="&parentId="+ this.recordId;     
        console.log("thePayload.linkName = " + this.payload.linkName);
        if(this.payload.linkName=="Account"){
            this.account=true;
            this.thecase=false;
            this.thecontact = false;
            this.recordView = false;
        }else if(this.payload.linkName=="Case"){
            this.thecase=true;
            this.account=false;
            this.thecontact = false;
            this.recordView = false;
        }else if(this.payload.linkName=="Contact"){
            this.thecase=false;
            this.account=false;
            this.thecontact = true;
            this.recordView = false;
        }
    }

   
}