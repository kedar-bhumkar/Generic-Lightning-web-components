/* eslint-disable no-console */
import { LightningElement,track,api,wire } from 'lwc';
import load from '@salesforce/apex/GenericRecordViewController.load';

 
export default class GenericRecordView extends LightningElement {
    @api metadata;
    metadataParam;
    @track sections =[];
    @track mode = 'edit';

    //template visibility vars
    @track uxTemplateTwoSectionParallel;
    //end


    @wire(load, { recordMetadataParam: '$metadataParam'})
    wiredList({ error, data }) {
        if (data) {
            console.log('Returned Data *** = ' + data); 
            this.sections = JSON.parse(data);
            this.checkTemplate();
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log('error =' + JSON.stringify(error));
        }
    } 

    checkTemplate(){
        console.log('Checking template....');
        if(this.metadata.templateType == '2 section parallel'){
            this.uxTemplateTwoSectionParallel = true;
        }
        console.log('this.uxTemplateTwoSectionParallel = ' + this.uxTemplateTwoSectionParallel);

    }

    connectedCallback(){ 
        console.log('Inside GenericRecordView.connectedCallback...' + JSON.stringify(this.metadata));
        this.metadataParam = JSON.stringify(this.metadata);
    }
}