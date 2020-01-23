/* eslint-disable no-console */
import { LightningElement,track,api,wire } from 'lwc';
import load from '@salesforce/apex/GenericRecordViewController.load';

 
export default class GenericRecordView extends LightningElement {
    @api metadata;
    metadataParam;
    @track sections =[];
    @track mode = 'view';

    //template visibility vars
    @track uiTemplateTwoSectionParallel;
    @track uiTemplateOneSectionSerial;
    //end


    @wire(load, { recordMetadataParam: '$metadataParam'})
    wiredList({ error, data }) {
        if (data) {
            console.log('Returned Data *** = ' + data); 
            const finalPayload = JSON.parse(data);
            this.sections = finalPayload.theBeans;
            this.checkTemplate(finalPayload.templateType);
        } else if (error) {
            // eslint-disable-next-line no-console
            console.log('error =' + JSON.stringify(error));
        }
    } 

    checkTemplate(templateType){
        console.log('Checking template.... = ' + templateType);
        if(templateType == '2 section parallel'){
            this.uiTemplateTwoSectionParallel = true;
            this.uiTemplateOneSectionSerial = false;
        }else if(templateType == '1 section serial'){
            this.uiTemplateOneSectionSerial = true;
            this.uiTemplateTwoSectionParallel = false;
        }
        console.log('this.uxTemplateTwoSectionParallel = ' + this.uxTemplateTwoSectionParallel);
        console.log('this.uiTemplateOneSectionSerial = ' + this.uiTemplateOneSectionSerial);

    }

    connectedCallback(){ 
        console.log('Inside GenericRecordView.connectedCallback...' + JSON.stringify(this.metadata));
        this.metadataParam = JSON.stringify(this.metadata);
    }
}