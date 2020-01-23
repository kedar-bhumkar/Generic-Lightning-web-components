import { LightningElement,api,wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class GenericHeader extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldNames = {"Name": "Consumer", "Birthdate": "DOB", "Department": "Dept", "Email":"E-mail" };
    theName =[];
    labels;
    fields;
    headerdata;
    @track labelValues=[];

    //labelValues = [{"label":"Consumer","value":"Jonathan Bradley"},{"label":"DOB","value":"2019-12-28"},{"label":"Dept","value":"TAX"},{"label":"E-mail","value":"jonathan@demo.net"}];


    renderedCallback() {
        console.log('fieldNames = ' + this.fieldNames);
        if(!this.isJsonString()) return;
        console.log('Hola');
        this.headerdata = JSON.parse(this.fieldNames);
        this.labels = Object.values(this.headerdata);
        this.fields = Object.keys(this.headerdata); 

        this.fields.map(field=>this.theName.push(this.objectApiName+"."+field));
    
        console.log("Array = " + this.theName);
    }

    isJsonString() {
        console.log('Calling isJSONparse...');
        try {
            JSON.parse(this.fieldNames); 
        } catch (e) {
            return false;
        }
        return true;
    }
    
    //@wire(getRecord, { recordId: '$recordId', fields: this.fieldNames.split(",") })
    @wire(getRecord, { recordId: '$recordId', fields: '$theName'})
    theContact({ error, data }) {
        
        if (data) { 
            console.log('New Data = ' + JSON.stringify(data));
            //console.log('Arra Department = ' + data.fields[""+(this.theName[2].split("."))[1]].value);
            //this.fields.map(field=>this.labelValues.push({this.headerdata[field],data.fields[field].value }));
            this.fields.map(f=>this.labelValues.push({"label":this.headerdata[f],"value":(data.fields[""+f]).value}));
            console.log('lavelValues = ' + JSON.stringify(this.labelValues));

            this.theContact = data;
            this.error = undefined;
        } else if (error) {
            console.log('Error = ' + JSON.stringify(error));
            this.error = error;
            this.theContact = undefined;
        }
    }


}