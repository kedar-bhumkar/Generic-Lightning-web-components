import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UitemplateOneSectionSerial extends LightningElement {
    @api sections;
    @api metadata;
    @track mode ='view';

    connectedCallback(){
        console.log('sections = ' + JSON.stringify(this.sections));
        console.log('metadata = ' + JSON.stringify(this.metadata));
        console.log('mode = ' + this.mode);
    }

    get isView(){
        if(this.mode == 'view') {
            return true;
        }else{
            return false;
        } 
    }

    get isEdit(){
        if(this.mode == 'edit') {
            return true;
        }else{
            return false;
        }
    }


    toggleButton(event){
        if(this.mode == 'view') {
            this.mode = 'edit';
        }else{
            this.mode = 'view';
        }
    }

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Street = '32 Prince Street';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.mode = 'view';
     }
     handleSucess(event){
        const updatedRecordId = event.detail.id;
        console.log('onsuccess: ', updatedRecordId);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Contact record edit',
                message: 'Success Id = ' + updatedRecordId,
                variant: 'success',
            }),
        );        
     }
}