import { LightningElement,api } from 'lwc';

export default class UitemplateTwosectionparallel extends LightningElement {
    @api sections;
    @api metadata;
    @api mode;

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
}   