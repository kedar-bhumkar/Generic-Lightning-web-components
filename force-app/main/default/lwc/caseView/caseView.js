import { LightningElement,api,track } from 'lwc';

export default class CaseView extends LightningElement {
    @api payload;
    @track listMetadata ={
        "obj": "Contact",
        "parent": {
            "obj": "Accountid",
            "id": "id"
        },
    
        "fields": [{
                "label": "Id",
                "fieldName": "Id"
            },
            {
                "label": "Name",
                "fieldName": "Name"
            },
            {
                "label": "Email",
                "fieldName": "Email",
                "type": "email"
            },
            {
                "label": "Phone",
                "fieldName": "Phone",
                "type": "phone"
            },
            {
                "label": "Birthdate",
                "fieldName": "Birthdate"
            },
            {
                "type": "action",
                "typeAttributes": {
                    "rowActions": [{
                            "label": "View details",
                            "name": "View_details"
                        },
                        {
                            "label": "Delete",
                            "name": "delete"
                        }
                    ]
                }
            }
        ],
        "theLimit": "10"
    
    };

    //"fields": ["Id","Name","Email","Phone","Birthdate"],

    connectedCallback() {        
        console.log("Inside case view connectedCallback - " + JSON.stringify(this.payload));
        this.listMetadata.parent.id =  this.payload.url.split("&")[1].split("=")[1];
        console.log("listMetadata= " + JSON.stringify(this.listMetadata));
    }
}