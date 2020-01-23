import { LightningElement,api,wire,track } from 'lwc';
import getRelatedList from '@salesforce/apex/GenericRelatedListController.getRelatedList';
import { NavigationMixin } from 'lightning/navigation';


export default class GenericRelatedList extends NavigationMixin(LightningElement) {
    @api listmetadata;
    @track rowOffset = 0;
    @track listdata;  
    localMetadata;             
    payload ='';        
    cols;

    
    @wire(getRelatedList, { theData: '$payload'})
    wiredList({ error, data }) {
        if (data) {
            console.log('List = ' + data);
            this.listdata = data; 
            console.log('ListData = ' + JSON.stringify(this.listdata));
        } else if (error) {
            console.log('error =' + JSON.stringify(error));
        }
    } 
    connectedCallback(){
        console.log("*** Inside GenericRelatedList connectedCallback - listMetadata=" + JSON.stringify(this.listmetadata));
        this.cols = this.listmetadata.fields;
        //deep cloning needed as LWC does not allow parameters passed from parent to be modded in child.
        this.localMetadata = JSON.parse(JSON.stringify(this.listmetadata));
        var fields=[]; 	
	    this.cols.map(c=>'label' in c?fields.push(c):'');	  	   
        this.localMetadata.fields = fields;        
        this.payload = JSON.stringify(this.localMetadata);
        console.log('Modded payload = ' + this.payload);
    }

    handleRowAction(event) {
        console.log("Inside handleRowAction...");
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log("actionName ..."+ actionName);
        switch (actionName) {           
            case 'View_details':
                this.viewDetails(row);
                break;
            default:
        }
    }

     viewDetails(row) {
        console.log("row = " + JSON.stringify(row));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                objectApiName: this.listmetadata.obj,
                actionName: 'view'
            }
        });
    }
}